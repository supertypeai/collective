import { Mainframe } from "@/blocks/Mainframe";
import ExecutiveForm from "@/components/ExecutiveForm";
import { supabase } from "@/lib/supabaseClient";

async function signInWithGitHub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
    });
    if (error) {
        console.log(error);
    }
}

const Page = () => {

    return (
        <Mainframe title="Join as an Engineering Leader | Supertype Collective">
            <h1 className="text-4xl font-bold">Application</h1>
            <p className="text-xs text-gray-400 mt-3">Not what you&apos;re looking for? <span className="text-info hover:text-rose-300 hover:cursor-pointer" onClick={() => signInWithGitHub()}>Login with GitHub</span> to create a Developer profile.</p>
            <p className="text-sm mt-2">We are excited to have you join us as a Tech & Engineering Leader. Please fill out the form below to get started.</p>
            <ExecutiveForm />
        </Mainframe>
    );
}

export default Page