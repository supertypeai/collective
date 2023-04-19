import { supabase } from '@/lib/supabaseClient';
import { useQuery, QueryClient, dehydrate } from '@tanstack/react-query'
import { Mainframe } from '@/blocks/Mainframe'

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
    console.log("data", data)
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
        console.log("data1", data)
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
                <main className='min-h-screen grid grid-cols-3 gap-4 mt-8'>
                    {JSON.stringify(data)}
                </main>
            )}
        </Mainframe>
    )

}

export default Page