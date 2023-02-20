import Link from 'next/link'
import Image from 'next/image'

import styles from '@/styles/Home.module.css'
import Home from '@/icons/Home'


const samuel = () => {
    return (
        <main className={styles.main}>
            <div className={styles.description} style={{ margin: '1rem 0', top: '-120px', position: 'relative' }}>
                <p>
                    <Link href="/">
                        <Home /> Back to homepage
                    </Link>
                </p>
                <div>
                    <a
                        href="https://supertype.ai"
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        by{' '}
                        <Image
                            src="/supertype.svg"
                            alt="Supertype Logo"
                            // className={styles.SupertypeLogo}
                            width={100}
                            height={100}
                            priority
                        />
                    </a>
                </div>
            </div>

            <div className={styles.center}>

                <section className="relative pt-16">
                    <div className="container mx-auto px-4">
                        <div className="relative backdrop-blur-lg rounded drop-shadow-lg flex flex-col min-w-0 break-words bg-gradient-to-r from-amber-700 to-rose-900 w-full mb-6 shadow-xl rounded-lg -mt-64">
                            <div className="px-6 bg-black bg-opacity-30 rounded rounded-lg">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full lg:w-2/12 lg:order-2 flex justify-center mt-8">
                                        <Image src="/photos/samuel.png" alt="samuel supertype" className="mt-8" width={200} height={200} />
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right">
                                        <div className="py-6 px-3 mt-4 sm:mt-0 grid justify-items-center lg:justify-items-end">
                                            <button type="button"
                                                className="bg-rose-900 hover:bg-rose-700 active:bg-pink-600 cursor-pointer uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150">
                                                Connect
                                            </button>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4 lg:order-1">
                                        <div className="flex justify-center md:justify-start py-8 lg:pt-4">
                                            <div className="mr-4 p-1 text-center">
                                                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">22</span>
                                                <div className="text-xs">GitHub Stars</div>
                                            </div>
                                            <div className="mr-4 p-1 text-center">
                                                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">10</span>
                                                <div className="text-xs">Fellowship Badges</div>
                                            </div>
                                            <div className="lg:mr-4 p-1 text-center">
                                                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">89</span>
                                                <div className="text-xs">Reputation</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center -mt-6">
                                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                        Samuel Chan
                                    </h3>
                                    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                        <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                                        Bogor, Indonesia
                                    </div>
                                    <div className="mb-2 text-blueGray-600 mt-10 text-sm">
                                        MLOps, Full Stack Development, Data Science, Analytics Engineering
                                    </div>
                                    <div className="mb-2">

                                        <span className="text-slate-400">
                                            Supertype
                                        </span>
                                        &nbsp; and &nbsp;
                                        <span className="text-slate-400">
                                            Algoritma
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                    <div className="flex flex-wrap justify-center">
                                        <div className="w-full lg:w-9/12 px-4">
                                            <p className="mb-4 text-lg leading-relaxed text-slate-300">
                                                Samuel is the co-founder of Supertype and has been building world-class software and analytics
                                                teams since 2014.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </main>
    )
}

export default samuel