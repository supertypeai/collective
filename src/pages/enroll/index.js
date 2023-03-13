import { useState } from "react";

import { NominateContext } from "@/contexts/NominateContext";

import Pageframe from '@/blocks/Mainframe/Pageframe';
import FormBlock from "@/blocks/Form/FormBlock";
import PersonalDetails from "@/components/PersonalDetails";
import StackDetails from "@/components/StackDetails";
import AffiliationDetails from "@/components/AffiliationDetails";
import NominationCompleted from "@/components/NominationCompleted";

/* Testing superinference
*/
// import { inferFromDevto, inferFromGithub } from "superinference";

const NominationForm = () => {

    // useEffect(() => {

    //     const { profile, stats } =
    //         inferFromGithub("onlyphantom").then((data) => {
    //             console.log("githubdata", data)
    //         })

    //     const devtoProfile = inferFromDevto("onlyphantom").then((data) => {
    //         console.log("devto", data)
    //     })
    // }, [])

    const [formStep, setFormStep] = useState(0);

    const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);
    const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);

    const [state, setState] = useState({});
    return (
        <NominateContext.Provider value={{ f: [state, setState] }}>
            <FormBlock
                currentStep={formStep}
                prevFormStep={prevFormStep}>
                {formStep === 0 && (
                    <PersonalDetails nextFormStep={nextFormStep} />
                )}
                {formStep === 1 && (
                    <StackDetails formStep={formStep} nextFormStep={nextFormStep} />
                )}
                {formStep === 2 && (
                    <AffiliationDetails formStep={formStep} nextFormStep={nextFormStep} />
                )}

                {formStep === 3 && <NominationCompleted />}
            </FormBlock>
        </NominateContext.Provider>
    )
}


const Page = () => {
    return (
        <Pageframe title="Enrollment | Supertype Collective">
            <h1 className="text-4xl font-bold">Application</h1>
            <NominationForm />
        </Pageframe>
    );
}

export default Page