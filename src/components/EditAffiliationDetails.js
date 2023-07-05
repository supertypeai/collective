import { useContext, useId, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import Select from "react-select";
import { supabase } from "@/lib/supabaseClient";
import { useQueryClient, useMutation } from '@tanstack/react-query';

import { EditContext } from "@/contexts/EditContext";
import { Field, Form, Input } from "@/blocks/Form"
import Edit from "@/icons/Edit";
import profileTagsChoices from '@/data/profileTagsChoices.json';

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
    return <Select {...props} instanceId={useId()} />;
}

const EditAffiliationDetails = () => {

    const context = useContext(EditContext);
    const [form, setForm] = context.f
    const [addThirdAff, setAddThirdAff] = useState(form.affiliations.org3.optionally_selected)
    const [isEditting, setIsEditting] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { register, control, handleSubmit, watch, formState: { errors }, reset } = useForm({ defaultValues: form, mode: "onSubmit" });

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
        const newData = { ...form, ...data };
        if (JSON.stringify(newData) !== JSON.stringify(form)) {
            updateForm(newData);
        } else {
            setIsEditting(false);
        }
        setIsSubmitting(false);
    };

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
                <div className="flex flex-wrap mb-6">
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
                <div className="flex flex-wrap mb-6">
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
                <div className="flex flex-wrap mb-6">
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
                <div className="flex flex-wrap mb-6  min-h-[480px]">
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
                <div className="flex flex-wrap mb-6">
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
        <Form onSubmit={handleSubmit(saveData)}>
            <fieldset>
                <legend>
                    <span className="text-2xl font-bold">
                        Affiliations &#38; Work
                        <button
                            type="button"
                            onClick={() => setIsEditting(true)}
                            hidden={isEditting}
                        >
                            <Edit />
                        </button>
                    </span>
                </legend>
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
            </fieldset>
        </Form>
    )
}

export default EditAffiliationDetails