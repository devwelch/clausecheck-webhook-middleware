export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Read JSON body from client
    const body = req.body;

    // Forward it to Make.com webhook URL
    const makeRes = await fetch('https://hook.us2.make.com/1zir3ycxj2ki7m7x8edmixxv5q9cfl29', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    // Read text response from Make.com
    const text = await makeRes.text();

    // Allow any origin to access (for CORS)
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Send text back to frontend
    res.status(200).send(text);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to contact Make.com' });
  }
}
