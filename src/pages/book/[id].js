import { supabase } from '@/lib/supabaseClient';
import { useQuery, QueryClient, dehydrate } from '@tanstack/react-query'

import { Mainframe } from '@/blocks/Mainframe'

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
            )
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
        console.log("data", data)
        const paths = data.map((booking) => ({
            params: { id: booking.id.toString() },
        }))
        console.log("paths", paths)

        return {
            paths, fallback: false
        }
    }
    catch (error) {
        console.log(error)
        return { paths: [], fallback: true }
    }
}

const Page = (props) => {
    const { data, isLoading, error } = useBook(props.id)

    return (
        <Mainframe>
            {/* {JSON.stringify(props)} */}
            {JSON.stringify(data)}
        </Mainframe>
    )
}


export default Page
