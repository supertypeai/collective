import { useContext } from 'react';
import WpArticles from "../WpArticles"

import { MeContext } from '@/contexts/MeContext';

const Body = ({ stack, affiliations, children, superinference }) => {

    const data = useContext(MeContext);

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
                <div className="col-span-12 text-white mt-8">
                    <div className="w-full md:mr-12 md:w-1/2">
                        <h3 className="text-lg uppercase font-semibold leading-normal mb-2 my-4">GitHub Projects</h3>

                        {
                            superinference['stats']['top_repo_stars_forks'].map((repo, index) => {
                                return (

                                    <>
                                        <a
                                            href={repo['html_url']}
                                            class="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 mb-2"
                                        >
                                            <span
                                                class="absolute inset-y-0 left-0 w-1 bg-purple-500"
                                            ></span>

                                            <div class="sm:flex sm:justify-between sm:gap-4">
                                                <div>
                                                    <h3 class="font-bold sm:text-lg">
                                                        {data.github_handle}/{repo['name']}
                                                    </h3>
                                                </div>

                                                <div class="hidden sm:block sm:shrink-0">
                                                    <button className='btn btn-outline btn-sm'>☆ {repo['stargazers_count']} Star</button>
                                                </div>
                                            </div>

                                            <div class="mt-1">
                                                <p class="max-w-[120ch] text-sm text-gray-300">
                                                    {repo['description']}
                                                </p>
                                            </div>

                                            <dl class="mt-3 flex gap-4 sm:gap-6">

                                                <div className='text-white text-xs flex fill-white'>

                                                    {repo['top_language']}
                                                </div>

                                                <div className='text-white text-xs flex fill-white'>
                                                    <svg aria-label="forks" role="img" height="16" viewBox="0 0 16 16" version="1.1" width="16">
                                                        <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path>
                                                    </svg> &nbsp;
                                                    {repo['forks_count']}
                                                </div>

                                                <div className='text-white text-xs flex fill-white'>
                                                    <svg aria-label="stars" role="img" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-star">
                                                        <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"></path>
                                                    </svg>&nbsp;
                                                    {repo['stargazers_count']}
                                                </div>
                                            </dl>
                                        </a>
                                    </>
                                )
                            })

                        }

                        <p className='hidden
                        '>
                            {JSON.stringify(superinference['skill']['top_n_languages'])}
                        </p>

                        {/* {
                            data['superinference']['top_n_languages'].map((lang, index) => {
                                return (
                                    <div key={index} className="flex flex-row justify-between">
                                        <div className="text-sm text-slate-200">{lang}</div>
                                        <div className="text-sm text-slate-200">{lang}</div>
                                    </div>
                                )
                            }
                            )
                        } */}
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
                    {children}
                </div>
            </div>

        )
    }

}

export default Body