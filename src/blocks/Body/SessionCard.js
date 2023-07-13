import { useContext } from 'react';
// import { supabase } from "@/lib/supabaseClient";
// import { useQuery } from "@tanstack/react-query";

import { AppContext } from '@/contexts/AppContext';
import Recurring from '@/icons/Recurring';

export const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const extractDayFromDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleString('default', { weekday: 'short' });
}

export const shortDate = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleString('default', { month: 'short', day: 'numeric' });
}

const OneTimeSession = ({ sessionData }) => {
    return (
        <div className='col-span-4 text-center text-xs border rounded'>
            <div className='uppercase text-info'>{sessionData.title}</div>
            <div className='font-bold text-md'>
                <span className='font-light'>{extractDayFromDateTime(sessionData.one_time_date[0])},</span>
                &nbsp;{shortDate(sessionData.one_time_date[0])}&nbsp;
                {sessionData.one_time_date.length > 1 &&
                    <span className="tooltip tooltip-info" data-tip="More available dates">
                        &nbsp;
                        <span className="badge badge-warning dark:badge-info badge-xs font-light text-[0.7em]">+{sessionData.one_time_date.length - 1}</span>
                    </span>
                }
            </div>
            <div className='uppercase'>19:30</div>
        </div>
    )
}

const RecurringSession = ({ sessionData }) => {
    return (
        <div className='col-span-4 text-center text-xs border rounded'>
            <div className='uppercase text-info'>{sessionData.title}</div>
            <div className='font-bold text-md'>
                <span className='font-light'>FRI,</span>
                &nbsp;20 Jul&nbsp;
                <div className="tooltip tooltip-info" data-tip="Every Friday">
                    <Recurring />
                </div>
            </div>
            <div className='uppercase'>19:30</div>
        </div>
    )
}


const Sessions = ({ sessionData }) => {
    if (sessionData && sessionData.length > 0)
        return sessionData.map((sessionData) => {
            return sessionData.one_time_date.length > 0 ?
                <OneTimeSession sessionData={sessionData} />
                : <RecurringSession sessionData={sessionData} />
        })

    else {
        return null
    }
}

// const fetchSessionOfUser = async (userId) => {
//     const { data, error } = await supabase
//         .from('sessionManager')
//         .select()
//         .eq('mentor', userId)
//         .order('created_at', { ascending: false })

//     if (error) throw new Error(error, "Error fetching session")

//     if (!data) throw new Error("No session found")
//     return data
// }

const SessionCard = ({ data }) => {
    const { isLoggedIn } = useContext(AppContext);

    const SessionPicker = () => {

        return (
            <div className='mb-2'>
                <h4 className='font-bold tracking-tight text-sm'>
                    Book a 1:1 session with {data['fullname']}
                </h4>
                <p className='text-xs text-gray-400'>
                    {`Session times displayed in ${tz}`}
                </p>


                <div className='grid grid-cols-12 gap-2 mt-2'>
                    <Sessions sessionData={data['sessions']} />
                </div>

                {/* 3 x 2 grid */}
                <div className='grid grid-cols-12 gap-2 mt-2'>
                    <div className='col-span-4 text-center text-xs border rounded'>
                        <div className='uppercase'>Thu</div>
                        <div className='font-extrabold text-md'>20 Jul</div>
                        <div className='uppercase'>19:30</div>
                    </div>
                    <div className='col-span-4 text-center text-xs border rounded'>
                        <div className='uppercase'>Fri</div>
                        <div className='font-extrabold text-md'>21 Jul</div>
                        <div className='uppercase'>18:00</div>
                    </div>
                    <div className='col-span-4 text-center text-xs border rounded'>
                        <div className='uppercase'>Thu</div>
                        <div className='font-extrabold text-md'>27 Jul</div>
                        <div className='uppercase'>19:30</div>
                    </div>
                    <div className='col-span-4 text-center text-xs border rounded'>
                        <div className='uppercase'>Thu</div>
                        <div className='font-extrabold text-md'>28 Jul</div>
                        <div className='uppercase'>16:00</div>
                    </div>
                    <div className='col-span-4 text-center text-xs border rounded'>
                        <div className='uppercase'>Thu</div>
                        <div className='font-extrabold text-md'>28 Jul</div>
                        <div className='uppercase'>17:00</div>
                    </div>
                </div>
            </div>
        )
    }

    const BookSession = () => {
        return (
            <div className="col-span-10 lg:col-span-4 text-white mx-1 self-start">
                <h3 className="text-lg uppercase font-semibold leading-normal mb-2 my-4">
                    Book a Session</h3>
                <div className="border-white border rounded-lg shadow-lg p-4">
                    <div className="flex items-start flex-row flex-wrap">
                        <SessionPicker />
                        <div className='italic text-sm text-white'>
                            <span className='text-xs'>
                                Slots are in your local timezone. Feature to be added soon.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (isLoggedIn) return <BookSession />
    return (
        <div>
            Please sign in to access this feature.
            <label htmlFor="enquire-modal"
                className="btn btn-outline btn-xs rounded hover:bg-rose-700">Enquire</label>
        </div>
    )
}

export default SessionCard