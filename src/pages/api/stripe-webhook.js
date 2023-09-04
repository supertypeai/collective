import { supabase } from "@/lib/supabaseClient";

export const config = {
    api: {
      bodyParser: true,
    },
  };
  
  export default async function handler(req, res) {
    if (req.method === 'POST') {
      const event = req.body;
  
      // Handle the Stripe payment success event
      if (event.type === 'payment_intent.succeeded') {
        const { paymentIntent } = event.data.object;

        const { data, error } = await supabase
          .from('bookedSession')
          .insert([
            {
              paymentIntent
            },
          ]);
        if (error) {
          console.error('Error inserting payment data into Supabase:', error);
          return res.status(500).json({ error: 'Failed to insert payment data' });
        }
  
        return res.status(200).json({ received: true });
      }
    }
  
    res.status(405).end();
  };
  