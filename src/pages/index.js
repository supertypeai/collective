import { useEffect } from "react";
import Image from "next/image";
import { Mainframe } from "@/blocks/Mainframe";
import YouInputCTA from "@/components/YouInputCTA";
import ProfileCard from "@/components/ProfileCard";
import AddDevProfileCTA from "@/components/AddDevProfileCTA";
import PopularTagBadge from "@/components/PopularTagBadge";

import styles from '@/styles/Home.module.css'
import Link from "next/link";

const AurelliaProfile = () => {
    return <ProfileCard person={{
        imgUrl: "https://avatars.githubusercontent.com/u/69672839",
        name: "Aurellia Christie",
        profileLink: "/p/aurellia",
        short: "Full Stack Data Scientist @Supertype.ai. Machine learning consultant. Build end-to-end analytics & apps.",
        tags: ['API', 'Frontend', 'AI', 'Cloud', 'Database']
    }} />
}

const SamuelProfile = () => {
    return <ProfileCard person={{
        imgUrl: "https://avatars.githubusercontent.com/u/16984453",
        name: "Samuel Chan",
        profileLink: "/p/samuel",
        short: "MLOps & Full Stack Engineer @Supertype.ai. Help companies build distributed AI & Analytics systems.",
        tags: ['API', 'Frontend', 'AI', 'DataOps', 'Cloud']
    }} />
}

const VCCalvinProfile = () => {
    return <ProfileCard person={{
        imgUrl: "https://avatars.githubusercontent.com/u/62128164",
        name: "Vincentius C. Calvin",
        profileLink: "/p/calvin",
        short: "MLOps & Full Stack Engineer @Supertype.ai. Build, deploy and scale ML systems for companies.",
        tags: ['AI', 'Cloud', 'DataOps', 'Database', 'Server']
    }} />
}

const GeraldProfile = () => {
    return <ProfileCard person={{
        imgUrl: "https://avatars.githubusercontent.com/u/69706675",
        name: "Gerald Bryan",
        profileLink: "/p/gerald",
        short: "Full Stack Data Scientist @Supertype.ai. Help companies with model prototyping & development.",
        tags: ['AI', 'Database', 'API', 'Cloud', 'Dashboard']
    }} />
}

const StaneProfile = () => {
    return <ProfileCard person={{
        imgUrl: "https://avatars.githubusercontent.com/u/79591954",
        name: "Stane A. Ronotana",
        profileLink: "/p/stane",
        short: "Cloud & Data Engineer @Supertype.ai. Build data pipelines and AI models leveraging cloud infrastructure.",
        tags: ['AI', 'DataOps', 'Cloud', 'Database', 'Server']
    }} />
}

const PatrickProfile = () => {
    return <ProfileCard person={{
        imgUrl: "https://avatars.githubusercontent.com/u/65403659",
        name: "Pat Amadeus Irawan",
        profileLink: "/p/patrick",
        short: "Full Stack Data Scientist @Supertype.ai. Coupling deep learning with engineering prowess at scale.",
        tags: ['AI', 'DataOps', 'Cloud', 'API', 'Frontend']
    }} />
}

const TimotiusProfile = () => {
    return <ProfileCard person={{
        imgUrl: "https://avatars.githubusercontent.com/u/106854419",
        name: "Timotius Marselo",
        profileLink: "/p/timotius",
        short: "Data Scientist @Supertype.ai. Solving problems in the forecasting and predictive maintenance domains.",
        tags: ['Server', 'DataOps', 'Database', 'AI']
    }} />
}

const WilsenProfile = () => {
    return <ProfileCard person={{
        imgUrl: "https://avatars.githubusercontent.com/u/113084785",
        name: "Geraldus Wilsen",
        profileLink: "/p/wilsen",
        short: "Data Scientist @Supertype.ai. Builds amazing dashboards that ties analysis and visualization together.",
        tags: ['AI', 'Dashboard', 'DataOps', 'Database']
    }} />
}

