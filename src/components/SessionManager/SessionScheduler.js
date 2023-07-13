import { useState, useContext } from "react";

import { useForm, Controller } from "react-hook-form";
import { supabase } from "@/lib/supabaseClient";

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
    const [errorRecurringDateTime, setErrorRecurringDateTime] = useState({
        'day_of_week': "",
        'hours': ""
    })
    const [selectedDate, setSelectedDate] = useState([])
    const [errorDate, setErrorDate] = useState()

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

    const saveData = async (data) => {
        if (addWeeklyMode) {
            const hasEmptyArray = Object.values(recurringDateTime).some((value) => value.length === 0);
            if (hasEmptyArray) {
                const error = {};
                Object.keys(recurringDateTime).forEach((key) => {
                    if (recurringDateTime[key].length === 0) {
                        error[key] = { message: `Please provide your available ${key.split("_")[0]}(s)` }
                    } else {
                        error[key] = "";
                    }
                });
                setErrorRecurringDateTime(error);
                return;
            } else {
                setErrorRecurringDateTime({ day_of_week: "", hours: "" });
            }
        } else {
            if(recurringDateTime.hours.length === 0){
                setErrorRecurringDateTime(prev => {
                    return {
                        ...prev,
                        hours: { message: "Please provide your available hour(s)" }
                    }
                })
                return;
            } else {
                setErrorRecurringDateTime({ day_of_week: "", hours: ""})
            }

            if(selectedDate.length === 0){
                setErrorDate({ message: "Please provide your available date(s)" })
                return;
            } else {
                setErrorDate("")
            }
        }
        
        const date = new Date();
        const tzOffsetMinutes = -date.getTimezoneOffset();
        const finalData = {
            ...data,
            ...recurringDateTime,
            day_of_week: addWeeklyMode ? recurringDateTime.day_of_week : [],
            one_time_date: addWeeklyMode ? [] : selectedDate,
            mentor: isLoggedIn.user.id,
            tz_gmt: tzOffsetMinutes,
            created_at: new Date(),
        };

        const { error } = await supabase.from("sessionManager").insert([finalData]);

        if (error) {
            alert("Sorry, something went wrong. Please try again.");
            console.log(error);
        } else {
            alert("Your session is successfully created!");
            reset()
            setRecurringDateTime({
                'day_of_week': [],
                'hours': []
            })
            setSelectedDate([])
        }
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
            <Form>
                <div className="badge badge-secondary dark:badge-info mt-2">Weekly recurring session</div>
                <SessionTitle register={register} error={errors?.title} />
                <SessionRate
                    register={register}
                    error={errors?.hourly_usd || errors?.duration}
                    watch={watch}
                />
                <SessionDayOfWeek
                    error={errorRecurringDateTime?.day_of_week}
                    recurringDateTime={recurringDateTime}
                    setRecurringDateTime={setRecurringDateTime}
                />
                <SessionHours error={errorRecurringDateTime?.hours} watch={watch} recurringDateTime={recurringDateTime} setRecurringDateTime={setRecurringDateTime} />
                <SessionDesc register={register} error={errors?.description} />
                <SessionSubmit handleSubmit={handleSubmit} saveData={saveData} />
            </Form >
        )
    }

    const OneTime = () => {
        return (
            // may need to change this to handleSubmit2 to handle one-time events
            <Form>
                <div className="badge badge-info dark:badge-secondary mt-2">One-time session</div>
                <SessionTitle register={register} error={errors?.title} />
                <SessionRate
                    register={register}
                    error={errors?.hourly_usd || errors?.duration}
                    watch={watch}
                />
                <SessionDayPicker register={register} errorHours={errorRecurringDateTime?.hours} errorDate={errorDate} watch={watch} recurringDateTime={recurringDateTime} setRecurringDateTime={setRecurringDateTime} selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
                <SessionDesc register={register} error={errors?.description} />
                <SessionSubmit handleSubmit={handleSubmit} saveData={saveData} />
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
                    <CurrentSessions sessions={isLoggedIn?.user.sessions}/>
                </div>
                <div className="col-span-3 md:col-span-1 order-first lg:order-last">
                    <h3 className="font-display text-lg font-semibold text-gray-300">Preview Sessions Availability</h3>
                    <div className="container flex flex-col mx-auto mt-4 sm:py-2 h-2/4 rounded">
                        <p className="font-light mx-4 text-sm">This is what visitors will see when they visit your profile.</p>
                        <PreviewAvailability user={{
                            id: isLoggedIn?.user.id,
                            name: isLoggedIn?.user.fullname,
                            email: isLoggedIn?.user.email,
                            sessions: isLoggedIn?.user.sessions.filter(s => s.is_live === true)
                        }} />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default SessionScheduler