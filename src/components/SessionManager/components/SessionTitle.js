import { Field, Input } from "@/blocks/Form";

const SessionTitle = ({ register, error }) => {
    return (
        <fieldset>
            <Field
                label="Title"
                hint="Keep this short. Any details should be in the description."
                error={error}
            >
                <Input
                    {...register("title", {
                        required:
                            "Please provide a title for your session",
                    })}
                    id="title"
                    placeholder="1 on 1 Tutoring Session"
                    maxLength="25"
                />
            </Field>
        </fieldset>
    )
}

export default SessionTitle