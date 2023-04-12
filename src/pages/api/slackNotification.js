import { IncomingWebhook } from '@slack/webhook';

const webhookUrl = process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { message } = req.body;
    const webhook = new IncomingWebhook(webhookUrl);
    await webhook.send({ text: message });
    return res.status(200).json({ message: 'Slack notification sent successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error sending Slack notification' });
  }
}