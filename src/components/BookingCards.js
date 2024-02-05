import { useState } from 'react';
import '@splidejs/react-splide/css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Link from 'next/link';
import format from 'date-fns/format';

import Clock from '@/icons/Clock';
import Calendar from '@/icons/Calendar';
import { tz, extractDayFromDateTime, shortDate, moveDateTimeByMins } from '@/utils/dateformat';
import Ticket from '../pages/book/Ticket';

const BookingCards = ({ id, title, mentor, futureDates, tz_gmt, hours, duration, rate, bookedSession }) => {
    const [selectedDatetime, setSelectedDatetime] = useState(null)

    const bookedSlots =  bookedSession.reduce((result, s) => {
        result[s.date] = result[s.date] ? [...result [s.date], s.hour] : [s.hour]
        return result; 
    }, {})

    const availableSlots = futureDates.reduce((result, d) => {
        const date = format(new Date(d), 'yyyy-MM-dd')
        const bookedHours = bookedSlots[date] || [];
        const availableHours = hours.filter(hour => !bookedHours.includes(hour));
        if (availableHours.length > 0){
            result[date] = availableHours;
        } 
        
        return result;
      }, {});

    return (
        <section className="pb-4">
            {Object.keys(availableSlots).length > 0 ? (
                <>
                    <Calendar /> Book a Session
                    <p className='text-xs text-gray-400'>
                        {`Session times displayed in ${tz}`}
                    </p>
                    <Splide options={{
                        perPage: 4,
                        gap: '1rem',
                        padding: '0rem',
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
                        {Object.keys(availableSlots)
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

                    { selectedDatetime?.date && (
                        <>
                            <Clock /> Pick a Time Slot
                            <p className='text-xs text-gray-400'>
                                {`Session times displayed in ${tz}`}
                            </p>
                            <div className='grid grid-cols-12 gap-2 mt-2'>
                                {availableSlots[selectedDatetime?.date] && availableSlots[selectedDatetime?.date].map((hour, index) => {
                                    const displayHour = moveDateTimeByMins(selectedDatetime?.date, hour, tz_gmt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
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
                        </>
                    )}
            
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
                </>
            ) : (
                <>
                    <div>Sorry, the session is fully booked.</div>
                    <Link href="/" className="btn btn-secondary mt-4 px-3 py-2 my-auto rounded-md text-sm border-2">
                        &lt; Back to Home
                    </Link>
                </>
            )}
            

            
        </section>
    )
}

export default BookingCards