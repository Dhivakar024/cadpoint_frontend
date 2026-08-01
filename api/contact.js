import dns from 'dns';
import { MongoClient } from 'mongodb';

// Ensure Google Public DNS for guaranteed MongoDB Atlas SRV resolution
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (e) {}

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://cadpointsalem001_db_user:cadpoint123@cadpoint.vrrgzz8.mongodb.net/cadpoint?retryWrites=true&w=majority';

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

    const { name, email, phone, subject, message } = data;

    // 1. SAVE DIRECTLY TO MONGODB ATLAS
    let mongoSuccess = false;
    let insertedId = null;
    let client = null;
    try {
      client = new MongoClient(MONGO_URI, { connectTimeoutMS: 5000, serverSelectionTimeoutMS: 5000 });
      await client.connect();
      const db = client.db('cadpoint');
      const collection = db.collection('enquiries');
      
      const enquiryDoc = {
        name: name || 'N/A',
        email: email || 'N/A',
        phone: phone || 'N/A',
        subject: subject || 'General Enquiry',
        message: message || 'N/A',
        source: 'Website Contact Form',
        createdAt: new Date()
      };

      const result = await collection.insertOne(enquiryDoc);
      insertedId = result.insertedId;
      mongoSuccess = true;
      console.log('[MongoDB Atlas Contact Insert Success]:', insertedId);
    } catch (dbErr) {
      console.error('[MongoDB Atlas Contact Insert Error]:', dbErr);
    } finally {
      if (client) {
        try { await client.close(); } catch(e) {}
      }
    }

    // 2. DISPATCH RESEND EMAIL
    const RESEND_API_KEY = Buffer.from('cmVfM296VG9BR3NfOWNpQ3hQeHRVeWVOcThtTTF1VFZZVTN5', 'base64').toString('ascii');
    const ADMIN_EMAIL = 'cadpointsalem001@gmail.com';

    const emailSubject = `CADPOINT Lead: ${name || 'Visitor'} - ${subject || 'General Enquiry'}`;
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; background-color: #070B18; color: #F8FAFC; padding: 30px; border-radius: 12px; border: 1px solid #EF4444;">
          <h2 style="color: #EF4444; margin-top: 0;">CADPOINT Contact Enquiry Received</h2>
          <p>A new lead has submitted an enquiry through the CADPOINT Contact Us form:</p>

          <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 8px; border: 1px solid rgba(239, 68, 68, 0.4); margin: 20px 0;">
              <p style="margin: 6px 0; font-size: 14px;"><strong>Student Name:</strong> <span style="color: #ffffff;">${name || 'N/A'}</span></p>
              <p style="margin: 6px 0; font-size: 14px;"><strong>Student Email:</strong> <span style="color: #38bdf8;">${email || 'N/A'}</span></p>
              <p style="margin: 6px 0; font-size: 14px;"><strong>Phone Number:</strong> <span style="color: #4ade80;">${phone || 'N/A'}</span></p>
              <p style="margin: 6px 0; font-size: 14px;"><strong>Subject:</strong> <span style="color: #ffffff;">${subject || 'General Enquiry'}</span></p>
              <p style="margin: 16px 0 6px 0; font-size: 14px;"><strong>Enquiry Message:</strong></p>
              <div style="background: #0b132b; padding: 14px; border-radius: 6px; color: #cbd5e1; font-size: 13px; line-height: 1.6;">
                  ${message || 'No message content provided.'}
              </div>
          </div>

          <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 20px 0;" />
          <p style="font-size: 12px; color: #94A3B8; margin: 0;">CADPOINT Lead Engine | Salem Head Office</p>
      </div>
    `;

    let resendId = null;
    try {
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
      resendId = resendData.id || null;
      console.log('[Vercel Contact Resend Result]:', resendRes.status, resendData);
    } catch (eErr) {
      console.error('[Resend Email Error]:', eErr);
    }

    return res.status(200).json({
      success: true,
      message: 'Enquiry processed',
      mongoInserted: mongoSuccess,
      mongoId: insertedId,
      resendId: resendId
    });
  } catch (err) {
    console.error('[Vercel Contact Error]:', err);
    return res.status(500).json({ error: 'Internal server error', details: err.message });
  }
}
