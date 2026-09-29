import React from 'react';
import { Sparkles, Code2, Users, Rocket, ShieldCheck, ArrowRight, Flame, Terminal } from 'lucide-react';

export default function HeroSection({ totalProjects, totalUpvotes, onOpenSubmitModal, onScrollToProjects }) {
  return (
    <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-32 flex flex-col items-center justify-center text-center">
      
      {/* Decorative Aurora Elements Specific to Hero */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-600/20 blur-[120px] rounded-full mix-blend-screen animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/20 blur-[120px] rounded-full mix-blend-screen animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Hero Title */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[1.1] mb-6 drop-shadow-2xl">
          Build <span className="gradient-text">Beyond</span> Limits.
        </h1>

        {/* Hero Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed mb-12">
          Join <span className="font-bold text-white">150+ elite builders</span> turning bold ideas into reality. Discover next-gen web apps, AI models, and open-source innovations.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
          <button
            onClick={onScrollToProjects}
            className="group relative flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white text-slate-900 font-bold text-lg hover:scale-105 transition-all duration-300 glow-cyan overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-300 via-white to-emerald-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
            <Rocket className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Explore Projects</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
          </button>

          <button
            onClick={onOpenSubmitModal}
            className="group flex items-center justify-center gap-3 px-8 py-4 rounded-2xl glass-panel text-white font-semibold text-lg border border-slate-700/80 hover:border-emerald-500/50 hover:bg-slate-800/50 transition-all duration-300 hover:glow-emerald"
          >
            <Terminal className="w-5 h-5 text-emerald-400 group-hover:rotate-12 transition-transform" />
            <span>Submit Your Hack</span>
          </button>
        </div>

        {/* Live Metrics Counter Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { icon: Users, label: "Hackers", value: "150+", color: "text-cyan-400" },
            { icon: Code2, label: "Projects", value: totalProjects, color: "text-emerald-400" },
            { icon: Flame, label: "Stars", value: totalUpvotes, color: "text-orange-400" },
            { icon: ShieldCheck, label: "Open Source", value: "100%", color: "text-emerald-400" }
          ].map((stat, idx) => (
            <div key={idx} className="glass-card rounded-2xl p-6 text-center group hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full pointer-events-none`} />
              <div className={`flex items-center justify-center gap-2 ${stat.color} mb-2`}>
                <stat.icon className="w-5 h-5" />
                <span className="text-3xl font-black text-white">{stat.value}</span>
              </div>
              <span className="text-sm text-slate-400 font-medium uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
