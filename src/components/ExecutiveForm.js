import { useId, useState, useContext } from "react";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form"
import { supabase } from "@/lib/supabaseClient";
import CreatableSelect from 'react-select/creatable';

import { Field, Form, Input } from "@/blocks/Form"
import profileTagsChoices from "@/data/profileTagsChoices.json"
import { AppContext } from "@/contexts/AppContext";

function StableSelect({ ...props }) {
    return <CreatableSelect {...props} instanceId={useId()} />;
}

export async function signInWithLinkedIn() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'linkedin',
        options: {
            // redirect to their last page
            redirectTo: window.location.href
        }
    });
    if (error) {
        console.log(error);
    }
}

const ExecutiveForm = () => {

    const { isLoggedIn } = useContext(AppContext);

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [haveWebsiteBlog, setHaveWebsiteBlog] = useState(false)

    const { register, control, handleSubmit, formState: { errors }, reset } = useForm({
        mode: "onSubmit"
    });

    const saveData = (data) => {
        console.log(data)
        setIsSubmitting(true)
        // postToSupabase(data);
    };

    const renderWebsiteOrBlog = () => {
        return (
            <>
                <Field label="🌐 Website" hint='This might also appear on your profile.'>
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
            </>
        )
    }

    return (
        <Form onSubmit={handleSubmit(saveData)} className="mt-4 max-w-7xl xl:px-8">
            <fieldset>
                <h3 className="text-2xl font-bold">👔 Executive&apos;s Profile</h3>
                <p className="text-sm">The following details will be used to create your Executive&apos;s Profile.</p>
            </fieldset>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3">
                    <Field label="LinkedIn Profile"
                        error={errors?.linkedin_handle}>
                        <div>
                            {!isLoggedIn ? (
                                <div>
                                    <button onClick={() => signInWithLinkedIn()}
                                        className="text-white group hover:text-rose-200 px-3 py-2 my-auto rounded-md text-sm hover:bg-secondary border-2">
                                        Sign In with LinkedIn
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-4">
                                    <Image className="w-10 h-10 rounded-full" src={isLoggedIn.linkedinUser.user_metadata.avatar_url} width={100} height={100} alt={isLoggedIn.linkedinUser.user_metadata.full_name} />
                                    {/* <img className="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-5.jpg" alt=""/> */}
                                    <div className="font-medium dark:text-white">
                                        <div>{isLoggedIn.linkedinUser.user_metadata.full_name}</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">Authenticated on {new Date(isLoggedIn.linkedinUser.confirmed_at).toDateString()}</div>
                                    </div>
                                </div>
                            )}

                        </div>

                    </Field>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <Field label="Preferred Collective Handle"
                        error={errors?.s_preferred_handle}
                        hint="This will be in the link to your Executive Profile, if available"
                    >
                        <Input
                            {...register("s_preferred_handle")}
                            id="s_preferred_handle"
                            placeholder={
                                isLoggedIn ?
                                    isLoggedIn.linkedinUser.user_metadata.full_name.substring(0, isLoggedIn.linkedinUser.user_metadata.full_name.indexOf(' ')) : ''
                            }
                        />
                    </Field>
                </div>
            </div>
            <Field label="Full name" error={errors?.fullname}>
                <Input
                    {...register("fullname", { required: "Full name is a required field" })}
                    id="fullname"
                    placeholder="Michael Gary Scott"
                />
            </Field>

            <Field label="Email" error={errors?.email} hint='We will send an acknowledgment of your nomination to this email.'>
                <Input
                    {...register("email", { required: "Email is required" })}
                    type="email"
                    id="email"
                    placeholder="michael@dundermifflin.com"
                />
            </Field>

            <Field label="🖊️ Introduction" error={errors?.long}>
                <textarea {...register("long")} id="long" name="long"
                    rows="4" required minLength="40" maxLength="250"
                    placeholder="I am en engineering leader at Dunder Mifflin with 8 years of expereince in cloud-related technologies. I am passionate about helping companies build great products and services for their customers."
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
            </Field>

            <Field label="✨ Headline" error={errors?.short}
                hint="A short headline that appears below your name."
            >
                <Input
                    {...register("short", { required: "Please provide a short Headline" })}
                    id="short"
                    placeholder="Director of Engineering @SupertypeAI"
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

            <div className="collapse">
                <input type="checkbox"
                    {...register("website_or_blog")}
                    className="collapse-checkbox"
                    onChange={(e) => {
                        setHaveWebsiteBlog(prev => !prev);
                    }}
                />
                <div className="collapse-title font-medium underline">
                    {
                        haveWebsiteBlog ? "Remove the website / blog section" : "(Optional) I have a website or blog"
                    }

                </div>
                <div className="collapse-content">
                    {renderWebsiteOrBlog()}
                </div>
            </div>


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

export default ExecutiveForm