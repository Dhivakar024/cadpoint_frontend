import React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { COMPANY_INFO } from '../utils/constants';

import { SEO } from '../components/common/SEO';

export function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy | CADPOINT Authorized Training Centre"
        description="Read CADPOINT's official privacy policy regarding data protection, student registration privacy, and cloud security."
        canonical="/privacy-policy"
      />
      <div className="space-y-10 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center pt-6">
        <Badge variant="purple" className="mb-4">Legal Document</Badge>
        <h1 className="text-4xl font-extrabold text-gradient font-heading">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-400 mt-2">Last updated: January 2026 | {COMPANY_INFO.legalName}</p>
      </div>

      <Card className="p-8 sm:p-12 space-y-6 text-slate-300 text-sm leading-relaxed border-white/10">
        <h2 className="text-xl font-bold text-white font-heading">1. Data Collection & Privacy Commitment</h2>
        <p>
          At CADPOINT ({COMPANY_INFO.legalName}), we respect your personal privacy and are committed to protecting all personal information submitted during course enrollment, student registration, and service enquiries.
        </p>

        <h2 className="text-xl font-bold text-white font-heading">2. Information We Collect</h2>
        <p>
          We collect personal identification details such as your full name, email address, phone number, WhatsApp contact, educational qualifications, employment background, and uploaded verification documents (Resume, Photo, ID Proof) necessary for admissions.
        </p>

        <h2 className="text-xl font-bold text-white font-heading">3. How Your Data Is Used</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Processing student registration and issuing course certificates.</li>
          <li>Sending automated WhatsApp and Email notifications regarding batch schedules, project assignments, and placement opportunities.</li>
          <li>Compliance with statutory educational and regulatory requirements in India.</li>
        </ul>

        <h2 className="text-xl font-bold text-white font-heading">4. Data Protection & Cloud Security</h2>
        <p>
          Your information is securely stored using encrypted database protocols. We do not sell, rent, or lease student or corporate partner data to third parties.
        </p>

        <h2 className="text-xl font-bold text-white font-heading">5. Contact Us Regarding Your Data</h2>
        <p>
          For questions regarding this privacy policy or to update your records, please contact us at <span className="text-cyan-400">{COMPANY_INFO.email}</span>.
        </p>
      </Card>
    </div>
  </>
  );
}
