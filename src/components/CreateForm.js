import { useId, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Link from 'next/link';
import { useForm, Controller } from "react-hook-form"
import { supabase } from "@/lib/supabaseClient";
import CreatableSelect from 'react-select/creatable';
import Select from "react-select";

import { Field, Form, Input } from "@/blocks/Form"
import stackSectionChoices from "@/data/stackSectionChoices.json"
import projectStatus from "@/data/projectStatus.json"
import projectTypes from "@/data/projectTypes.json"
import { AppContext } from "@/contexts/AppContext";

function StableCreatableSelect({ ...props }) {
    return <CreatableSelect {...props} instanceId={useId()} />;
}

function StableSelect({ ...props }) {
    return <Select {...props} instanceId={useId()} />;
}

const CreateForm = () => {

    const { isLoggedIn } = useContext(AppContext);
    const router = useRouter()

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [tagOptions, setTagOptions] = useState([])
    const [typeOptions, setTypeOptions] = useState([])

    const tagsChoices = stackSectionChoices
        .flatMap(stack => stack.examples)
        .reduce((result, stack) => {
            const duplicate = result.find(obj => obj.value === stack.value);
            if (!duplicate) {
            result.push(stack);
            }
            return result;
        }, [])
        .sort((a, b) => a.value.localeCompare(b.value));

    const { register, control, handleSubmit, watch, formState: { errors }, reset } = useForm({
        mode: "onSubmit"
    });

    const postToSupabase = async (data) => {
        setIsSubmitting(true)

        // const { data: { user } } = await supabase.auth.getUser();

        const { error } = await supabase
            .from('project')
            .insert([
                {
                    ...data,
                    created_at: new Date()
                }
            ])

        if (error?.message === `duplicate key value violates unique constraint "project_handle_key"`) {
            alert("Your preferred collective handle already exists, please use another one.");
            setIsSubmitting(false);
        } else if (error) {
            alert("Sorry, something went wrong. Please try again.");
            setIsSubmitting(false);
            console.log(error)
        } else {
            // send notification to slack
            // fetch("/api/slackNotification", {
            //     method: "POST",
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         message: `A user just created an Executive profile! Email: ${data.email}`
            //     })
            // })
            //     .then((res) => {
            //       return res.json()
            //     })

            // if successful, alert() for 2 seconds and redirect to home page
            alert("Thank you for completing the registration process.")
            setTimeout(() => {
                router.push("/")
            }, 2000);
        }
    }

    const saveData = (data) => {
        setIsSubmitting(true)
        postToSupabase(data);
    };

    if (!isLoggedIn.user) return (
        <div className="min-h-screen mt-2">
            Please create a profile before registering your project.
            <br />
            {/* back to home button */}
            <Link href="/" className="btn btn-secondary mt-4 px-3 py-2 my-auto rounded-md text-sm border-2">
                &lt; Back to Home
            </Link>
        </div>
    )

    return (
        <Form onSubmit={handleSubmit(saveData)} className="mt-4 max-w-7xl">
            <fieldset>
                <h3 className="text-2xl font-bold">💻 Project&apos;s Detail</h3>
                <p className="text-sm">The following details will be used to create your Project Page.</p>
            </fieldset>

            <Field label="Preferred Collective Handle"
                error={errors?.handle}
                hint="This will be in the link to your project page (https://collective.supertype.ai/r/{your_handle})"
            >
                <Input
                    {...register("handle", { required: "Please provide a handle to be used in the link to your Project Page" })}
                    id="handle"
                    placeholder="collective"
                />
            </Field>

            <Field label="Project name" error={errors?.name}>
                <Input
                    {...register("name", { required: "Project name is a required field" })}
                    id="name"
                    placeholder="Supertype Collective"
                />
            </Field>

            <div className="flex flex-wrap -mx-3">
                <div className="w-full md:w-1/2 px-3 md:mb-0">
                    <Field label="Project URL" error={errors?.url}>
                        <Input
                            {...register("url", { 
                                required: "Project URL is a required field",
                                pattern: {
                                    value: /^(ftp|http|https):\/\/[^ "]+$/,
                                    message: 'Invalid URL'
                                } 
                            })}
                            id="url"
                            placeholder="https://collective.supertype.ai"
                        />
                    </Field>
                </div>
                <div className="w-full md:w-1/2 px-3">
                    <Field label="GitHub URL" error={errors?.github}>
                        <Input
                            {...register("github", {
                                pattern: {
                                    value: /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/,
                                    message: 'Invalid GitHub URL'
                                }
                            })}
                            id="github"
                            placeholder="https://github.com/supertypeai/collective"
                        />
                    </Field>
                </div>
            </div>

            <Field label="Image URL" error={errors?.imgUrl} hint='Overview image of your project that will be shown in your project page (.jpg/.jpeg/.png/.webp)'>
                <Input
                    {...register("imgUrl", { required: "Image URL is a required field" })}
                    id="imgUrl"
                    placeholder="https://raw.githubusercontent.com/supertypeai/collective/main/assets/lightdark.webp"
                />
            </Field>

            <Field label="🖊️ Description" error={errors?.description}>
                <textarea {...register("description", { required: "Description is a required field" })} 
                    id="description" name="description"
                    rows="4" required minLength="40" maxLength="500"
                    placeholder="Supertype Collective is a community of analytics developers, data scientists and engineering leaders building products across the full stack. It a highly curated place, with close collaboration between members looking to join forces on building high-impact analytics products."
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
            </Field>

            <Field label="🏴󠁧󠁢󠁮󠁩󠁲󠁿 Status" error={errors?.status} hint="Indicates your project&apos;s current state">
                <Controller
                    control={control}
                    name="status"
                    defaultValue={projectStatus[0].value}
                    render={({ field: { onChange, value, ref } }) => (
                        <StableSelect
                            inputRef={ref}
                            options={projectStatus}
                            classNamePrefix="select"
                            className="text-black max-w-3xl"
                            value={projectStatus.find(opt => opt.value === value)}
                            onChange={val => onChange(val.value)}
                            theme={theme => ({
                                ...theme,
                                borderRadius: 0,
                                colors: {
                                    ...theme.colors,
                                    primary25: '#fcaa8c',
                                    primary: '#f46d75',
                                },
                            })}
                            styles={{
                                // change text color of selected option
                                singleValue: (provided, state) => ({
                                    ...provided,
                                    color: '#ad0705',
                                    fontWeight: 'bold',
                                    fontSize: '0.8rem',
                                    textTransform: 'uppercase'
                                }),
                            }}
                            isSearchable={true}
                        />
                    )}
                />
            </Field>

            <Field label="📚 Related Qualifications" error={errors?.tags} hint="A maximum of 10 most revelant qualifications">
                <Controller
                    control={control}
                    name="tags"
                    defaultValue={[]}
                    render={({ field: { onChange, value, ref } }) => (
                        <StableCreatableSelect
                            inputRef={ref}
                            isMulti
                            options={tagsChoices}
                            classNamePrefix="select"
                            className="text-black max-w-3xl"
                            value={
                                value.map(v => {
                                    const index = tagsChoices.findIndex(option => option.value === v);
                                    if (index != -1) {
                                        return (tagsChoices[index]);
                                    } else {
                                        return ({ "value": v, "label": v });
                                    }
                                })
                            }
                            onChange={val => {
                                val.length <= 10 && onChange(val.map(c => c.value)) && setTagOptions(val)
                            }}
                            theme={theme => ({
                                ...theme,
                                borderRadius: 0,
                                colors: {
                                    ...theme.colors,
                                    primary25: '#fcaa8c',
                                    primary: '#f46d75',
                                },
                            })}
                            styles={{
                                // change background color of tags
                                multiValue: (styles, { data }) => {
                                    return {
                                        ...styles,
                                        // same primary-focus color from tailwind config
                                        backgroundColor: '#c4002f',
                                    };
                                },
                                // change color of text in tags
                                multiValueLabel: (styles, { data }) => ({
                                    ...styles,
                                    color: 'white',
                                }),
                            }}
                        />
                    )}
                />
            </Field>

            <Field label="🔖 Types" error={errors?.types} hint="Indicates what your project&apos;s categories">
                <Controller
                    control={control}
                    name="types"
                    defaultValue={[]}
                    render={({ field: { onChange, value, ref } }) => (
                        <StableSelect
                            inputRef={ref}
                            isMulti
                            options={projectTypes}
                            classNamePrefix="select"
                            className="text-black max-w-3xl"
                            value={
                                value.map(v => {
                                    const index = projectTypes.findIndex(option => option.value === v);
                                    if (index != -1) {
                                        return (projectTypes[index]);
                                    } else {
                                        return ({ "value": v, "label": v });
                                    }
                                })
                            }
                            onChange={val => {
                                val.length <= 10 && onChange(val.map(c => c.value)) && setTypeOptions(val)
                            }}
                            theme={theme => ({
                                ...theme,
                                borderRadius: 0,
                                colors: {
                                    ...theme.colors,
                                    primary25: '#fcaa8c',
                                    primary: '#f46d75',
                                },
                            })}
                            styles={{
                                // change background color of tags
                                multiValue: (styles, { data }) => {
                                    return {
                                        ...styles,
                                        // same primary-focus color from tailwind config
                                        backgroundColor: '#c4002f',
                                    };
                                },
                                // change color of text in tags
                                multiValueLabel: (styles, { data }) => ({
                                    ...styles,
                                    color: 'white',
                                }),
                            }}
                        />
                    )}
                />
            </Field>

            <div className="my-6">
                {
                    isSubmitting ?
                        <button type="submit" className="btn btn-primary text-white" disabled>Submitting...</button>
                        :
                        <button type="submit" className="btn btn-primary text-white">Complete Registration</button>
                }
            </div>

        </Form>
    )
}

export default CreateForm