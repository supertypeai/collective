import { useId, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Link from 'next/link';
import Image from "next/image";
import { useForm, Controller } from "react-hook-form"
import { supabase } from "@/lib/supabaseClient";
import CreatableSelect from 'react-select/creatable';

import { Field, Form, Input } from "@/blocks/Form"
import Tooltip from "@/icons/Tooltip";
import profileTagsChoices from "@/data/profileTagsChoices.json"
import { AppContext } from "@/contexts/AppContext";

const placeholder = {
    1: {
        organization: "Supertype",
        position: "Consultant, Data Science"
    },
    2: {
        organization: "Algoritma Data Science",
        position: "Data Science Instructor"
    },
    3: {
        organization: "Supertype Fellowship",
        position: "Technical Mentor and Quiz Master"
    }
}

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

const RegistrationBtn = ({ isLoggedIn, isSubmitting }) => {


    if (isLoggedIn.linkedinUser) {
        return (
            <div className="my-6">
                {
                    isSubmitting ?
                        <button type="submit" className="btn btn-primary text-white" disabled>Submitting...</button>
                        :
                        <button type="submit" className="btn btn-primary text-white">Complete Registration</button>
                }
            </div>
        )
    } else {
        return (
            <div className="my-6">
                <button type="button" className="btn btn-primary text-white" onClick={signInWithLinkedIn}>
                    Sign in with LinkedIn to register
                </button>
            </div>
        )
    }
}

const ExecutiveForm = () => {

    const { isLoggedIn } = useContext(AppContext);
    const router = useRouter()

    const [hasProfileInDB, setHasProfileInDB] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [haveWebsiteBlog, setHaveWebsiteBlog] = useState(false)
    const [addThirdAff, setAddThirdAff] = useState(false)
    const [tagOptions, setTagOptions] = useState([])

    const { register, control, handleSubmit, watch, formState: { errors }, reset } = useForm({
        mode: "onSubmit"
    });

    const postToSupabase = async (data) => {
        setIsSubmitting(true)

        const { website_or_blog, ...d } = data;

        const { data: { user } } = await supabase.auth.getUser();

        const { error } = await supabase
            .from('profile')
            .insert([
                {
                    ...d,
                    isExecutive: true,
                    created_at: new Date(),
                    auth_uuid: user.id,
                    superinference: { 
                        profile: {
                            avatar_url: isLoggedIn.linkedinUser.identities[0].identity_data.avatar_url
                        }
                    }
                }
            ])

        if (error?.message === `duplicate key value violates unique constraint "profile_s_preferred_handle_key"`) {
            alert("Your preferred collective handle already exists, please use another one.");
            setIsSubmitting(false);
        } else if (error?.message === `duplicate key value violates unique constraint "Profile_email_key"`) {
            alert("Your email already exists, please use another email.");
            setIsSubmitting(false);
        } else if (error) {
            alert("Sorry, something went wrong. Please try again.");
            setIsSubmitting(false);
            console.log(error)
        } else {
            // send notification to slack
            fetch("/api/slackNotification", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: `A user just created an Executive profile! Email: ${data.email}`
                })
            })
                .then((res) => {
                  return res.json()
                })

            // if successful, alert() for 2 seconds and redirect to home page
            alert("Thank you for completing the nomination process. We will be in touch.")
            setTimeout(() => {
                router.push("/")
            }, 2000);
        }
    }

    const saveData = (data) => {
        console.log(data, "save data")
        setIsSubmitting(true)
        postToSupabase(data);
    };

    useEffect(() => {
        if (isLoggedIn.user && isLoggedIn.user.id) {
            setHasProfileInDB(true);
        } else if (isLoggedIn.linkedinUser) {
            reset({
                "fullname": isLoggedIn.linkedinUser.user_metadata.full_name,
                "email": isLoggedIn.linkedinUser.user_metadata.email,
            })
        }

    }, [isLoggedIn, reset])

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
            </>
        )
    }

    const QualificationTagger = ({ id }) => {
        return <Controller
            name={`affiliations.org${id}.tags`}
            control={control}
            defaultValue={[]}
            render={({ field: { onChange, value, ref } }) => (
                <StableSelect
                    inputRef={ref}
                    isMulti
                    options={tagOptions}
                    classNamePrefix="select"
                    className="text-black max-w-3xl"
                    value={tagOptions.filter(option => value.includes(option.value))}
                    onChange={(val) => onChange(val.map(c => c.value))}
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
                        // change z-index of the option menu
                        menu: (styles, { data }) => {
                            return {
                                ...styles,
                                zIndex: 10
                            }
                        },
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
    }

    const CurrentlyWorkHere = ({ id }) => {
        return (
            <>
                <input
                    htmlFor={`affiliations.org${id}.currentWorkHere`}
                    className="checkbox checkbox-secondary border-2 focus:outline-none transition duration-200 align-top mr-2"
                    type="checkbox"
                    value={true}
                    id={`affiliations.org${id}.currentWorkHere`}
                    name={`affiliations.org${id}.currentWorkHere`}
                    {...register(`affiliations.org${id}.currentWorkHere`)}
                // checked
                />
                <span className="label-text">Currently work here</span>
            </>
        )
    }

    const AffiliateDescription = ({ id }) => {
        return (
            <textarea
                id={`affiliations.org${id}.description`} name={`affiliations.org${id}.description`}
                rows="5" required minLength="40" maxLength="250"
                placeholder="Being a Technical Mentor at Supertype Fellowship, I am tasked to look after the technical coaching of fellows in the program as they attempt to make their first open source contributions. I provide timely feedback, review pull requests, and help 13 fellows on the API engineering elective complete their elective challenge."
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                {...register(`affiliations.org${id}.description`,
                    {
                        required: (id === "3" && addThirdAff && !watch(`affiliations.org${id}.title`)) ||
                            id !== "3" ? "Describe what you do in the organization and " : false
                    }


                )}
            />
        )
    }

    const OrganizationNameInput = ({ id, is_required = true }) => {
        return (
            <Input
                id={`affiliations.org${id}.title`}
                placeholder={placeholder[id].organization}
                {...register(`affiliations.org${id}.title`, { required: is_required ? "Please specify your organization" : false })}
            />
        )
    }

    const PositionInput = ({ id, is_required = true }) => {
        return (
            <Input
                id={`affiliations.org${id}.position`}
                type="text"
                placeholder={placeholder[1].position}
                {...register(`affiliations.org${id}.position`, { required: is_required ? "Please specify your role in this organization" : false })}
            />
        )
    }

    const StartDate = ({ id }) => {
        return (
            <Input
                id={`affiliations.org${id}.start`}
                type="date"
                max={new Date().toISOString().split("T")[0]}
                className="mt-2 p-2 block w-full rounded text-sm border-gray-600 text-white bg-black bg-opacity-25"
                {...register(`affiliations.org${id}.start`, {
                    required: (id === "3" && addThirdAff) || id !== "3"
                        ? "Please specify a start date" : false
                })}
            />
        )
    }

    const EndDate = ({ id }) => {
        return (
            <Input
                id={`affiliations.org${id}.end`}
                // conditionally disable if currentWorkHere is checked
                disabled={watch(`affiliations.org${id}.currentWorkHere`) === "true"}
                className="mt-2 p-2 block w-full rounded text-sm border-gray-600 text-white bg-black bg-opacity-25"
                type="date"
                min={watch(`affiliations.org${id}.start`)}
                max={new Date().toISOString().split("T")[0]}
                {...register(`affiliations.org${id}.end`, {
                    // required if currentWorkHere is not checked
                    required: (id === "3" && addThirdAff && !watch(`affiliations.org${id}.currentWorkHere`)) ||
                        (id !== "3" && !watch(`affiliations.org${id}.currentWorkHere`))
                        ? "Please specify an end date or check Currently Work Here" : false
                })
                }
            />
        )
    }


    const renderFirstAffiliation = () => {
        return (
            <div className="mb-4 mt-0">
                <div className="divider">{`First Affiliation (Required)`}</div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <Field label="Organization / Company" error={errors?.affiliations?.org1?.title}>
                            <OrganizationNameInput id="1" />
                        </Field>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <Field label="Position" error={errors?.affiliations?.org1?.position}>
                            <PositionInput id="1" />
                        </Field>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <Field label="Start Date" error={errors?.affiliations?.org1?.start} hint="Used to create the timeline on your Developer Profile">
                            <StartDate id="1" />
                        </Field>
                        <Field label="End Date" error={errors?.affiliations?.org1?.end} hint="Ignored if 'Currently work here' is checked">
                            <EndDate id="1" />
                        </Field>
                        <div className="flex mt-2">
                            <CurrentlyWorkHere id="1" />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <Field label="🖊️ Description" error={errors?.affiliations?.org1?.description}>
                            <AffiliateDescription id="1" />
                        </Field>
                        <Field label="📚 Tag Relevant Qualifications" error={errors?.affiliations?.org1?.tags} hint="Tag the relevant qualifications for this position">
                            <QualificationTagger id="1" />
                        </Field>
                    </div>
                </div>
            </div>
        )
    }

    const renderSecondAffiliation = () => {
        return (
            <div className="my-4">
                <div className="divider">{`Second Affiliation (Required)`}</div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <Field label="Organization / Company" error={errors?.affiliations?.org2?.title}>
                            <OrganizationNameInput id="2" />
                        </Field>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <Field label="Position" error={errors?.affiliations?.org2?.position}>
                            <PositionInput id="2" />
                        </Field>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <Field label="Start Date" error={errors?.affiliations?.org2?.start} hint="Used to create the timeline on your Developer Profile">
                            <StartDate id="2" />
                        </Field>
                        <Field label="End Date" error={errors?.affiliations?.org2?.end} hint="Ignored if 'Currently work here' is checked">
                            <EndDate id="2" />
                        </Field>
                        <div className="flex mt-2">
                            <CurrentlyWorkHere id="2" />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <Field label="🖊️ Description" error={errors?.affiliations?.org2?.description}>
                            <AffiliateDescription id="2" />
                        </Field>
                        <Field label="📚 Tag Relevant Qualifications" error={errors?.affiliations?.org2?.tags} hint="Tag the relevant qualifications for this position">
                            <QualificationTagger id="2" />
                        </Field>
                    </div>
                </div>
            </div>
        )
    }

    const renderThirdAffiliation = () => {
        return (
            <div className="my-4">
                <div className="divider">{`Third Affiliation (Optional)`}</div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <Field label="Organization / Company" error={errors?.affiliations?.org3?.title}>
                            <OrganizationNameInput id="3" is_required={addThirdAff} />
                        </Field>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <Field label="Position" error={errors?.affiliations?.org3?.position}>
                            <PositionInput id="3" is_required={addThirdAff} />
                        </Field>
                    </div>
                </div>
                <div className="flex flex-wrap min-h-[480px]">
                    <div className="w-full md:w-1/2 px-3 md:mb-0">
                        <Field label="Start Date" error={errors?.affiliations?.org3?.start} hint="Used to create the timeline on your Developer Profile">
                            <StartDate id="3" />
                        </Field>
                        <Field label="End Date" error={errors?.affiliations?.org3?.end} hint="Ignored if 'Currently work here' is checked">
                            <EndDate id="3" />
                        </Field>
                        <div className="flex mt-2">
                            <CurrentlyWorkHere id="3" />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <Field label="🖊️ Description" error={errors?.affiliations?.org3?.description}>
                            <AffiliateDescription id="3" />
                        </Field>
                        <Field label="📚 Tag Relevant Qualifications" error={errors?.affiliations?.org3?.tags} hint="Tag the relevant qualifications for this position">
                            <QualificationTagger id="3" />
                        </Field>
                    </div>
                </div>
            </div>
        )
    }

    if (hasProfileInDB) return (
        <div className="min-h-screen mt-2">
            You already have a profile in the database
            <br />
            {/* back to home button */}
            <Link href="/" className="btn btn-secondary mt-4 px-3 py-2 my-auto rounded-md text-sm border-2">
                &lt; Back to Home
            </Link>
        </div>
    )

    return (
        <Form onSubmit={handleSubmit(saveData)} className="mt-4 max-w-7xl xl:px-8">
            <fieldset>
                <h3 className="text-2xl font-bold">👔 Executive&apos;s Profile</h3>
                <p className="text-sm">The following details will be used to create your Executive&apos;s Profile.</p>
            </fieldset>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <Field label="Preferred Collective Handle"
                        error={errors?.s_preferred_handle}
                        hint="This will be in the link to your Executive Profile"
                    >
                        <Input
                            {...register("s_preferred_handle", { required: "Please provide a handle to be used in the link to your Executive Profile" })}
                            id="s_preferred_handle"
                            placeholder={
                                isLoggedIn.linkedinUser ?
                                    isLoggedIn.linkedinUser.user_metadata.full_name.substring(0, isLoggedIn.linkedinUser.user_metadata.full_name.indexOf(' ')) : ''
                            }
                        />
                    </Field>
                </div>
                <div className="w-full md:w-1/2 px-3">
                    <Field label="LinkedIn Profile"
                        error={errors?.linkedin_handle}>
                        <div>
                            {!isLoggedIn.linkedinUser ? (
                                <div>
                                    <button onClick={() => signInWithLinkedIn()}
                                        className="text-white group hover:text-rose-200 px-3 py-2 my-auto rounded-md text-sm hover:bg-secondary border-2">
                                        <Image src="/techicons/linkedin_inv.png" alt="LinkedIn Logo" width={20} height={20} className="inline mr-2" />
                                        Authorize with LinkedIn
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
            </div>
            <Field label="Full name" error={errors?.fullname}>
                <Input
                    {...register("fullname", { required: "Full name is a required field" })}
                    id="fullname"
                    placeholder={
                        isLoggedIn.linkedinUser ?
                            isLoggedIn.linkedinUser.user_metadata.full_name : 'Michael Gary Scott'
                    }
                />
            </Field>

            <Field label="Email" error={errors?.email} hint='We will send an acknowledgment of your nomination to this email.'>
                <Input
                    {...register("email", { required: "Email is required" })}
                    type="email"
                    id="email"
                    placeholder={
                        isLoggedIn.linkedinUser ?
                            isLoggedIn.linkedinUser.user_metadata.email : 'michael@dundermifflin.com'
                    }
                />
            </Field>

            <Field label="LinkedIn URL" error={errors?.linkedin}>
                <Input
                    {...register("linkedin")}
                    id="linkedin"
                    placeholder={
                        isLoggedIn.linkedinUser ?
                            `https://www.linkedin.com/in/${isLoggedIn.linkedinUser.user_metadata.full_name.toLowerCase().split(" ").join("-")}` :
                            'https://www.linkedin.com/in/chansamuel'
                    }
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

            <Field label="💼 Affiliation &#38; Work" error={errors?.tags}>
                <>
                    <p className="text-gray-400 mt-1 text-xs italic text-muted">A list of past and present affiliations to be featured on your Developer Profile</p>
                    {renderFirstAffiliation()}
                    {renderSecondAffiliation()}

                    <div className="collapse">
                        <input type="checkbox"
                            {...register("affiliations.org3.optionally_selected")}
                            className="collapse-checkbox"
                            onChange={(e) => {
                                setAddThirdAff(prev => !prev)
                            }}
                        />
                        <div className="collapse-title font-medium underline">
                            {
                                addThirdAff ? "Remove third Affiliation" : "Optionally Add a Third Affiliation"
                            }

                        </div>
                        <div className="collapse-content">
                            {renderThirdAffiliation()}
                        </div>
                    </div>
                </>
            </Field>

            <div className="collapse">
                <input type="checkbox"
                    {...register("website_or_blog")}
                    className="collapse-checkbox"
                    onChange={(e) => {
                        setHaveWebsiteBlog(prev => !prev);
                    }} />
                <div className="collapse-title font-medium underline">
                    {
                        haveWebsiteBlog ? "Remove the website / blog section" : "(Optional) I have a website or blog"
                    }

                </div>
                <div className="collapse-content">
                    {renderWebsiteOrBlog()}
                </div>
            </div>

            <RegistrationBtn isLoggedIn={isLoggedIn} isSubmitting={isSubmitting} />

            {/* helper modal for wordpress blog */}
            <input type="checkbox" id="wp-helper" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle lg:fixed lg:top-[1280px]">
                <div className="modal-box md:w-4/5 md:max-w-5xl text-gray-500">
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

export default ExecutiveForm