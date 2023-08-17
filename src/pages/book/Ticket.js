import { useContext } from 'react'
import styles from './Ticket.module.scss'

import { AppContext } from '@/contexts/AppContext'
import Warning from '@/icons/Warning';

const Checkout = ({ selectedDatetime, billableAmt }) => {
    const BillableText = () => <p className="text-xs text-gray-400 mt-1 text-center">
        {`$${billableAmt} USD`}
    </p>

    if (!selectedDatetime || Object.keys(selectedDatetime).length < 2
    ) return <BillableText />

    return <>
        <button className="btn btn-info btn-block mt-4 btn-sm">Checkout</button>
        <BillableText />
    </>

}


const Ticket = ({ title, mentor, duration, rate, selectedDatetime, tz }) => {

    const { isLoggedIn } = useContext(AppContext);

    let hour = null
    if (selectedDatetime && Object.keys(selectedDatetime).length == 2) {
        hour =
            selectedDatetime.hours < 12 ? `${hour}:00 am` : selectedDatetime.hours === 12 ? `${selectedDatetime.hours}:00 pm` : `${selectedDatetime.hours - 12}:00 pm`
    }

    return (
        <div className='my-4'>
            <div className={styles.card + " lg:w-72 " + styles.cardLeft}>
                <h1 className={styles.h1}>Mentorship <span>Session</span></h1>
                <div className={styles.title}>
                    <h2>{title}</h2>
                    <span>Session Name</span>
                </div>
                <div className={styles.name}>
                    <h2>{mentor}</h2>
                    <span>Mentor&apos;s name</span>
                </div>
                <div className={styles.seat}>
                    <h2>{duration * 60}</h2>
                    <span>minutes</span>
                </div>
                <div className={styles.time}>
                    {
                        !selectedDatetime || Object.keys(selectedDatetime).length < 2 ? <h2 className="text-xs mt-1 text-warning">
                            <Warning /> Choose a &amp; time</h2> :
                            <>
                                <h2>{
                                    new Date(selectedDatetime.date).toLocaleDateString('en-US', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric'
                                    })
                                }, {hour}</h2>
                                <span>{tz} Time</span>
                            </>
                    }
                </div>

            </div>
            <div className={styles.card + " w-[10em] " + styles.cardRight}>
                <div className="eye">
                </div>
                <div className={styles.eye}></div>
                <div className={styles.number}>
                    <h3>{duration * 60}</h3>
                    <span>mins</span>
                </div>
                {/* checkout button */}

                {isLoggedIn ? <Checkout
                    selectedDatetime={selectedDatetime}
                    billableAmt={duration * rate}
                />
                    : (
                        <>
                            <div className={styles.barcode}></div>
                            <p className="text-xs text-gray-400 mt-1">
                                Please sign in first.
                            </p>
                        </>
                    )
                }
            </div>

        </div>
    )
}

export default Ticket