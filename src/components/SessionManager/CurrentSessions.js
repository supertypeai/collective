import Image from "next/image"
import Pills from "@/blocks/Pills";
import Edit from "@/icons/Edit";

const CurrentSessions = () => {
    return (
        <div className="md:flex md:flex-row mt-4">
            <div className="grow">
                <div className="m-4 grid justify-items-center relative">
                    <Image src="empty.svg" alt="Create your first Session." width={200} height={200} />
                    <h3 className="font-display text-lg font-semibold text-gray-300">Offer your first Session to get started.</h3>
                    <h3 className="font-display text-lg font-semibold text-gray-300">Current Sessions</h3>
                    <div className="container flex flex-col items-center justify-center mx-auto sm:py-2">
                        <div className="flex flex-row flex-wrap justify-center mt-4">
                            <div className="flex flex-col justify-center w-full p-2 mx-2 my-4 text-center rounded-md md:w-96 lg:w-44 bg-gray-100 text-white bg-opacity-10 dark:border dark:border-info text-sm lg:text-xs">
                                <div className="flex-1 mb-3">
                                    <p className="font-semibold tracking-tighter mb-1">
                                        One-on-One Mentoring
                                    </p>
                                    <p>1-hour • $60 • <span className="badge badge-neutral badge-sm">draft</span>
                                        <Edit />
                                    </p>
                                </div>
                                <div className="border-t pb-2 dark:border-gray-500" />
                                <h5 className="font-bold">Every Wednesday</h5>
                                <div className="flex items-center justify-center py-2 space-x-3 text-xs">
                                    <Pills tags={['1600', '1700', '1900', '2000']} maxWidth="800px" onClick={() => null} />
                                </div>
                                <p className="tracking-tighter mb-1">
                                    Anything you need to discuss. From career advice, to technical help, to general guidance on software development in enterprises.
                                </p>
                            </div>
                            <div className="flex flex-col justify-center w-full p-2 mx-2 my-4 text-center rounded-md md:w-96 lg:w-44 bg-gray-100 text-white bg-opacity-10 dark:border dark:border-info text-sm lg:text-xs">
                                <div className="flex-1 mb-3">
                                    <p className="font-semibold tracking-tighter mb-1">
                                        Technical Code Review: Large Language Models
                                    </p>
                                    <p>2-hour • $80 • <span className="badge badge-secondary badge-sm">live</span>
                                        <Edit />
                                    </p>
                                </div>
                                <div className="border-t pb-2 dark:border-gray-500" />
                                <h5 className="font-bold">Upcoming Fri, 14th July</h5>
                                <div className="flex items-center justify-center py-2 space-x-3 text-xs">
                                    <Pills tags={['1300', '1500', '1700']} maxWidth="800px" onClick={() => null} />
                                </div>
                                <p className="tracking-tighter mb-1">
                                    Anything you need to discuss. From career advice, to technical help, to general guidance on software development in enterprises.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CurrentSessions