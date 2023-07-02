import { useContext } from 'react';
import { AppContext } from '@/contexts/AppContext';

const SessionCard = () => {
    const { isLoggedIn } = useContext(AppContext);

    const BookSession = ({ data }) => {
        return (
            <div className="col-span-10 lg:col-span-4 text-white my-8 mx-1 self-start">
                <h3 className="text-lg uppercase font-semibold leading-normal mb-2 my-4">
                    Book a Session</h3>
                <div className="border-white border rounded-lg shadow-lg p-4">
                    <div className="flex items-start flex-row flex-wrap">
                        <h4 className='italic text-sm'>
                            We are hard at work to bring you this feature soon.
                        </h4>
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