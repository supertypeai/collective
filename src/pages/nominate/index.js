import { useState, useContext } from "react";

import { NominateContext } from "@/contexts/NominateContext";

import Pageframe from '@/blocks/Mainframe/Pageframe';
// import profileTagsChoices from './profileTagsChoices.json';
import FormBlock from "@/blocks/Form/FormBlock";
import PersonalDetails from "./PersonalDetails";
import StackDetails from "./StackDetails";
import AffiliationDetails from "./AffiliationDetails";
import NominationCompleted from "./NominationCompleted";

const NominationForm = () => {

    const [formStep, setFormStep] = useState(0);

    const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);
    const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);

    // const [selectedOptions, setSelectedOptions] = useState([])

    const [state, setState] = useState({});
    return (
        <NominateContext.Provider value={{ f: [state, setState] }}>
            <FormBlock
                currentStep={formStep}
                prevFormStep={prevFormStep}>
                {formStep === 0 && (
                    <PersonalDetails nextFormStep={nextFormStep} />
                )}
                {formStep >= 1 && (
                    <StackDetails formStep={formStep} nextFormStep={nextFormStep} />
                )}
                {formStep >= 2 && (
                    <AffiliationDetails formStep={formStep} nextFormStep={nextFormStep} />
                )}

                {formStep > 2 && <NominationCompleted />}
            </FormBlock>
        </NominateContext.Provider>
    )
}


const Page = () => {
    return (
        <Pageframe title="Nomination Form | Supertype Collective">
            <h1 className="text-4xl font-bold">Application</h1>
            <p className="text-sm">The following details will be used to create a Developer Profile on Supertype Collective if your nomination is successful.</p>
            <NominationForm />
        </Pageframe>
    );
}

export default Page