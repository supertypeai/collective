import { useState, useEffect, useContext } from "react"
import dynamic from 'next/dynamic'
import { useForm, Controller } from "react-hook-form"
import Select from "react-select";

import { NominateContext } from "@/contexts/NominateContext"
import { Field, Form, Input, Hint } from "@/blocks/Form"
import stackSectionChoices from './stackSectionChoices.json';
import { PillsFromStack, PillsFromSelected } from "../../components/PillsFromStack";

const StackDetails = ({ nextFormStep }) => {

    const context = useContext(NominateContext);
    const [form, setForm] = context.f

    const [stackExamples, setStackExamples] = useState()

    const { register, control, handleSubmit, watch, formState: { errors } } = useForm({ defaultValues: form, mode: "onSubmit" });

    const saveData = (data) => {
        console.log(data);
        setForm({ ...form, ...data });
        // uncomment this when ready
        // nextFormStep();
    };


    return (
        <div className="max-w-6xl grid grid-cols-5">
            <div className="w-full lg:col-span-3">

                <Form onSubmit={handleSubmit(saveData)}>
                    <fieldset>
                        <legend>🛠️ Configure Tech Stack</legend>
                        <Field label="Stack 1" error={errors?.stack1}>
                            <div className="max-w-lg">
                                <Select
                                    className="text-black max-w-3xl"
                                    options={stackSectionChoices}
                                    // onClick, render examples from options
                                    onChange={e => {
                                        console.log(e)
                                        setStackExamples(
                                            {
                                                "stack1_name": e.value,
                                                "stack1_child": e.examples,
                                                "stack1_selected": []
                                            }
                                        )
                                    }}
                                />
                            </div>
                        </Field>
                        {stackExamples?.stack1_name && <PillsFromStack stackExamples={stackExamples} setStackExamples={setStackExamples} />}
                        <button type="submit" className="btn btn-primary text-white">Next {">"}</button>
                    </fieldset>

                </Form>
            </div>
            {
                stackExamples?.stack1_selected.length > 0 &&

                <div className="w-full lg:col-span-2 lg:ml-8">
                    <div class="m-2 rounded border p-2">
                        <div className="mb-4">
                            <h3>🧰 Added to <span className="font-medium">{stackExamples?.stack1_name}</span></h3>
                            <Hint>Maximum of 9. Click to remove from Stack</Hint>
                        </div>
                        <PillsFromSelected stackExamples={stackExamples} setStackExamples={setStackExamples} />
                        {/* <Pills
                            tags={stackExamples?.stack1_selected}
                            onClick={e => {
                                console.log(e)
                                // remove this from stack1_selected
                                setStackExamples(
                                    {
                                        ...stackExamples,
                                        "stack1_selected": stackExamples?.stack1_selected.filter(item => item !== e)
                                    }
                                )
                            }}
                        /> */}
                    </div>
                </div>
            }

        </div>
    )
}

const StackDetailsNonSSR = dynamic(() => Promise.resolve(StackDetails), {
    ssr: false,
})


export default StackDetailsNonSSR
