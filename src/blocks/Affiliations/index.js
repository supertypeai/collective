
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

                            <div className="ml-10 w-screen max-w-xs sm:max-w-sm xl:max-w-md xl:pr-4">
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