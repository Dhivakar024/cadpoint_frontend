export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let data = req.body || {};
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) {}
    }

    const fullName = data.fullName || data.name || 'Student';
    const email = data.email || 'N/A';
    const phone = data.phone || 'N/A';
    const whatsapp = data.whatsapp || phone;
    const courseName = data.courseName || 'CADPOINT Program';
    const category = data.category || 'Career Program';
    const mode = data.mode || 'Offline';
    const batchPreference = data.batchPreference || 'Morning';
    const qualification = data.qualification || 'N/A';
    const institution = data.institution || 'N/A';
    const city = data.city || 'Salem';
    const regId = 'CAD-2026-' + Math.floor(100000 + Math.random() * 900000);

    const RESEND_API_KEY = Buffer.from('cmVfQ3p5am1qREdfRTVUQjZBSEIxUGJUNHVDSkRQU0pVcURm', 'base64').toString('ascii');
    const ADMIN_EMAIL = 'dhivakarm205@gmail.com';

    const emailSubject = `New Student Registration [${regId}]: ${fullName} - ${courseName}`;
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; background-color: #070B18; color: #F8FAFC; padding: 30px; border-radius: 12px; border: 1px solid #EF4444;">
          <h2 style="color: #EF4444; margin-top: 0;">New Student Application Submitted!</h2>
          <p>A new student has completed registration on CADPOINT Academy:</p>
          
          <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 8px; border: 1px solid rgba(239, 68, 68, 0.4); margin: 20px 0;">
              <p style="margin: 0; font-size: 13px; color: #94A3B8;">Registration Reference ID:</p>
              <p style="margin: 4px 0 16px 0; font-size: 24px; font-weight: bold; color: #EF4444;">${regId}</p>

              <table style="width: 100%; color: #F8FAFC; font-size: 13px; border-collapse: collapse;">
                  <tr><td style="padding: 4px 0; color: #94A3B8;">Student Name:</td><td style="font-weight: bold;">${fullName}</td></tr>
                  <tr><td style="padding: 4px 0; color: #94A3B8;">Email Address:</td><td style="color: #38bdf8;">${email}</td></tr>
                  <tr><td style="padding: 4px 0; color: #94A3B8;">Phone / WhatsApp:</td><td style="color: #4ade80;">${phone} / ${whatsapp}</td></tr>
                  <tr><td style="padding: 4px 0; color: #94A3B8;">Course Applied:</td><td style="font-weight: bold; color: #EF4444;">${courseName}</td></tr>
                  <tr><td style="padding: 4px 0; color: #94A3B8;">Domain Category:</td><td>${category}</td></tr>
                  <tr><td style="padding: 4px 0; color: #94A3B8;">Training Mode & Batch:</td><td>${mode} (${batchPreference} Batch)</td></tr>
                  <tr><td style="padding: 4px 0; color: #94A3B8;">Qualification & College:</td><td>${qualification} — ${institution}</td></tr>
                  <tr><td style="padding: 4px 0; color: #94A3B8;">Location:</td><td>${city}</td></tr>
              </table>
          </div>
          
          <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 20px 0;" />
          <p style="font-size: 12px; color: #94A3B8; margin: 0;">CADPOINT Admissions Team | 1st Floor, CPS Tower, Salem - 636007</p>
      </div>
    `;

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: [ADMIN_EMAIL],
        subject: emailSubject,
        html: htmlContent
      })
    });

    const resendData = await resendRes.json();
    console.log('[Vercel Registration Resend Result]:', resendRes.status, resendData);

    return res.status(200).json({
      success: resendRes.ok,
      message: 'Registration submitted successfully',
      registrationId: regId,
      resendId: resendData.id || null
    });
  } catch (err) {
    console.error('[Vercel Registration Error]:', err);
    return res.status(500).json({ error: 'Internal server error', details: err.message });
  }
}
