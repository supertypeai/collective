import { useContext, useId, useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { supabase } from "@/lib/supabaseClient";
import CreatableSelect from 'react-select/creatable';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import { Field, Form, Input } from "@/blocks/Form"
import profileTagsChoices from '@/data/profileTagsChoices.json';
import availabilityForWork from '@/data/availabilityForWork.json';
import countryCity from '@/data/countryCity.json';
import { EditContext } from "@/contexts/EditContext";
import { AppContext } from "@/contexts/AppContext";

function StableSelect({ ...props }) {
    return <CreatableSelect {...props} instanceId={useId()} />;
}

const EditPersonalDetails = ({ nextFormStep }) => {

    const context = useContext(EditContext);
    const [form, setForm] = context.f
    const [isEditting, setIsEditting] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    let initialLength = form.tags.length;

    const { register, control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            ...form
        }, mode: "onSubmit"
    });

    const queryClient = useQueryClient();
    const { mutate: updateForm } = useMutation(
        async (formData) => {
            const { data, error } = await supabase.from('profile').update(formData).eq('id', formData.id);
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
        const newData = { ...form, ...data };
        if (JSON.stringify(newData) !== JSON.stringify(form)) {
            updateForm(newData);
        } else {
            setIsEditting(false);
        }
        setIsSubmitting(false);
    };

    return (
        <Form onSubmit={handleSubmit(saveData)}>
            <fieldset>
                <legend>
                    <span className="text-2xl font-bold">
                        🧑‍💼 Personal Details
                        <button 
                            type="button" 
                            onClick={() => setIsEditting(true)}
                            hidden={isEditting}
                        >
                            <svg 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="1.5" 
                                viewBox="0 0 24 24" 
                                xmlns="http://www.w3.org/2000/svg" 
                                aria-hidden="true"
                                className="ml-2 mb-1 w-5 inline-block"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                />
                            </svg>
                        </button>
                    </span>
                </legend>  
                <Field label="Preferred Collective Handle"
                    error={errors?.s_preferred_handle}
                    hint="This will be in the link to your Maker's Profile"
                >
                    <Input
                        {...register("s_preferred_handle", { required: "Please provide a handle to be used in the link to your Maker's Profile" })}
                        id="s_preferred_handle"
                        placeholder="pambeesly"
                        disabled={!isEditting}
                        required
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
                                    if(initialLength > 10){
                                        val.length < initialLength && onChange(val.map(c => c.value));
                                        initialLength = val.length;
                                    } else {
                                        val.length <= 10 && onChange(val.map(c => c.value));
                                    }
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
                                isSearchable={initialLength > 10 ? false : true}
                                isCreatable={initialLength > 10 ? false : true}
                                isDisabled={!isEditting}
                            />
                        )}
                    />
                </Field>
                <Field label="🔍 Job Availability" error={errors?.availability} hint="Indicates your availability for work.">

                    <Controller
                        control={control}
                        name="availability"
                        defaultValue={""}
                        render={({ field: { onChange, value, ref } }) => (
                            <StableSelect
                                inputRef={ref}
                                options={availabilityForWork}
                                classNamePrefix="select"
                                className="text-black max-w-3xl"
                                value={availabilityForWork.find(opt => opt.value === value)}
                                onChange={val => onChange(val.value)}
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
                                    // change text color of selected option
                                    singleValue: (provided, state) => ({
                                        ...provided,
                                        color: '#ad0705',
                                        fontWeight: 'bold',
                                        fontSize: '0.8rem',
                                        textTransform: 'uppercase'
                                    }),
                                }}
                                isSearchable={true}
                                isCreatable={true}
                                isDisabled={!isEditting}
                            />
                        )}
                    />
                </Field>
                <Field label="📍Preferred Job Location" error={errors?.availability}>

                    <Controller
                        control={control}
                        name="location"
                        defaultValue={""}
                        render={({ field: { onChange, value, ref } }) => (
                            <StableSelect
                                inputRef={ref}
                                options={
                                    [
                                        {"geoName": "Remote / Anywhere in the world"},
                                        ...countryCity
                                    ].map(c => {
                                        return {
                                            "value": c.geoName,
                                            "label": c.geoName
                                        }
                                    })
                                }
                                classNamePrefix="select"
                                className="text-black max-w-3xl"
                                value={
                                    [
                                        {"geoName": "Remote / Anywhere in the world"},
                                        ...countryCity
                                    ].map(c => {
                                        return {
                                            "value": c.geoName,
                                            "label": c.geoName
                                        }
                                    })
                                        .find(opt => opt.value === value)
                                }
                                onChange={val => onChange(val ? val.value : null)}
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
                                    // change text color of selected option
                                    singleValue: (provided, state) => ({
                                        ...provided,
                                        color: '#ad0705',
                                        fontWeight: 'bold',
                                        fontSize: '0.8rem',
                                        textTransform: 'uppercase'
                                    }),
                                }}
                                isSearchable={true}
                                isCreatable={true}
                                isClearable={true}
                                isDisabled={!isEditting}
                            />
                        )}
                    />
                </Field>
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
                                    }}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-warning text-black">Save Changes</button>
                            </>
                        ) : isSubmitting ? (
                            <button type="submit" className="btn btn-warning text-black" disabled>Saving Changes...</button>
                        ) : (
                            <button 
                                type="button" 
                                className="btn btn-primary text-white"
                                onClick={() => nextFormStep()}
                            >
                                Next {">"}
                            </button>
                        )
                    }
                </div>
            </fieldset>

        </Form>
    )
}


export default EditPersonalDetails
