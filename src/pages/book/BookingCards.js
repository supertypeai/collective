import { useState } from 'react';
import '@splidejs/react-splide/css';
import { Splide, SplideSlide } from '@splidejs/react-splide';

import Clock from '@/icons/Clock';
import Calendar from '@/icons/Calendar';
import { tz, extractDayFromDateTime, shortDate, moveDateTimeByMins } from '@/utils/dateformat';
import Ticket from './Ticket';

const BookingCards = ({ id, title, mentor, futureDates, tz_gmt, hours, duration, rate }) => {

    const [selectedDatetime, setSelectedDatetime] = useState(null)

    return (
        <section className="pb-4">
            <Calendar /> Book a Session
            <p className='text-xs text-gray-400'>
                {`Session times displayed in ${tz}`}
            </p>
            <Splide options={{
                perPage: 4,
                gap: '1rem',
                padding: '1rem',
                pagination: false,
                breakpoints: {
                    640: {
                        perPage: 2,
                        perMove: 1,
                    },
                    768: {
                        perPage: 2,
                        perMove: 1,
                    },
                }
            }}
                className='my-4'
            >
                {futureDates && futureDates
                    .sort((a,b) => new Date(a) - new Date(b))
                    .map((date, index) => {
                        return (
                            <SplideSlide key={index}>
                                <div className='rounded bg-secondary dark:bg-white dark:bg-opacity-20 px-2 w-48'>
                                    <input
                                        type="radio"
                                        name="selectedDatetime"
                                        id={date}
                                        value={date}
                                        onChange={(e) => setSelectedDatetime({
                                            ...selectedDatetime,
                                            date: e.target.value,
                                        })}
                                        className='mr-2'
                                    />
                                    <label htmlFor={date} className='text-sm'>
                                        {shortDate(moveDateTimeByMins(date, hours[0], tz_gmt))}
                                    </label>
                                    <p className='uppercase font-medium'>
                                        {extractDayFromDateTime(date, "long")}
                                    </p>
                                </div>
                            </SplideSlide>
                        )
                    }
                )}
            </Splide>

            <Clock /> Pick a Time Slot
            <p className='text-xs text-gray-400'>
                {`Session times displayed in ${tz}`}
            </p>
            <div className='grid grid-cols-12 gap-2 mt-2'>
                {hours && hours.map((hour, index) => {
                    const displayHour = moveDateTimeByMins(futureDates[0], hour, tz_gmt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                    return (
                        <div key={index} className='col-span-4 text-center text-xs rounded bg-secondary dark:bg-white dark:bg-opacity-20 px-2'>
                            <input
                                type="radio"
                                name="selectedTime"
                                id={hour}
                                value={hour}
                                onChange={(e) => setSelectedDatetime({
                                    ...selectedDatetime,
                                    hours: e.target.value,
                                })}
                                className='mr-2'
                            />
                            <label className='text-sm'>
                                {
                                    displayHour.replace(/\s/g, "")
                                }
                            </label>
                        </div>
                    )
                })}
            </div>
            <div className="divider" />
            <Ticket
                id={id}
                title={title}
                mentor={mentor}
                duration={duration}
                rate={rate}
                selectedDatetime={selectedDatetime}
                displayDatetime={selectedDatetime?.date && selectedDatetime?.hours ? {
                    date: moveDateTimeByMins(selectedDatetime?.date, selectedDatetime?.hours, tz_gmt),
                    hour: moveDateTimeByMins(selectedDatetime?.date, selectedDatetime?.hours, tz_gmt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                } : {}}
                tz={tz}
            />
        </section>
    )
}

export default BookingCards