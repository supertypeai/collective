import { Field, Input } from "@/blocks/Form";
import HourInput from "./HourInput";

const SessionRate = ({ register, error, watch }) => {
    return (
        <fieldset>
            <Field
                hint={`Eg. A hourly rate of ${watch("hourly_usd") || 40}
                         USD/hour for ${watch("duration") || 2}-hour sessions will cost 
                        ${watch("duration") ? watch("duration") * watch("hourly_usd") || 40 : 80}
                        USD per session.`}
                error={error}
            >
                <div className="join join-vertical lg:join-horizontal mt-4 text-black">
                    <HourInput keys="hourly_usd" name="hourly_usd" register={register} />
                    <span className="join-item btn rounded-none bg-secondary border-none dark:bg-info animate-none">USD/hour</span>
                    <div className="indicator">
                        <span className="indicator-item badge badge-secondary">new</span>
                        <select
                            {...register("duration", {
                                required:
                                    "Please provide your session duration",
                            })}
                            className="select select-bordered join-item rounded-none"
                        >
                            <option disabled value={0}>Per Session Duration</option>
                            <option value={1}>1-hour</option>
                            <option value={2}>2-hour</option>
                            <option value={3}>3-hour</option>
                        </select>
                    </div>
                </div>
            </Field>
        </fieldset>
    )
}

export default SessionRate