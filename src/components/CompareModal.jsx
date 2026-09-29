import React from 'react';
import { X, Scale, Star, ExternalLink, Hexagon } from 'lucide-react';
import GithubIcon from './GithubIcon';

export default function CompareModal({ comparedProjects, onClose, onRemoveCompare }) {
  if (!comparedProjects || comparedProjects.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-5xl flex flex-col rounded-3xl glass-card border border-white/20 shadow-[0_0_50px_rgba(217,70,239,0.15)] overflow-hidden text-slate-100 my-auto">
        
        {/* Decorative Aurora glow inside modal */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-cyan-500/10 via-emerald-500/10 to-green-600/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

        {/* Header */}
        <div className="flex items-center justify-between p-6 sm:p-8 border-b border-white/10 bg-black/40 backdrop-blur-md relative z-10">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-emerald-500 to-green-600 text-white shadow-[0_0_20px_rgba(217,70,239,0.4)]">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white font-heading tracking-wide">Matrix Comparison</h3>
              <p className="text-sm text-emerald-300 font-mono mt-1">Analyzing {comparedProjects.length} Systems Side-by-Side</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-all border border-transparent hover:border-white/20 hover:rotate-90">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Table Grid */}
        <div className="p-6 sm:p-8 overflow-x-auto relative z-10 custom-scrollbar">
          <div className={`grid grid-cols-1 md:grid-cols-${Math.max(2, comparedProjects.length)} gap-6 min-w-[600px]`}>
            {comparedProjects.map((proj) => (
              <div key={proj.id} className="p-6 rounded-3xl glass-panel border border-white/10 space-y-5 relative group hover:border-cyan-500/40 transition-colors">
                
                {/* Background Glow for each card */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Remove from compare button */}
                <button
                  onClick={() => onRemoveCompare(proj.id)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-slate-400 hover:text-rose-400 border border-white/10 transition-colors z-20 backdrop-blur-md hover:border-rose-500/50"
                  title="Remove from matrix"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Thumbnail */}
                <div className="relative overflow-hidden rounded-2xl border border-white/10 group-hover:border-cyan-500/30 transition-colors">
                  <img src={proj.thumbnail} alt={proj.title} className="w-full h-36 object-cover opacity-80 mix-blend-luminosity group-hover:mix-blend-normal group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <span className="absolute bottom-3 left-3 text-[10px] font-mono text-cyan-300 uppercase tracking-widest font-bold bg-black/60 px-2 py-1 rounded backdrop-blur-md border border-cyan-500/30">
                    {proj.domain}
                  </span>
                </div>

                <div>
                  <h4 className="text-xl font-black text-white font-heading tracking-wide drop-shadow-md">{proj.title}</h4>
                </div>

                {/* Metrics */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/10 shadow-inner">
                  <span className="text-sm font-semibold text-slate-400">Reputation</span>
                  <span className="font-black text-white flex items-center gap-1.5 drop-shadow-[0_0_10px_rgba(217,70,239,0.5)]">
                    <Star className="w-4 h-4 text-emerald-400 fill-emerald-400" /> {proj.upvotes}
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] text-cyan-400 font-mono font-bold uppercase tracking-widest block">Tech Stack</span>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.techStack.map(t => (
                      <span key={t} className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg bg-white/5 text-slate-200 border border-white/10">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] text-rose-400 font-mono font-bold uppercase tracking-widest block flex items-center gap-1">
                    <Hexagon className="w-3 h-3" /> The Problem
                  </span>
                  <p className="text-xs text-slate-300 line-clamp-3 font-light leading-relaxed">{proj.problem}</p>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] text-emerald-400 font-mono font-bold uppercase tracking-widest block flex items-center gap-1">
                    <Hexagon className="w-3 h-3" /> The Solution
                  </span>
                  <p className="text-xs text-slate-300 line-clamp-3 font-light leading-relaxed">{proj.solution}</p>
                </div>

                {/* Links */}
                <div className="pt-4 flex items-center gap-3 border-t border-white/10">
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs text-center border border-white/20 transition-all flex items-center justify-center gap-2 backdrop-blur-md"
                  >
                    <GithubIcon className="w-4 h-4" /> Source
                  </a>
                  {proj.demo && (
                    <a
                      href={proj.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs text-center transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                    >
                      <ExternalLink className="w-4 h-4" /> Demo
                    </a>
                  )}
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