const BrianProfile = () => {
    return <ProfileCard person={{
        imgUrl: "https://osfehplavmahboowlueu.supabase.co/storage/v1/object/public/images/profile_images/brianloe_ppm.png",
        name: "Cornelius Brian Loe",
        profileLink: "/p/brianloe",
        short: "Data Scientist @Supertype.ai. Aspire to help businesses streamline data processes and create intelligent data-driven solutions.",
        tags: ['AI', 'Database', 'Server']
    }} />
}

const NisaProfile = () => {
    return <ProfileCard person={{
        imgUrl: "https://avatars.githubusercontent.com/u/73590231?v=4",
        name: "Khairunnisa",
        profileLink: "/p/nisa-basalamah",
        short: "Aspiring Full-Stack Web Developer @Supertype.ai and Passionate Part-Time Scratch Tutor @Kodland.",
        tags: ['API', 'Frontend', 'Database', 'Server']
    }} />
}

const DivaProfile = () => {
    return <ProfileCard person={{
        imgUrl: "https://avatars.githubusercontent.com/u/79572421?v=4",
        name: "Diva Kartika",
        profileLink: "/p/divakartika",
        short: "Data Science Instructor @Algoritma. A physics graduate but now solving problems with Mathematics and Programming.",
        tags: ['AI', 'IOT', 'Frontend']
    }} />
}

const FiqeyProfile = () => {
    return <ProfileCard person={{
        imgUrl: "https://avatars.githubusercontent.com/u/57583780?v=4",
        name: "Fiqey Indriati Eka Sari",
        profileLink: "/p/finesaaa",
        short: "Data Science Instructor @Algoritma and Robotics Programmer at the acclaimed ICHIRO ITS Humanoid Robot Team",
        tags: ['AI', 'Frontend', 'Mobile', 'Robotics']
    }} />
}

const FendyProfile = () => {
    return <ProfileCard person={{
        imgUrl: "https://avatars.githubusercontent.com/u/50945163?v=4",
        name: "Fendy Hendriyanto",
        profileLink: "/p/fendy07",
        short: "Artificial Intelligence Instructor @Orbit Future Academy. Enthusiastic about computer vision work for Humaniora.",
        tags: ['AI', 'Database']
    }} />
}

const StevenProfile = () => {
    return <ProfileCard person={{
        imgUrl: "https://osfehplavmahboowlueu.supabase.co/storage/v1/object/public/images/profile_images/auberg_d23046ceee9878af83639934f613da78.webp",
        name: "Steven Christian",
        profileLink: "/p/auberg",
        short: "Head of Data Analytics @Danamas and former mentor @Supertype.ai. Led teams in building machine learning solutions for companies in the last 3 years.",
        tags: ['AI', 'Database']
    }} />
}

const OwennProfile = () => {
    return <ProfileCard person={{
        imgUrl: "https://avatars.githubusercontent.com/u/75826315?v=4",
        name: "Owenn Gimli",
        profileLink: "/p/owenn2106",
        short: "ReactJS Developer Lead @Stockifi.io and former full-stack software developer @Supertype.ai",
        tags: ['AI', 'Frontend', 'Server']
    }} />
}

const YevonnaelProfile = () => {
    return <ProfileCard person={{
        imgUrl: "https://supertype.ai/wp-content/uploads/2024/01/Yevonnael-Andrew-2.jpg",
        name: "Yevonnael Andrew",
        profileLink: "/p/yevonnael",
        short: "Cybersecurity and Software Engineer @AAG, Cybersecurity Researcher @Swiss German University. Works in Web3.",
        tags: ['AI', 'Cybersecurity', 'Blockchain', 'Database']
    }} />
}

const VitoProfile = () => {
    return <ProfileCard person={{
        imgUrl: "https://supertype.ai/wp-content/uploads/2023/07/vito.webp",
        name: "Vito Ghifari",
        profileLink: "/p/vito",
        short: "Data Scientist @Supertype.ai. Develops machine learning applications for portfolio companies.",
        tags: ['AI', 'DataOps', 'API', 'Server', 'Database']
    }} />
}

