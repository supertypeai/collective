import { useContext, useId, useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import Image from 'next/image';
import CreatableSelect from 'react-select/creatable';
import { inferFromGithub } from "superinference";

import { Field, Form, Input } from "@/blocks/Form"
import profileTagsChoices from '@/data/profileTagsChoices.json';
import { signInWithGitHub } from "@/blocks/Mainframe/Navbar";
import { NominateContext } from "@/contexts/NominateContext"
import { AppContext } from "@/contexts/AppContext";

function StableSelect({ ...props }) {
    return <CreatableSelect {...props} instanceId={useId()} />;
}

const PersonalDetails = ({ nextFormStep }) => {

    const context = useContext(NominateContext);
    const { isLoggedIn } = useContext(AppContext);
    const [form, setForm] = context.f
    const [loading, setLoading] = useState(false);
    const [superinference, setSuperinference] = useState({});

    const { register, control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            ...form
        }, mode: "onSubmit"
    });

    const saveData = (data) => {
        console.log(data);
        setForm({ ...form, ...data, superinference: superinference });
        nextFormStep();
    };

    useEffect(() => {
        const githubInference = localStorage.getItem("githubInference") && JSON.parse(localStorage.getItem("githubInference"));
        const lastUpdateInference = githubInference
            ? Math.ceil(
                (new Date() - new Date(githubInference.updated_at)) / (1000 * 60 * 60 * 24)
            )
            : 0;

        if (isLoggedIn.providerToken) {
            if (!githubInference || lastUpdateInference > 30) {
                setLoading(true);

                inferFromGithub({ githubHandle: isLoggedIn.githubUser.user_metadata.user_name, token: isLoggedIn.providerToken }).then((data) => {
                    console.log("githubdata", data);

                    const { profile, skill, stats, contribution } = data;

                    const d = { profile, skill, stats, contribution };

                    // save githubInference in local storage
                    localStorage.setItem("githubInference", JSON.stringify({
                        ...d,
                        v: "0.2.11",
                        updated_at: new Date()
                    }));

                    setSuperinference({
                        ...d,
                        v: "0.2.11",
                        updated_at: new Date()
                    });

                    // call reset to update form values
                    reset({
                        "fullname": data.profile.name,
                        "s_preferred_handle": data.profile.login.toLowerCase(),
                        "github_handle": data.profile.login,
                        "email": isLoggedIn.githubUser.email,
                        "short": data.profile.bio,
                        "tags": [
                            ...data.skill.top_n_languages, ...data.skill.key_qualifications
                        ]
                    });

                    setLoading(false);

                    return data;
                })
            } else {
                setSuperinference(githubInference);
                reset({
                    "fullname": githubInference.profile.name,
                    "s_preferred_handle": githubInference.profile.login.toLowerCase(),
                    "github_handle": githubInference.profile.login,
                    "email": isLoggedIn.githubUser.email,
                    "short": githubInference.profile.bio,
                    "tags": githubInference.skill.key_qualifications
                })
            }
        }


    }, [isLoggedIn, reset])

    if (loading) return (<div className="min-h-screen">loading...</div>)

    return (
        <Form onSubmit={handleSubmit(saveData)}>
            <fieldset>
                <legend>
                    <h3 className="text-2xl font-bold">🧑‍💼 Maker&apos;s Profile</h3>
                    <p className="text-sm">The following details will be used to create your Maker&apos; s Profile.</p>
                </legend>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <Field label="Preferred Collective Handle"
                            error={errors?.s_preferred_handle}
                            hint="This will be in the link to your Maker's Profile"
                        >
                            <Input
                                {...register("s_preferred_handle", { required: "Please provide a handle to be used in the link to your Maker's Profile" })}
                                id="s_preferred_handle"
                                placeholder="pambeesly"
                            />
                        </Field>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <Field label="GitHub Username"
                            error={errors?.github_handle}
                            hint="Used to automatically populate your Maker's Profile"
                        >
                            {!isLoggedIn.providerToken ? (
                                <div>
                                    <button onClick={() => signInWithGitHub()}
                                        className="text-white group hover:text-rose-200 px-3 py-2 my-auto rounded-md text-sm hover:bg-secondary border-2">
                                        <Image src="/techicons/github_inv.png" alt="GitHub Logo" width={20} height={20} className="inline mr-2" />
                                        Authorize with GitHub
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <Input
                                        {...register("github_handle", { required: "Please sign in with your GitHub account" })}
                                        id="github_handle"
                                        placeholder="pambeesly"
                                        disabled={true}
                                        className="hidden"
                                    />
                                    <div className="flex items-center space-x-4">
                                        <Image className="w-10 h-10 rounded-full" src={isLoggedIn.githubUser.user_metadata.avatar_url} width={100} height={100} alt={isLoggedIn.githubUser.user_metadata.full_name} />
                                        {/* <img className="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-5.jpg" alt=""/> */}
                                        <div className="font-medium dark:text-white">
                                            <div>{isLoggedIn.githubUser.user_metadata.full_name}</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">({isLoggedIn.githubUser.user_metadata.preferred_username}): <small>Authenticated on {new Date(isLoggedIn.githubUser.confirmed_at).toDateString()}</small></div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </Field>
                    </div>
                </div>
                <Field label="Full name" error={errors?.fullname}>
                    <Input
                        {...register("fullname", { required: "Full name is a required field" })}
                        id="fullname"
                        placeholder="Pamela Morgan Beesly"
                    />
                </Field>
                <Field label="Email" error={errors?.email} hint='We will send an acknowledgment of your nomination to this email.'>
                    <Input
                        {...register("email", { required: "Email is required" })}
                        type="email"
                        id="email"
                        placeholder="pamela@dundermifflin.com"
                    />
                </Field>


                <Field label="🖊️ Introduction" error={errors?.long}>
                    <textarea {...register("long")} id="long" name="long"
                        rows="4" required minLength="40" maxLength="250"
                        placeholder="I am a data scientist with 3 years of experience in the industry and a Fellow at Supertype Fellowship. I am passionate about open source and have contributed to several projects under this program."
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    />
                </Field>

                <Field label="✨ Headline" error={errors?.short}
                    hint="A short headline that appears below your name."
                >
                    <Input
                        {...register("short", { required: "Please provide a short Headline" })}
                        id="short"
                        placeholder="Full Stack Data Scientist @SupertypeAI"
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
                <div className="my-4">
                    {
                        isLoggedIn.providerToken ? (
                            <button type="submit" className="btn btn-primary text-white">Next {">"}</button>
                        ) : (
                            <button onClick={() => signInWithGitHub()}
                                className="text-white group hover:text-rose-200 px-3 py-2 my-auto rounded-md text-sm hover:bg-secondary border-2">
                                <Image src="/techicons/github_inv.png" alt="GitHub Logo" width={20} height={20} className="inline mr-2" />
                                Authorize with GitHub
                            </button>
                        )
                    }
                </div>

            </fieldset>

        </Form>
    )
}

// const PersonalDetailsNonSSR = dynamic(() => Promise.resolve(PersonalDetails), {
//     ssr: false,
// })


export default PersonalDetails
