import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useQuery, QueryClient, dehydrate } from '@tanstack/react-query'

import { Mainframe } from '@/blocks/Mainframe'
import BookingCards from '../../components/BookingCards';
import { getNearestDate } from '@/utils/dateformat'

const fetchBookIds = async () => {
    const { data, error } = await supabase
        .from('sessionManager')
        .select('id')

    if (error) {
        throw new Error(error, "Error fetching bookings ids")
    }

    if (!data) {
        throw new Error("No bookings found")
    }
    return data
}

const fetchBooking = async (id) => {
    const { data, error } = await supabase
        .from('sessionManager')
        .select(`
            *, 
            mentor:profile(
                fullname, short, long
            ),
            booked: bookedSession(*)
        `)
        .eq('id', id)
        .single();

    if (error) {
        console.log(error)
        throw new Error(error, "Error fetching booking")
    }

    if (!data) {
        throw new Error("No booking with this id")
    }
    return data
}

const useBook = (id) => {
    return useQuery(['booking'], () => fetchBooking(id), {
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
    })
}

export async function getStaticProps({ params }) {
    const queryClient = new QueryClient()

    try {
        await queryClient.prefetchQuery({
            queryKey: ['booking'],
            queryFn: () => fetchBooking(params.id),
        });
        return {
            props: {
                dehydratedState: dehydrate(queryClient),
                id: params.id
            },
        }
    }
    catch (error) {
        console.log(error)
        return { props: {} }
    }
}

export async function getStaticPaths() {
    const queryClient = new QueryClient()

    try {
        const data = await queryClient.fetchQuery({
            queryKey: ['bookingIds'],
            queryFn: () => fetchBookIds(),
        });
        const paths = data.map((booking) => ({
            params: { id: booking.id.toString() },
        }))

        return {
            paths, fallback: false
        }
    }
    catch (error) {
        console.log(error)
        return { paths: [], fallback: true }
    }
}

const AuthorBox = ({ author }) => {

    return (
        <div className="col-span-3 md:col-span-1 order-first lg:order-last">
            <h3 className="font-display text-xl text-gray-300">
                About <span className='font-semibold ml-1'>{author["fullname"]}</span>
            </h3>
            <p>
                {author["short"]}
            </p>
            <div className='divider'></div>
            <p className='mt-2 font-light'>
                {author["long"]}
            </p>
        </div>
    )
}

const OneTimeSession = ({ data, id }) => {
    const futureDates = data.one_time_date.filter(d => new Date(d) > new Date())

    if (futureDates.length === 0) {
        return null
    }
    return <BookingCards
        id={id}
        title={data.title} mentor={data.mentor.fullname}
        futureDates={futureDates} tz_gmt={data.tz_gmt} hours={data.hours} duration={data.duration} rate={data.hourly_usd}
        bookedSession={data.booked} />
}

const RecurringSession = ({ data, id }) => {

    const [dates, setDates] = useState([])

    useEffect(() => {
        const dates = [];

        for (let i = 0; dates.length <= 6; i++) {

            let bufferToAdd = i * 7

            for (let j = 0; j < data.day_of_week.length; j++) {
                const date = getNearestDate(data.day_of_week[j])

                let newDate = new Date(date)
                newDate.setDate(newDate.getDate() + bufferToAdd)
                dates.push(newDate)
            }
        }

        setDates(dates);
    }, [data]);

    if (dates.length === 0) {
        return null
    }
    return <BookingCards
        id={id}
        title={data.title} mentor={data.mentor.fullname}
        futureDates={dates} tz_gmt={data.tz_gmt} hours={data.hours} duration={data.duration} rate={data.hourly_usd} 
        bookedSession={data.booked} />

    return JSON.stringify(dates)
    // return JSON.stringify(data)
}

const Page = (props) => {
    const { data, isLoading, error } = useBook(props.id)

    return (
        <Mainframe>
            {isLoading && <div className='place-self-center'>Loading...</div>}
            {error && <div className='place-self-center'>Error: {error.message}</div>}
            {!isLoading && !error && data && (
                <>
                    <h1 className="text-4xl uppercase font-semibold dark:text-info">
                        {data["title"]}
                    </h1>

                    <main className='min-h-screen grid grid-cols-3 gap-4 mt-8 px-1'>
                        <div className="col-span-3 md:col-span-2">
                            <section className="pb-6">
                                <p className='font-light'>
                                    {data["description"]}
                                </p>
                            </section>
                            {
                                data["one_time_date"].length > 0 ? <OneTimeSession data={data} id={props.id} /> : <RecurringSession data={data} id={props.id} />
                            }
                        </div>
                        <AuthorBox author={data["mentor"]} />
                    </main>
                    {/* {JSON.stringify(data)} */}
                </>
            )}
        </Mainframe>
    )
}


export default Page
