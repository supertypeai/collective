import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import 'react-day-picker/dist/style.css';

import SessionHours from './SessionHours';
import { Field } from '@/blocks/Form';

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


const SessionDayPicker = ({ register, errorHours, errorDate, watch, recurringDateTime, setRecurringDateTime, selectedDate, setSelectedDate }) => {
    let footer = <p className='text-xs'>Pick one or more dates.</p>
    if (selectedDate.length > 0) {
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
            <Field label="Available Dates"
                error={errorDate}
            >
                <DayPicker
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
            </Field>
            <SessionHours register={register} error={errorHours} watch={watch} recurringDateTime={recurringDateTime} setRecurringDateTime={setRecurringDateTime} />
        </div>
    )
}

export default SessionDayPicker