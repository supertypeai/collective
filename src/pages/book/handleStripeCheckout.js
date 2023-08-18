import getStripe from "@/utils/getStripe";

const handleStripeCheckout = async (event) => {
    event.preventDefault();
    // create a checkout session
    const checkoutSession = await fetchPostJSON(
        '/api/checkout_sessions',
        { amount: billableAmt },
    );

    if (checkoutSession.statusCode === 500) {
        console.error(checkoutSession.message);
        return;
    }

    // redirect to checkout
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
        // Make the id field from the Checkout Session creation API response
        // available to this file, so you can provide it as parameter here
        // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
        sessionId: checkoutSession.id,
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error.message);
};

export default handleStripeCheckout;