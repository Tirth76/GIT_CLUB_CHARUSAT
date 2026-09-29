import React from 'react';
import { Hexagon, ArrowUp, Globe, Heart } from 'lucide-react';
import GithubIcon from './GithubIcon';

export default function Footer({ onScrollToTop }) {
  return (
    <footer className="w-full border-t border-white/10 bg-black/40 backdrop-blur-md text-slate-400 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Footer Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-cyan-600/10 blur-[120px] rounded-t-full pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        
        {/* Brand info */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-400 via-emerald-500 to-green-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(217,70,239,0.3)]">
            <Hexagon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white text-lg font-heading tracking-widest">HACK<span className="text-emerald-400">HUB</span></span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 font-mono border border-cyan-500/30">
                CHARUSAT
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-1 font-light tracking-wide">
              Build • Collaborate • Ship • Win
            </p>
          </div>
        </div>

        {/* Links & Socials */}
        <div className="flex items-center gap-4 text-xs">
          <a
            href="https://github.com/gitclub-charusat"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors border border-white/10 shadow-lg"
            title="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href="https://charusat.ac.in"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors border border-white/10 font-mono text-[11px] shadow-lg"
          >
            charusat.ac.in
          </a>

          {/* Back to Top */}
          <button
            onClick={onScrollToTop}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-emerald-600/20 to-cyan-600/20 hover:from-emerald-600/30 hover:to-cyan-600/30 text-white border border-white/20 font-bold transition-all shadow-lg hover:shadow-[0_0_15px_rgba(217,70,239,0.4)]"
          >
            <span>Top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-white/5 text-center text-xs text-slate-500 relative z-10 font-mono">
        Designed for <strong className="text-cyan-400 font-bold tracking-wide">Git Club CHARUSAT Hackathon 2026</strong> • Unleashing 150+ Elite Hackers
      </div>
    </footer>
  );
}
