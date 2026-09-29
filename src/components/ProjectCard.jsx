import React, { useState } from 'react';
import { Star, Sparkles, Bookmark, Scale, Play, CheckCircle2, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ProjectCard({
  project,
  onOpenDetail,
  onToggleUpvote,
  onToggleBookmark,
  isBookmarked,
  onToggleCompare,
  isCompared,
  viewMode = 'grid'
}) {
  const [tiltStyle, setTiltStyle] = useState({});

  const handleUpvote = (e) => {
    e.stopPropagation();
    onToggleUpvote(project.id);
    
    // Confetti burst on upvote
    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#22d3ee', '#d946ef', '#8b5cf6', '#fef08a']
    });
  };

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg
    const rotateY = ((x - centerX) / centerX) * 10;
    
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'none'
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"><CheckCircle2 className="w-3 h-3" /> Active</span>;
      case 'Completed':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"><CheckCircle2 className="w-3 h-3" /> Completed</span>;
      case 'In Development':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-500/20 text-green-300 border border-green-500/30"><Clock className="w-3 h-3" /> In Dev</span>;
      default:
        return null;
    }
  };

  if (viewMode === 'list') {
    return (
      <div 
        onClick={() => onOpenDetail(project)}
        className="group relative p-4 rounded-3xl glass-card transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/10 hover:border-cyan-500/50"
      >
        <div className="flex items-center gap-5 w-full sm:w-auto">
          {/* Thumbnail */}
          <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 bg-slate-900 border border-slate-700/50 shadow-inner">
            <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 group-hover:opacity-80 transition-all duration-500 mix-blend-luminosity group-hover:mix-blend-normal" />
            <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-300 bg-cyan-950/50 px-2 py-0.5 rounded-full border border-cyan-500/30 font-mono">
                {project.domain}
              </span>
              {getStatusBadge(project.status)}
            </div>

            <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-emerald-400 transition-all line-clamp-1 font-heading">
              {project.title}
            </h3>

            <p className="text-sm text-slate-300 line-clamp-1 max-w-xl mt-1">
              {project.shortDesc}
            </p>

            <div className="flex items-center gap-2 mt-3 flex-wrap">
              {project.techStack.slice(0, 4).map((tech) => (
                <span key={tech} className="text-[10px] font-mono font-semibold px-2 py-1 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/50 group-hover:border-slate-500/50 transition-colors">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto justify-between sm:justify-end pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-800/50">
          
          <button
            onClick={handleUpvote}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              project.starred
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 glow-emerald'
                : 'bg-slate-900/50 text-slate-300 hover:text-white border border-slate-700/50 hover:border-emerald-500/50 hover:bg-emerald-500/10'
            }`}
          >
            <Star className={`w-4 h-4 ${project.starred ? 'fill-emerald-400 text-emerald-400' : ''}`} />
            <span>{project.upvotes}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => onOpenDetail(project)}
      className="group relative rounded-3xl glass-card cursor-pointer flex flex-col justify-between overflow-hidden border border-white/10 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(217,70,239,0.15)]"
      style={tiltStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Top Banner Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-900 border-b border-white/5">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:opacity-80 mix-blend-luminosity group-hover:mix-blend-normal"
        />
        
        {/* Colorful gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-transparent to-transparent opacity-90" />

        {/* Category Domain Badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-white bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow-lg">
            {project.domain}
          </span>
        </div>

        {/* Top Right Action Overlay (Bookmark & Compare) */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
          <button
            onClick={(e) => { e.stopPropagation(); onToggleBookmark(project.id); }}
            className={`p-2.5 rounded-full backdrop-blur-xl transition-all ${
              isBookmarked
                ? 'bg-cyan-500 text-white shadow-[0_0_15px_rgba(34,211,238,0.5)]'
                : 'bg-black/40 text-slate-300 hover:text-white border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/20'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-white' : ''}`} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); onToggleCompare(project.id); }}
            className={`p-2.5 rounded-full backdrop-blur-xl transition-all ${
              isCompared
                ? 'bg-green-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]'
                : 'bg-black/40 text-slate-300 hover:text-white border border-white/10 hover:border-green-500/50 hover:bg-green-500/20'
            }`}
          >
            <Scale className="w-4 h-4" />
          </button>
        </div>

        {/* Featured Ribbon */}
        {project.featured && (
          <div className="absolute bottom-4 right-4 z-10">
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-white bg-gradient-to-r from-emerald-600 to-green-600 px-3 py-1.5 rounded-full shadow-lg font-heading tracking-wide">
              <Sparkles className="w-3 h-3 text-emerald-200" /> Spotlight
            </span>
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-5 relative z-10 bg-gradient-to-b from-[#050B14]/80 to-[#030712]/95">
        
        <div>
          <div className="mb-2">
            {getStatusBadge(project.status)}
          </div>
          <h3 className="text-2xl font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-emerald-400 transition-all line-clamp-1 font-heading tracking-tight drop-shadow-sm">
            {project.title}
          </h3>

          <p className="text-sm text-slate-300/80 mt-2 line-clamp-2 leading-relaxed font-sans font-light">
            {project.shortDesc}
          </p>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex items-center gap-2 flex-wrap pt-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-mono font-medium px-2.5 py-1 rounded-md bg-white/5 text-slate-300 border border-white/10 group-hover:border-white/20 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Card Footer: Team Avatars & Upvote Action */}
        <div className="pt-4 mt-auto border-t border-white/5 flex items-center justify-between gap-4">
          
          {/* Team Members Avatars */}
          <div className="flex items-center -space-x-3 group/team">
            {project.team.map((member, i) => (
              <img
                key={i}
                src={member.avatar}
                alt={member.name}
                title={`${member.name} (${member.role} - ${member.institute})`}
                className="w-8 h-8 rounded-full border-2 border-[#050B14] object-cover hover:-translate-y-1 transition-transform relative z-[i]"
                style={{ zIndex: project.team.length - i }}
              />
            ))}
          </div>

          {/* Upvote / Star Button */}
          <button
            onClick={handleUpvote}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 active:scale-90 ${
              project.starred
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 glow-emerald'
                : 'bg-white/5 text-slate-300 hover:text-white border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10'
            }`}
          >
            <Star className={`w-4 h-4 ${project.starred ? 'fill-emerald-400 text-emerald-400' : ''}`} />
            <span className="font-mono">{project.upvotes}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
