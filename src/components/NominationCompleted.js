import { useContext, useId } from "react"
import { useForm, Controller } from "react-hook-form"
import Select from "react-select";

import { NominateContext } from "@/contexts/NominateContext"
import { Field, Form, Input } from "@/blocks/Form"


function StableSelect({ ...props }) {
    return <Select {...props} instanceId={useId()} />;
}

const PersonalDetails = ({ nextFormStep }) => {

    const context = useContext(NominateContext);
    const [form, setForm] = context.f

    const { register, control, handleSubmit, watch, formState: { errors } } = useForm({ defaultValues: form, mode: "onSubmit" });

    const saveData = (data) => {
        console.log(data);
        // setForm({ ...form, ...data });
        // nextFormStep();
    };

    return (
        <Form onSubmit={handleSubmit(saveData)}>
            <fieldset>
                <legend>
                    <h3 className="text-2xl font-bold">🏁 We are almost done!</h3>
                </legend>
                <Field label="LinkedIn URL" error={errors?.linkedin}>
                    <Input
                        {...register("linkedin")}
                        id="linkedin"
                        placeholder="https://www.linkedin.com/in/chansamuel"
                    />
                </Field>
                <Field label="Website" hint='This might also appear on your Developer Profile.'>
                    <Input
                        {...register("website")}
                        type="url"
                        id="website"
                        placeholder="yourpersonalwebsite.com"
                        pattern="https://.*"
                    />
                </Field>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <Field label="WordPress blog domain"
                            // error={errors?.s_preferred_handle}
                            hint="Optional article blogroll if you write on WordPress. Use the root domain (no trailing slash)."
                        >
                            <Input
                                {...register("wp_blog_root_url")}
                                id="wp_blog_root_url"
                                placeholder="supertype.ai"
                            />
                        </Field>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <Field label="WordPress author ID"
                            // error={errors?.github_handle}
                            hint="This is your Author ID on WordPress. You can find it in your WordPress profile or in the URL of your author page."
                        >
                            <Input
                                {...register("wp_blog_author_id", { required: "Your GitHub username is a required field" })}
                                id="wp_blog_author_id"
                                placeholder="14"
                            />
                        </Field>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary text-white">Complete Nomination</button>
            </fieldset>

        </Form>
    )
}

// const PersonalDetailsNonSSR = dynamic(() => Promise.resolve(PersonalDetails), {
//     ssr: false,
// })


export default PersonalDetails
