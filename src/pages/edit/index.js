import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";

import { AppContext } from "@/contexts/AppContext";
import { EditContext } from "@/contexts/EditContext";

import { Mainframe } from "@/blocks/Mainframe";
import FormBlock from "@/blocks/Form/FormBlock";
import EditPersonalDetails from "@/components/EditPersonalDetails";
import EditStackDetails from "@/components/EditStackDetails";
import EditAffiliationDetails from "@/components/EditAffiliationDetails";
import EditMiscellaneousDetails from "@/components/EditMiscellaneousDetails";
import EditExecutive from "@/components/EditExecutive";

const EditForm = () => {

    const router = useRouter();
    const { asPath } = router;

    // Extract query parameters from URL path
    const params = new URLSearchParams(asPath);
    const providerToken = params.get('provider_token');

    const [formStep, setFormStep] = useState(providerToken ? 3 : 0);

    const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);
    const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);

    const { isLoggedIn } = useContext(AppContext);

    const [state, setState] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [edit, setEdit] = useState(providerToken ? true : false);
    const [profileType, setProfileType] = useState("github");

    useEffect(() => {
        if(isLoggedIn?.githubUser?.id){
            setIsLoading(true);
            setProfileType("github");
            setState(isLoggedIn.user);
            setIsLoading(false);
        } else if (isLoggedIn?.linkedinUser?.id) {
            setIsLoading(true);
            setProfileType("linkedin");
            setState(isLoggedIn.user);
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

    if(profileType === "github"){
        return (
            <EditContext.Provider value={{ f: [state, setState] }}>
                <FormBlock
                    currentStep={formStep}
                    prevFormStep={prevFormStep}
                    profile={true}
                >
                    {formStep === 0 && (
                        <EditPersonalDetails nextFormStep={nextFormStep} />
                    )}
                    {formStep === 1 && (
                        <EditStackDetails formStep={formStep} nextFormStep={nextFormStep} />
                    )}
                    {formStep === 2 && (
                        <EditAffiliationDetails formStep={formStep} nextFormStep={nextFormStep} />
                    )}

                    {formStep === 3 && <EditMiscellaneousDetails edit={edit} setEdit={setEdit}/>}
                </FormBlock>
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
            <h1 className="text-4xl font-bold">Edit Profile</h1>
            <EditForm />
        </Mainframe>
    );
}

export default Page