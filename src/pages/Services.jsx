import React, { useState } from 'react';
import { Badge } from '../components/ui/Badge';
import { Accordion } from '../components/ui/Accordion';
import { SERVICES_PAGE_DATA } from '../utils/constants';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Search } from 'lucide-react';

export function Services() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredServices = SERVICES_PAGE_DATA.filter((s) =>
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const accordionItems = filteredServices.map((service) => ({
    title: `${service.id}. ${service.title}`,
    subtitle: service.subtitle,
    content: (
      <div className="space-y-4 pt-2">
        <p className="text-slate-300 text-sm leading-relaxed">{service.content}</p>
        <div className="pt-3 border-t border-white/5 flex items-center justify-between">
          <span className="text-xs text-purple-400 font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Industry Standard Deliverable
          </span>
          <Link to="/contact">
            <Button variant="outline" size="sm" icon={ArrowRight}>
              Enquire For Service
            </Button>
          </Link>
        </div>
      </div>
    ),
  }));

  return (
    <div className="space-y-16 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center pt-6">
        <Badge variant="cyan" className="mb-4">Professional Services</Badge>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-gradient font-heading tracking-tight">
          Services & Technical Solutions
        </h1>
        <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-3xl mx-auto">
          We provide custom software development, student project mentorship, corporate upskilling, CAD drafting, and academic research support.
        </p>
      </div>

      <div className="max-w-md mx-auto relative">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search services (e.g. CAD, Placement, Software)..."
          className="w-full pl-12 pr-4 py-3.5 rounded-xl glass-input text-sm"
        />
      </div>

      <div className="max-w-4xl mx-auto">
        {accordionItems.length > 0 ? (
          <Accordion items={accordionItems} allowMultiple={false} />
        ) : (
          <div className="text-center py-12 glass-card rounded-2xl">
            <p className="text-slate-400 text-base">No services found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
