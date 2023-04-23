import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { useQuery, QueryClient, dehydrate } from '@tanstack/react-query'
import { Mainframe } from '@/blocks/Mainframe'
import AddDevProfileCTA from "@/components/AddDevProfileCTA";
import PopularTagBadge from "@/components/PopularTagBadge";

const fetchProjectHandles = async () => {
    const { data, error } = await supabase
        .from('project')
        .select('handle')
        .eq('accepted', true)

    if (error) {
        throw new Error(error, "Error fetching collective handles")
    }

    if (!data) {
        throw new Error("No projects")
    }
    return data
}

const fetchProject = async (handle) => {
    const { data, error } = await supabase
        .from('project')
        .select()
        .eq('handle', handle)
        .single()

    if (error) {
        console.log(error)
        throw new Error(error, "Error fetching project")
    }

    if (!data) {
        throw new Error("No project with this handle")
    }
    return data
}

const useProject = (handle) => {
    return useQuery(['project'], () => fetchProject(handle), {
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
    })
}

export async function getStaticProps({ params }) {
    const queryClient = new QueryClient()

    try {
        await queryClient.prefetchQuery({
            queryKey: ['project'],
            queryFn: () => fetchProject(params.repo),
        });
        return {
            props: {
                dehydratedState: dehydrate(queryClient),
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
            queryKey: ['projects'],
            queryFn: () => fetchProjectHandles(),
            staleTime: 1000 * 60 * 60 * 24, // 24 hours
        });
        const paths = data.map((project) => ({
            params: { repo: project.handle },
        }))
        return { paths, fallback: false }
    }
    catch (error) {
        console.log(error)
        return { paths: [], fallback: false }
    }
}


const Page = () => {

    const { data, isLoading, error } = useProject()
    console.log("data", data)

    return (
        <Mainframe>
            {isLoading && <div className='place-self-center'>Loading...</div>}
            {error && <div className='place-self-center'>Error: {error.message}</div>}
            {!isLoading && !error && data && (
                <>
                    <div className='md:flex items-center'>
                        <div className="md:basis-1/2 w-full mb-4">
                            <h1 className="text-4xl uppercase font-semibold bg-rose-800 dark:bg-transparent dark:text-info rounded p-2">
                                {data["name"]}
                            </h1>
                        </div>
                        <div className='ml-4 md:ml-8 md:basis-1/2 w-full mb-4'>
                            <p className='font-light'>
                                {data["description"]}
                            </p>
                        </div>
                    </div>
                    <main className='min-h-screen grid grid-cols-3 gap-4 mt-8'>
                        <div className="col-span-3 md:col-span-2">
                            <section className="pb-6">
                                <Image
                                    src={data["imgUrl"]}
                                    alt={data["name"]}
                                    width={900} height={450}
                                    className="rounded-xl shadow-lg dark:border-info border-2"
                                />
                            </section>

                            <section className="pb-6">
                                {JSON.stringify(data)}
                            </section>
                        </div>
                        <div className="col-span-3 md:col-span-1 order-first lg:order-last">
                            <h3 className="font-display text-xl font-semibold text-gray-300">{data["name"]}</h3>
                            <Link
                                className="mt-4 btn bg-primary btn-wide hover:bg-black border-none dark:bg-info dark:text-black hover:opacity-70"
                                href={data["url"]}
                            >
                                🔗 Visit Project Page
                            </Link>
                            <AddDevProfileCTA />
                        </div>

                    </main>
                </>
            )}
        </Mainframe>
    )

}

export default Page