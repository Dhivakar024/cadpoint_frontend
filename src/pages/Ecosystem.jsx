import React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ECOSYSTEM_DATA } from '../utils/constants';
import { ExternalLink, Building, Sparkles } from 'lucide-react';

export function Ecosystem() {
  return (
    <div className="space-y-16 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center pt-6">
        <Badge variant="red" className="mb-4">Corporate Network</Badge>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-gradient font-heading tracking-tight">
          CADPOINT Ecosystem
        </h1>
        <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
          {ECOSYSTEM_DATA.intro}
        </p>
      </div>

      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            Our Own Brands
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ECOSYSTEM_DATA.ownBrands.map((brand, i) => (
            <Card key={i} className="p-8 flex flex-col justify-between border-red-500/20 group hover:border-red-500/50">
              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {brand.tags.map((tag, idx) => (
                    <Badge key={idx} variant="red" className="text-[10px]">{tag}</Badge>
                  ))}
                </div>
                <h3 className="text-2xl font-bold text-white font-heading mb-3 group-hover:text-red-400 transition-colors">
                  {brand.name}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                  {brand.desc}
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 space-y-4">
                <div className="flex justify-between text-xs text-slate-400 font-medium">
                  <span>Projects Delivered: <strong className="text-white">{brand.projects}+</strong></span>
                  <span>Corporate Clients: <strong className="text-white">{brand.clients}+</strong></span>
                </div>
                <a href={brand.url} target="_blank" rel="noopener noreferrer" className="block w-full">
                  <Button variant="primary" size="sm" className="w-full justify-center" icon={ExternalLink}>
                    Visit Official Website
                  </Button>
                </a>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400">
            <Building className="w-4 h-4" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            Tied-up Companies & Strategic Partners
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ECOSYSTEM_DATA.partnerBrands.map((brand, i) => (
            <Card key={i} className="p-8 flex flex-col justify-between border-slate-800 group hover:border-red-500/40">
              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {brand.tags.map((tag, idx) => (
                    <Badge key={idx} variant="navy" className="text-[10px]">{tag}</Badge>
                  ))}
                </div>
                <h3 className="text-2xl font-bold text-white font-heading mb-3 group-hover:text-red-400 transition-colors">
                  {brand.name}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                  {brand.desc}
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 space-y-4">
                <div className="flex justify-between text-xs text-slate-400 font-medium">
                  <span>Joint Projects: <strong className="text-white">{brand.projects}+</strong></span>
                  <span>Enterprise Clients: <strong className="text-white">{brand.clients}+</strong></span>
                </div>
                <a href={brand.url} target="_blank" rel="noopener noreferrer" className="block w-full">
                  <Button variant="secondary" size="sm" className="w-full justify-center" icon={ExternalLink}>
                    Visit Partner Website
                  </Button>
                </a>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
