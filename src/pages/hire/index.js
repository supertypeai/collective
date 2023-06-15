import { useState } from "react"

import { HireContext } from "@/contexts/HireContext";
import { Mainframe } from "@/blocks/Mainframe";
import FormBlock from "@/blocks/Form/FormBlock";

import HireBasic from "@/components/HireForm/HireBasic";

const HireForm = () => {

    const [formStep, setFormStep] = useState(0);
    const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);
    const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);

    const [formState, setFormState] = useState({});

    return (
        <HireContext.Provider value={{ f: [formState, setFormState] }}>
            <FormBlock
                currentStep={formStep}
                prevFormStep={prevFormStep}>
                {formStep === 0 && (
                    <HireBasic nextFormStep={nextFormStep} />
                )}

            </FormBlock>
        </HireContext.Provider>
    )
}

const Page = () => {
    return (
        <Mainframe title="Client Form | Supertype Collective">
            <h1 className="text-4xl font-bold">Connect me with Collective talents</h1>
            <HireForm />
        </Mainframe>
    )
}

export default Page