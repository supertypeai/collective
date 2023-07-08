import { Field } from "@/blocks/Form"

const SessionDesc = ({ register, error }) => {
    return (
        <fieldset>
            <Field label="Brief Description"
                hint="Add some details to explain the key value that the mentee will get out of this session"
                error={error}
            >
                <textarea
                    {...register("description", {
                        required:
                            "Please provide a description of your session",
                    })}
                    id="description"
                    rows="2" required minLength="20" maxLength="220"
                    placeholder="1 on 1 consultation on your startup idea from a feasibility or technical viability perspective. I'll seek to provide honest feedback on your idea & work you through the technical hurdles you might face."
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
            </Field>
        </fieldset>
    )
}

export default SessionDesc