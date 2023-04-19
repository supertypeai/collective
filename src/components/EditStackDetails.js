import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import Select from "react-select";
import { supabase } from "@/lib/supabaseClient";
import { useQueryClient, useMutation } from '@tanstack/react-query';

import { EditContext } from "@/contexts/EditContext";
import { Form } from "@/blocks/Form"
import stackSectionChoices from "@/data/stackSectionChoices.json"
import { PillsFromStack } from "@/components/PillsFromStack";
import AddedToStack from "@/components/AddedToStack";

const EditStackDetails = () => {

    const context = useContext(EditContext);
    const [form, setForm] = context.f
    const { handleSubmit, reset } = useForm({ defaultValues: form, mode: "onSubmit" });
    const [isEditting, setIsEditting] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // reconstruct stackExamples from form data
    const stacks = Object.keys(form.stack).map(id => {
        const key = Object.keys(form.stack[id])[0];
        const selected = form.stack[id][key];
        const e = stackSectionChoices.find(s => s.value === key);
        return {
            "name": e.value,
            "label": e.label,
            "child": e.examples
                .map(e => e.label),
            "selected": e.examples
                .filter(item => selected.includes(item.value))
                .map(e => e.label)
        }
    });
    const initialStacks = {
        "1": stacks[0],
        "2": stacks[1],
        "3": stacks[2]
    };
    const [stackExamples, setStackExamples] = useState(initialStacks);

    const queryClient = useQueryClient();
    const { mutate: updateForm } = useMutation(
        async (formData) => {
            const { data, error } = await supabase.from('profile').update(formData).eq('id', formData.id);
            if (error?.message === `duplicate key value violates unique constraint "profile_s_preferred_handle_key"`) {
                alert("Your new preferred collective handle already exists, please use another one.");
            } else if (error?.message === `duplicate key value violates unique constraint "Profile_email_key"`) {
                alert("Your new email already exists, please use another email.");
            } else if (error) {
                alert("Sorry, something went wrong. Please try again.");
                console.log(error);
            } else {
                setForm(formData);
                setIsEditting(false);
            }
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('profileData');
            }
        }
    );

    const saveData = (data) => {

        setIsSubmitting(true);

        // take only the name and selected attributes from each stack in stackExamples
        // and add them to the stack object
        let stack = {};

        const getValuesByLabel = (category, labels) => {
            const obj = stackSectionChoices.find(obj => obj.value === category);
            return obj ? obj.examples.filter(ex => labels.includes(ex.label)).map(ex => ex.value) : [];
        };          

        Object.keys(stackExamples).forEach(key => {
            stack[key] = {
                [stackExamples[key].name]: getValuesByLabel(stackExamples[key].name, stackExamples[key].selected)
            }
        });
        
        // check that user has at least 3 stacks
        if (Object.keys(stack).length < 3) {
            alert("Please select at least one tag for each stack");
            return;
        } else if (Object.values(stack).some((el) => Object.values(el).flat().length < 3)) {
            // check that user has at least three tags for each 3 stacks
            alert("Please select at least three tags for each stack");
            return;
        }

        const newData = { ...data, stack:stack };
    
        if (JSON.stringify(newData) !== JSON.stringify(form)) {
            updateForm(newData);
        } else {
            setIsEditting(false);
        }
        setIsSubmitting(false);
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
                        theme={theme => ({
                            ...theme,
                            borderRadius: 0,
                            colors: {
                                ...theme.colors,
                                primary25: '#fcaa8c',
                                primary: '#f46d75',
                            },
                        })}
                        styles={{
                            // change text color of selected option
                            singleValue: (provided, state) => ({
                                ...provided,
                                color: '#ad0705',
                                fontWeight: 'bold',
                                fontSize: '0.8rem',
                                textTransform: 'uppercase'
                            }),
                        }}
                        options={
                            // needs to be filtered by what's already in state
                            stackSectionChoices.filter((choice) => !Object.values(stackExamples).map(x => x.name).includes(choice.value))
                        }
                        value={stackExamples[id] ? { value: stackExamples[id].name, label: stackExamples[id].label } : null}
                        onChange={e => {
                            setStackExamples(
                                {
                                    ...stackExamples,
                                    [id]: {
                                        "name": e.value,
                                        "label": e.label,
                                        "child": e.examples.map(e => e.label),
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
                        setStackExamples={setStackExamples}
                        isEditting={isEditting} />}
            </div>
        )
    }

    return (
        <div className="max-w-6xl grid grid-cols-5">
            <div className="w-full col-span-12 lg:col-span-3">
                <Form onSubmit={handleSubmit(saveData)}>
                    <fieldset className="mr-8">
                        <legend>
                            <span className="text-2xl font-bold">
                                Configure Tech Stack
                                <button 
                                    type="button" 
                                    onClick={() => setIsEditting(true)}
                                    hidden={isEditting}
                                >
                                    <svg 
                                        fill="none" 
                                        stroke="currentColor" 
                                        strokeWidth="1.5" 
                                        viewBox="0 0 24 24" 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        aria-hidden="true"
                                        className="ml-2 mb-1 w-5 inline-block"
                                    >
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                        />
                                    </svg>
                                </button>
                            </span>
                        </legend>
                        <StackSelectFactory id="1" name="Top of the Stack" />
                        <StackSelectFactory id="2" name="Middle of the Stack" />
                        <StackSelectFactory id="3" name="Bottom of the Stack" />

                        { 
                            isEditting ? (
                                <>
                                    <button 
                                        type="button" 
                                        className="btn btn-secondary text-white mr-3"
                                        onClick={() => {
                                            setIsEditting(false)
                                            reset(form)
                                            setStackExamples(initialStacks)
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-warning text-black">Save Changes</button>
                                </>
                            ) : isSubmitting ? (
                                <button type="submit" className="btn btn-warning text-black" disabled>Saving Changes...</button>
                            ) : (
                                <></>
                            )
                        }
                    </fieldset>
                </Form>
            </div>
            {
                (stackExamples && Object.values(stackExamples).some((el) => el.selected.length > 0)) &&
                <AddedToStack stackExamples={stackExamples} setStackExamples={setStackExamples} isEditting={isEditting} profile={true}/>
            }
        </div>
    )
}


export default EditStackDetails