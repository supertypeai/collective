import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";

import { AppContext } from "@/contexts/AppContext";
import { EditContext } from "@/contexts/EditContext";

import { Mainframe } from "@/blocks/Mainframe";
import EditPersonalDetails from "@/components/EditPersonalDetails";
import EditStackDetails from "@/components/EditStackDetails";
import EditAffiliationDetails from "@/components/EditAffiliationDetails";
import EditMiscellaneousDetails from "@/components/EditMiscellaneousDetails";
import EditExecutive from "@/components/EditExecutive";
import CreateForm from "@/components/CreateForm";
import ProjectOverview from "@/components/ProjectOverview";

const EditForm = () => {

    const router = useRouter();
    const { asPath } = router;

    // Extract query parameters from URL path
    const params = new URLSearchParams(asPath);
    const providerToken = params.get('provider_token');

    const [activePage, setActivePage] = useState(providerToken ? "other" : "personal");

    const { isLoggedIn } = useContext(AppContext);

    const [state, setState] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [edit, setEdit] = useState(providerToken ? true : false);
    const [profileType, setProfileType] = useState("github");
    const [projectState, setProjectState] = useState(false);
    
    useEffect(() => {
        if (isLoggedIn?.githubUser?.id) {
            setIsLoading(true);
            setProfileType("github");
            setState(isLoggedIn.user);
            setIsLoading(false);
        } else if (isLoggedIn?.linkedinUser?.id) {
            setIsLoading(true);
            setProfileType("linkedin");
            setState(isLoggedIn.user);
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    }, [isLoggedIn]);

    if (isLoading) {
        return (<div className="min-h-screen mt-2">Loading...</div>)
    } else if (!state) {
        return (<div className="min-h-screen mt-2">You haven&apos;t created your profile page.</div>)
    } else if (!state.accepted) {
        return (<div className="min-h-screen mt-2">Your profile is currently under review.</div>)
    }

    if (profileType === "github") {
        return (
            <EditContext.Provider value={{ f: [state, setState] }}>
                <div className="drawer drawer-mobile h-full my-6">
                    <input id="side-drawer" type="checkbox" className="drawer-toggle"/>
                    <div className="lg:drawer-side mr-3">
                        <label htmlFor="side-drawer" className="drawer-overlay"></label>
                        <ul className="menu w-50 text-base-content">
                            <li className={activePage === "personal" ? "bordered" : ""}> 
                                <a onClick={() => setActivePage("personal")}>🧑‍💼 Personal Details</a>
                            </li>
                            <li className={activePage === "stack" ? "bordered" : ""}>
                                <a onClick={() => setActivePage("stack")}>🛠️ Tech Stacks</a>
                            </li>
                            <li className={activePage === "work" ? "bordered" : ""}> 
                                <a onClick={() => setActivePage("work")}>💼 Affiliations &#38; Work</a>
                            </li>
                            <li className={activePage === "other" ? "bordered" : ""}>
                                <a onClick={() => setActivePage("other")}>🪄 Miscellaneous Details</a>
                            </li>
                            <li className={activePage === "project" ? "bordered" : ""}>
                                <a onClick={() => setActivePage("project")}>💻 Projects</a>
                            </li>
                        </ul>
                    </div>
                    <div className="lg:drawer-content">
                        <div>
                            <label
                                htmlFor="side-drawer"
                                className="btn btn-primary drawer-button hidden"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </label>
                            <div className="flex flex-col mt-6 lg:mt-0">
                                {activePage === "personal" && (
                                    <EditPersonalDetails />
                                )}
                                {activePage === "stack" && (
                                    <EditStackDetails />
                                )}
                                {activePage === "work" && (
                                    <EditAffiliationDetails />
                                )}
                                {activePage === "other" && <EditMiscellaneousDetails edit={edit} setEdit={setEdit} />}
                                {activePage === "project" && project==="add" ? (
                                    <CreateForm setProjectState={setProjectState} />
                                ) : (
                                    <ProjectOverview setProjectState={setProjectState} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </EditContext.Provider>
        )
    } else {
        return (
            <EditContext.Provider value={{ f: [state, setState] }}>
                <EditExecutive />
            </EditContext.Provider>
        )
    }
}


const Page = () => {
    return (
        <Mainframe title="Edit Profile | Supertype Collective">
            <h1 className="text-4xl font-bold">Profile Editor</h1>
            <EditForm />
        </Mainframe>
    );
}

export default Page