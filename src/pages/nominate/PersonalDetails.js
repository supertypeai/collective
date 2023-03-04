import { useContext } from "react"
import dynamic from 'next/dynamic'
import { useForm, Controller } from "react-hook-form"
import Select from "react-select";

import { NominateContext } from "@/contexts/NominateContext"
import { Field, Form, Input } from "@/blocks/Form"
import profileTagsChoices from './profileTagsChoices.json';

const PersonalDetails = ({ nextFormStep }) => {

    const context = useContext(NominateContext);
    const [form, setForm] = context.f

    const { register, control, handleSubmit, watch, formState: { errors } } = useForm({ defaultValues: form, mode: "onSubmit" });

    const saveData = (data) => {
        console.log(data);
        setForm({ ...form, ...data });
        nextFormStep();
    };

    return (
        <Form onSubmit={handleSubmit(saveData)}>
            <fieldset>
                <legend>Developer Profile</legend>
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
                            <Select
                                inputRef={ref}
                                isMulti
                                options={profileTagsChoices}
                                classNamePrefix="select"
                                className="text-black max-w-3xl"
                                value={
                                    profileTagsChoices.filter(option => value.includes(option.value))
                                }
                                onChange={val => val.length <= 10 && onChange(val.map(c => c.value))}
                                // value={selectedOptions}
                                // onChange={o => setSelectedOptions(o)}
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

        </Form>
    )
}

const PersonalDetailsNonSSR = dynamic(() => Promise.resolve(PersonalDetails), {
    ssr: false,
})


export default PersonalDetailsNonSSR
