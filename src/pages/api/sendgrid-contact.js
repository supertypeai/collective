import fetch from "node-fetch";

export default async function handler(req, res) {

    if (req.body === null) {
        return res.status(400).json({ data: "Payload required" })
    }

    const url = `https://api.sendgrid.com/v3/marketing/contacts`
    await fetch(
        url, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "contacts": [{
                "email": req.body.email,
            }],
            "list_ids": ["9773871e-6213-4e1d-886a-79de6a337ae2"]
        }),
    })

    return res.status(200).json({ data: "Email added to SendGrid!" })
}
