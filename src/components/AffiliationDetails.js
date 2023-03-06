import { useContext, useId } from "react"
import { useForm, Controller } from "react-hook-form"
import Select from "react-select";

import { NominateContext } from "@/contexts/NominateContext"
import { Field, Form, Input } from "@/blocks/Form"

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

const AffiliationDetails = ({ nextFormStep }) => {

    const context = useContext(NominateContext);
    const [form, setForm] = context.f

    // const [stackExamples, setStackExamples] = useLocalStorage("stackExamples", {});
    const { register, control, handleSubmit, watch, formState: { errors } } = useForm({ defaultValues: form, mode: "onSubmit" });

    const saveData = (data) => {
        console.log(data);
        // console.log({ ...form, ...data });
        // check that at least 2 are completed, else alert()

        // setForm({ ...form, ...data });
        // nextFormStep();
    };
    const tagOptions = form.tags.map((obj) => ({ value: obj, label: obj }))

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
                    htmlFor={`currentWorkHere${id}`}
                    className="checkbox checkbox-primary border-2 focus:outline-none transition duration-200 align-top mr-2"
                    type="checkbox"
                    value={`currentWorkHere${id}`}
                    id={`currentWorkHere${id}`}
                    name={`currentWorkHere${id}`}
                    {...register(`affiliations.org${id}.currentWorkHere`)}
                // checked
                />
                <span className="label-text">Current work here</span>
            </>
        )
    }

    const AffiliateDescription = ({ id }) => {
        return (
            <textarea {...register(`affiliations.org${id}.description`)}
                id={`affiliations.org${id}.description`} name={`affiliations.org${id}.description`}
                rows="5" required minLength="40" maxLength="250"
                placeholder="Being a Technical Mentor at Supertype Fellowship, I am tasked to look after the technical coaching of fellows in the program as they attempt to make their first open source contributions. I provide timely feedback, review pull requests, and help 13 fellows on the API engineering elective complete their elective challenge."
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
        )
    }

    const OrganizationNameInput = ({ id }) => {
        return (
            <Input
                id={`affiliations.org${id}.title`}
                placeholder={placeholder[id].organization}
                {...register(`affiliations.org${id}.title`, { required: "Please specify the name of the organization" })}
            />
        )
    }

    const PositionInput = ({ id }) => {
        return (
            <Input
                id={`affiliations.org${id}.position`}
                type="text"
                placeholder={placeholder[1].position}
                {...register(`affiliations.org${id}.position`, { required: "Please specify your role in this organization" })}
            />
        )
    }

    const StartDate = ({ id }) => {
        return (
            <Input
                id={`affiliations.org${id}.start`}
                type="date"
                {...register(`affiliations.org${id}.start`, { required: "Please specify a start date" })}
            />
        )
    }

    const EndDate = ({ id }) => {
        return (
            <Input
                id={`affiliations.org${id}.end`}
                // conditionally disable if currentWorkHere is checked
                disabled={watch(`affiliations.org${id}.currentWorkHere`)}
                type="date"
                {...register(`affiliations.org${id}.end`)}
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
                        <Field label="🖊️ Description" >
                            <AffiliateDescription id="1" />
                        </Field>
                        <Field label="📚 Tag Relevant Qualifications" error={errors?.tags} hint="Tag the relevant qualifications for this position">
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
                        <Field label="🖊️ Description" >
                            <AffiliateDescription id="2" />
                        </Field>
                        <Field label="📚 Tag Relevant Qualifications" error={errors?.tags} hint="Tag the relevant qualifications for this position">
                            <QualificationTagger id="2" />
                        </Field>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-6xl grid grid-cols-5">
            <div className="w-full col-span-12 lg:col-span-12">
                <Form onSubmit={handleSubmit(saveData)}>
                    <fieldset>
                        <legend>
                            <h3 className="text-2xl font-bold">💼 Affiliations &#38; Work</h3>
                            <p className="text-sm">A list of past and present affiliations to be featured on your Developer Profile</p>
                        </legend>
                        {renderFirstAffiliation()}
                        {renderSecondAffiliation()}
                        <button type="submit" className="btn btn-primary text-white">Next {">"}</button>
                    </fieldset>
                </Form>
            </div>
        </div>
    )
}

export default AffiliationDetails