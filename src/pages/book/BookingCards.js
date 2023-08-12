import { useState } from 'react';
import '@splidejs/react-splide/css';
import { Splide, SplideSlide } from '@splidejs/react-splide';

import { getDayOfWeek } from '@/utils/dateformat';

const BookingCards = ({ futureDates, tz_gmt, hours, duration }) => {

    const [selectedDatetime, setSelectedDatetime] = useState(null)

    return (
        <>
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
                className='mt-2'
            >
                {futureDates.map((date, index) => {
                    return (
                        <SplideSlide key={index}>
                            <div className='rounded bg-secondary dark:bg-white dark:bg-opacity-20 px-2 w-48'>
                                <input
                                    type="radio"
                                    name="selectedDatetime"
                                    id={date}
                                    value={date}
                                    onChange={(e) => setSelectedDatetime(e.target.value)}
                                    className='mr-2'
                                />
                                <label htmlFor={date} className=''>
                                    {date}
                                </label>
                                <p className='text-sm'>
                                    {getDayOfWeek(date)}
                                </p>
                            </div>
                        </SplideSlide>
                    )
                })}
            </Splide>

            <div className="divider" />

            {JSON.stringify(futureDates)}
            {JSON.stringify(tz_gmt)}
            {JSON.stringify(hours)}
            {JSON.stringify(duration)}
        </>
    )
}

export default BookingCards