const NoelProfile = () => {
    return <ProfileCard person={{
        imgUrl: "https://avatars.githubusercontent.com/u/8803461?v=4",
        name: "Noel Chew",
        profileLink: "/p/noelchew",
        short: "Mobile Application Developer and software entrepreneur @Yuno Solutions",
        tags: ['Mobile', 'Server', 'Frontend']
    }} />
}

const MatheusProfile = () => {
    return <ProfileCard person={{
        imgUrl: "https://avatars.githubusercontent.com/u/21157504?v=4",
        name: "Matheus Aaron",
        profileLink: "/p/pwaaron",
        short: "Marketing Analytics @Shopee and former teaching assistant (python) @National University of Singapore",
        tags: ['AI', 'Database', 'Backend']
    }} />
}

const AbdielProfile = () => {
    return <ProfileCard person={{
        imgUrl: "https://avatars.githubusercontent.com/u/85111427?v=4",
        name: "Abdiel Wilyar Goni",
        profileLink: "/p/abdielwillyar",
        short: "Cloud Computing Instructor @Orbit Future Academy. Keen interest in Internet of Things and voice recognition.",
        tags: ['AI', 'IOT', 'Cloud']
    }} />
}

const AdrienProfile = () => {
    return <ProfileCard person={{
        imgUrl: "https://raw.githubusercontent.com/supertypeai/mischost/main/collective/img/adrien.jpg",
        name: "Adrien",
        profileLink: "/p/dokmy",
        short: "Self-taught developer and indie hacker trying to build things for the world.",
        tags: ['AI', 'Frontend']
    }} />
}

const ChristeigenProfile = () => {
    return <ProfileCard person={{
        imgUrl: "https://avatars.githubusercontent.com/u/104551182?v=4",
        name: "Christeigen Theodore Suhalim",
        profileLink: "/p/christeigen",
        short: "Building the next generation of fintech apps with data and automation @Supertype.ai.",
        tags: ['AI', 'Database', 'Server']
    }} />
}



