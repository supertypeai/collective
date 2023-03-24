import { useContext, useCallback } from 'react';
import WpArticles from "../WpArticles"
import RepoCard from '@/components/RepoCard';

import { MeContext } from '@/contexts/MeContext';

const Body = ({ stack, affiliations, children }) => {

    const data = useContext(MeContext);

    const renderGitHubProjects = useCallback(
        (data) => {
            if (data['show_repo'] > 0) {
                return (
                    <>
                        <h3 className="text-lg uppercase font-semibold leading-normal mb-2 my-4">GitHub Projects</h3>
                        {
                            data['superinference']['stats']['top_repo_stars_forks'].map((repo, index) => {
                                // show only up to data['show_repo'] repos
                                if (index < data['show_repo']) {
                                    return <RepoCard key={index} repo={repo} owner={data.github_handle} />
                                }
                            })
                        }
                    </>
                )
            }
        },
        [data],
    )



    if (data['wp']) {

        return (
            <>
                <div className="col-span-12 text-white lg:col-span-4 justify-center justify-self-center lg:justify-self-start mt-8">
                    <WpArticles wp_data={data['wp']} />
                </div>
                <div className="mx-auto max-w-80 col-span-12 lg:col-span-8 justify-center justify-self-center lg:justify-self-start mt-8">
                    <div className="md:flex mt-14 text-center md:ml-8">
                        <div className="w-full md:mr-12 md:w-1/3">
                            {stack}
                        </div>
                        <div className="w-full md:ml-8 md:w-2/3">
                            {affiliations}
                        </div>
                    </div>
                </div>
                {/* full width div for children */}
                <div className="col-span-12 text-white mt-8 flex">
                    <div className="w-full md:w-1/3 md:mr-4">
                        {renderGitHubProjects(data)}
                        <p className='hidden'>
                            {JSON.stringify(data['superinference']['skill']['top_n_languages'])}
                        </p>
                    </div>
                    <div className="w-full md:w-1/3 md:mr-4 hidden">
                        {
                            Object.entries(data['superinference']['closest_user']['collaboration_count']).map(e => `${e[0]}|${e[1]}`)
                        }
                        <span
                            className={`inline-block text-rose-100 hover:bg-rose-900 cursor-pointer border rounded-md text-sm 
                    whitespace-nowrap font-medium mr-1 mb-1 pr-1`}
                        >
                            <img src="https://avatars.githubusercontent.com/pinax" alt="pinax" className='inline w-6 h-6 p-[4px] rounded-md' />
                            <span className='inline ml-1 text-xs'>@pinax</span>
                        </span>
                    </div>
                </div>

            </>
        )
    } else {
        return (

            <div className="mx-auto max-w-80 md:max-w-none col-span-12 justify-center justify-self-center lg:justify-self-start mt-8">
                <div className="md:flex mt-14 text-center md:ml-8 gap-8">
                    <div className="w-full md:mr-12 md:w-1/2">
                        {stack}
                    </div>
                    <div className="w-full md:w-1/2">
                        {affiliations}
                    </div>
                </div>
                {/* full width div for children */}
                <div className="col-span-12 text-white mt-8">
                    <div className="w-full md:mr-12 md:w-1/2">
                        {renderGitHubProjects(data)}
                    </div>
                </div>
            </div>

        )
    }

}

export default Body