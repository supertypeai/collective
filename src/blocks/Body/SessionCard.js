import { useContext } from 'react';
import { AppContext } from '@/contexts/AppContext';



const SessionCard = ({ data }) => {
    const { isLoggedIn } = useContext(AppContext);

    const SessionPicker = () => {

        return (
            <div className='mb-2'>
                <h4 className='font-bold tracking-tight text-sm'>
                    Book a 1:1 session with {data['fullname']}
                </h4>
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