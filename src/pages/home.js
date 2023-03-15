import { useEffect } from "react";
import Link from "next/link";
import { Mainframe } from "@/blocks/Mainframe";
import YouInputCTA from "@/components/YouInputCTA";
import ProfileCard from "@/components/ProfileCard";

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
        tags: ['AI', 'Database', 'API', 'Cloud', 'Server']
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
                            <div className="flex flex-row flex-wrap justify-center mt-4">
                                <AurelliaProfile />
                                <SamuelProfile />
                                <VCCalvinProfile />
                                <GeraldProfile />
                                <StaneProfile />
                                <PatrickProfile />
                                <TimotiusProfile />
                                <WilsenProfile />
                            </div>
                        </div>
                    </section>
                </div>
                <div className="col-span-3 md:col-span-1 order-first lg:order-last">
                    <YouInputCTA />
                    <p className="text-xs text-gray-400 text-justify">
                        Collective is a curated community for anyone looking to collaborate on building products across the full stack. By completing a 3-min <Link href="/enroll" className="text-info hover:text-rose-300">
                            enrollment form </Link>, your developer profile will be created with a unique link to share with your network.
                    </p>
                </div>
            </main>
        </Mainframe >
    );
}

export default Page