import { useState } from 'react';

import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import 'react-day-picker/dist/style.css';

import SessionHours from './SessionHours';

const css = `
  .rdp-day_selected, .rdp-day_selected:focus-visible, .rdp-day_selected:hover {
    color: white;
    opacity: 1;
    background-color: #b1976b;
}
.rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
    background-color: #887048;
}
`;


const SessionDayPicker = ({ register, error, watch, recurringDateTime, setRecurringDateTime }) => {

    const [selectedDate, setSelectedDate] = useState([])

    let footer = <p className='text-xs'>Pick one or more dates.</p>
    if (selectedDate.length > 0) {
        console.log(selectedDate)
        footer = <p className='text-xs'>Session available on {
            selectedDate
                .map((date) => format(date, 'dd/MM/yyyy'))
                .join(', ')
        }
        </p>
    }

    return (
        <div>
            <style>{css}</style>
            <DayPicker
                {...register("daypicker", {
                    required:
                        "Please provide your session date",
                })}
                required
                showOutsideDays
                mode="multiple"
                max={7}
                selected={selectedDate}
                onSelect={setSelectedDate}
                // hide past dates 
                disabled={date => date <= new Date()}
                footer={footer}
                styles={{
                    caption: { 'color': '#b1976b' },

                }}
            />
            <SessionHours register={register} error={error} watch={watch} recurringDateTime={recurringDateTime} setRecurringDateTime={setRecurringDateTime} />
        </div>
    )
}

export default SessionDayPicker