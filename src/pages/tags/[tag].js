import { supabase } from "@/lib/supabaseClient";
import { Mainframe } from '@/blocks/Mainframe'
import { useQuery, QueryClient, dehydrate } from '@tanstack/react-query'

const fetchTags = async () => {
    const { data, error } = await supabase
        .from('tags_aggregate')
        .select(`tag_name`)
        .gt('tag_count', 3)

    if (error) {
        throw new Error(error, "Error fetching collective handles")
    }

    if (!data) {
        throw new Error("No profiles with this tag")
    }
    return data
}

const fetchProfileMatchingTag = async (tag) => {
    const { data, error } = await supabase
        .from('profile')
        .select()
        // profile.tags (jsonb array) contains tag
        .containedBy('tags', ['ai'])

    if (error) {
        throw new Error(error, "Error fetching collective handles")
    }

    if (!data) {
        throw new Error("No profiles with this tag")
    }
    console.log("data", data)
    return data
}

const useProfilesMatchingTag = (tag) => {
    return useQuery(['tag'], () => fetchProfileMatchingTag(tag), {
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
    })
}

export async function getStaticPaths() {
    const queryClient = new QueryClient()

    try {
        const data = await queryClient.fetchQuery({
            queryKey: ['tags'],
            queryFn: () => fetchTags(),
            // stale time of 1 day
            staleTime: 1000 * 60 * 60 * 24,
        });

        return {
            paths: data.map(
                (item) => ({
                    params: {
                        tag: item.tag_name.replace(/"|'/g, ''),
                    }
                })
            ),
            fallback: false,
        };
    } catch (error) {
        console.log(error)
    }
}

export async function getStaticProps({ params }) {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ['tag'],
        queryFn: () => fetchProfileMatchingTag(params.tag),
    })

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
            tag: params.tag,



        },
    }
}


const Page = ({ tag }) => {

    const { data, error, isLoading } = useProfilesMatchingTag(tag)

    console.log("data in body", data)
    return (
        <Mainframe>
            <h1 className="text-2xl uppercase">Tag: {tag}</h1>
        </Mainframe>
    )
}

export default Page