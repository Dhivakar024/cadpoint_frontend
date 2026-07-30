import React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { COMPANY_INFO } from '../utils/constants';

export function Terms() {
  return (
    <div className="space-y-10 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center pt-6">
        <Badge variant="cyan" className="mb-4">Legal Document</Badge>
        <h1 className="text-4xl font-extrabold text-gradient font-heading">
          Terms & Conditions
        </h1>
        <p className="text-xs text-slate-400 mt-2">Last updated: January 2026 | {COMPANY_INFO.legalName}</p>
      </div>

      <Card className="p-8 sm:p-12 space-y-6 text-slate-300 text-sm leading-relaxed border-white/10">
        <h2 className="text-xl font-bold text-white font-heading">1. Introduction</h2>
        <p>
          Welcome to CADPOINT. By registering for our career programs, submitting enquiries, or using our IT services, you agree to comply with the terms set forth below.
        </p>

        <h2 className="text-xl font-bold text-white font-heading">2. Admission & Code of Conduct</h2>
        <p>
          Students are expected to maintain professional decorum during classroom, lab, and online sessions. Minimum attendance requirements apply for certification eligibility.
        </p>

        <h2 className="text-xl font-bold text-white font-heading">3. Intellectual Property</h2>
        <p>
          All courseware, code repositories, design assets, and project material remain the exclusive intellectual property of {COMPANY_INFO.legalName}.
        </p>

        <h2 className="text-xl font-bold text-white font-heading">4. Placement Assistance Disclaimer</h2>
        <p>
          While CADPOINT provides placement drives, resume building, and interview preparation, final job selection depends on individual student performance in recruiter interviews.
        </p>
      </Card>
    </div>
  );
}
