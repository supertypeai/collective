import { Mainframe } from "@/blocks/Mainframe";
import ExecutiveForm from "@/components/ExecutiveForm";


const Page = () => {

    return (
        <Mainframe title="Join as an Engineering Leader | Supertype Collective">
            <h1 className="text-4xl font-bold">Application</h1>
            <p className="text-sm">We are excited to have you join us as an Tech & Engineering Leader. Please fill out the form below to get started.</p>
            <ExecutiveForm />
        </Mainframe>
    );
}

export default Page