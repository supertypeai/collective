import { useState, useContext, useEffect } from "react";

import { useForm, Controller } from "react-hook-form";
import { supabase } from "@/lib/supabaseClient";
import { useQueryClient, useMutation } from "@tanstack/react-query";

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
    const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);

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
    const [isEditting, setIsEditting] = useState(false)

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

    useEffect(() => {
        console.log("isEditting", isEditting)
        if (isEditting && isEditting.day_of_week.length > 0) { 
            setAddWeeklyMode(true)
            setRecurringDateTime({
                'day_of_week': isEditting.day_of_week,
                'hours': isEditting.hours
            })
        } else if (isEditting && isEditting.one_time_date.length > 0) {
            setAddWeeklyMode(false)
            setSelectedDate(isEditting.one_time_date.map(d => new Date(d)))
            setRecurringDateTime({
                'hours': isEditting.hours
            })
        }
    }, [isEditting])

    const queryClient = useQueryClient();
    const { mutate: submitNewSession } = useMutation(
        async (finalData) => {
            const { data, error } = await supabase.from("sessionManager").insert([finalData]);

            if (error) {
                alert("Sorry, something went wrong. Please try again.");
                console.log(error);
            } else {
                alert("Your session is successfully created!");
                reset({})
                setIsLoggedIn(prev => {
                    return {
                        ...prev, 
                        user: {
                            ...prev.user, 
                            sessions: [...prev.user.sessions, data[0]]
                        }
                    }
                })
                setRecurringDateTime({
                    'day_of_week': [],
                    'hours': []
                })
                setSelectedDate([])
                setAddPanelOpen(false)
                setClickedAdd(false)
            }
        },{
            onSuccess: () => {
                queryClient.invalidateQueries("profileData");
              }
        }
    )

    const { mutate: editSession } = useMutation(
        async (finalData) => {
            const { error } = await supabase
                .from("sessionManager")
                .update(finalData)
                .eq("id", finalData.id);

            if (error) {
                alert("Sorry, something went wrong. Please try again.");
                console.log(error);
            } else {
                reset({})
                setIsLoggedIn(prev => {
                    return {
                        ...prev, 
                        user: {
                            ...prev.user, 
                            sessions: prev.user.sessions.map(s => s.id === finalData.id ? finalData : s)
                        }
                    }
                })
                alert("Your session is successfully updated!");
                setRecurringDateTime({
                    'day_of_week': [],
                    'hours': []
                })
                setSelectedDate([])
                setAddWeeklyMode(true)
                setIsEditting(false)
            }
        },{
            onSuccess: () => {
                queryClient.invalidateQueries("profileData");
              }
        }
    )

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
        const tzOffsetMinutes = date.getTimezoneOffset();
        const finalData = {
            ...data,
            ...recurringDateTime,
            day_of_week: addWeeklyMode ? recurringDateTime.day_of_week : [],
            one_time_date: addWeeklyMode ? [] : selectedDate,
            mentor: isLoggedIn.user.id,
            tz_gmt: tzOffsetMinutes,
            created_at: new Date(),
        };

        if (!isEditting) {
            submitNewSession(finalData)
        } else {
            editSession(finalData)
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

    const SessionForm = ({ isEditting, addWeeklyMode, setAddWeeklyMode }) => {
        return (
            <div className="bg-gray-100 bg-opacity-10 dark:bg-stone-800 p-4 rounded mb-4">
                <h2 className="font-bold uppercase">{ !isEditting ? "Add a Session" : "Edit Session" }</h2>
                <RecurringModeToggle addWeeklyMode={addWeeklyMode} setAddWeeklyMode={setAddWeeklyMode}>
                    {addWeeklyMode ? <WeeklyRecurring /> : <OneTime />}
                </RecurringModeToggle>
            </div>
        )
    }

    return (
        <div>
            <main className='min-h-screen grid grid-cols-3 gap-4 mt-8'>
                <div className="col-span-3 md:col-span-2">
                    <div>
                        {
                            !isEditting ? (
                                addPanelOpen
                                    ? <CollapseUp hideCollapse={() => {
                                        setAddPanelOpen(prev => !prev)
                                        }}/>
                                    : <span className="relative flex h-3 w-3">
                                        {!clickedAdd && <PingAnimate />}
                                        <button 
                                            className="btn btn-sm btn-ghost border rounded border-white text-white dark:btn-info"
                                            onClick={
                                                () => {
                                                    setAddPanelOpen(prev => !prev)
                                                    setClickedAdd(true)
                                                }
                                            }
                                        >Add a Session +</button>
                                    </span>
                            ) : (
                                <button
                                    onClick={() => {
                                        setIsEditting(false)
                                        reset({})
                                        setSelectedDate([])
                                        setRecurringDateTime({
                                            'day_of_week': [],
                                            'hours': []
                                        })
                                        setAddWeeklyMode(true)
                                    }}
                                    type="button"
                                    className="text-left"
                                >
                                    {"< Back"}
                                </button>
                            )
                        }
                    </div>
                    { (addPanelOpen || isEditting) && (
                        <SessionForm isEditting={isEditting} addWeeklyMode={addWeeklyMode} setAddWeeklyMode={setAddWeeklyMode}/>
                    )}
                    { !addPanelOpen && !isEditting && (
                        <CurrentSessions sessions={isLoggedIn?.user.sessions} setIsEditting={setIsEditting} reset={reset} />
                    )}
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