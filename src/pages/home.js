import Link from "next/link";
import Image from 'next/image'
import { useEffect } from "react";
import { Mainframe } from "@/blocks/Mainframe";
import YouInputCTA from "@/components/YouInputCTA";
import Pills from "@/blocks/Pills";

const Page = () => {

    // remove typewriter effect after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            document.querySelector('#typewriter').classList.remove('typewriter');
        }, 3500);
        return () => {
            clearTimeout(timer);
        }
    }, []);

    return (
        <Mainframe title="Enrollment | Supertype Collective">
            <div className='place-self-center inline-flex items-center'>
                <div className="md:flex justify-center col-span-12">
                    <h2
                        className='font-display text-center font-extrabold text-4xl sm:text-5xl text-white lg:text-[length:72px] lg:leading-[64px] xl:text-7xl inline'>
                        Supertype
                    </h2>
                    <span style={{ width: '1.2em', minWidth: '1.2em' }}>{" "}</span>
                    <h2
                        id="typewriter"
                        className="font-display text-center font-extrabold text-4xl sm:text-5xl text-white lg:leading-[64px] xl:text-7xl typewriter inline">
                        Collective
                    </h2>
                </div >
                <div className='ml-4 md:ml-8 col-span-12'>
                    <p className='font-light'>
                        A community of analytics developers, data scientists &#38; engineering leaders building products across the full stack.
                    </p>
                </div>
            </div >
            <main className='min-h-screen grid grid-cols-3 gap-4 mt-8'>
                <div className="col-span-3 md:col-span-2">
                    <h3 className="font-display text-lg font-semibold text-gray-300">Most Recently Joined</h3>
                    <section className="pb-6">
                        <div className="container flex flex-col items-center justify-center mx-auto sm:py-2">
                            <div className="flex flex-row flex-wrap justify-center">
                                <div className="flex flex-col justify-center w-full px-2 mx-2 my-12 text-center rounded-md md:w-96 lg:w-44 bg-gray-100 text-white bg-opacity-10">
                                    {/* <img alt="" className="self-center flex-shrink-0 w-16 h-16 -mt-8 bg-center bg-cover rounded-full dark:bg-gray-500" src="https://source.unsplash.com/100x100/?portrait?0" /> */}
                                    <Image src="https://avatars.githubusercontent.com/u/69672839" alt="Aurellia Christie" width={100} height={100} className="self-center flex-shrink-0 w-16 h-16 -mt-8 bg-center bg-cover rounded-full dark:bg-gray-500 grayscale-[.25] sepia hover:filter-none" />
                                    <div className="flex-1 my-2">
                                        <p className=" font-semibold leading-snug">
                                            <Link href="/p/aurellia" target="_blank" className="link-info hover:opacity-70">
                                                Aurellia Christie
                                            </Link>
                                        </p>
                                        <p className="text-sm lg:text-xs">Full Stack Data Scientist @Supertype.ai. Machine learning consultant. Build end-to-end analytics & apps.</p>
                                    </div>
                                    <div className="flex items-center justify-center py-3 space-x-3 border-t-2 text-xs">
                                        <Pills tags={['API', 'Frontend', 'AI', 'Cloud', 'Database']} maxWidth="800px" onClick={() => null} />
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center w-full px-2 mx-2 my-12 text-center rounded-md md:w-96 lg:w-44 bg-gray-100 text-white bg-opacity-10">
                                    {/* <img alt="" className="self-center flex-shrink-0 w-16 h-16 -mt-8 bg-center bg-cover rounded-full dark:bg-gray-500" src="https://source.unsplash.com/100x100/?portrait?0" /> */}
                                    <Image src="https://avatars.githubusercontent.com/u/16984453" alt="Samuel Chan" width={100} height={100} className="self-center flex-shrink-0 w-16 h-16 -mt-8 bg-center bg-cover rounded-full dark:bg-gray-500 grayscale-[.5] sepia-[.5] hover:filter-none " />
                                    <div className="flex-1 my-2">
                                        <p className=" font-semibold leading-snug">
                                            <Link href="/p/samuel" target="_blank" className="link-info hover:opacity-70">
                                                Samuel Chan
                                            </Link>
                                        </p>
                                        <p className="text-sm lg:text-xs">MLOps & Full Stack Engineer @Supertype.ai. Help companies build distributed AI & Analytics systems.</p>
                                    </div>
                                    <div className="flex items-center justify-center py-3 space-x-3 border-t-2 text-xs">
                                        <Pills tags={['API', 'Frontend', 'AI', 'DataOps', 'Cloud']} maxWidth="800px" onClick={() => null} />
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center w-full px-2 mx-2 my-12 text-center rounded-md md:w-96 lg:w-44 bg-gray-100 text-white bg-opacity-10">
                                    {/* <img alt="" className="self-center flex-shrink-0 w-16 h-16 -mt-8 bg-center bg-cover rounded-full dark:bg-gray-500" src="https://source.unsplash.com/100x100/?portrait?0" /> */}
                                    <Image src="https://avatars.githubusercontent.com/u/62128164" alt="Vincentius Christopher Calvin" width={100} height={100} className="self-center flex-shrink-0 w-16 h-16 -mt-8 bg-center bg-cover rounded-full dark:bg-gray-500 grayscale-[.5] sepia-[.5] hover:filter-none " />
                                    <div className="flex-1 my-2">
                                        <p className=" font-semibold leading-snug">
                                            <Link href="/p/calvin" target="_blank" className="link-info hover:opacity-70">
                                                Vincentius C. Calvin
                                            </Link>
                                        </p>
                                        <p className="text-sm lg:text-xs">MLOps & Full Stack Engineer @Supertype.ai. Build, deploy and scale ML systems for companies.</p>
                                    </div>
                                    <div className="flex items-center justify-center py-3 space-x-3 border-t-2 text-xs">
                                        <Pills tags={['AI', 'Cloud', 'DataOps', 'Database', 'Server']} maxWidth="800px" onClick={() => null} />
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center w-full px-2 mx-2 my-12 text-center rounded-md md:w-96 lg:w-44 bg-gray-100 text-white bg-opacity-10">
                                    {/* <img alt="" className="self-center flex-shrink-0 w-16 h-16 -mt-8 bg-center bg-cover rounded-full dark:bg-gray-500" src="https://source.unsplash.com/100x100/?portrait?0" /> */}
                                    <Image src="https://avatars.githubusercontent.com/u/69706675" alt="Gerald Bryan" width={100} height={100} className="self-center flex-shrink-0 w-16 h-16 -mt-8 bg-center bg-cover rounded-full dark:bg-gray-500 grayscale-[.5] sepia-[.5] hover:filter-none " />
                                    <div className="flex-1 my-2">
                                        <p className=" font-semibold leading-snug">
                                            <Link href="/p/gerald" target="_blank" className="link-info hover:opacity-70">
                                                Gerald Bryan
                                            </Link>
                                        </p>
                                        <p className="text-sm lg:text-xs">Full Stack Data Scientist @Supertype.ai. Help companies with model prototyping & development.</p>
                                    </div>
                                    <div className="flex items-center justify-center py-3 space-x-3 border-t-2 text-xs">
                                        <Pills tags={['AI', 'Database', 'API', 'Cloud', 'Dashboard']} maxWidth="800px" onClick={() => null} />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>
                </div>
                <div className="col-span-3 md:col-span-1">
                    <YouInputCTA />
                </div>
            </main>
        </Mainframe >
    );
}

export default Page