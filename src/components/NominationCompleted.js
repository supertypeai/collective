import { useContext, useState } from "react"
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form"
import { supabase } from "@/lib/supabaseClient";

import { NominateContext } from "@/contexts/NominateContext"
import { Field, Form, Input } from "@/blocks/Form"
import Tooltip from "@/icons/Tooltip";



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

        if (error?.message === `duplicate key value violates unique constraint "profile_s_preferred_handle_key"`) {
            alert("Your preferred collective handle already exists, please use another one.");
            setIsSubmitting(false);
        } else if (error?.message === `"duplicate key value violates unique constraint "Profile_email_key"`) {
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
        <Form onSubmit={handleSubmit(saveData)} className="min-h-6xl">
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
                <Field label="Website (Optional)" hint='This might also appear on your profile.'>
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

                        <Field label="WordPress Site ID (Optional)"
                            hint={<>
                                <label htmlFor="wp-helper" className="link link-info hover:text-gray-400"><Tooltip />Optional article blogroll if you write on WordPress</label>. Use the root domain for self-hosted WordPress sites.</>
                            }
                        >
                            <Input
                                {...register("wp_blog_root_url")}
                                id="wp_blog_root_url"
                                placeholder="self-hosted-site.com OR 2384101920 (WordPress.com Site ID)"
                            />
                        </Field>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <Field label="WordPress Author ID (Optional)"
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
            {/* helper modal for wordpress blog */}
            <input type="checkbox" id="wp-helper" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-4/5 max-w-4xl text-gray-500">
                    <h3 className="font-bold text-xl">Instructions for WordPress-powered Sites</h3>
                    <div className="flex flex-wrap my-4">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <h4 className="font-bold">Hosted by WordPress.com</h4>
                            <p className="text-sm">Find your Author ID (typically the same as your WordPress user id) and Site ID in your WordPress profile. Verify that you can access the REST API
                                <br /><code className="block text-xs bg-gray-100">{`https://public-api.wordpress.com/rest/v1.1/sites/{siteID}/posts?author={authorID}`}</code> to know that your Site ID and
                                Author IDs are correct.
                            </p>
                            <Image src="/forms/wptutorial1.png" alt="WordPress.com hosted site" width={250} height={250} className="mx-auto mt-1" />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <h4 className="font-bold">Self-hosted WordPress site</h4>
                            <p className="text-sm">Use the root domain (no trailing slash) as your Site ID instead. Your Author ID is
                                found on your WordPress profile or from your site admin. Verify that you can access the REST API on
                                <br /><code className="block text-xs bg-gray-100">{`https://{rootDomain}/wp-json/wp/v2/posts?author={authorID}`}</code> to know that your Site ID and
                                Author IDs are correct before proceeding.
                            </p>
                            <Image src="/forms/wptutorial2.png" alt="WordPress.com hosted site" width={250} height={250} className="mx-auto mt-1" />
                        </div>
                    </div>
                    <p className="text-sm">You should leave the Site ID and Author ID field blank if you are not able to get the right JSON data from the REST API above after substituting your Site ID (or root domain) and Author ID.</p>
                    <div className="modal-action">
                        <label htmlFor="wp-helper" className="btn">Got it</label>
                    </div>
                </div>
            </div>
        </Form>
    )
}

// const RegistrationCompletedNonSSR = dynamic(() => Promise.resolve(RegistrationCompleted), {
//     ssr: false,
// })


export default RegistrationCompleted
