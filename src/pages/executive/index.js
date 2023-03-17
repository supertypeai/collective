import { useForm, Controller } from "react-hook-form"
import { supabase } from "@/lib/supabaseClient";
import { Mainframe } from "@/blocks/Mainframe";
import { Field, Form, Input } from "@/blocks/Form"
import { AppContext } from "@/contexts/AppContext";


export async function signInWithGitHub() {
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

const Page = () => {

    const { register, control, handleSubmit, formState: { errors }, reset } = useForm({
        mode: "onSubmit"
    });

    const saveData = (data) => {
        console.log(data)
        // postToSupabase(data);
    };

    return (
        <Mainframe title="Join as an Engineering Leader | Supertype Collective">
            <h1 className="text-4xl font-bold">Application</h1>
            <p className="text-sm">We are excited to have you join us as an Engineering Leader. Please fill out the form below to get started.</p>

            <Form onSubmit={handleSubmit(saveData)} className="mt-4">
                <fieldset>
                    <h3 className="text-2xl font-bold">👔 Executive&apos;s Profile</h3>
                    <p className="text-sm">The following details will be used to create your Executive&apos;s Profile.</p>
                </fieldset>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3">
                        <Field label="LinkedIn Profile"
                            error={errors?.linkedin_handle}
                            hint="Used to automatically populate your Executive's Profile">
                            <div>
                                {/* TODO: change this to linkedin */}
                                <button onClick={() => signInWithGitHub()}
                                    className="text-white group hover:text-rose-200 px-3 py-2 my-auto rounded-md text-sm hover:bg-secondary border-2 drop-shadow-lg">
                                    Sign In with LinkedIn
                                </button>
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
                                placeholder="pambeesly"
                            />
                        </Field>
                    </div>
                </div>
            </Form>


        </Mainframe>
    );
}

export default Page