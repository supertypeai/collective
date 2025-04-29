import { useContext } from 'react';
import { MeContext } from '@/contexts/MeContext';

const formatDateToMonthYear = (date) => {
    const dateObj = new Date(date);
    const month = dateObj.toLocaleString('en-US', { month: 'short' });
    const year = dateObj.getFullYear();
    return `${month}' ${year}`;
}

const TimelineDate = ({ period }) => {
    return (
        <div className="hidden timeline-dates md:block w-80 -rotate-90 whitespace-nowrap">
            <div className="md:flex space-x-1 text-xs">{period}</div>
        </div>
    )
}

const Affiliations = () => {

    const affiliations = useContext(MeContext)?.affiliations;

    return (<>
        <h3 className="text-2xl font-semibold leading-normal mb-2">Affiliations</h3>
        <div className="relative mt-5 text-left text-white md:ml-4 md:max-w-[15rem] xl:max-w-none" id="affiliations">
            {
                affiliations && 
                Object.keys(affiliations).map((key, index) => {
                    const affiliation = affiliations[key];
                    if (affiliation.title) {
                        return (
                            <div className="w-full" key={index} id={`aff-${index}`}>
                                <TimelineDate period={`${`${formatDateToMonthYear(affiliation.start)} - ${affiliation.end ? formatDateToMonthYear(affiliation.end) : "Present"}`}`} />

                                <div className="border-r-2 border-white opacity-30 absolute h-full left-1 md:left-4 top-2 z-10">
                                </div>

                                <div className="ml-4 sm:ml-10 max-w-[18rem] sm:max-w-sm xl:max-w-md xl:pr-4 w-auto">
                                    <div className="font-bold">{affiliation['title']}</div>
                                    <div className="italic md:mb-4 text-sm">{affiliation['position']}</div>
                                    <div className="mb-4 mt-2 md:hidden">
                                        <div className="font-bold text-xs">{`${formatDateToMonthYear(affiliation.start)} - ${affiliation.end ? formatDateToMonthYear(affiliation.end) : "Present"}`}</div>
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
                    }
                })
            }
        </div>
    </>
    )
}

export default Affiliations