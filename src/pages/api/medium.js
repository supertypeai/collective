import parse from "rss-to-json";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { url } = req.body;
    const res_wp = await parse(url);
    return res.status(200).json(res_wp);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error parse Medium blogroll' });
  }
}