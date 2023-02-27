import { useContext } from 'react';
import { MeContext } from '@/contexts/MeContext';

const TimelineDate = ({ period }) => {
    return (
        <div className="hidden timeline-dates md:block w-80 -rotate-90 whitespace-nowrap">
            <div className="md:flex space-x-1 text-xs">{period}</div>
        </div>
    )
}

const Affiliations = () => {

    const affiliations = useContext(MeContext).affiliations;

    return (<>
        <h3 className="text-2xl font-semibold leading-normal mb-2 -700 mb-2">Affiliations</h3>
        <div className="relative mt-5 text-left text-white md:ml-4 md:max-w-[15rem] xl:max-w-none">
            {
                affiliations.map((affiliation, index) => {
                    return (
                        <div className="w-full" key={index}>
                            <TimelineDate period={affiliation['period']} />

                            <div className="border-r-2 border-white opacity-30 absolute h-full left-1 md:left-4 top-2 z-10">
                                <i className="-top-1 -ml-1 absolute">●</i>
                            </div>

                            <div className="ml-10 max-w-[18rem] sm:max-w-sm xl:max-w-md xl:pr-4 w-auto">
                                <div className="font-bold">{affiliation['title']}</div>
                                <div className="italic md:mb-4 text-sm">{affiliation['position']}</div>
                                <div className="mb-4 mt-2 md:hidden">
                                    <div className="font-bold">{affiliation['period']}</div>
                                </div>
                                <div className="mb-10 text-xs w-full lg:w-60 lg:max-w-md xl:w-full">
                                    {
                                        Array.isArray(affiliation['description']) ?
                                            (
                                                <ul className="list-disc">
                                                    {affiliation['description'].map((desc, index) => {
                                                        return <li key={index} className="text-justify">{desc}</li>
                                                    })}
                                                </ul>

                                            )
                                            :
                                            <ul className="list-disc">
                                                <li className="text-justify">{affiliation['description']}</li>
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

export default Affiliations