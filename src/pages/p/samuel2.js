import Home from '@/icons/Home'

import { Mainframe } from '@/blocks/Mainframe'
import Toprow from '@/blocks/Toprow'
import Body from '@/blocks/Body'

import { samuel as me } from '@/data/profiles'

export async function getStaticProps() {

    // need to get (1) github data and (2) wordpress articles
    if (me['github_handle']) {
        const res_gh = await fetch(`https://api.github.com/users/${me['github_handle']}`);
        const github_data = await res_gh.json();
        console.log(github_data)
        me['gh'] = github_data
    }

    if (me['wp_blog_root_url'] && me['wp_blog_author_id']) {
        const res_wp = await fetch(`${me['wp_blog_root_url']}/wp-json/wp/v2/posts?per_page=5&author=${me['wp_blog_author_id']}&categories=4&5`);
        const wp_data = await res_wp.json();
        me['wp'] = wp_data
    }

    return {
        props: {
            data: me
        },
    }
}

const TimelineDate = ({ start }) => {
    return (
        <div className="hidden md:block w-36 -rotate-90 hover:rotate-0 cursor-pointer">
            <div className="md:flex space-x-1 text-xs">{start[0]} - </div>
            <div className="font-bold text-sm">{start[1]}</div>
        </div>
    )
}

