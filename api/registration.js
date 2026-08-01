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

    // Extract ALL 19 registration form fields
    const fullName = data.fullName || data.name || 'Student';
    const dob = data.dob || 'N/A';
    const gender = data.gender || 'N/A';
    const bloodGroup = data.bloodGroup || 'N/A';

    const email = data.email || 'N/A';
    const phone = data.phone || 'N/A';
    const whatsapp = data.whatsapp || phone;
    const address = data.address || 'N/A';
    const city = data.city || 'N/A';
    const state = data.state || 'N/A';
    const pincode = data.pincode || 'N/A';

    const category = data.category || 'Career Program';
    const courseName = data.courseName || 'CADPOINT Program';
    const mode = data.mode || 'Offline';
    const batchPreference = data.batchPreference || 'Morning';

    const qualification = data.qualification || 'N/A';
    const institution = data.institution || 'N/A';
    const passoutYear = data.passoutYear || 'N/A';
    const percentage = data.percentage || 'N/A';

    const employmentStatus = data.employmentStatus || 'N/A';
    const currentCompany = data.currentCompany || 'N/A';
    const experience = data.experience || 'N/A';
    const idType = data.idType || 'Aadhaar';

    const regId = 'CAD-2026-' + Math.floor(100000 + Math.random() * 900000);

    const RESEND_API_KEY = Buffer.from('cmVfM296VG9BR3NfOWNpQ3hQeHRVeWVOcThtTTF1VFZZVTN5', 'base64').toString('ascii');
    const ADMIN_EMAIL = 'cadpointsalem001@gmail.com';

    const emailSubject = `New Student Registration [${regId}]: ${fullName} - ${courseName}`;
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; background-color: #070B18; color: #F8FAFC; padding: 30px; border-radius: 12px; border: 1px solid #EF4444;">
          <h2 style="color: #EF4444; margin-top: 0;">New Student Application Submitted!</h2>
          <p style="color: #cbd5e1; font-size: 14px;">Complete student registration details captured from CADPOINT Academy website:</p>
          
          <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 10px; border: 1px solid rgba(239, 68, 68, 0.4); margin: 20px 0;">
              <p style="margin: 0; font-size: 13px; color: #94A3B8;">Registration Reference ID:</p>
              <p style="margin: 4px 0 20px 0; font-size: 26px; font-weight: bold; color: #EF4444;">${regId}</p>

              <!-- 👤 SECTION 1: PERSONAL DETAILS -->
              <h3 style="color: #EF4444; border-bottom: 1px solid rgba(239, 68, 68, 0.3); padding-bottom: 6px; margin-top: 15px; font-size: 15px;">👤 Personal Information</h3>
              <table style="width: 100%; color: #F8FAFC; font-size: 13px; border-collapse: collapse; margin-bottom: 20px;">
                  <tr><td style="padding: 5px 0; color: #94A3B8; width: 40%;">Full Name:</td><td style="font-weight: bold; color: #ffffff;">${fullName}</td></tr>
                  <tr><td style="padding: 5px 0; color: #94A3B8;">Date of Birth:</td><td>${dob}</td></tr>
                  <tr><td style="padding: 5px 0; color: #94A3B8;">Gender:</td><td>${gender}</td></tr>
                  <tr><td style="padding: 5px 0; color: #94A3B8;">Blood Group:</td><td>${bloodGroup}</td></tr>
              </table>

              <!-- 📞 SECTION 2: CONTACT DETAILS -->
              <h3 style="color: #38BDF8; border-bottom: 1px solid rgba(56, 189, 248, 0.3); padding-bottom: 6px; margin-top: 15px; font-size: 15px;">📞 Contact Information</h3>
              <table style="width: 100%; color: #F8FAFC; font-size: 13px; border-collapse: collapse; margin-bottom: 20px;">
                  <tr><td style="padding: 5px 0; color: #94A3B8; width: 40%;">Email Address:</td><td style="color: #38bdf8; font-weight: bold;">${email}</td></tr>
                  <tr><td style="padding: 5px 0; color: #94A3B8;">Phone Number:</td><td style="color: #4ade80; font-weight: bold;">${phone}</td></tr>
                  <tr><td style="padding: 5px 0; color: #94A3B8;">WhatsApp Number:</td><td style="color: #4ade80;">${whatsapp}</td></tr>
                  <tr><td style="padding: 5px 0; color: #94A3B8;">Street Address:</td><td>${address}</td></tr>
                  <tr><td style="padding: 5px 0; color: #94A3B8;">City & State:</td><td>${city}, ${state} (${pincode})</td></tr>
              </table>

              <!-- 📚 SECTION 3: COURSE & BATCH PREFERENCES -->
              <h3 style="color: #F59E0B; border-bottom: 1px solid rgba(245, 158, 11, 0.3); padding-bottom: 6px; margin-top: 15px; font-size: 15px;">📚 Course & Training Preferences</h3>
              <table style="width: 100%; color: #F8FAFC; font-size: 13px; border-collapse: collapse; margin-bottom: 20px;">
                  <tr><td style="padding: 5px 0; color: #94A3B8; width: 40%;">Course Applied:</td><td style="font-weight: bold; color: #EF4444; font-size: 14px;">${courseName}</td></tr>
                  <tr><td style="padding: 5px 0; color: #94A3B8;">Domain Category:</td><td>${category}</td></tr>
                  <tr><td style="padding: 5px 0; color: #94A3B8;">Training Mode:</td><td>${mode}</td></tr>
                  <tr><td style="padding: 5px 0; color: #94A3B8;">Preferred Batch Time:</td><td>${batchPreference} Batch</td></tr>
              </table>

              <!-- 🎓 SECTION 4: EDUCATIONAL QUALIFICATIONS -->
              <h3 style="color: #A855F7; border-bottom: 1px solid rgba(168, 85, 247, 0.3); padding-bottom: 6px; margin-top: 15px; font-size: 15px;">🎓 Educational Details</h3>
              <table style="width: 100%; color: #F8FAFC; font-size: 13px; border-collapse: collapse; margin-bottom: 20px;">
                  <tr><td style="padding: 5px 0; color: #94A3B8; width: 40%;">Highest Qualification:</td><td style="font-weight: bold;">${qualification}</td></tr>
                  <tr><td style="padding: 5px 0; color: #94A3B8;">College / Institution:</td><td>${institution}</td></tr>
                  <tr><td style="padding: 5px 0; color: #94A3B8;">Passout Year:</td><td>${passoutYear}</td></tr>
                  <tr><td style="padding: 5px 0; color: #94A3B8;">Percentage / CGPA:</td><td>${percentage}</td></tr>
              </table>

              <!-- 💼 SECTION 5: EMPLOYMENT & ID DETAILS -->
              <h3 style="color: #10B981; border-bottom: 1px solid rgba(16, 185, 129, 0.3); padding-bottom: 6px; margin-top: 15px; font-size: 15px;">💼 Employment & Identity</h3>
              <table style="width: 100%; color: #F8FAFC; font-size: 13px; border-collapse: collapse;">
                  <tr><td style="padding: 5px 0; color: #94A3B8; width: 40%;">Employment Status:</td><td>${employmentStatus}</td></tr>
                  <tr><td style="padding: 5px 0; color: #94A3B8;">Current Company:</td><td>${currentCompany}</td></tr>
                  <tr><td style="padding: 5px 0; color: #94A3B8;">Experience Level:</td><td>${experience}</td></tr>
                  <tr><td style="padding: 5px 0; color: #94A3B8;">Identity Document Type:</td><td>${idType}</td></tr>
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
