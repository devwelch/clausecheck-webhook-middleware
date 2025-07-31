export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const makeRes = await fetch('https://hook.us2.make.com/1zir3ycxj2ki7m7x8edmixxv5q9cfl29', {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!makeRes.ok) {
      const errorText = await makeRes.text();
      console.error('Make.com response error:', makeRes.status, errorText);
      return res.status(makeRes.status).json({ error: errorText });
    }

    const json = await makeRes.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(json);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'Failed to contact Make.com', details: error.message });
  }
}
