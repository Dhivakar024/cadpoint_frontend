import React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { COMPANY_INFO } from '../utils/constants';

export function RefundPolicy() {
  return (
    <div className="space-y-10 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center pt-6">
        <Badge variant="emerald" className="mb-4">Legal Document</Badge>
        <h1 className="text-4xl font-extrabold text-gradient font-heading">
          Refund & Cancellation Policy
        </h1>
        <p className="text-xs text-slate-400 mt-2">Last updated: January 2026 | {COMPANY_INFO.legalName}</p>
      </div>

      <Card className="p-8 sm:p-12 space-y-6 text-slate-300 text-sm leading-relaxed border-white/10">
        <h2 className="text-xl font-bold text-white font-heading">1. Registration Fees</h2>
        <p>
          Registration and admission fees paid to CADPOINT cover administrative processing, software licensing, and course materials.
        </p>

        <h2 className="text-xl font-bold text-white font-heading">2. Cancellation Prior to Batch Commencement</h2>
        <p>
          If a student requests cancellation at least 7 days prior to the batch start date, a refund of 80% will be processed after deducting registration overheads.
        </p>

        <h2 className="text-xl font-bold text-white font-heading">3. Batch Transfers</h2>
        <p>
          Students unable to attend scheduled batches due to emergencies may transfer their enrollment to a future batch at no additional charge.
        </p>

        <h2 className="text-xl font-bold text-white font-heading">4. Contact Support</h2>
        <p>
          For refund requests or batch transfer assistance, write to us at <span className="text-cyan-400">{COMPANY_INFO.email}</span>.
        </p>
      </Card>
    </div>
  );
}
