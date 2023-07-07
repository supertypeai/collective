import { useState, useContext, useEffect } from "react";

import { useForm, Controller } from "react-hook-form";

import { AppContext } from "@/contexts/AppContext";
import { Field, Form, Input } from "@/blocks/Form";
import Pills from "@/blocks/Pills";
import Alert from "../Misc/Alert";
import Edit from "@/icons/Edit";

const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

function* range(start, end, step) {
    while (start < end) {
        yield start;
        start += step;
    }
}

const HourInput = ({ keys, name, register, ...props }) => {
    return (
        <input
            {...register("hourly_usd", {
                required:
                "Please provide your hourly rate",
            })}
            type="number" name={name} keys={keys} autoFocus={true}
            placeholder="40"
            className="join-item input input-bordered rounded-none text-black"
        />
    )
}

const SessionScheduler = () => {
    const { isLoggedIn } = useContext(AppContext);

    const [addPanelOpen, setAddPanelOpen] = useState(false)
    const [addWeeklyMode, setAddWeeklyMode] = useState(true)
    const [clickedAdd, setClickedAdd] = useState(false)
    const [recurringDateTime, setRecurringDateTime] = useState({
        'day_of_week': [],
        'hours': []
    })

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm({
    mode: "onSubmit",
    });

    const saveData = (data) => {
        const finalData = {
            ...data,
            ...recurringDateTime
        }
        console.log(finalData)
    };

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
            <Form onSubmit={handleSubmit(saveData)}>
                <div className="badge badge-secondary dark:badge-info mt-2">Weekly recurring session</div>
                <fieldset>
                    <Field 
                        label="Title"
                        hint="Keep this short. Any details should be in the description."
                        error={errors?.title}
                    >
                        <Input 
                            {...register("title", {
                                required:
                                  "Please provide a title for your session",
                            })}
                            id="title" 
                            placeholder="1 on 1 Tutoring Session" 
                            maxLength="25"
                        />
                    </Field>
                </fieldset>

                <fieldset>
                    <Field
                        hint={`Eg. A hourly rate of ${watch("hourly_usd")|| 40}
                         USD/hour for ${watch("duration") || 2}-hour sessions will cost 
                        ${watch("duration") ? watch("duration") * watch("hourly_usd") || 40 : 80}
                        USD per session.`}
                        error={errors?.hourly_usd || errors?.duration}
                    >
                        <div className="join join-vertical lg:join-horizontal mt-4 text-black">
                            <HourInput keys="hourly_usd" name="hourly_usd" register={register} />
                            <span className="join-item btn rounded-none bg-secondary border-none dark:bg-info animate-none">USD/hour</span>
                            <div className="indicator">
                                <span className="indicator-item badge badge-secondary">new</span>
                                <select
                                    {...register("duration", {
                                        required:
                                        "Please provide your session duration",
                                    })}
                                    className="select select-bordered join-item rounded-none"
                                >
                                    <option disabled value={0}>Per Session Duration</option>
                                    <option value={1}>1-hour</option>
                                    <option value={2}>2-hour</option>
                                    <option value={3}>3-hour</option>
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

                <fieldset>
                    <Field label="Available Hours"
                        hint={`Select the hours you can be booked for this session. Times in ${tz} timezone.`}
                    >
                        <Pills
                            name="hours"
                            tags={
                                [...range(0, 24, +watch("duration") || 2)].map((val) => {
                                    // if val is between 0 and 9, add a 0 in front
                                    if (val < 10) {
                                        return `0${val}:00`
                                    }
                                    return `${val}:00`
                                })
                            }
                            onClick={val => {

                                setRecurringDateTime(prev => {
                                    return {
                                        ...prev,
                                        hours:
                                            [...prev.hours, val]
                                    }
                                })
                                console.log("recurringDateTime", recurringDateTime)
                            }}
                        />
                    </Field>
                </fieldset>

                <fieldset>
                    <Field label="Brief Description"
                        hint="Add some details to explain the key value that the mentee will get out of this session"
                        error={errors?.description}
                    >
                        <textarea
                            {...register("description", {
                                required:
                                "Please provide a description of your session",
                            })}
                            id="description"
                            rows="2" required minLength="20" maxLength="220"
                            placeholder="1 on 1 consultation on your startup idea from a feasibility or technical viability perspective. I'll seek to provide honest feedback on your idea & work you through the technical hurdles you might face."
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        />
                    </Field>
                </fieldset>
                <div className="my-4">
                    <button
                        type="submit"
                        className="btn btn-primary text-white"
                    >
                        Submit
                    </button>
                </div>
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
                                        <span className="relative flex h-3 w-3">
                                            {
                                                !clickedAdd && (
                                                    <>
                                                        <span className="absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75 animate-ping" />
                                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-600"></span>
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