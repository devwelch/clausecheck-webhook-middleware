export default async function handler(req, res) {
  // Allow your website domain
  res.setHeader('Access-Control-Allow-Origin', 'https://www.clausecheck.shop');
  // Allow these methods
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  // Allow these headers
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    // Respond OK to preflight requests
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const body = req.body;

    const makeRes = await fetch('https://hook.us2.make.com/1zir3ycxj2ki7m7x8edmixxv5q9cfl29', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const text = await makeRes.text();

    res.status(200).send(text);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to contact Make.com' });
  }
}
