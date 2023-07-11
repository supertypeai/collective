import { Field } from "@/blocks/Form"
import Pills from "@/blocks/Pills"

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const SessionDayOfWeek = ({ error, recurringDateTime, setRecurringDateTime }) => {
    return (
        <fieldset>
            <Field label='Day of Week'
                hint="Select the day(s) of the week you want to schedule your session"
                error={error}
            >
                <Pills
                    name="day_of_week"
                    tags={daysOfWeek}
                    onClick={val => {
                        const currentVal = daysOfWeek.indexOf(val);
                        if (recurringDateTime['day_of_week'].includes(currentVal)) {
                            setRecurringDateTime(prev => {
                                return {
                                    ...prev,
                                    day_of_week:
                                        prev.day_of_week.filter(day => day !== currentVal)
                                }
                            })
                        } else {
                            setRecurringDateTime(prev => {
                                return {
                                    ...prev,
                                    day_of_week:
                                        [...prev.day_of_week, currentVal]
                                }
                            })
                        }
                    }}
                    selected={recurringDateTime['day_of_week'].map(index => daysOfWeek[index])}
                />
            </Field>
        </fieldset>
    )
}

export default SessionDayOfWeek