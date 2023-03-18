import { useContext, useState } from "react"
import { useRouter } from "next/router";
import { useForm } from "react-hook-form"
import { supabase } from "@/lib/supabaseClient";

import { NominateContext } from "@/contexts/NominateContext"
import { Field, Form, Input } from "@/blocks/Form"



const RegistrationCompleted = () => {

    const [isSubmitting, setIsSubmitting] = useState(false)

    const context = useContext(NominateContext);
    const [form] = context.f
    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: form, mode: "onSubmit" });

    const postToSupabase = async (data) => {
        setIsSubmitting(true)

        const { data: { user } } = await supabase.auth.getUser();

        const { error } = await supabase
            .from('profile')
            .insert([
                {
                    ...data,
                    created_at: new Date(),
                    auth_uuid: user.id
                }
            ])

        if (error?.code === "23505") {
            alert("Your email already exists, please use another email.");
            setIsSubmitting(false);
        } else if (error) {
            alert("Sorry, something went wrong. Please try again.");
            setIsSubmitting(false);
            console.log(error)
        } else {
            // if successful, alert() for 2 seconds and redirect to home page
            alert("Thank you for completing the nomination process. We will be in touch.")
            setTimeout(() => {
                router.push("/")
            }, 2000);
        }
    }

    const saveData = (data) => {
        const payload = { ...form, ...data };
        console.log(payload);
        // setForm({ ...form, ...data });

        postToSupabase(payload);
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
                <Field label="Website" hint='This might also appear on your profile.'>
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
                            hint="This is your Author ID on WordPress. You can find it in your WordPress profile or in the URL of your author page."
                        >
                            <Input
                                {...register("wp_blog_author_id", { valueAsNumber: true })}
                                id="wp_blog_author_id"
                                placeholder="14"
                            />
                        </Field>
                    </div>
                </div>
                {
                    isSubmitting ?
                        <button type="submit" className="btn btn-primary text-white" disabled>Submitting...</button>
                        :
                        <button type="submit" className="btn btn-primary text-white">Complete Registration</button>
                }
            </fieldset>

        </Form>
    )
}

// const RegistrationCompletedNonSSR = dynamic(() => Promise.resolve(RegistrationCompleted), {
//     ssr: false,
// })


export default RegistrationCompleted
