import { useContext, useId } from "react"
import { useForm, Controller } from "react-hook-form"
import Image from 'next/image';
import CreatableSelect from 'react-select/creatable';
import { supabase } from "@/lib/supabaseClient";

import { Field, Form, Input } from "@/blocks/Form"
import profileTagsChoices from '@/data/profileTagsChoices.json';
import { signInWithGitHub } from "@/blocks/Mainframe/Navbar";
import { NominateContext } from "@/contexts/NominateContext"
import { AppContext } from "@/contexts/AppContext";

function StableSelect({ ...props }) {
    return <CreatableSelect {...props} instanceId={useId()} />;
}

const PersonalDetails = ({ nextFormStep }) => {

    const context = useContext(NominateContext);
    const { isLoggedIn } = useContext(AppContext);
    const [form, setForm] = context.f

    const { register, control, handleSubmit, watch, formState: { errors } } = useForm({ defaultValues: form, mode: "onSubmit" });

    const saveData = (data) => {
        console.log(data);
        setForm({ ...form, ...data });
        nextFormStep();
    };

    return (
        <Form onSubmit={handleSubmit(saveData)}>

            {
                // prompt user to sign in with GitHub if not already signed in
                !isLoggedIn &&
                <div className="my-4">
                    <p className="text-sm mb-4">You can expedite the application process by signing in with GitHub</p>
                    <button onClick={() => signInWithGitHub()}
                        className="text-white group hover:text-rose-200 px-3 py-1 rounded-md text-sm hover:bg-secondary border-2">
                        <Image src="/techicons/github_inv.png" alt="GitHub Logo" width={20} height={20} className="inline mr-2" />
                        Sign In with GitHub
                    </button>
                </div>
            }


            <fieldset>
                <legend>
                    <h3 className="text-2xl font-bold">🧑‍💼 Developer Profile</h3>
                    <p className="text-sm">The following details will be used to create a Developer Profile on Supertype Collective if your nomination is successful.</p>
                </legend>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <Field label="Preferred Collective Handle"
                            error={errors?.s_preferred_handle}
                            hint="This will be used as your as your username, if available"
                        >
                            <Input
                                {...register("s_preferred_handle")}
                                id="s_preferred_handle"
                                placeholder="pambeesly"
                            />
                        </Field>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <Field label="GitHub Username"
                            error={errors?.github_handle}
                            hint="Used to automatically populate your Developer Profile"
                        >
                            <Input
                                {...register("github_handle", { required: "Your GitHub username is a required field" })}
                                id="github_handle"
                                placeholder="pambeesly"
                            />
                        </Field>
                    </div>
                </div>
                <Field label="Full name" error={errors?.fullname}>
                    <Input
                        {...register("fullname", { required: "Full name is a required field" })}
                        id="fullname"
                        placeholder="Pamela Morgan Beesly"
                    />
                </Field>
                <Field label="Email" error={errors?.email} hint='We will send an acknowledgment of your nomination to this email.'>
                    <Input
                        {...register("email", { required: "Email is required" })}
                        type="email"
                        id="email"
                        placeholder="pamela@dundermifflin.com"
                    />
                </Field>


                <Field label="🖊️ Introduction" error={errors?.long}>
                    <textarea {...register("long")} id="long" name="long"
                        rows="4" required minLength="40" maxLength="250"
                        placeholder="I am a data scientist with 3 years of experience in the industry and a Fellow at Supertype Fellowship. I am passionate about open source and have contributed to several projects under this program."
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    />
                </Field>

                <Field label="✨ Headline" error={errors?.short}
                    hint="A short headline that appears below your name."
                >
                    <Input
                        {...register("short", { required: "Please provide a short Headline" })}
                        id="short"
                        placeholder="Full Stack Data Scientist @SupertypeAI"
                    />
                </Field>

                <Field label="📚 Key Qualifications" error={errors?.tags} hint="A maximum of 10 most revelant qualifications">

                    <Controller
                        control={control}
                        name="tags"
                        defaultValue={[]}
                        render={({ field: { onChange, value, ref } }) => (
                            <StableSelect
                                inputRef={ref}
                                isMulti
                                options={profileTagsChoices}
                                classNamePrefix="select"
                                className="text-black max-w-3xl"
                                value={
                                    value.map(v => {
                                        const index = profileTagsChoices.findIndex(option => option.value === v);
                                        if (index != -1) {
                                            return (profileTagsChoices[index]);
                                        } else {
                                            return ({ "value": v, "label": v });
                                        }
                                    })
                                }
                                onChange={val => val.length <= 10 && onChange(val.map(c => c.value))}
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

                <button type="submit" className="btn btn-primary text-white">Next {">"}</button>
            </fieldset>
            {/* <p className="text-xs">
                {JSON.stringify(isLoggedIn)}
            </p> */}
        </Form>
    )
}

// const PersonalDetailsNonSSR = dynamic(() => Promise.resolve(PersonalDetails), {
//     ssr: false,
// })


export default PersonalDetails
