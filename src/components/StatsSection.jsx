import React from 'react';
import { Terminal, Shield, Award, Cpu, GitBranch, Layers, Sparkles } from 'lucide-react';

export default function StatsSection() {
  const domainsBreakdown = [
    { domain: 'Web Development', count: '10 Projects', pct: '40%' },
    { domain: 'AI / ML & Data Science', count: '6 Projects', pct: '25%' },
    { domain: 'Mobile App Dev', count: '4 Projects', pct: '16%' },
    { domain: 'IoT & Hardware', count: '2 Projects', pct: '10%' },
    { domain: 'DevOps & Security', count: '2 Projects', pct: '9%' }
  ];

  return (
    <section className="my-16 py-12 px-6 sm:px-8 rounded-3xl glass-panel border border-slate-800 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Side: About Git Club CHARUSAT */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>GIT CLUB CHARUSAT • ECOSYSTEM MATRIX</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading leading-tight">
            Building Practical Software That Solves Real Campus Requirements.
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            Git Club CHARUSAT brings together over 130+ passionate student engineers across <strong className="text-white">CSPIT</strong> (Chandubhai S Patel Institute of Technology), <strong className="text-white">DEPSTAR</strong> (Devang Patel Institute of Advance Technology & Research), and <strong className="text-white">CMPICA</strong> (Srimad Rajchandra Institute of Management & Computer Application).
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-indigo-400 font-mono text-xs font-bold mb-0.5">3 INSTITUTES</div>
              <div className="text-xs text-slate-300">CSPIT • DEPSTAR • CMPICA</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-emerald-400 font-mono text-xs font-bold mb-0.5">OPEN SOURCE</div>
              <div className="text-xs text-slate-300">100% Student Repositories</div>
            </div>
          </div>
        </div>

        {/* Right Side: Domain Distribution Visual */}
        <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800/80 space-y-4">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center justify-between">
            <span>Domain Distribution</span>
            <span className="text-indigo-400">Total 24+ Projects</span>
          </h4>

          <div className="space-y-3">
            {domainsBreakdown.map((item) => (
              <div key={item.domain} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-200 font-medium">{item.domain}</span>
                  <span className="text-slate-400 font-mono">{item.count} ({item.pct})</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                    style={{ width: item.pct }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
