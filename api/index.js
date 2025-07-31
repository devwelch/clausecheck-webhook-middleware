export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const makeRes = await fetch('https://hook.us2.make.com/1zir3ycxj2ki7m7x8edmixxv5q9cfl29', {
      method: 'POST',
      body: req.body,
      headers: {
        'Content-Type': req.headers['content-type'],
      },
    });

    // Try to parse the response as JSON
    const contentType = makeRes.headers.get('content-type') || '';
    let responseData;

    if (contentType.includes('application/json')) {
      responseData = await makeRes.json(); // If Make returns JSON
    } else {
      const text = await makeRes.text(); // If Make returns plain text
      responseData = { result: text };   // Wrap it in a JSON object
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(responseData); // ✅ Return JSON properly
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to contact Make.com' });
  }
}
