import { useContext } from 'react'
import styles from './Ticket.module.scss'

import { AppContext } from '@/contexts/AppContext'

const Ticket = ({ duration, rate, selectedDatetime }) => {

    const { isLoggedIn } = useContext(AppContext);

    return (
        <div>
            <div className={styles.card + " " + styles.cardLeft}>
                <h1 className={styles.h1}>Mentorship <span>Session</span></h1>
                <div className={styles.title}>
                    <h2>General Mentorship</h2>
                    <span>Session Name</span>
                </div>
                <div className={styles.name}>
                    <h2>Aurellia Christie</h2>
                    <span>Mentor&apos;s name</span>
                </div>
                <div className={styles.seat}>
                    <h2>60</h2>
                    <span>minutes</span>
                </div>
                <div className={styles.time}>
                    <h2>17 Sep 2023, 8pm</h2>
                    <span>Asia/Jakarta time</span>
                </div>

            </div>
            <div className={styles.card + " w-[10em] " + styles.cardRight}>
                <div className="eye"></div>
                <div className={styles.eye}></div>
                <div className={styles.number}>
                    <h3>{duration * 60}</h3>
                    <span>mins</span>
                </div>
                {/* checkout button */}

                {isLoggedIn ? (
                    <>
                        <button className="btn btn-info btn-block mt-4 btn-sm">Checkout</button>
                        <p className="text-xs text-gray-400 mt-1 text-center">
                            {`$${rate * duration} USD`}
                        </p>
                    </>
                ) : (
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