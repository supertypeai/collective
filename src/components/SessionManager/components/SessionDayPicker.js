import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import SessionHours from './SessionHours';

const SessionDayPicker = ({ register, error, watch, recurringDateTime, setRecurringDateTime }) => {
    return (
        <div>
            <DayPicker
                {...register("daypicker", {
                    required:
                        "Please provide your session date",
                })}
                className="rounded-none"
            />
            <SessionHours register={register} error={error} watch={watch} recurringDateTime={recurringDateTime} setRecurringDateTime={setRecurringDateTime} />
        </div>
    )
}

export default SessionDayPicker