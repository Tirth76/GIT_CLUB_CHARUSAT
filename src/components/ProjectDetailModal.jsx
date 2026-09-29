import React, { useState, useEffect } from 'react';
import { X, Star, ExternalLink, Code2, Cpu, Users, Sparkles, Copy, Check, Share2, Layers, Play, CheckCircle2, Clock } from 'lucide-react';
import GithubIcon from './GithubIcon';
import InteractiveSandbox from './InteractiveSandbox';

export default function ProjectDetailModal({ project, onClose, onToggleUpvote, onToggleBookmark, isBookmarked }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(project.snippet || '');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-inner"><CheckCircle2 className="w-3 h-3" /> Active</span>;
      case 'Completed':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-inner"><CheckCircle2 className="w-3 h-3" /> Completed</span>;
      case 'In Development':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-500/20 text-green-300 border border-green-500/30 shadow-inner"><Clock className="w-3 h-3" /> In Dev</span>;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto bg-black/60 backdrop-blur-xl animate-fade-in">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl max-h-[90vh] flex flex-col rounded-3xl glass-card shadow-[0_0_50px_rgba(217,70,239,0.15)] overflow-hidden text-slate-100 my-auto border border-white/20">
        
        {/* Decorative Aurora glow inside modal */}
        <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-emerald-500/20 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />

        {/* Modal Header Banner */}
        <div className="relative h-48 sm:h-64 w-full overflow-hidden bg-slate-900 shrink-0 border-b border-white/10">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover opacity-70 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-[#050B14]/60 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-slate-300 hover:text-white border border-white/20 transition-all backdrop-blur-md z-10 hover:rotate-90 hover:scale-110"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title & Domain Header */}
          <div className="absolute bottom-6 left-8 right-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 z-10">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full backdrop-blur-md shadow-[0_0_10px_rgba(34,211,238,0.3)]">
                  {project.domain}
                </span>
                {getStatusBadge(project.status)}
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-heading tracking-tight drop-shadow-lg">
                {project.title}
              </h2>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => onToggleUpvote(project.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                  project.starred
                    ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-[0_0_20px_rgba(217,70,239,0.5)] border border-emerald-400/50'
                    : 'bg-black/40 text-slate-300 hover:text-white border border-white/20 hover:border-emerald-500/50 backdrop-blur-md'
                }`}
              >
                <Star className={`w-4 h-4 ${project.starred ? 'fill-white' : ''}`} />
                <span>{project.upvotes} Stars</span>
              </button>

              <button
                onClick={handleCopyShare}
                className="p-3 rounded-xl bg-black/40 hover:bg-black/60 text-slate-300 border border-white/20 transition-all backdrop-blur-md hover:border-cyan-500/50"
                title="Share Project Link"
              >
                {copiedShare ? <Check className="w-4 h-4 text-cyan-400" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center border-b border-white/10 bg-black/40 backdrop-blur-md px-8 overflow-x-auto shrink-0 relative z-10 shadow-lg">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-5 py-4 text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-white hover:border-white/30'
            }`}
          >
            <Layers className="w-4 h-4" /> Overview
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-5 py-4 text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'architecture'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-white hover:border-white/30'
            }`}
          >
            <Cpu className="w-4 h-4" /> System & Code
          </button>

          {project.interactiveDemoType && (
            <button
              onClick={() => setActiveTab('interactive')}
              className={`px-5 py-4 text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'interactive'
                  ? 'border-emerald-400 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-white hover:border-white/30'
              }`}
            >
              <Play className="w-4 h-4" /> Live Demo
            </button>
          )}

          <button
            onClick={() => setActiveTab('team')}
            className={`px-5 py-4 text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'team'
                ? 'border-green-400 text-green-400'
                : 'border-transparent text-slate-400 hover:text-white hover:border-white/30'
            }`}
          >
            <Users className="w-4 h-4" /> Hackers
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-8 overflow-y-auto space-y-8 flex-1 relative z-10 bg-gradient-to-b from-transparent to-[#030712]/90">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fade-in">
              
              {/* Tagline Banner */}
              <p className="text-base sm:text-lg text-white font-light leading-relaxed italic bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 p-5 rounded-2xl border border-white/10 shadow-inner">
                "{project.tagline}"
              </p>

              {/* Problem & Solution Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Problem Statement Card */}
                <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-3 hover:border-rose-500/30 transition-colors">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-widest font-mono">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                    The Challenge
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed font-sans font-light">
                    {project.problem}
                  </p>
                </div>

                {/* Solution Statement Card */}
                <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-3 hover:border-cyan-500/30 transition-colors">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-widest font-mono">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
                    The Solution
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed font-sans font-light">
                    {project.solution}
                  </p>
                </div>

              </div>

              {/* Tech Stack Chips */}
              <div className="space-y-3 bg-black/20 p-6 rounded-3xl border border-white/5">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Tech Stack & Tools</h4>
                <div className="flex flex-wrap gap-2.5">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="px-3.5 py-1.5 rounded-lg bg-white/5 text-slate-200 border border-white/10 text-xs font-mono font-bold hover:bg-white/10 transition-colors cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/10">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all shadow-lg backdrop-blur-md"
                >
                  <GithubIcon className="w-5 h-5" /> Source Code
                </a>

                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all"
                  >
                    <ExternalLink className="w-5 h-5" /> Launch App
                  </a>
                )}
              </div>

            </div>
          )}

          {/* TAB 2: ARCHITECTURE & CODE */}
          {activeTab === 'architecture' && (
            <div className="space-y-8 animate-fade-in">
              <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4 hover:border-emerald-500/30 transition-colors">
                <h4 className="text-lg font-bold text-white flex items-center gap-2 font-heading">
                  <Cpu className="w-5 h-5 text-emerald-400" /> System Architecture
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed font-sans font-light">
                  {project.architecture}
                </p>
              </div>

              {/* Code Snippet Viewer */}
              {project.snippet && (
                <div className="rounded-3xl bg-black/60 border border-white/10 overflow-hidden shadow-2xl backdrop-blur-xl">
                  <div className="flex items-center justify-between px-5 py-3 bg-white/5 border-b border-white/10 text-xs font-mono text-slate-300">
                    <span className="flex items-center gap-2 font-bold tracking-wide">
                      <Code2 className="w-4 h-4 text-cyan-400" /> Core Implementation
                    </span>
                    <button
                      onClick={handleCopyCode}
                      className="flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-white transition-colors bg-white/5 px-2.5 py-1 rounded-md border border-white/10"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <pre className="p-6 text-xs sm:text-sm font-mono text-emerald-200/90 overflow-x-auto leading-relaxed">
                    <code>{project.snippet}</code>
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: INTERACTIVE DEMO */}
          {activeTab === 'interactive' && project.interactiveDemoType && (
            <div className="animate-fade-in rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <InteractiveSandbox project={project} />
            </div>
          )}

          {/* TAB 4: TEAM & LINKS */}
          {activeTab === 'team' && (
            <div className="space-y-6 animate-fade-in">
              <h4 className="text-lg font-bold text-white font-heading tracking-wide">Elite Hackers Behind This</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {project.team.map((member, i) => (
                  <div key={i} className="p-5 rounded-3xl glass-panel border border-white/10 flex items-center gap-4 hover:border-green-500/40 transition-colors group">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-green-500/50 group-hover:scale-110 transition-transform shadow-lg"
                    />
                    <div>
                      <h5 className="text-sm font-bold text-white">{member.name}</h5>
                      <span className="text-[11px] text-cyan-400 font-mono font-bold block mt-0.5 tracking-wider">{member.role}</span>
                      <span className="text-[10px] text-slate-400 mt-1 block">{member.year} • {member.institute}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
