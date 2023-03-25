import { useContext, useCallback } from 'react';
import WpArticles from "../WpArticles"
import RepoCard from '@/components/RepoCard';
import RepoTag from '@/components/RepoTag';

import { MeContext } from '@/contexts/MeContext';
import Link from 'next/link';


const Body = ({ stack, affiliations, children }) => {

    const data = useContext(MeContext);

    const renderGitHubProjects = useCallback(
        (data) => {

            if (data['show_repo'] < 1) {
                return null
            }

            if (data['show_repo'] > 0) {
                return (
                    <div className="col-span-12 md:col-span-4 text-white my-8 mx-1 self-start">
                        <h3 className="text-lg uppercase font-semibold leading-normal mb-2 my-4">GitHub Projects</h3>
                        {
                            data['superinference']['stats']['top_repo_stars_forks'].map((repo, index) => {
                                // show only up to data['show_repo'] repos
                                if (index < data['show_repo']) {
                                    return <div key={index}><RepoCard repo={repo} owner={data.github_handle} /></div>
                                }
                            })
                        }
                    </div>
                )
            }
        },
        [data],
    )

    const renderRepoTags = useCallback(
        (data) => {
            const collaboration_count = data['superinference']['closest_user']['collaboration_count']

            if (collaboration_count === undefined || collaboration_count < 1) {
                return null
            }

            else {
                return (
                    <div className="col-span-12 md:col-span-4 text-white my-8 mx-1 self-start">
                        <h3 className="text-lg uppercase font-semibold leading-normal mb-2 my-4">Open Source Contributions</h3>
                        {Object.keys(collaboration_count).map(e =>
                            <div key={e} className="inline-flex">
                                <RepoTag repo={e} />
                            </div>
                        )}
                    </div>
                )
            }
        },
        [data],
    )

    const renderContactCard = useCallback(
        (data) => {
            return (
                <div className="col-span-12 md:col-span-4 text-white my-8 mx-1 self-start">
                    <h3 className="text-lg uppercase font-semibold leading-normal mb-2 my-4">Personal Details</h3>
                    {/* personal details card */}
                    <div className="border-white border rounded-lg shadow-lg p-4">
                        <div className="flex flex-row items-start">
                            <div className="flex flex-col">
                                <div className="avatar mr-2">
                                    <div className="w-12 rounded-full">
                                        <img src={
                                            data['superinference']['profile']['avatar_url']
                                        } />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className='leading-none font-semibold'>{data['fullname']}</span>
                                {/* social links */}
                                <div className="flex flex-row gap-x-2">
                                    {
                                        data['website'] &&
                                        <Link href={data['website']} target="_blank" rel="noopener noreferrer" className='text-sm link-info hover:opacity-70'>
                                            Website
                                        </Link>
                                    }
                                    {
                                        data['linkedin'] &&
                                        <Link href={data['linkedin']} target="_blank" rel="noopener noreferrer" className='text-sm link-info hover:opacity-70'>
                                            LinkedIn
                                        </Link>
                                    }
                                    <Link href={`https:github.com/${data['github_handle']}`} target="_blank" rel="noopener noreferrer" className='text-sm link-info hover:opacity-70'>
                                        GitHub
                                    </Link>
                                </div>
                            </div>

                        </div>
                        <ul className="text-sm text-gray-400">
                            <li>Remote / Online</li>
                            <li>On-site: Jakarta, Indonesia</li>
                        </ul>
                        <p className="text-sm text-gray-400">
                            {data['linkedin']}
                        </p>
                    </div>
                </div>
            )
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
                {renderGitHubProjects(data)}
                {renderRepoTags(data)}
                {renderContactCard(data)}
            </>
        )
    } else {
        return (
            <>
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
                </div>
                {renderGitHubProjects(data)}
                {renderRepoTags(data)}
            </>
        )
    }

}

export default Body