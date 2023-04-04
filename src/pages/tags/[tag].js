import { supabase } from "@/lib/supabaseClient";
import { useQuery, QueryClient, dehydrate } from '@tanstack/react-query'
import { Mainframe } from '@/blocks/Mainframe'
import ProfileCard from "@/components/ProfileCard";
import YouInputCTA from "@/components/YouInputCTA";
import AddDevProfileCTA from "@/components/AddDevProfileCTA";
import profileTagsChoices from '@/data/profileTagsChoices.json';

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
        .eq('accepted', true)
        // profile.tags (jsonb array) contains tag
        .contains('tags', ['ai'])

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

const betterTagTitle = (tag) => {
    // match it against profileTagsChoices
    const match = profileTagsChoices.find(item => item.value === tag)
    if (match) {
        return match.label
    }
    return tag
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
            // get tag description too
        },
    }
}

const featuredProfiles = (profiles) => {
    return profiles.map((profile) => {
        return (
            <ProfileCard person={{
                name: profile.fullname,
                profileLink: `/p/${profile.s_preferred_handle}`,
                short: profile.short,
                tags: profile.tags.slice(0, 5),
                imgUrl: profile.superinference.profile.avatar_url
            }}
                key={profile.id}
            />
        )
    })
}


const Page = ({ tag }) => {

    const { data, error, isLoading } = useProfilesMatchingTag(tag)

    console.log("data in body", data)
    return (
        <Mainframe>
            <div className='place-self-center inline-flex items-center'>
                <div className="justify-center col-span-12 block">
                    <h1 className="text-2xl uppercase font-semibold bg-rose-700 dark:bg-info rounded p-2">
                        {betterTagTitle(tag)}
                    </h1>
                </div>
                <div className='ml-4 md:ml-8 col-span-12'>
                    <p className='font-light'>
                        Lorem ipsum description of this tag goes here.
                    </p>
                </div>
            </div>
            {isLoading && <div className='place-self-center'>Loading...</div>}
            {error && <div className='place-self-center'>Error: {error.message}</div>}
            {!isLoading && !error && data && (
                <main className='min-h-screen grid grid-cols-3 gap-4 mt-8'>
                    <div className="col-span-3 md:col-span-2">
                        <h3 className="font-display text-lg font-semibold text-gray-300">Featured Profiles</h3>
                        <section className="pb-6">
                            <div className="container flex flex-col items-center justify-center mx-auto sm:py-2">
                                <div className="flex flex-row flex-wrap justify-center mt-4">
                                    {featuredProfiles(data)}
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className="col-span-3 md:col-span-1 order-first lg:order-last">
                        <YouInputCTA />
                        <AddDevProfileCTA />
                    </div>
                </main>
            )
            }





        </Mainframe>
    )
}

export default Page