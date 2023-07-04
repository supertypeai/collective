import { useContext } from "react";

import { AppContext } from "@/contexts/AppContext";
import AddDevProfileCTA from "../AddDevProfileCTA";


const SessionScheduler = () => {
    const { isLoggedIn } = useContext(AppContext);

    if (!isLoggedIn) {
        return (
            <div className="justify-normal">
                <div className="alert alert-info my-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>
                        You need to log in to access this feature
                    </span>
                </div>
                <AddDevProfileCTA />
            </div>
        )
    }

    return (
        <div>
            Session Scheduler
            {JSON.stringify(isLoggedIn)}
        </div>
    );
}

export default SessionScheduler