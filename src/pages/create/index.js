import { Mainframe } from "@/blocks/Mainframe";
import CreateForm from "@/components/CreateForm";

const Page = () => {

    return (
        <Mainframe title="Register Your Project | Supertype Collective">
            <h1 className="text-4xl font-bold">Project Registration</h1>
            <p className="text-sm mt-2">We are thrilled to assist in publicizing your projects to global audience. Please fill out the form below to get started.</p>
            <CreateForm />
        </Mainframe>
    );
}

export default Page