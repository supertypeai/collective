import { useEffect, useContext } from "react";
import Link from "next/link";
import { Mainframe } from "@/blocks/Mainframe";
import YouInputCTA from "@/components/YouInputCTA";
import ProfileCard from "@/components/ProfileCard";
import { AppContext } from "@/contexts/AppContext";
import AddDevProfileCTA from "@/components/AddDevProfileCTA";
import PopularTagBadge from "@/components/PopularTagBadge";

import styles from '@/styles/Home.module.css'

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
        tags: ['AI', 'Server']
    }} />
}

const WilsenProfile = () => {
    return <ProfileCard person={{
        imgUrl: "https://avatars.githubusercontent.com/u/113084785",
        name: "Geraldus Wilsen",
        profileLink: "/p/wilsen",
        short: "Data Scientist @Supertype.ai. Builds amazing dashboards that ties analysis and visualization together.",
        tags: ['AI', 'Dashboard']
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
        imgUrl: "https://media.licdn.com/dms/image/C5603AQGhkBvqkMjz6g/profile-displayphoto-shrink_200_200/0/1593682236390?e=1684972800&v=beta&t=L7tMwyheXMS6onUyua3VmjNU6CnXHEIllbzgzEGg99w",
        name: "Steven Christian",
        profileLink: "/p/auberg",
        short: "Head of Data Analytics @Danamas. Led teams in building machine learning solutions for companies in the last 3 years.",
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
        imgUrl: "https://media.licdn.com/dms/image/C5603AQGs3KGCH0sosg/profile-displayphoto-shrink_800_800/0/1650428580016?e=2147483647&v=beta&t=YHbcliPKaxkyS1LSyItgl42pRiMAPJI-1v-nE2lIcE4",
        name: "Yevonnael Andrew",
        profileLink: "/p/yevonnael",
        short: "Cybersecurity and Software Engineer @AAG, Cybersecurity Researcher @Swiss German University. Works in Web3.",
        tags: ['AI', 'Cybersecurity', 'Blockchain', 'Database']
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


const PopularTags = () => {
    return (
        <div className="mt-4">
            <h3 className="text-lg font-semibold">🔥 Popular Tags</h3>

            <div className="flex justify-center w-full text-center mt-2">
                <PopularTagBadge slug="ai" count="8" />
                <PopularTagBadge slug="data-science" />
                <PopularTagBadge slug="machine-learning" />
            </div>
        </div>
    )
}


const Page = () => {

    const { isLoggedIn } = useContext(AppContext);

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
                                <PatrickProfile />
                                <TimotiusProfile />
                                <WilsenProfile />
                                <DivaProfile />
                                <StevenProfile />
                                <FiqeyProfile />
                                <OwennProfile />
                                <YevonnaelProfile />
                                <NoelProfile />
                                <FendyProfile />
                                <MatheusProfile />
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
                    <AddDevProfileCTA />
                </div>
            </main>
        </Mainframe >
    );
}

export default Page