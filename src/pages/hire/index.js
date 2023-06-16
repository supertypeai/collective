import { useState } from "react"

import { HireContext } from "@/contexts/HireContext";
import { Mainframe } from "@/blocks/Mainframe";

import HireBasic from "@/components/HireForm/HireBasic";

const HireForm = () => {

    const [formState, setFormState] = useState({});

    return (
        <HireContext.Provider value={{ f: [formState, setFormState] }}>
            <HireBasic />
        </HireContext.Provider>
    )
}

const Page = () => {
    return (
        <Mainframe title="Client Form | Supertype Collective">
            <HireForm />
        </Mainframe>
    )
}

export default Page