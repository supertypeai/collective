import { useContext } from "react"
import { useForm } from "react-hook-form"
import dynamic from 'next/dynamic'
// import Select from "react-select";

import { NominateContext } from "@/contexts/NominateContext"
import { Field, Form, Input } from "@/blocks/Form"

const PersonalDetails = ({ formStep, nextFormStep }) => {

    const context = useContext(NominateContext);
    console.log("context", context)
    const [state, setState] = context.f

    const { register, handleSubmit, watch, formState: { errors } } = useForm({ defaultValues: state, mode: "onSubmit" });

    const saveData = (data) => {
        console.log(data);
        setState({ ...state, ...data });
        nextFormStep();
    };

    return (
        <Form onSubmit={handleSubmit(saveData)}>
            <fieldset>
                <legend>Personal Details</legend>
                <Field label="Full name" error={errors?.fullname}>
                    <Input
                        {...register("fullname", { required: "Full name is a required field" })}
                        id="fullname"
                    />
                </Field>
                <Field label="Email" error={errors?.email} hint='We will send an acknowledgment of your nomination to this email.'>
                    <Input
                        {...register("email", { required: "Email is required" })}
                        type="email"
                        id="email"
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
                            />
                        </Field>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <Field label="GitHub Username" error={errors?.github_handle}>
                            <Input
                                {...register("github_handle", { required: "Your GitHub username is a required field" })}
                                id="github_handle"
                            />
                        </Field>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary text-white">Next {">"}</button>
            </fieldset>

        </Form>
    )
}

const PersonalDetailsNonSSR = dynamic(() => Promise.resolve(PersonalDetails), {
    ssr: false,
})


export default PersonalDetailsNonSSR