const PopularTags = () => {
    return (
        <div className="mt-4">
            <h3 className="text-lg font-semibold">🔥 Popular Tags</h3>

            <div className="flex justify-center w-full  mt-2">
                <PopularTagBadge slug="ai" count="10+" />
                <PopularTagBadge slug="data-science" count="10+" />
                <PopularTagBadge slug="machine-learning" count="10+" />
            </div>
        </div>
    )
}


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
        <Mainframe title="Supertype Collective | A network of the builders and makers in analytics, data science, and engineering.">
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
                            <div className="flex flex-row flex-wrap justify-center mt-4">
                                <AurelliaProfile />
                                <SamuelProfile />
                                <VCCalvinProfile />
                                <GeraldProfile />
                                <StaneProfile />
                                <NisaProfile />
                                <PatrickProfile />
                                <TimotiusProfile />
                                <WilsenProfile />
                                <ChristeigenProfile />
                                <BrianProfile />
                                <FiqeyProfile />
                                <DivaProfile />
                                <AdrienProfile />
                                <StevenProfile />
                                <FendyProfile />
                                <OwennProfile />
                                <YevonnaelProfile />
                                <VitoProfile />
                                <MatheusProfile />
                                <AbdielProfile />
                                <NoelProfile />
                            </div>
                            <div className={styles.description}>
                                <div>

                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div className="col-span-3 md:col-span-1 order-first lg:order-last">
                    <YouInputCTA />
                    <PopularTags />
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold my-4">🚧 Collective is building...</h3>
                        {/* first row */}
                        <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 my-2">
                            <div className="card w-54 shadow-xl image-full bg-gray-100 bg-opacity-10">
                                <figure>
                                    <Image src="https://raw.githubusercontent.com/supertypeai/sectors-kb/main/sectorsapp.png"
                                        alt="Superinference"
                                        width={400}
                                        height={240}
                                        className="opacity-30"
                                    />
                                </figure>
                                <div className="card-body p-4">
                                    <h2 className="card-title">Supertype Sectors</h2>
                                    <p className="text-xs">One stop financial data and analytics infrastructure: Indonesia-first market intelligence, in-depth stock research, AI-powered analytics and sector reports.</p>
                                    <div className="card-actions justify-end">
                                        <Link className="btn btn-secondary btn-xs dark:btn-info hover:opacity-75"
                                            href="/r/sectors"
                                        >Explore</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* flex to fit 2 in a row on large screens*/}
                        <div className="flex flex-col md:flex-row md:space-x-4 space-y-2">
                            <div className="card w-54 md:w-46 shadow-xl image-full">
                                <figure>
                                    <Image src="https://raw.githubusercontent.com/supertypeai/collective/main/assets/lightdark.webp"
                                        alt="Supertype Collective"
                                        width={480}
                                        height={200}
                                        className="opacity-30"
                                    />
                                </figure>
                                <div className="card-body p-4">
                                    <h2 className="card-title">Supertype Collective</h2>
                                    <p className="text-xs">Supertype Collective is a community of analytics developers, data scientists and engineering leaders building products across the full stack.</p>
                                    <div className="card-actions justify-end">
                                        <Link className="btn btn-secondary btn-xs dark:btn-info hover:opacity-75"
                                            href="/r/collective"
                                        >Explore</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="card w-54 md:w-46 shadow-xl image-full">
                                <figure>
                                    <Image src="https://raw.githubusercontent.com/onlyphantom/generations-frontend/main/public/supertype_fellowship_p.png"
                                        alt="Supertype Fellowship"
                                        width={480}
                                        height={180}
                                        className="opacity-30"
                                    />
                                </figure>
                                <div className="card-body p-4">
                                    <h2 className="card-title">Supertype Fellowship</h2>
                                    <p className="text-xs">A self-paced Development program where participants learn analytics and software engineering by building real-world projects with a community of peers and mentors.</p>
                                    <div className="card-actions justify-end">
                                        <Link className="btn btn-secondary btn-xs dark:btn-info hover:opacity-75"
                                            href="/r/fellowship"
                                        >Explore</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* second banner row on large screens */}
                        <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 mt-2">
                            <div className="card w-54 shadow-xl image-full bg-black-900 bg-opacity-90">
                                <figure>
                                    <Image src="https://supertype.ai/wp-content/uploads/2022/09/S-Lanscape-02-1024x576.jpg"
                                        alt="Supertype Summary"
                                        width={420}
                                        height={240}
                                        className="opacity-30"
                                    />
                                </figure>
                                <div className="card-body p-4">
                                    <h2 className="card-title">Supertype Summary</h2>
                                    <p className="text-xs">Supertype Summary generates highly polished, analysis-driven PDF reports of any Google Play apps in minutes with <i>no human input</i> by unleashing state-of-the-art NLP on user-generated app reviews. It summarizes key findings, and help identify key factors in your app experience in a way that is fully automatic and reliable.</p>
                                    <div className="card-actions justify-end">
                                        <Link className="btn btn-secondary btn-xs dark:btn-info hover:opacity-75"
                                            href="/r/summary"
                                        >Explore</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* third banner row on large screens */}
                        <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 mt-2">
                            <div className="card w-54 shadow-xl image-full bg-gray-100 bg-opacity-10">
                                <figure>
                                    <Image src="https://user-images.githubusercontent.com/69706675/236219588-6e970684-b78e-42c4-982b-68f415f1818c.png"
                                        alt="Superinference"
                                        width={300}
                                        height={240}
                                        className="opacity-30"
                                    />
                                </figure>
                                <div className="card-body p-4">
                                    <h2 className="card-title">Superinference</h2>
                                    <p className="text-xs">Superinference is a library that infers analysis-ready attributes from a person&apos;s social media username or unique identifier and returns them as JSON objects.

                                        It supports both token-based (OAuth) authorization for authenticated requests and unauthenticated requests for public data.</p>
                                    <div className="card-actions justify-end">
                                        <Link className="btn btn-secondary btn-xs dark:btn-info hover:opacity-75"
                                            href="/r/superinference"
                                        >Explore</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* fourth grid row on large screens */}
                        <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 mt-2">
                            <div className="card w-54 md:w-46 shadow-xl image-full">
                                <figure>
                                    <Image src="https://supertype.ai/wp-content/uploads/2023/03/tsa_positive_tweets.png"
                                        alt="Twitter Sentiment Analyzer"
                                        width={480}
                                        height={180}
                                        className="opacity-30"
                                    />
                                </figure>
                                <div className="card-body p-4">
                                    <h2 className="card-title">Twitter Sentiment Analyzer</h2>
                                    <p className="text-xs">A web app that performs sentiment analysis on the latest tweets based on the entered search term</p>
                                    <div className="card-actions justify-end">
                                        <Link className="btn btn-secondary btn-xs dark:btn-info hover:opacity-75"
                                            href="/r/twitter-sentiment"
                                        >Explore</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="card w-54 md:w-46 shadow-xl image-full">
                                <figure>
                                    <Image src="https://raw.githubusercontent.com/supertypeai/wordpress-posts-react/main/assets/wordpress-blog-feed.png"
                                        alt="Wordpress-posts-react"
                                        width={300}
                                        height={240}
                                        className="opacity-30"
                                    />
                                </figure>
                                <div className="card-body p-4">
                                    <h2 className="card-title">wordpress-posts-react</h2>
                                    <p className="text-xs">A lightweight (&lt;3 kb minified!) set of React hooks &amp; components to asynchronously fetch and display WordPress posts.</p>
                                    <div className="card-actions justify-end">
                                        <Link className="btn btn-secondary btn-xs dark:btn-info hover:opacity-75"
                                            href="/r/wordpress-posts-react"
                                        >Explore</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* fifth grid row on large screens */}
                        <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 mt-2">
                            <div className="card card-side w-54 md:w-46 shadow-xl">
                                <figure>
                                    <Image src="https://raw.githubusercontent.com/divakartika/nomiden/main/images/nomiden2.png"
                                        alt="nomiden"
                                        width={300}
                                        height={240}
                                        className="opacity-30"
                                    />
                                </figure>
                                <div className="card-body p-4">
                                    <h2 className="card-title">Nomiden</h2>
                                    <p className="text-xs">enriches your data from Indonesian ID Numbers, i.e. personal ID number (Nomor Induk Kependudukan, &quot;NIK&quot;) and family ID number (Kartu Keluarga).</p>
                                    <div className="card-actions justify-end">
                                        <Link className="btn btn-secondary btn-xs dark:btn-info hover:opacity-75"
                                            href="/r/nomiden"
                                        >Explore</Link>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* seventh grid row on large screens */}
                        <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 mt-2">
                            <div className="card w-54 shadow-xl image-full bg-gray-100 bg-opacity-10">
                                <figure>
                                    <Image src="https://raw.githubusercontent.com/supertypeai/mischost/main/collective/img/fastlegal_promo.jpeg"
                                        alt="FastLegal"
                                        width={300}
                                        height={240}
                                        className="opacity-30"
                                    />
                                </figure>
                                <div className="card-body p-4">
                                    <h2 className="card-title">FastLegal</h2>
                                    <p className="text-xs">Supercharge your legal research with FastLegal (natural language search, AI-powered summaries and chat)</p>
                                    <div className="card-actions justify-end">
                                        <Link className="btn btn-secondary btn-xs dark:btn-info hover:opacity-75"
                                            href="/r/fastlegal"
                                        >Explore</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <AddDevProfileCTA />
                </div>
            </main>
        </Mainframe >
    );
}

export default Page