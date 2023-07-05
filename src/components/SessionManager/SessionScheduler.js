import { useState, useContext, useEffect } from "react";

import { AppContext } from "@/contexts/AppContext";
import Pills from "@/blocks/Pills";
import Alert from "../Misc/Alert";

const SessionScheduler = () => {
    const { isLoggedIn } = useContext(AppContext);

    useEffect(() => {
        console.log(isLoggedIn)
    }, [])

    if (!isLoggedIn) {
        return (
            <div>
                <Alert type="info">
                    You need to log in to access this feature
                </Alert>
            </div>
        )
    }

    if (isLoggedIn && !isLoggedIn.user.canSession) {
        return (
            <div>
                <Alert type="info">
                    Currently in <b>closed private</b>. Please request for your profile to be reviewed to access this feature.
                </Alert>
            </div>
        )
    }

    return (
        <div>
            <main className='min-h-screen grid grid-cols-3 gap-4 mt-8'>
                <div className="col-span-3 md:col-span-2">
                    <div className="md:flex md:flex-row">
                        {/* button float to the right */}
                        <div className="grow">
                            <h3 className="font-display text-lg font-semibold text-gray-300">Current Sessions</h3>
                            <div className="container flex flex-col items-center justify-center mx-auto sm:py-2">
                                <div className="flex flex-row flex-wrap justify-center mt-4">
                                    <div className="flex flex-col justify-center w-full p-2 mx-2 my-4 text-center rounded-md md:w-96 lg:w-44 bg-gray-100 text-white bg-opacity-10 dark:border dark:border-info text-sm lg:text-xs">
                                        <div className="flex-1 mb-3">
                                            <p className="font-semibold tracking-tighter mb-1">
                                                One-on-One Mentoring
                                            </p>
                                            <p>1-hour • $60 • <div className="badge badge-neutral badge-sm">draft</div></p>
                                        </div>
                                        <div className="border-t pb-2" />
                                        <h5 className="font-bold">Every Wednesday</h5>
                                        <div className="flex items-center justify-center py-2 space-x-3 text-xs">
                                            <Pills tags={['1600', '1700', '1900', '2000']} maxWidth="800px" onClick={() => null} />
                                        </div>
                                        <p className="tracking-tighter mb-1">
                                            Anything you need to discuss. From career advice, to technical help, to general guidance on software development in enterprises.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-none w-full lg:w-48">
                            <button className="btn btn-info btn-outline text-white">
                                Add a Session +
                            </button>
                        </div>
                    </div>
                    {/* {JSON.stringify(isLoggedIn.user)} */}
                </div>
                <div className="col-span-3 md:col-span-1 order-first lg:order-last">
                    <h3 className="font-display text-lg font-semibold text-gray-300">Preview Availability Box</h3>
                </div>
            </main>
        </div>
    );
}

export default SessionScheduler