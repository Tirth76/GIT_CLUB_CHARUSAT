import React from 'react';
import { Sparkles, Code2, Users, Rocket, Award, ShieldCheck, ArrowRight, Flame, Terminal } from 'lucide-react';

export default function HeroSection({ totalProjects, totalUpvotes, onOpenSubmitModal, onScrollToProjects }) {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24 bg-gradient-to-b from-[#0d1322] via-[#090d16] to-[#090d16]">
      
      {/* Background Glowing Ambient Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-blue-500/10 blur-[120px] rounded-full pointer-events-none animate-pulse-glow" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Top University Event Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-6 shadow-inner backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-indigo-400 animate-spin-slow" />
          <span>GIT CLUB CHARUSAT • TECHNICAL EVENT CHALLENGE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.15] mb-6 font-heading">
          Where <span className="gradient-text">130+ Student Builders</span> Turn Bold Code Into Reality.
        </h1>

        {/* Hero Subtitle */}
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed mb-8">
          Explore real-world software, vision AI models, mobile apps, IoT lab monitors, and open-source tools created by <strong className="text-indigo-400 font-semibold">Git Club CHARUSAT</strong> members across CSPIT, DEPSTAR & CMPICA.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <button
            onClick={onScrollToProjects}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/25 hover:shadow-indigo-600/40 hover:-translate-y-0.5 active:translate-y-0 transition-all"
          >
            <Rocket className="w-4 h-4" />
            <span>Explore Project Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenSubmitModal}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700/80 shadow-lg backdrop-blur-md hover:-translate-y-0.5 transition-all"
          >
            <Terminal className="w-4 h-4 text-purple-400" />
            <span>Submit Your Project</span>
          </button>
        </div>

        {/* Live Metrics Counter Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto p-4 rounded-3xl glass-panel border border-slate-800 shadow-2xl">
          
          <div className="p-3 text-center border-r border-slate-800/60 last:border-r-0">
            <div className="flex items-center justify-center gap-1.5 text-indigo-400 mb-1">
              <Users className="w-4 h-4" />
              <span className="text-2xl font-black font-heading text-white">130+</span>
            </div>
            <span className="text-xs text-slate-400 font-medium">Registered Builders</span>
          </div>

          <div className="p-3 text-center border-r sm:border-r border-slate-800/60 last:border-r-0">
            <div className="flex items-center justify-center gap-1.5 text-purple-400 mb-1">
              <Code2 className="w-4 h-4" />
              <span className="text-2xl font-black font-heading text-white">{totalProjects}</span>
            </div>
            <span className="text-xs text-slate-400 font-medium">Published Projects</span>
          </div>

          <div className="p-3 text-center border-r border-slate-800/60 last:border-r-0">
            <div className="flex items-center justify-center gap-1.5 text-amber-400 mb-1">
              <Flame className="w-4 h-4" />
              <span className="text-2xl font-black font-heading text-white">{totalUpvotes}</span>
            </div>
            <span className="text-xs text-slate-400 font-medium">Community Stars</span>
          </div>

          <div className="p-3 text-center">
            <div className="flex items-center justify-center gap-1.5 text-emerald-400 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-2xl font-black font-heading text-white">100%</span>
            </div>
            <span className="text-xs text-slate-400 font-medium">Open Source MVP</span>
          </div>

        </div>

      </div>
    </section>
  );
}
