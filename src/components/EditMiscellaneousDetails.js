import { useContext, useState, useEffect, useCallback } from "react"
import Image from "next/image";
import { useForm } from "react-hook-form"
import { supabase } from "@/lib/supabaseClient";
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { inferFromGithub } from "superinference";

import { AppContext } from "@/contexts/AppContext";
import { EditContext } from "@/contexts/EditContext";
import { Field, Form, Input } from "@/blocks/Form"
import Tooltip from "@/icons/Tooltip";
import { signInWithGitHub } from "@/blocks/Mainframe/Navbar";
import RepoCard from "./RepoCard";
import RepoTags from "@/blocks/Body/RepoTags";
import CommitPolar from "@/blocks/Body/CommitPolar";
import Edit from "@/icons/Edit";

const updateInference = (setIsSyncing, isLoggedIn, superinference, setSuperinference) => {
    setIsSyncing(true);
    const githubInference = localStorage.getItem("githubInference") && JSON.parse(localStorage.getItem("githubInference"));
    const lastUpdateInference = githubInference
        ? Math.ceil(
            (new Date() - new Date(githubInference.updated_at)) / (1000 * 60 * 60 * 24)
        )
        : 0;

    if (isLoggedIn.providerToken) {
        if (!githubInference || lastUpdateInference > 1) {
            inferFromGithub({ githubHandle: isLoggedIn.githubUser.user_metadata.user_name, token: isLoggedIn.providerToken }).then((data) => {
                const { profile, skill, stats, contribution } = data;

                const d = { profile, skill, stats, contribution };

                // save githubInference in local storage
                localStorage.setItem("githubInference", JSON.stringify({
                    ...d,
                    v: "0.2.11",
                    updated_at: new Date()
                }));

                // update superinference values
                setSuperinference({
                    ...superinference,
                    "superinference": {
                        ...d,
                        v: "0.2.11",
                        updated_at: new Date()
                    }
                });

                setIsSyncing("updated");
            })
        } else {
            setSuperinference({
                ...superinference,
                "superinference": githubInference
            });
            setIsSyncing("updated");
        }
    }
}

