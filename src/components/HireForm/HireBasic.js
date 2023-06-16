import { useContext } from 'react'
import { useForm, Controller } from "react-hook-form"
import Select from "react-select";

import { HireContext } from '@/contexts/HireContext'
import { Field, Form, Input } from "@/blocks/Form"

const HireBasic = ({ nextFormStep }) => {

    const context = useContext(HireContext)
    const [form, setForm] = context.f

    const { register, control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            ...form
        }, mode: "onSubmit"
    });

    const saveData = (data) => {
        setForm({ ...form, ...data, superinference: superinference });
        nextFormStep();
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
                            error={errors?.name}
                            hint="The level of time commitment you require from the consultant(s)."
                        >
                            <Select
                                id="commitment"
                                className="text-black max-w-3xl"
                                options={
                                    [
                                        { value: "full-time", label: "Full-time" },
                                        { value: "part-time", label: "Part-time" },
                                        { value: "hourly", label: "Hourly" },
                                        { value: "undecided", label: "I'll decide later" },
                                    ]
                                }
                                defaultValue={[
                                    { value: "part-time", label: "Part-time" },
                                ]}
                                {...register("commitment")}
                            />
                        </Field>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <Field label="Work Preference"
                            error={errors?.name}
                            hint="Open to working with your consultants remotely?"
                        >
                            <Select
                                id="remoteness"
                                className="text-black max-w-3xl"
                                options={
                                    [
                                        { value: "remote", label: "Remote, anywhere in the world" },
                                        { value: "mostly-remote", label: "Mostly remote" },
                                        { value: "office", label: "Work from office" },
                                        { value: "undecided", label: "I'll decide later" },
                                    ]
                                }
                                defaultValue={[
                                    { value: "mostly-remote", label: "Mostly remote" },
                                ]}
                                {...register("commitment")}
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
        </Form>
    )
}

export default HireBasic