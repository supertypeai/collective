import { useState, useContext, useEffect } from "react";

import { useForm, Controller } from "react-hook-form";

import { AppContext } from "@/contexts/AppContext";
import { Field, Form, Input } from "@/blocks/Form";
import Pills from "@/blocks/Pills";
import Alert from "../Misc/Alert";
import Edit from "@/icons/Edit";

const SessionScheduler = () => {
    const { isLoggedIn } = useContext(AppContext);

    const [addPanelOpen, setAddPanelOpen] = useState(false)
    const [addWeeklyMode, setAddWeeklyMode] = useState(true)
    const [clickedAdd, setClickedAdd] = useState(false)
    const [sessionDuration, setSessionDuration] = useState(null)
    const [recurringDateTime, setRecurringDateTime] = useState({
        'day_of_week': [],
        'time': []
    })

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

    const WeeklyRecurring = () => {
        return (
            <Form onSubmit={() => { console.log("data") }}>
                <div className="badge badge-secondary dark:badge-info mt-2">Weekly recurring session</div>
                <fieldset>
                    <Field label="Title"
                        hint="Give your session a title"
                    >
                        <Input id="title" placeholder="1 on 1 Tutoring Session" />
                    </Field>
                </fieldset>

                <fieldset>
                    <Field
                        hint={`Eg. A hourly rate of 40 USD/hour for ${sessionDuration || 2}-hour sessions will cost 
                        ${sessionDuration ? sessionDuration * 40 : 80}
                        USD per session.`}
                    >
                        <div className="join join-vertical lg:join-horizontal mt-4 text-black">
                            <input type="number" name="hourly_rate" placeholder="40"
                                className="join-item input input-bordered rounded-none" />
                            <span className="join-item btn rounded-none bg-secondary border-none dark:bg-info">USD/hour</span>
                            <div className="indicator">
                                <span className="indicator-item badge badge-secondary">new</span>
                                <select
                                    className="select select-bordered join-item rounded-none"
                                    onChange={(e) => setSessionDuration(e.target.value)}
                                >
                                    <option disabled selected>Per Session Duration</option>
                                    <option value={1}>1-hour</option>
                                    <option value={2}>2-hour</option>
                                    <option value={3}>3-hour</option>
                                    <option value={.5}>30-min</option>
                                </select>
                            </div>
                        </div>
                    </Field>
                </fieldset>

                <fieldset>
                    <Field label="Day of Week"
                        hint="Select the day(s) of the week you want to schedule your session"
                    >
                        <Pills
                            name="day_of_week"
                            tags={['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']}
                            onClick={val => {

                                // append to recurringDateTime['day_of_week']
                                setRecurringDateTime(prev => {
                                    return {
                                        ...prev,
                                        day_of_week:
                                            [...prev.day_of_week, val]
                                    }
                                })
                                console.log("recurringDateTime", recurringDateTime)
                            }}
                        />
                    </Field>
                </fieldset>
            </Form>
        )
    }
    const OneTime = () => {
        return (
            <div>
                Create a one-time session
            </div>
        )
    }

    return (
        <div>
            <main className='min-h-screen grid grid-cols-3 gap-4 mt-8'>
                <div className="col-span-3 md:col-span-2">
                    <div className="collapse">
                        <input type="checkbox" onClick={
                            () => {
                                setAddPanelOpen(prev => !prev)
                                setClickedAdd(true)
                            }
                        } />
                        <div className="collapse-title">
                            {
                                addPanelOpen ? (
                                    <span className="text-info btn btn-ghost">Hide
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                            stroke="currentColor" className="w-6 h-6 ml-2 inline">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                        </svg>
                                    </span>
                                ) :
                                    (
                                        <span class="relative flex h-3 w-3">
                                            {
                                                !clickedAdd && (
                                                    <>
                                                        <span class="absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75 animate-ping" />
                                                        <span class="relative inline-flex rounded-full h-3 w-3 bg-rose-600"></span>
                                                    </>
                                                )
                                            }
                                            <span className="btn btn-sm btn-ghost border rounded border-white text-white dark:btn-info">Add a Session +</span>
                                        </span>
                                    )
                            }
                        </div>
                        <div className="collapse-content bg-gray-100 bg-opacity-10 dark:bg-stone-800 rounded">
                            <h2 className="font-bold uppercase mt-4">Add a Session</h2>
                            <div className="my-1">
                                <div className="label-text mr-2 inline align-middle transition duration-700">
                                    {addWeeklyMode ? "Weekly Recurring Session" : "One-time Session"}
                                </div>
                                <input
                                    type="checkbox"
                                    className="toggle toggle-primary dark:toggle-info align-middle"
                                    checked={addWeeklyMode}
                                    onChange={() => setAddWeeklyMode(prev => !prev)}
                                />
                                {
                                    addWeeklyMode ? <WeeklyRecurring /> : <OneTime />
                                }
                            </div>
                        </div>
                    </div>
                    <div className="md:flex md:flex-row mt-4">
                        <div className="grow">
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
                <div className="col-span-3 md:col-span-1 order-first lg:order-last">
                    <h3 className="font-display text-lg font-semibold text-gray-300">Preview Availability Box</h3>
                    <div className="container flex flex-col mx-auto mt-4 sm:py-2 h-2/4 border rounded">
                        <p className="font-light mx-4 text-sm">This is what visitors will see when they visit your profile.</p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default SessionScheduler