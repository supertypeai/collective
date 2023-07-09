import { useState, useContext } from "react";

import { useForm, Controller } from "react-hook-form";

import { AppContext } from "@/contexts/AppContext";
import { Form } from "@/blocks/Form";

import Alert from "../Misc/Alert";

import PreviewAvailability from "./PreviewAvailability";
import CurrentSessions from "./CurrentSessions";
import SessionTitle from "./components/SessionTitle";
import SessionRate from "./components/SessionRate";
import SessionDayOfWeek from "./components/SessionDayOfWeek";
import SessionHours from "./components/SessionHours";
import SessionDesc from "./components/SessionDesc";
import SessionSubmit from "./components/SessionSubmit";
import RecurringModeToggle from "./components/RecurringModeToggle";

import CollapseUp from "@/icons/CollapseUp";
import PingAnimate from "@/icons/PingAnimate";
import SessionDayPicker from "./components/SessionDayPicker";

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
        return <Alert type="info">Please log in to access this feature</Alert>
    }

    if (isLoggedIn && !isLoggedIn.user.canSession) {
        return (
            <Alert type="info">
                Currently in <b>closed private</b>. Please request for your profile to be reviewed to access this feature.
            </Alert>
        )
    }

    const WeeklyRecurring = () => {
        return (
            <Form onSubmit={handleSubmit(saveData)}>
                <div className="badge badge-secondary dark:badge-info mt-2">Weekly recurring session</div>
                <SessionTitle register={register} error={errors?.title} />
                <SessionRate
                    register={register}
                    error={errors?.hourly_usd || errors?.duration}
                    watch={watch}
                />
                <SessionDayOfWeek
                    register={register}
                    error={errors?.day_of_week}
                    recurringDateTime={recurringDateTime}
                    setRecurringDateTime={setRecurringDateTime}
                />
                <SessionHours register={register} error={errors?.hours} watch={watch} recurringDateTime={recurringDateTime} setRecurringDateTime={setRecurringDateTime} />
                <SessionDesc register={register} error={errors?.description} />
                <SessionSubmit />
            </Form >
        )
    }

    const OneTime = () => {
        return (
            // may need to change this to handleSubmit2 to handle one-time events
            <Form onSubmit={handleSubmit(saveData)}>
                <div className="badge badge-info dark:badge-secondary mt-2">One-time session</div>
                <SessionTitle register={register} error={errors?.title} />
                <SessionRate
                    register={register}
                    error={errors?.hourly_usd || errors?.duration}
                    watch={watch}
                />
                <SessionDayPicker register={register} error={errors?.daypicker} watch={watch} recurringDateTime={recurringDateTime} setRecurringDateTime={setRecurringDateTime} />
                <SessionDesc register={register} error={errors?.description} />
                <SessionSubmit />
            </Form >
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
                                addPanelOpen
                                    ? <CollapseUp />
                                    : <span className="relative flex h-3 w-3">
                                        {!clickedAdd && <PingAnimate />}
                                        <span className="btn btn-sm btn-ghost border rounded border-white text-white dark:btn-info">Add a Session +</span>
                                    </span>
                            }
                        </div>
                        <div className="collapse-content bg-gray-100 bg-opacity-10 dark:bg-stone-800 rounded">
                            <h2 className="font-bold uppercase mt-4">Add a Session</h2>
                            <RecurringModeToggle addWeeklyMode={addWeeklyMode} setAddWeeklyMode={setAddWeeklyMode}>
                                {addWeeklyMode ? <WeeklyRecurring /> : <OneTime />}
                            </RecurringModeToggle>
                        </div>
                    </div>
                    <CurrentSessions />
                </div>
                <div className="col-span-3 md:col-span-1 order-first lg:order-last">
                    <h3 className="font-display text-lg font-semibold text-gray-300">Preview Sessions Availability</h3>
                    <div className="container flex flex-col mx-auto mt-4 sm:py-2 h-2/4 rounded">
                        <p className="font-light mx-4 text-sm">This is what visitors will see when they visit your profile.</p>
                        <PreviewAvailability user={{
                            id: isLoggedIn?.user.id,
                            name: isLoggedIn?.user.fullname,
                            email: isLoggedIn?.user.email,
                        }} />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default SessionScheduler