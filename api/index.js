export default async function handler(req, res) {
  // ✅ Handle CORS preflight requests
  res.setHeader('Access-Control-Allow-Origin', 'https://www.clausecheck.shop');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    // CORS preflight request — respond with 200 and stop here
    return res.status(200).end();
  }

  // ✅ Handle non-POST methods
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const body = req.body;

    // ✅ Send contract to Make.com webhook
    const makeRes = await fetch('https://hook.us2.make.com/1zir3ycxj2ki7m7x8edmixxv5q9cfl29', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const text = await makeRes.text();

    // ✅ Send result back to frontend
    res.status(200).send(text);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to contact Make.com' });
  }
}
