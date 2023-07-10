import { Field } from "@/blocks/Form"
import Pills from "@/blocks/Pills"

const SessionDayOfWeek = ({ error, recurringDateTime, setRecurringDateTime }) => {
    return (
        <fieldset>
            <Field label='Day of Week'
                hint="Select the day(s) of the week you want to schedule your session"
                error={error}
            >
                <Pills
                    name="day_of_week"
                    tags={['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']}
                    onClick={val => {
                        if (recurringDateTime['day_of_week'].includes(val)) {
                            setRecurringDateTime(prev => {
                                return {
                                    ...prev,
                                    day_of_week:
                                        prev.day_of_week.filter(day => day !== val)
                                }
                            })
                        } else {
                            setRecurringDateTime(prev => {
                                return {
                                    ...prev,
                                    day_of_week:
                                        [...prev.day_of_week, val]
                                }
                            })
                        }
                    }}
                    selected={recurringDateTime['day_of_week']}
                />
            </Field>
        </fieldset>
    )
}

export default SessionDayOfWeek