import { buffer } from 'micro';
import { supabase } from "@/lib/supabaseClient";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const config = {
    api: {
      bodyParser: false, // Disable the default bodyParser
    },
};
  
export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Verify the event's signature using the signing secret
        const buf = await buffer(req);
        const sig = req.headers['stripe-signature'];
        try {
            const event = stripe.webhooks.constructEvent(
                buf,
                sig,
                process.env.STRIPE_WEBHOOK_SECRET
            );

            if (event.type === 'payment_intent.succeeded') {
                const paymentIntent = event.data.object;
                
                if (paymentIntent.status === 'succeeded'){
                    const { data, error } = await supabase
                        .from('bookedSession')
                        .insert([
                            {
                                ...paymentIntent.metadata
                            },
                        ]);
    
                    if (error) {
                        console.error('Error inserting payment data into Supabase:', error);
                        return res.status(500).json({ error: 'Failed to insert payment data to Supabase' });
                    }
    
                    return res.status(200).json({ metadata: paymentIntent.metadata });
                }
            }
        } catch (err) {
            res.status(204).end();
            return; // exit the function if the request is not from Collective
        }     
    }

    res.status(405).end();
};