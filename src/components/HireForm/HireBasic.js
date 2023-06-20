import { useContext } from 'react'
import { useForm, Controller } from "react-hook-form"
import Select from "react-select";
import { useRouter } from "next/router";

import { HireContext } from '@/contexts/HireContext'
import { Field, Form, Input } from "@/blocks/Form"

const commitmentOptions = [
    { value: "full-time", label: "Full-time" },
    { value: "part-time", label: "Part-time" },
    { value: "hourly", label: "Hourly" },
    { value: "undecided", label: "I'll decide later" },
]

const remotenessOptions = [
    { value: "remote", label: "Remote, anywhere in the world" },
    { value: "mostly-remote", label: "Mostly remote" },
    { value: "office", label: "Work from office" },
    { value: "undecided", label: "I'll decide later" },
]

const HireBasic = ({ nextFormStep }) => {

    const context = useContext(HireContext)
    const router = useRouter()
    const [form] = context.f

    const { register, control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            ...form
        }, mode: "onSubmit"
    });

    const saveData = (data) => {
        fetch("/api/hiringNotification", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              formData: data
            })
        })
            .then((res) => {
                return res.json()
            })
        
        alert("Thank you for submitting! We will be in touch.");
        setTimeout(() => {
            router.push("/")
        }, 1000);
    };

    return (
        <Form onSubmit={handleSubmit(saveData)}>
            <fieldset>
                <legend>
                    <h3 className="text-2xl font-bold">🧑‍💼 Connect me with Collective consultants</h3>
                    <p className="text-sm">Help us find the right candidate(s) for your project.</p>
                </legend>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <Field label="Your Name"
                            error={errors?.name}
                            hint="How should we address you?"
                        >
                            <Input
                                {...register("name", { required: "Please provide a name to address you by" })}
                                id="name"
                                placeholder="Pamela Morgan Beesly"
                            />
                        </Field>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <Field label="Company Email"
                            error={errors?.email}
                            hint="We&apos;ll use this to contact you."
                        >
                            <Input
                                {...register("email", { required: "Please sign in with your GitHub account" })}
                                id="email"
                                placeholder="pam.beesly@dundermifflin.com"
                            />
                        </Field>
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <Field label="Commitment Level"
                            error={errors?.commitment}
                            hint="The level of time commitment you require from the consultant(s)."
                        >
                            <Controller
                                control={control}
                                name="commitment"
                                defaultValue={commitmentOptions[1].value}
                                render={({ field: { onChange, value, ref } }) => (
                                    <Select
                                        inputRef={ref}
                                        className="text-black max-w-3xl"
                                        options={commitmentOptions}
                                        value={commitmentOptions.find((opt) => opt.value === value)}
                                        onChange={(val) => onChange(val.value)}
                                    />
                                )}
                            />
                        </Field>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <Field label="Work Preference"
                            error={errors?.remoteness}
                            hint="Open to working with your consultants remotely?"
                        >
                            <Controller
                                control={control}
                                name="remoteness"
                                defaultValue={remotenessOptions[1].value}
                                render={({ field: { onChange, value, ref } }) => (
                                    <Select
                                        inputRef={ref}
                                        className="text-black max-w-3xl"
                                        options={remotenessOptions}
                                        value={remotenessOptions.find((opt) => opt.value === value)}
                                        onChange={(val) => onChange(val.value)}
                                    />
                                )}
                            />
                        </Field>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <Field label="🖊️ Description" error={errors?.description}>
                            <textarea
                                {...register("description", {
                                    required: "Description is a required field",
                                })}
                                id="description"
                                name="description"
                                rows="4"
                                required
                                minLength="40"
                                maxLength="500"
                                placeholder="A good place to brief us about the project, the key job responsibities, your budget (if you have one), and any other details you think we should know."
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            />
                        </Field>
                    </div>
                </div>
            </fieldset>
            <button type="submit" className="btn btn-primary text-white mb-6">
                Submit
            </button>
        </Form>
    )
}

export default HireBasic