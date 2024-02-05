import { Field } from "@/blocks/Form"
import Pills from "@/blocks/Pills"

const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

function* range(start, end, step) {
    while (start < end) {
        yield start;
        start += step;
    }
}

const SessionHours = ({ error, watch, recurringDateTime, setRecurringDateTime }) => {
    return (
        <fieldset>
            <Field label="Available Hours"
                hint={`Select the hours you can be booked for this session. Times in ${tz} timezone.`}
                error={error}
            >
                <Pills
                    name="hours"
                    tags={
                        [...range(0, 24, +watch("duration") || 2)].map((val) => {
                            // if val is between 0 and 9, add a 0 in front
                            if (val < 10) {
                                return `0${val}:00`
                            }
                            return `${val}:00`
                        })
                    }
                    maxWidth="40"
                    onClick={val => {
                        const currentVal = parseInt(val.split(":")[0], 10)
                        if (recurringDateTime['hours'].includes(currentVal)) {
                            setRecurringDateTime(prev => {
                                return {
                                    ...prev,
                                    hours:
                                        prev.hours.filter(hour => hour !== currentVal)
                                }
                            })
                        } else {
                            setRecurringDateTime(prev => {
                                return {
                                    ...prev,
                                    hours:
                                        [...prev.hours, currentVal]
                                }
                            })
                        }
                        console.log("recurringDateTime", recurringDateTime)
                    }}
                    selected={recurringDateTime['hours'].map((val) => {
                        // if val is between 0 and 9, add a 0 in front
                        if (val < 10) {
                            return `0${val}:00`
                        }
                        return `${val}:00`
                    })}
                />
            </Field>
        </fieldset>
    )
}

export default SessionHours