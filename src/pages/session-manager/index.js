import { Mainframe } from "@/blocks/Mainframe";
import SessionScheduler from "@/components/SessionManager/SessionScheduler";

const Page = () => {

    return (
        <Mainframe title="Edit Profile | Supertype Collective">
            <h1 className="text-4xl font-bold">Offer Mentoring Sessions</h1>
            <SessionScheduler />
        </Mainframe>
    );
}

export default Page