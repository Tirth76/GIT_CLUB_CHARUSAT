import React from 'react';
import { Hexagon, Sparkles } from 'lucide-react';

export default function StatsSection() {
  const domainsBreakdown = [
    { domain: 'Web Development', count: '10 Projects', pct: '40%' },
    { domain: 'AI / ML & Data Science', count: '6 Projects', pct: '25%' },
    { domain: 'Mobile App Dev', count: '4 Projects', pct: '16%' },
    { domain: 'IoT & Hardware', count: '2 Projects', pct: '10%' },
    { domain: 'DevOps & Security', count: '2 Projects', pct: '9%' }
  ];

  return (
    <section className="my-20 py-16 px-6 sm:px-10 rounded-3xl glass-card relative overflow-hidden group">
      {/* Aurora Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/20 blur-[120px] rounded-full pointer-events-none group-hover:bg-cyan-500/30 transition-colors duration-700" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/20 blur-[120px] rounded-full pointer-events-none group-hover:bg-emerald-500/30 transition-colors duration-700" />
      
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: About Git Club CHARUSAT */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-cyan-400/30 text-cyan-300 text-xs font-bold tracking-widest uppercase backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Hackathon Ecosystem Matrix</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-heading leading-tight drop-shadow-xl">
            Engineered To <span className="gradient-text">Dominate</span> Real-World Problems.
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans font-light">
            Git Club CHARUSAT unites 150+ visionary hackers across <strong className="text-white font-bold">CSPIT</strong>, <strong className="text-white font-bold">DEPSTAR</strong>, and <strong className="text-white font-bold">CMPICA</strong>. We don't just write code; we build the future.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-colors backdrop-blur-md group/box">
              <div className="text-cyan-400 font-mono text-xs font-bold mb-1 group-hover/box:text-cyan-300">3 INSTITUTES</div>
              <div className="text-sm text-slate-200 font-semibold">CSPIT • DEPSTAR • CMPICA</div>
            </div>
            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-colors backdrop-blur-md group/box">
              <div className="text-emerald-400 font-mono text-xs font-bold mb-1 group-hover/box:text-emerald-300">OPEN SOURCE</div>
              <div className="text-sm text-slate-200 font-semibold">100% Student Repositories</div>
            </div>
          </div>
        </div>

        {/* Right Side: Domain Distribution Visual */}
        <div className="p-8 rounded-3xl glass-panel border border-white/10 space-y-6 shadow-2xl relative">
          
          <div className="absolute -top-4 -right-4 text-white/5 pointer-events-none rotate-12">
             <Hexagon className="w-48 h-48" strokeWidth={1} />
          </div>

          <h4 className="text-sm font-bold text-slate-200 uppercase tracking-widest font-mono flex items-center justify-between border-b border-white/10 pb-4">
            <span>Domain Focus</span>
            <span className="text-cyan-400">Total 24+ Projects</span>
          </h4>

          <div className="space-y-5">
            {domainsBreakdown.map((item, i) => (
              <div key={item.domain} className="space-y-2 group/bar">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-slate-200 font-semibold group-hover/bar:text-white transition-colors">{item.domain}</span>
                  <span className="text-cyan-300 font-mono font-bold">{item.count} ({item.pct})</span>
                </div>
                <div className="w-full h-3 rounded-full bg-black/50 overflow-hidden border border-white/5 shadow-inner">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${i % 2 === 0 ? 'from-cyan-500 to-blue-500' : 'from-emerald-500 to-green-500'} relative`}
                    style={{ width: item.pct }}
                  >
                    <div className="absolute top-0 right-0 bottom-0 w-10 bg-gradient-to-r from-transparent to-white/30" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
