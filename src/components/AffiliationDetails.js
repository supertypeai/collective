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

    return (
        <div className="max-w-6xl grid grid-cols-5">
            <div className="w-full col-span-12 lg:col-span-12">
                <Form onSubmit={handleSubmit(saveData)}>
                    <fieldset>
                        <legend>
                            <h3 className="text-2xl font-bold">💼 Affiliations &#38; Work</h3>
                            <p className="text-sm">A list of past and present affiliations to be featured on your Developer Profile</p>
                        </legend>

                        <div className="my-4">
                            <div className="divider">{`First Affiliation (Required)`}</div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <Field label="Organization / Company" error={errors?.org1}>
                                        <Input
                                            id="org1"
                                            placeholder={placeholder[1].organization}
                                            {...register(`affiliations.org1.title`, { required: "Please specify the name of the organization" })}
                                        />
                                    </Field>
                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                    <Field label="Position" error={errors?.pos1}>
                                        <Input
                                            id="pos1"
                                            type="text"
                                            placeholder={placeholder[1].position}
                                            {...register(`affiliations.org1.position`, { required: "Please specify your role in this organization" })}
                                        />
                                    </Field>
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <Field label="Start Date" error={errors?.start1} hint="Used to create the timeline on your Developer Profile">
                                        <Input
                                            id="start1"
                                            type="date"
                                            {...register(`affiliations.org1.start`, { required: "Please specify a start date" })}
                                        />
                                    </Field>
                                    <Field label="End Date" error={errors?.end1} hint="Ignored if 'Currently work here' is checked">
                                        <Input
                                            id="errors?.end1"
                                            // conditionally disable if currentWorkHere is checked
                                            disabled={watch("currentWorkHere1")}
                                            type="date"
                                            {...register(`affiliations.org1.end`)}
                                        />
                                    </Field>
                                    <div className="flex mt-2">
                                        <input
                                            htmlFor={`currentWorkHere1`}
                                            className="checkbox checkbox-primary focus:outline-none transition duration-200 align-top mr-2"
                                            type="checkbox"
                                            value="currentWorkHere1"
                                            id="currentWorkHere1"
                                            name="currentWorkHere1"
                                            {...register(`affiliations.org1.currentWorkHere`)}
                                        // checked
                                        />
                                        <span className="label-text">Currently work here</span>

                                    </div>
                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                    <Field label="🖊️ Description" >
                                        <textarea {...register(`affiliations.org1.description`)} id="description1" name="description1"
                                            rows="5" required minLength="40" maxLength="250"
                                            placeholder="Being a Technical Mentor at Supertype Fellowship, I am tasked to look after the technical coaching of fellows in the program as they attempt to make their first open source contributions. I provide timely feedback, review pull requests, and help 13 fellows on the API engineering elective complete their elective challenge."
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        />
                                    </Field>

                                    <Field label="📚 Tag Qualifications" error={errors?.tags} hint="Tag the relevant qualifications for this position">
                                        <Controller
                                            name="affiliations.org1.tags"
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
                                    </Field>


                                </div>

                            </div>

                        </div>


                        <button type="submit" className="btn btn-primary text-white">Next {">"}</button>
                    </fieldset>
                </Form>
            </div>
        </div>
    )
}

export default AffiliationDetails