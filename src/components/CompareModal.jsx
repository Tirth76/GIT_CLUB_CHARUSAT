import React from 'react';
import { X, Scale, Star, ExternalLink, Check, AlertCircle } from 'lucide-react';
import GithubIcon from './GithubIcon';

export default function CompareModal({ comparedProjects, onClose, onRemoveCompare }) {
  if (!comparedProjects || comparedProjects.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl flex flex-col rounded-3xl glass-panel border border-slate-700/80 shadow-2xl overflow-hidden text-slate-100 my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-heading">Side-by-Side Project Comparison</h3>
              <p className="text-xs text-slate-400">Comparing {comparedProjects.length} Git Club Projects</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Table Grid */}
        <div className="p-6 overflow-x-auto">
          <div className={`grid grid-cols-1 md:grid-cols-${comparedProjects.length} gap-4 min-w-[600px]`}>
            {comparedProjects.map((proj) => (
              <div key={proj.id} className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 relative group">
                
                {/* Remove from compare button */}
                <button
                  onClick={() => onRemoveCompare(proj.id)}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-950 text-slate-400 hover:text-rose-400 border border-slate-800 transition"
                  title="Remove from comparison"
                >
                  <X className="w-3.5 h-3.5" />
                </button>

                {/* Thumbnail */}
                <img src={proj.thumbnail} alt={proj.title} className="w-full h-32 object-cover rounded-xl border border-slate-800" />

                <div>
                  <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider">{proj.domain}</span>
                  <h4 className="text-base font-bold text-white font-heading">{proj.title}</h4>
                </div>

                {/* Metrics */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                  <span className="text-slate-400">Stars</span>
                  <span className="font-bold text-amber-400 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" /> {proj.upvotes}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-mono block">Tech Stack</span>
                  <div className="flex flex-wrap gap-1">
                    {proj.techStack.map(t => (
                      <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-mono block">Problem Statement</span>
                  <p className="text-xs text-slate-300 line-clamp-3">{proj.problem}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-mono block">Solution</span>
                  <p className="text-xs text-slate-300 line-clamp-3">{proj.solution}</p>
                </div>

                {/* Links */}
                <div className="pt-2 flex items-center gap-2">
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-[11px] text-center border border-slate-800 transition flex items-center justify-center gap-1"
                  >
                    <GithubIcon className="w-3.5 h-3.5" /> GitHub
                  </a>
                  {proj.demo && (
                    <a
                      href={proj.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] text-center transition flex items-center justify-center gap-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Demo
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
