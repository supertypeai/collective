export default async function handler (req, res) {
    if (req.method === 'POST') {
      const { formData } = req.body;
  
      const apiKey = process.env.NEXT_PUBLIC_BREVO_API_KEY;
      const url = 'https://api.brevo.com/v3/smtp/email';
  
      try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
              'api-key': apiKey,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              templateId: 7,
              to: [{ email: "s@supertype.ai"}],
              cc: [{ email: "aurellia@supertype.ai"}],
              params: formData,
            }),
          });
    
          if (response.ok) {
            res.status(200).json({ message: 'Email sent successfully' });
          } else {
            res.status(500).json({ message: 'Failed to send email' });
          }
        } catch (error) {
          res.status(500).json({ message: 'Failed to send email' });
        }
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  };