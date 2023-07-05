import { useId, useState, useContext } from "react";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form"
import { supabase } from "@/lib/supabaseClient";
import CreatableSelect from 'react-select/creatable';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import { EditContext } from "@/contexts/EditContext";
import { Field, Form, Input } from "@/blocks/Form"
import Tooltip from "@/icons/Tooltip";
import Edit from "@/icons/Edit";
import profileTagsChoices from "@/data/profileTagsChoices.json"


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

const EditExecutive = () => {

    const context = useContext(EditContext);
    const [form, setForm] = context.f;
    const [isEditting, setIsEditting] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [haveWebsiteBlog, setHaveWebsiteBlog] = useState(!!form.website)
    const [addThirdAff, setAddThirdAff] = useState(form.affiliations.org3.optionally_selected)

    const { register, control, handleSubmit, watch, formState: { errors }, reset } = useForm({
        defaultValues: {
            ...form
        },
        mode: "onSubmit"
    });

    const queryClient = useQueryClient();
    const { mutate: updateForm } = useMutation(
        async (formData) => {
            const { wp, projects, ...d } = formData;
            const { error } = await supabase.from('profile').update(d).eq('id', formData.id);
            if (error?.message === `duplicate key value violates unique constraint "profile_s_preferred_handle_key"`) {
                alert("Your new preferred collective handle already exists, please use another one.");
            } else if (error?.message === `duplicate key value violates unique constraint "Profile_email_key"`) {
                alert("Your new email already exists, please use another email.");
            } else if (error) {
                alert("Sorry, something went wrong. Please try again.");
                console.log(error);
            } else {
                setForm(formData);
                setIsEditting(false);
            }
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('profileData');
            }
        }
    );

    const saveData = (data) => {
        setIsSubmitting(true);
        if (!data.affiliations.org3.optionally_selected) {
            data.affiliations.org3 = {
                "end": "",
                "tags": "",
                "start": "",
                "title": "",
                "position": "",
                "description": "",
                "currentWorkHere": false,
                "optionally_selected": false
            }
        }
        if (!haveWebsiteBlog) {
            data = {
                ...data,
                website: null,
                wp_blog_author_id: null,
                wp_blog_root_url: null
            }
        }
        const newData = { ...form, ...data };
        if (JSON.stringify(newData) !== JSON.stringify(form)) {
            updateForm(newData);
        } else {
            setIsEditting(false);
        }
        setIsSubmitting(false);
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
                        disabled={!isEditting}
                    />
                </Field>

                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <Field label="Medium Link or WordPress Site ID (Optional)"
                            hint={<>
                                <label htmlFor="wp-helper" className="link link-info hover:text-gray-400"><Tooltip />Optional article blogroll if you write on WordPress</label> or Medium. Use the Medium link or root domain for self-hosted WordPress sites.</>
                            }
                        >
                            <Input
                                {...register("wp_blog_root_url")}
                                id="wp_blog_root_url"
                                placeholder="https://medium.com/@username OR self-hosted-site.com OR 2384101920 (WordPress.com Site ID)"
                                disabled={!isEditting}
                            />
                        </Field>
                    </div>
                    <div className="w-full px-3">
                        <Field label="WordPress Author ID (Optional)"
                            hint="This is your Author ID on WordPress. You can find it in your WordPress profile or in the URL of your author page."
                        >
                            <Input
                                {...register("wp_blog_author_id", { valueAsNumber: true })}
                                id="wp_blog_author_id"
                                placeholder="14"
                                disabled={!isEditting}
                            />
                        </Field>
                    </div>
                </div>
            </>
        )
    }

    const tagOptions = profileTagsChoices.filter(tag => form.tags.includes(tag.value));

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
                    isDisabled={!isEditting}
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
                    disabled={!isEditting}
                    {...register(`affiliations.org${id}.currentWorkHere`)}
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
                disabled={!isEditting}
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
                disabled={!isEditting}
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
                disabled={!isEditting}
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
                disabled={!isEditting}
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
                disabled={isEditting ? (false || watch(`affiliations.org${id}.currentWorkHere`) === "true") : true}
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
            <div className="my-4">
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

    return (
        <Form onSubmit={handleSubmit(saveData)} className="mt-4 max-w-7xl">
            <fieldset>
                <span className="text-2xl font-bold">
                    👔 Personal Details
                    <button
                        type="button"
                        onClick={() => setIsEditting(true)}
                        hidden={isEditting}
                    >
                        <Edit />
                    </button>
                </span>
            </fieldset>
            <Field label="Preferred Collective Handle"
                error={errors?.s_preferred_handle}
                hint="This will be in the link to your Executive Profile"
            >
                <Input
                    {...register("s_preferred_handle", { required: "Please provide a handle to be used in the link to your Executive Profile" })}
                    id="s_preferred_handle"
                    placeholder="pambeesly"
                    disabled={!isEditting}
                />
            </Field>
            <Field label="Full name" error={errors?.fullname}>
                <Input
                    {...register("fullname", { required: "Full name is a required field" })}
                    id="fullname"
                    placeholder="Pamela Morgan Beesly"
                    disabled={!isEditting}
                />
            </Field>
            <Field label="Email" error={errors?.email}>
                <Input
                    {...register("email", { required: "Email is required" })}
                    type="email"
                    id="email"
                    placeholder="pamela@dundermifflin.com"
                    disabled={!isEditting}
                />
            </Field>
            <Field label="LinkedIn URL" error={errors?.linkedin}>
                <Input
                    {...register("linkedin")}
                    id="linkedin"
                    placeholder="https://www.linkedin.com/in/chansamuel"
                    disabled={!isEditting}
                />
            </Field>


            <Field label="🖊️ Introduction" error={errors?.long}>
                <textarea {...register("long")} id="long" name="long"
                    rows="4" required minLength="40" maxLength="250"
                    placeholder="I am a data scientist with 3 years of experience in the industry and a Fellow at Supertype Fellowship. I am passionate about open source and have contributed to several projects under this program."
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    disabled={!isEditting}
                />
            </Field>

            <Field label="✨ Headline" error={errors?.short}
                hint="A short headline that appears below your name."
            >
                <Input
                    {...register("short", { required: "Please provide a short Headline" })}
                    id="short"
                    placeholder="Full Stack Data Scientist @SupertypeAI"
                    disabled={!isEditting}
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
                                val.length <= 10 && onChange(val.map(c => c.value));
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
                            isSearchable={true}
                            isCreatable={true}
                            isDisabled={!isEditting}
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
                            disabled={!isEditting}
                        />
                        <div className="collapse-title font-medium underline">
                            {
                                isEditting ? (addThirdAff ? "Remove third Affiliation" : "Optionally Add a Third Affiliation") : ""
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
                    className="collapse-checkbox"
                    checked={haveWebsiteBlog}
                    onChange={(e) => {
                        setHaveWebsiteBlog(prev => !prev);
                    }}
                    disabled={!isEditting} />
                <div className="collapse-title font-medium underline">
                    {
                        isEditting ? (haveWebsiteBlog ? "Remove the website / blog section" : "(Optional) I have a website or blog") : ""
                    }
                </div>
                <div className="collapse-content">
                    {renderWebsiteOrBlog()}
                </div>
            </div>

            <div className="my-4">
                {
                    isEditting ? (
                        <>
                            <button
                                type="button"
                                className="btn btn-secondary text-white mr-3"
                                onClick={() => {
                                    setIsEditting(false)
                                    reset(form)
                                    setAddThirdAff(form.affiliations.org3.optionally_selected)
                                    setHaveWebsiteBlog(!!form.website)
                                }}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-warning text-black">Save Changes</button>
                        </>
                    ) : isSubmitting ? (
                        <button type="submit" className="btn btn-warning text-black" disabled>Saving Changes...</button>
                    ) : (
                        <></>
                    )
                }
            </div>

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

export default EditExecutive