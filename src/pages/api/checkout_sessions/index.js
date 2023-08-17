const params = {
    submit_type: 'pay',
    payment_method_types: ['card'],
    line_items: [
        {
            name: 'Mentorship Session',
            amount: formatAmountForStripe(billableAmt, 'usd'),
            // change this to the price ID generated in the Stripe dashboard
            price: 'price_1JZ5ZtG8Y0zjQJZ3X0Z2QX9t',
            quantity: 1,
        },
    ],
    success_url: `${req.headers.origin}/book/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.origin}/book/cancel?session_id={CHECKOUT_SESSION_ID}`,
};

const checkoutSession = await stripe.checkout.sessions.create(params);