const Affiliations = ({ affiliations }) => {

    return (<>
        <h3 className="text-2xl font-semibold leading-normal mb-2 -700 mb-2">Affiliations</h3>
        <div className="relative mt-5 text-left">
            {
                affiliations.map((affiliation, index) => {
                    return (
                        <div className="flex items-center relative md:space-x-5" key={index}>
                            <TimelineDate start={affiliation['start']} />

                            <div className="border-r-2 border-black absolute h-full left-1 md:left-8 top-2 z-10">
                                <i className="-top-1 -ml-1 absolute text-black">●</i>
                            </div>

                            <div className="ml-10">
                                <div className="font-bold">{affiliation['title']}</div>
                                <div className="italic md:mb-4 text-sm">{affiliation['position']}</div>
                                <div className="mb-4 mt-2 md:hidden">
                                    <div className="font-bold">{affiliation['start'][1]}</div>
                                    <div className="text-xs">{affiliation['start'][0]}</div>
                                </div>
                                <div className="mb-10 text-xs">
                                    {
                                        Array.isArray(affiliation['description']) ?

                                            (
                                                <ul className="list-disc">
                                                    {affiliation['description'].map((desc, index) => {
                                                        return <li key={index}>{desc}</li>
                                                    })}
                                                </ul>

                                            )
                                            :
                                            <ul className="list-disc">
                                                <li>{affiliation['description']}</li>
                                            </ul>
                                    }
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </>
    )

}


const Samuel = ({ data }) => {

    return (
        // needs some navbar here to return to home
        <Mainframe>
            <Toprow data={data}>
                Hire me to work on your analytics backend, <b>operationlize</b> your data science models,
                or architect your <b>end-to-end machine learning pipelines.</b>
            </Toprow>
            <Body data={data}>
                <div className="md:flex mt-14 text-center ml-8">
                    <div className="md:mr-12 md:w-1/3">
                        <h3 className="text-2xl font-semibold leading-normal mb-2 -700 mb-2">My Stack</h3>

                        <div className="relative mt-5 text-left">
                            <div className="flex items-center relative pb-5 justify-start">
                                <div className="border-r-2 border-black absolute h-full top-2 z-10 ">
                                    <i className="-top-1 -ml-1 absolute text-black">●</i>
                                    <div className="absolute stack -ml-8 font-bold text-gray-400 text-sm w-max">Frontend</div>
                                </div>

                                <div className="ml-6 pt-5">
                                    <div className="flex mb-4 space-x-16">
                                        <div>
                                            <img src="/techicons/pytorch_inv.png" className="w-10 max-w-fit" />
                                        </div>
                                        <div>
                                            <img src="/techicons/sql_inv.png" className="w-10 max-w-fit" />
                                        </div>
                                        <div>
                                            <img src="/techicons/python_inv.png" className="w-10 max-w-fit" />
                                        </div>
                                    </div>
                                    <div className="flex mb-4 space-x-16">
                                        <div>
                                            <img className="w-10 max-w-fit" src="/techicons/react_inv.png" alt="" />
                                        </div>
                                        <div>
                                            <img className="w-10 max-w-fit" src="/techicons/r_inv.png" alt="" />
                                        </div>
                                        <div>
                                            <img className="w-10 max-w-fit" src="/techicons/gcp_inv.png" />
                                        </div>
                                    </div>
                                    <div className="flex mb-4 space-x-16">
                                        <div>
                                            <img className="w-10 max-w-fit" src="/techicons/bash_inv.png" alt="" />
                                        </div>
                                        <div>
                                            <img className="w-10 max-w-fit" src="/techicons/postgresql_inv.png" />
                                        </div>
                                        <div>
                                            <img className="w-10 max-w-fit" src="/techicons/nextjs_inv.png" />
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="flex items-center relative pb-5 pt-5 justify-start">

                                <div className="border-r-2 border-black absolute h-full top-2 z-10 ">
                                    <i className="-top-1 -ml-1 absolute text-black">●</i>
                                    <div className="absolute stack -ml-8 font-bold text-gray-400 text-sm w-max">AI &#38; Data</div>
                                </div>

                                <div className="ml-6 pt-5">
                                    <div className="flex mb-4 space-x-16">
                                        <div>
                                            <img className="w-10 max-w-fit" src="/techicons/nextjs_inv.png" />
                                        </div>
                                        <div>
                                            <img className="w-10 max-w-fit" src="/techicons/elastic_inv.png" />
                                        </div>
                                        <div>
                                            <img className="w-10 max-w-fit" src="/techicons/django_inv.png" />
                                        </div>
                                    </div>
                                    <div className="flex mb-4 space-x-16">
                                        <div>
                                            <img className="w-10 max-w-fit" src="/techicons/azure_inv.png" />
                                        </div>
                                        <div>
                                            <img className="w-10 max-w-fit" src="/techicons/postman_inv.png" />
                                        </div>
                                        <div>
                                            <img className="w-10 max-w-fit" src="/techicons/api_inv.png" />
                                        </div>
                                    </div>
                                    <div className="flex mb-4 space-x-16">
                                        <div>
                                            <img className="w-10 max-w-fit" src="/techicons/docker_inv.png" />
                                        </div>
                                        <div>
                                            <img className="w-10 max-w-fit" src="/techicons/mysql_inv.png" />
                                        </div>
                                        <div>
                                            <img className="w-10 max-w-fit" src="/techicons/s3_inv.png" />
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div className="flex items-center relative pb-5 pt-5 justify-start">

                                <div className="border-r-2 border-black absolute h-full top-2 z-10 ">
                                    <i className="-top-1 -ml-1 absolute text-black">●</i>
                                    <div className="absolute stack -ml-8 font-bold text-gray-400 text-sm w-max">Engineering</div>
                                </div>

                                <div className="ml-6 pt-5">
                                    <div className="flex mb-4 space-x-16">
                                        <div>
                                            <img className="w-10 max-w-fit" src="/techicons/github_inv.png" alt="" />
                                        </div>
                                        <div>
                                            <img className="w-10 max-w-fit" src="/techicons/cloudfront_inv.png" />
                                        </div>
                                        <div>
                                            <img className="w-10 max-w-fit" src="/techicons/powerbi_inv.png" />
                                        </div>
                                    </div>
                                    <div className="flex mb-4 space-x-16">
                                        <div>
                                            <img className="w-10 m-w-full" src="/techicons/gce_inv.png" />
                                        </div>
                                        <div>
                                            <img className="w-10 max-w-fit" src="/techicons/figma_inv.png" />
                                        </div>
                                        <div>
                                            <img className="w-10 max-w-fit" src="/techicons/flutter_inv.png" />
                                        </div>
                                    </div>
                                    <div className="flex mb-4 space-x-16">
                                        <div>
                                            <img className="w-10 max-w-fit" src="/techicons/androidstudio_inv.png" />
                                        </div>
                                        <div>
                                            <img className="w-10 max-w-fit" src="/techicons/c++_inv.png" />
                                        </div>
                                        <div>
                                            <img className="w-10 max-w-fit" src="/techicons/css_inv.png" />
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div className="flex items-center relative pb-5 pt-5 justify-start">

                                <div className="border-r-2 border-black absolute h-full top-2 z-10">
                                    <i className="-top-1 -ml-1 absolute text-black">●</i>
                                    <div className="absolute stack -ml-8 font-bold text-gray-400 text-sm w-max">Backend</div>
                                    <i className="fas fa-circle -bottom-3 -ml-2 absolute"></i>
                                </div>

                                <div className="ml-6 pt-5">
                                    <div className="flex mb-4 space-x-16">
                                        <div>
                                            <img src="/techicons/angular_inv.png" className="w-10 max-w-fit" />
                                        </div>
                                        <div>
                                            <img src="/techicons/prisma_inv.png" className="w-10 max-w-fit" />
                                        </div>
                                        <div>
                                            <img src="/techicons/selenium_inv.png" className="w-10 max-w-fit" />
                                        </div>
                                    </div>
                                    <div className="flex mb-4 space-x-16">
                                        <div>
                                            <img className="w-10 max-w-fit" src="/techicons/solidity_inv.png" alt="" />
                                        </div>
                                        <div>
                                            <img className="w-10 max-w-fit" src="/techicons/kubernetes_inv.png" alt="" />
                                        </div>
                                        <div>
                                            <img className="w-10 max-w-fit" src="/techicons/jupyter_inv.png" />
                                        </div>
                                    </div>
                                    <div className="flex mb-4 space-x-16">
                                        <div>
                                            <img className="w-10 max-w-fit" src="/techicons/js_inv.png" alt="" />
                                        </div>
                                        <div>
                                            <img className="w-10 max-w-fit" src="/techicons/webgl_inv.png" />
                                        </div>
                                        <div>
                                            <img className="w-10 max-w-fit" src="/techicons/swift_inv.png" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="md:w-2/3">
                        <Affiliations affiliations={me['affiliations']} />
                    </div>
                </div>
            </Body>
        </Mainframe>
    )
}

export default Samuel