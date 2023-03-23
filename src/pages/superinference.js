import { useState, useEffect } from "react"
import { Mainframe } from "@/blocks/Mainframe"
import { inferFromGithub } from "superinference"

const Superinference = () => {

    const [inferred, setInferred] = useState("Nothing to infer yet. Clone the repo to use this feature.")

    // useEffect(() => {
    //     inferFromGithub({ githubHandle: "fendy07" })
    //         .then(data => {
    //             setInferred(data)
    //             console.log(data)
    //         })
    // }, [])


    return (
        <Mainframe title="Superinference">
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <p>
                    {JSON.stringify(inferred)}
                </p>
            </div>
        </Mainframe>
    )
}

export default Superinference