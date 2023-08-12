import { useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

const BookingCards = ({ futureDates }) => {

    const [selectedDatetime, setSelectedDatetime] = useState(null)

    return (
        <>
            <Splide options={{
                perPage: 3,
                gap: '.1rem',
                padding: '1rem',
                pagination: false,
                breakpoints: {
                    640: {
                        perPage: 1,
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
                            <div className='border-2 rounded bg-secondary dark:bg-black px-2 w-48'>
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
                            </div>
                        </SplideSlide>
                    )
                })}
            </Splide>


            {JSON.stringify(futureDates)}
        </>
    )
}

export default BookingCards