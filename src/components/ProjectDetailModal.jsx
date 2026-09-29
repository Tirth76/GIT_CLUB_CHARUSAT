import React, { useState, useEffect } from 'react';
import { X, Star, ExternalLink, Code2, Cpu, Users, Sparkles, Copy, Check, Share2, Layers, ShieldCheck, Play, ArrowRight } from 'lucide-react';
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto bg-slate-950/80 backdrop-blur-md animate-fade-in">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl glass-panel border border-slate-700/80 shadow-2xl overflow-hidden text-slate-100 my-auto">
        
        {/* Modal Header Banner */}
        <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-900 shrink-0">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-[#090d16]/60 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-950/80 hover:bg-slate-900 text-slate-300 hover:text-white border border-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title & Domain Header */}
          <div className="absolute bottom-4 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-300 bg-indigo-950/90 border border-indigo-500/40 px-2.5 py-0.5 rounded-full">
                  {project.domain}
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-800">
                  {project.status}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-heading">
                {project.title}
              </h2>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => onToggleUpvote(project.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
                  project.starred
                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 font-extrabold'
                    : 'bg-slate-900 text-slate-300 hover:text-amber-400 border border-slate-800'
                }`}
              >
                <Star className={`w-4 h-4 ${project.starred ? 'fill-slate-950' : ''}`} />
                <span>{project.upvotes} Upvotes</span>
              </button>

              <button
                onClick={handleCopyShare}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition"
                title="Share Project Link"
              >
                {copiedShare ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center border-b border-slate-800 bg-slate-950/90 px-6 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-3 text-xs font-bold border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" /> Overview
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-4 py-3 text-xs font-bold border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'architecture'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-4 h-4" /> Architecture & Code
          </button>

          {project.interactiveDemoType && (
            <button
              onClick={() => setActiveTab('interactive')}
              className={`px-4 py-3 text-xs font-bold border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'interactive'
                  ? 'border-emerald-500 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Play className="w-4 h-4 text-emerald-400" /> Interactive Demo
            </button>
          )}

          <button
            onClick={() => setActiveTab('team')}
            className={`px-4 py-3 text-xs font-bold border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'team'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-4 h-4" /> Team & Links
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Tagline Banner */}
              <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed italic bg-indigo-950/30 p-4 rounded-2xl border border-indigo-500/20">
                "{project.tagline}"
              </p>

              {/* Problem & Solution Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Problem Statement Card */}
                <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider font-mono">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    The Problem
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {project.problem}
                  </p>
                </div>

                {/* Solution Statement Card */}
                <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    The Solution
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {project.solution}
                  </p>
                </div>

              </div>

              {/* Tech Stack Chips */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Technologies & Frameworks</h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="px-3 py-1.5 rounded-xl bg-slate-900 text-indigo-300 border border-slate-800 text-xs font-mono font-semibold">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-800">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs border border-slate-700 transition"
                >
                  <GithubIcon className="w-4 h-4" /> View GitHub Repository
                </a>

                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg transition"
                  >
                    <ExternalLink className="w-4 h-4" /> Visit Live Website
                  </a>
                )}
              </div>

            </div>
          )}

          {/* TAB 2: ARCHITECTURE & CODE */}
          {activeTab === 'architecture' && (
            <div className="space-y-6 animate-fade-in">
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-indigo-400" /> System Architecture & Technical Highlights
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {project.architecture}
                </p>
              </div>

              {/* Code Snippet Viewer */}
              {project.snippet && (
                <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-purple-400" /> Core Implementation Snippet
                    </span>
                    <button
                      onClick={handleCopyCode}
                      className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                    </button>
                  </div>

                  <pre className="p-4 text-xs font-mono text-indigo-200 overflow-x-auto leading-relaxed">
                    <code>{project.snippet}</code>
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: INTERACTIVE DEMO */}
          {activeTab === 'interactive' && project.interactiveDemoType && (
            <div className="animate-fade-in">
              <InteractiveSandbox project={project} />
            </div>
          )}

          {/* TAB 4: TEAM & LINKS */}
          {activeTab === 'team' && (
            <div className="space-y-6 animate-fade-in">
              <h4 className="text-sm font-bold text-white font-heading">Project Contributors & Engineers</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {project.team.map((member, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500/40 shrink-0"
                    />
                    <div>
                      <h5 className="text-xs font-bold text-white">{member.name}</h5>
                      <span className="text-[11px] text-indigo-400 font-mono block">{member.role}</span>
                      <span className="text-[10px] text-slate-400">{member.year} • {member.institute}</span>
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
