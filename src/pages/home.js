import { useEffect } from "react";
import { Mainframe } from "@/blocks/Mainframe";
import YouInputCTA from "@/components/YouInputCTA";

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
                    <h3 className="font-display text-xl font-bold text-gray-300">Featured Developer Profiles</h3>

                </div>
                <div className="col-span-3 md:col-span-1">
                    <YouInputCTA />
                </div>
            </main>
        </Mainframe >
    );
}

export default Page