const EditMiscellaneousDetails = ({ edit, setEdit }) => {

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isEditting, setIsEditting] = useState(edit ? true : false)
    const [isSyncing, setIsSyncing] = useState(false)

    const context = useContext(EditContext);
    const { isLoggedIn } = useContext(AppContext);
    const [form, setForm] = context.f
    const [superinference, setSuperinference] = useState({
        superinference: form.superinference,
        show_repo: form.show_repo
    });

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: form, mode: "onSubmit" });

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
        setIsSubmitting(true)
        const newData = {
            ...form,
            ...data,
            superinference: superinference.superinference,
            show_repo: superinference.show_repo
        };
        if (JSON.stringify(newData) !== JSON.stringify(form)) {
            updateForm(newData);
        } else {
            setIsEditting(false);
        }
        setIsSubmitting(false);
    };

    const SuperInference = ({ superinference }) => {

        const autoColumnLayout = useCallback(
            (data, div) => {

                const contribution = {
                    ...data['superinference']['contribution']['contribution_count_per_repo_org_owner'],
                    ...data['superinference']['contribution']['contribution_count_per_repo_user_owner']
                };
                if (contribution.hasOwnProperty(data["superinference"]["profile"]['login'])) {
                    delete contribution[data["superinference"]["profile"]['login']]
                }

                const innerContent = (
                    <>
                        <div className="col-span-12 row-span-3 md:col-span-4 text-white my-8 mx-1 self-start">
                            <h3 className="text-lg uppercase font-semibold leading-normal mb-2 my-4">GitHub Projects</h3>
                            <p className="text-xs text-gray-400 mb-3">Top repositories based on stars & forks count</p>
                            {
                                !isEditting && data.show_repo === 0 && (
                                    <p className="text-gray-300 text-md italic">No projects selected yet.</p>
                                )
                            }
                            {
                                isEditting && (
                                    <div className="my-2">
                                        <input
                                            type="range"
                                            min="0"
                                            max="3"
                                            value={data.show_repo}
                                            className="range range-secondary"
                                            step="1"
                                            onChange={(e) => setSuperinference({
                                                ...data,
                                                show_repo: e.target.value
                                            })}
                                        />
                                        <div className="w-full flex justify-between text-xs px-2">
                                            <span>0</span>
                                            <span>1</span>
                                            <span>2</span>
                                            <span>3</span>
                                        </div>
                                    </div>
                                )
                            }
                            {
                                data['superinference']['stats']['top_repo_stars_forks'].map((repo, index) => {
                                    // show only up to data['show_repo'] repos
                                    if (index < data['show_repo']) {
                                        return <div key={index}><RepoCard repo={repo} owner={data["superinference"]["profile"]["login"]} /></div>
                                    }
                                })
                            }
                        </div>
                        {
                            (contribution &&
                                Object.entries(contribution).length > 0) &&
                            <RepoTags collaborations={contribution} />
                        }
                        {
                            Object.values(data['superinference']['contribution']['contribution_count_per_month'])
                                .reduce((acc, x) => acc + x[0], 0) > 0 &&
                            <CommitPolar data={data['superinference']['contribution']['contribution_count_per_month']} newCol={
                                data['show_repo'] === 0
                            } />
                        }


                    </>
                )

                if (div) return (
                    <div className='grid grid-cols-12 grid-rows-3 md:grid-flow-col gap-x-4'>
                        {innerContent}
                    </div>
                )

                return (
                    <div className="col-span-12 lg:col-span-4 text-white my-8 mx-1 self-start">
                        {innerContent}
                    </div>
                )
            }, []
        )

        return (
            <div>
                <span className="text-2xl font-bold">
                    Inference from GitHub
                </span>
                <div className="flex flex-wrap">
                    <div className="w-full md:w-5/12 mb-0">
                        <Field label="Your GitHub Account" hint={`${isEditting ? "Please make sure to click the 'Save Changes' button after syncing your GitHub account." : ""}`}
                            error={errors?.github_handle}
                        >
                            <div className="flex items-center space-x-4">
                                <Image className="w-10 h-10 rounded-full" src={isLoggedIn.githubUser.user_metadata.avatar_url} width={100} height={100} alt={isLoggedIn.githubUser.user_metadata.full_name} />
                                <div className="font-medium dark:text-white">
                                    <div>{isLoggedIn.githubUser.user_metadata.full_name}</div>
                                    <div className="text-sm text-gray-400">({isLoggedIn.githubUser.user_metadata.preferred_username}): <small>Updated on: {new Date(superinference.superinference.updated_at).toDateString()}</small></div>
                                </div>
                            </div>
                        </Field>
                    </div>
                    {
                        isEditting ? (
                            <div className="w-full md:w-7/12 px-3 mt-3">
                                <div className="md:mt-6">
                                    {
                                        isSyncing === true ? (
                                            <button
                                                className="text-gray-500 group px-3 py-2 my-auto rounded-md text-sm border-2 border-secondary dark:border-gray-800"
                                                disabled
                                            >
                                                🔄
                                                Syncing in progress...
                                            </button>
                                        ) : (
                                            isSyncing === "updated" ? (
                                                <button
                                                    className="text-gray-500 group px-3 py-2 my-auto rounded-md text-sm border-2 border-secondary dark:border-gray-800"
                                                    disabled
                                                >
                                                    ✔️
                                                    Synced with GitHub
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => {
                                                        isLoggedIn.providerToken
                                                            ? updateInference(setIsSyncing, isLoggedIn, superinference, setSuperinference)
                                                            : signInWithGitHub()
                                                    }}
                                                    className="text-white group hover:text-rose-200 px-3 py-2 my-auto rounded-md text-sm hover:bg-secondary border-2">
                                                    <Image src="/techicons/github_inv.png" alt="GitHub Logo" width={20} height={20} className="inline mr-2" />
                                                    Sync with GitHub
                                                </button>
                                            ))
                                    }
                                </div>
                            </div>
                        ) : (
                            <></>
                        )
                    }
                </div>
                {autoColumnLayout(superinference, true)}
            </div>
        )
    }

    useEffect(() => {
        if (edit) {
            updateInference(setIsSyncing, isLoggedIn, superinference, setSuperinference);
            setEdit(false);
        }
    }, [edit, setEdit]);

    return (
        <Form onSubmit={handleSubmit(saveData)} className="min-h-6xl">
            <fieldset>
                <legend>
                    <span className="text-2xl font-bold">
                        Miscellaneous Details
                        <button
                            type="button"
                            onClick={() => setIsEditting(true)}
                            hidden={isEditting}
                        >
                            <Edit />
                        </button>
                    </span>
                </legend>
                <Field label="LinkedIn URL" error={errors?.linkedin}>
                    <Input
                        {...register("linkedin")}
                        id="linkedin"
                        placeholder="https://www.linkedin.com/in/chansamuel"
                        disabled={!isEditting}
                    />
                </Field>
                <Field label="Website (Optional)" hint='This might also appear on your profile.'>
                    <Input
                        {...register("website")}
                        type="url"
                        id="website"
                        placeholder="yourpersonalwebsite.com"
                        pattern="https://.*"
                        disabled={!isEditting}
                    />
                </Field>
                <div className="flex flex-wrap mb-3">
                    <div className="w-full mb-6 md:mb-0">

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
                    <div className="w-full">
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
                <SuperInference superinference={superinference} />
                {
                    isEditting ? (
                        <>
                            <button
                                type="button"
                                className="btn btn-secondary text-white mr-3"
                                onClick={() => {
                                    setIsEditting(false)
                                    reset(form)
                                    setSuperinference({
                                        superinference: form.superinference,
                                        show_repo: form.show_repo
                                    })
                                    setIsSyncing(false)
                                }}
                                disabled={isSyncing === true}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-warning text-black" disabled={isSyncing === true}>Save Changes</button>
                        </>
                    ) : isSubmitting ? (
                        <button type="submit" className="btn btn-warning text-black" disabled>Saving Changes...</button>
                    ) : (
                        <></>
                    )
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

export default EditMiscellaneousDetails
