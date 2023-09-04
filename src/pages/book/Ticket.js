import { useState, useContext, useEffect } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { useTheme } from 'next-themes'
import {
    Elements,
    PaymentElement,
    LinkAuthenticationElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";

import styles from './Ticket.module.scss'
import { AppContext } from '@/contexts/AppContext'
import Warning from '@/icons/Warning';
import { numericShortDate } from '@/utils/dateformat';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!stripe) return;

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) return;

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });

    }, [stripe])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setLoading(true)

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // set this to payment completion url
                return_url: window.location.href,
                receipt_email: email
            },
        })
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }

        setLoading(false)
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit} className='mt-4'>
            <LinkAuthenticationElement id="link-authentication-element"
                onChange={(e) => setEmail(e.target.value)} />
            <PaymentElement id="payment-element" />
            <button
                className="btn btn-info btn-block mt-4 btn-sm"
                id="submit"
                disabled={loading || !stripe}
            >
                <span id="button-text">
                    {loading ? <div className="spinner" id="spinner"></div> : "Checkout"}
                </span>
            </button>
            {message && <div id="payment-message">{message}</div>}
        </form>
    )
}


const Checkout = ({ selectedDatetime, billableAmt, metadata }) => {

    const { theme } = useTheme()
    const [clientSecret, setClientSecret] = useState("")

    useEffect(() => {
        // Create PaymentIntent as soon as date and hours chosen
        if (selectedDatetime?.date && selectedDatetime?.hours) {
            fetch("/api/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                    { 
                        items: [{ price: billableAmt, quantity: 1 }],
                        metadata: metadata
                    }
                ),
            })
                .then((res) => res.json())
                .then((data) => setClientSecret(data.clientSecret));
        }
    }, [selectedDatetime]);


    const appearance = {
        // theme: 'night', // 'stripe', 'night', 'flat'
        // if theme === 'dark' use 'night' as theme
        theme: theme === 'dark' ? 'night' : 'flat',
        variables: {
            colorPrimary: '#b1976b',
        },
        rules: {
            '.Label': {
                color: '#b1976b',
            }
        }
    };
    const options = {
        clientSecret,
        appearance,
    };

    const BillableText = () => <div className="text-xs text-gray-400 mt-1 text-center">
        {`$${billableAmt} USD`}
    </div>

    if (!selectedDatetime || Object.keys(selectedDatetime).length < 2
        // ) return <BillableText />
    ) return null;

    if (!clientSecret) return <BillableText />

    return (
        <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    )

}


const Ticket = ({ id, title, mentor, duration, rate, selectedDatetime, displayDatetime, tz }) => {

    const { isLoggedIn } = useContext(AppContext);

    const BillableText = () => <p className="text-xs text-gray-400 mt-1 text-center">
        {`$${duration * rate} USD`}
    </p>

    return (
        <div className='flex flex-col space-y-4'>
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
                            !displayDatetime || Object.keys(displayDatetime).length < 2 ? <h2 className="text-xs mt-1 text-warning">
                                <Warning /> Choose a date &amp; time</h2> :
                                <>
                                    <h2>{
                                        new Date(displayDatetime.date).toLocaleDateString('en-US', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric'
                                        })
                                    }, {displayDatetime.hour}</h2>
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

                    <div className={styles.barcode}></div>
                    <BillableText />
                    {!isLoggedIn &&
                        <p className="text-xs text-gray-400 mt-1">
                            Please sign in first.
                        </p>
                    }

                    {/* {!isLoggedIn ?
                    <div className='text-center'>
                        <div className={styles.barcode}></div>
                        <BillableText />
                        <p className="text-xs text-gray-400 mt-1">
                            Please sign in first.
                        </p>
                    </div>
                    :
                    <BillableText />
                } */}

                </div>

            </div>
            {
                isLoggedIn && selectedDatetime && <div className='mt-4'>
                    <Checkout
                        selectedDatetime={selectedDatetime}
                        billableAmt={duration * rate}
                        metadata={{
                            user: isLoggedIn.user.id,
                            session: id,
                            bill: duration*rate,
                            date: numericShortDate(selectedDatetime?.date),
                            hour: selectedDatetime?.hours
                        }}
                    />
                </div>
            }
        </div>

    )
}

export default Ticket