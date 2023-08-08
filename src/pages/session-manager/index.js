import { Mainframe } from "@/blocks/Mainframe";
import SessionScheduler from "@/components/SessionManager/SessionScheduler";

const Page = () => {

    return (
        <Mainframe title="Create Paid Sesssions | Supertype Collective">
            <h1 className="text-4xl font-bold">Create Paid Sessions</h1>
            <SessionScheduler />
        </Mainframe>
    );
}

export default Page