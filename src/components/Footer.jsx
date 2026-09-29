import React from 'react';
import { Code2, ArrowUp, Globe, Heart } from 'lucide-react';
import GithubIcon from './GithubIcon';

export default function Footer({ onScrollToTop }) {
  return (
    <footer className="w-full border-t border-slate-800 bg-[#070a12] text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand info */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white text-base font-heading">GIT CLUB CHARUSAT</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">
                Problem Statement 3
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Build. Collaborate. Ship. • Project Showcase Portfolio
            </p>
          </div>
        </div>

        {/* Links & Socials */}
        <div className="flex items-center gap-4 text-xs">
          <a
            href="https://github.com/gitclub-charusat"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition border border-slate-800"
            title="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href="https://charusat.ac.in"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition border border-slate-800 font-mono text-[11px]"
          >
            charusat.ac.in
          </a>

          {/* Back to Top */}
          <button
            onClick={onScrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 font-semibold transition"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-800/60 text-center text-xs text-slate-400">
        Designed & Built for <strong className="text-slate-300">Git Club CHARUSAT Website Challenge 2026</strong> • Over 130+ Participants Registered
      </div>
    </footer>
  );
}
