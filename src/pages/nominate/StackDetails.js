import { useState, useContext } from "react"
import dynamic from 'next/dynamic'
import { useForm } from "react-hook-form"
import Select from "react-select";

import { NominateContext } from "@/contexts/NominateContext"
import { Field, Form, Hint } from "@/blocks/Form"
import stackSectionChoices from './stackSectionChoices.json';
import { PillsFromStack } from "@/components/PillsFromStack";
import AddedToStack from "@/components/AddedToStack";

const StackDetails = ({ nextFormStep }) => {

    const context = useContext(NominateContext);
    const [form, setForm] = context.f

    const [stackExamples, setStackExamples] = useState({})

    const { register, handleSubmit, watch, formState: { errors } } = useForm({ defaultValues: form, mode: "onSubmit" });

    const saveData = (data) => {

        // take only the name and selected attributes from each stack in stackExamples
        // and add them to the stack object
        let stack = {}

        Object.keys(stackExamples).forEach(key => {
            stack[key] = {
                [stackExamples[key].name]: stackExamples[key].selected
            }
        });

        console.log({ ...data, stack: stack });


        setForm({ ...form, ...data });
        // uncomment this when ready
        // nextFormStep();
    };

    const StackSelectFactory = ({ id, name }) => {
        return (
            <div>
                <div className="col-sm-12 my-3">
                    <label htmlFor={`stack-${id}`} className="form-label block uppercase tracking-wide text-gray-300 text-sm font-bold mb-2">
                        <h3>{name}</h3>
                    </label>
                    <Select
                        id={`stack-${id}`}
                        className="text-black max-w-3xl"
                        options={
                            // needs to be filtered by what's already in state
                            stackSectionChoices.filter((choice) => !Object.values(stackExamples).map(x => x.name).includes(choice.value))
                        }
                        onChange={e => {
                            setStackExamples(
                                {
                                    ...stackExamples,
                                    [id]: {
                                        "name": e.value,
                                        "label": e.label,
                                        "child": e.examples,
                                        "selected": []
                                    }
                                }
                            )
                        }}
                    />
                </div>
                {(stackExamples && stackExamples[id]) &&
                    <PillsFromStack id={id}
                        stackExamples={stackExamples}
                        setStackExamples={setStackExamples} />}
            </div>
        )
    }

    return (
        <div className="max-w-6xl grid grid-cols-5">
            <div className="w-full lg:col-span-3">
                <Form onSubmit={handleSubmit(saveData)}>
                    <fieldset>
                        <legend>🛠️ Configure Tech Stack</legend>

                        <StackSelectFactory id="1" name="Top of the Stack" />
                        <StackSelectFactory id="2" name="Middle of the Stack" />
                        <StackSelectFactory id="3" name="Bottom of the Stack" />

                        <button type="submit" className="btn btn-primary text-white">Next {">"}</button>
                    </fieldset>
                </Form>
            </div>
            {
                (stackExamples && Object.values(stackExamples).some((el) => el.selected.length > 0)) &&
                <AddedToStack stackExamples={stackExamples} setStackExamples={setStackExamples} />
            }
        </div>
    )
}

const StackDetailsNonSSR = dynamic(() => Promise.resolve(StackDetails), {
    ssr: false,
})


export default StackDetailsNonSSR
