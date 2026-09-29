import { Star, ExternalLink, Sparkles, Eye, Bookmark, Scale, Play, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import GithubIcon from './GithubIcon';
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
  const handleUpvote = (e) => {
    e.stopPropagation();
    onToggleUpvote(project.id);
    
    // Confetti burst on upvote
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#6366f1', '#a855f7', '#3b82f6', '#f59e0b']
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"><CheckCircle2 className="w-3 h-3" /> Active</span>;
      case 'Completed':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20"><CheckCircle2 className="w-3 h-3" /> Completed</span>;
      case 'In Development':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20"><Clock className="w-3 h-3" /> In Dev</span>;
      default:
        return null;
    }
  };

  if (viewMode === 'list') {
    return (
      <div 
        onClick={() => onOpenDetail(project)}
        className="group relative p-4 rounded-2xl glass-card transition-all duration-300 hover:-translate-y-0.5 cursor-pointer flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800/80 hover:border-indigo-500/40"
      >
        <div className="flex items-center gap-4 w-full sm:w-auto">
          {/* Thumbnail */}
          <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-900 border border-slate-800">
            <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            {project.featured && (
              <span className="absolute top-1 left-1 p-1 rounded-md bg-amber-500 text-slate-950 font-bold">
                <Sparkles className="w-3 h-3" />
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 font-mono">
                {project.domain}
              </span>
              {getStatusBadge(project.status)}
            </div>

            <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1 font-heading">
              {project.title}
            </h3>

            <p className="text-xs text-slate-400 line-clamp-1 max-w-xl mt-0.5">
              {project.shortDesc}
            </p>

            <div className="flex items-center gap-1.5 mt-2 flex-wrap">
              {project.techStack.slice(0, 4).map((tech) => (
                <span key={tech} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto justify-between sm:justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
          
          {/* Upvote */}
          <button
            onClick={handleUpvote}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              project.starred
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-slate-900 text-slate-300 hover:text-amber-400 border border-slate-800 hover:bg-slate-800'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${project.starred ? 'fill-amber-400 text-amber-400' : ''}`} />
            <span>{project.upvotes}</span>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); onOpenDetail(project); }}
            className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition"
          >
            Explore
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => onOpenDetail(project)}
      className="group relative rounded-3xl glass-card transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between overflow-hidden border border-slate-800/80 hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10"
    >
      {/* Top Banner Image Container */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-900">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1322] via-[#0d1322]/30 to-transparent" />

        {/* Category Domain Badge & Featured Glow */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-300 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-indigo-500/30 shadow-md">
            {project.domain}
          </span>
          {getStatusBadge(project.status)}
        </div>

        {/* Top Right Action Overlay (Bookmark & Compare) */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          
          {/* Featured Ribbon */}
          {project.featured && (
            <span className="flex items-center gap-1 text-[10px] font-extrabold text-amber-950 bg-amber-400 px-2.5 py-1 rounded-full shadow-lg font-heading">
              <Sparkles className="w-3 h-3" /> Spotlight
            </span>
          )}

          {/* Bookmark */}
          <button
            onClick={(e) => { e.stopPropagation(); onToggleBookmark(project.id); }}
            className={`p-2 rounded-full backdrop-blur-md transition ${
              isBookmarked
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-950/60 text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-800'
            }`}
            title="Bookmark Project"
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-white' : ''}`} />
          </button>

          {/* Compare Select */}
          <button
            onClick={(e) => { e.stopPropagation(); onToggleCompare(project.id); }}
            className={`p-2 rounded-full backdrop-blur-md transition ${
              isCompared
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'bg-slate-950/60 text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-800'
            }`}
            title="Add to Side-by-Side Compare"
          >
            <Scale className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Interactive Prototype Available Tag */}
        {project.interactiveDemoType && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-950/90 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold backdrop-blur-md">
            <Play className="w-3 h-3 text-emerald-400 fill-emerald-400/20 animate-pulse" />
            <span>Interactive Demo</span>
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div>
          <h3 className="text-lg font-extrabold text-white group-hover:text-indigo-400 transition-colors line-clamp-1 font-heading">
            {project.title}
          </h3>

          <p className="text-xs text-slate-300 mt-1.5 line-clamp-2 leading-relaxed font-sans">
            {project.shortDesc}
          </p>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex items-center gap-1.5 flex-wrap pt-1">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-900/90 text-slate-300 border border-slate-800/80"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Card Footer: Team Avatars & Upvote Action */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
          
          {/* Team Members Avatars */}
          <div className="flex items-center -space-x-2">
            {project.team.map((member, i) => (
              <img
                key={i}
                src={member.avatar}
                alt={member.name}
                title={`${member.name} (${member.role} - ${member.institute})`}
                className="w-7 h-7 rounded-full border-2 border-slate-900 object-cover"
              />
            ))}
            <span className="text-[10px] text-slate-400 pl-3 font-mono font-medium">
              {project.team.length} {project.team.length === 1 ? 'Dev' : 'Devs'}
            </span>
          </div>

          {/* Upvote / Star Button */}
          <button
            onClick={handleUpvote}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all duration-200 active:scale-90 ${
              project.starred
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-lg shadow-amber-500/10'
                : 'bg-slate-900 text-slate-300 hover:text-amber-400 border border-slate-800 hover:bg-slate-800'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${project.starred ? 'fill-amber-400 text-amber-400' : ''}`} />
            <span className="font-mono">{project.upvotes}</span>
          </button>

        </div>

      </div>

    </div>
  );
}
