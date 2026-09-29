import React, { useState } from 'react';
import { X, PlusCircle, Sparkles, Code2, Check, ExternalLink, Hexagon } from 'lucide-react';
import GithubIcon from './GithubIcon';
import confetti from 'canvas-confetti';
import { DOMAINS } from '../data/projectsData';

export default function SubmitProjectModal({ onClose, onSubmitProject }) {
  const [formData, setFormData] = useState({
    title: '',
    tagline: '',
    domain: 'Web Development',
    shortDesc: '',
    problem: '',
    solution: '',
    techStack: 'React, Node.js, TailwindCSS',
    github: '',
    demo: '',
    authorName: '',
    year: '3rd Year CSE',
    institute: 'CSPIT',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.shortDesc || !formData.authorName) return;

    const newProject = {
      id: `user-proj-${Date.now()}`,
      title: formData.title,
      tagline: formData.tagline || formData.shortDesc,
      domain: formData.domain,
      featured: false,
      status: 'Active',
      upvotes: 1,
      starred: false,
      dateAdded: new Date().toISOString().split('T')[0],
      thumbnail: formData.thumbnail,
      shortDesc: formData.shortDesc,
      problem: formData.problem || formData.shortDesc,
      solution: formData.solution || formData.shortDesc,
      techStack: formData.techStack.split(',').map(s => s.trim()).filter(Boolean),
      architecture: "Student submitted project via Git Club CHARUSAT showcase modal.",
      snippet: `// ${formData.title} - Main Entrypoint\nconsole.log("Welcome to ${formData.title} built by ${formData.authorName}!");`,
      team: [
        {
          name: formData.authorName,
          role: 'Lead Developer',
          year: formData.year,
          institute: formData.institute,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
        }
      ],
      github: formData.github || 'https://github.com/gitclub-charusat',
      demo: formData.demo || '',
      interactiveDemoType: null,
      metrics: { views: '1', stars: '1' }
    };

    onSubmitProject(newProject);
    setSubmitted(true);

    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#22d3ee', '#d946ef', '#a855f7']
    });

    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const inputClass = "w-full bg-black/40 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all hover:border-white/20 shadow-inner";
  const labelClass = "text-xs text-slate-300 font-bold block mb-1.5 uppercase tracking-wider";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-2xl flex flex-col rounded-3xl glass-card border border-white/20 shadow-[0_0_50px_rgba(34,211,238,0.15)] overflow-hidden text-slate-100 my-auto">
        
        {/* Decorative Aurora glow inside modal */}
        <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-cyan-500/20 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />

        {/* Header */}
        <div className="flex items-center justify-between p-6 sm:p-8 border-b border-white/10 bg-black/40 backdrop-blur-md relative z-10">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(34,211,238,0.4)]">
              <Hexagon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white font-heading tracking-wide">Submit Hackathon Project</h3>
              <p className="text-sm text-cyan-300 font-mono mt-1">Deploy your code to the 150+ participant matrix</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-all border border-transparent hover:border-white/20 hover:rotate-90"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto relative z-10 custom-scrollbar">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Project Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ExamSync CHARUSAT"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Domain / Category *</label>
                <select
                  value={formData.domain}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                  className={`${inputClass} appearance-none cursor-pointer`}
                >
                  {DOMAINS.filter(d => d !== 'All Projects').map(d => (
                    <option key={d} value={d} className="bg-slate-900">{d}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className={labelClass}>Short Description *</label>
              <textarea
                required
                rows={2}
                placeholder="What does this project do in 1-2 sentences?"
                value={formData.shortDesc}
                onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>The Problem Solved</label>
                <textarea
                  rows={3}
                  placeholder="Why did you build this?"
                  value={formData.problem}
                  onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Your Solution</label>
                <textarea
                  rows={3}
                  placeholder="How does your project solve it?"
                  value={formData.solution}
                  onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Tech Stack (comma separated)</label>
              <input
                type="text"
                placeholder="React, Node.js, Python, TailwindCSS..."
                value={formData.techStack}
                onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                className={`${inputClass} font-mono`}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>GitHub Repository Link</label>
                <input
                  type="url"
                  placeholder="https://github.com/yourusername/project"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Live Demo / Deployed Link</label>
                <input
                  type="url"
                  placeholder="https://yourproject.vercel.app"
                  value={formData.demo}
                  onChange={(e) => setFormData({ ...formData, demo: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-6 border-t border-white/10">
              <div>
                <label className={labelClass}>Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Om Rashiya"
                  value={formData.authorName}
                  onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Year & Branch</label>
                <input
                  type="text"
                  placeholder="e.g. 3rd Year CSE"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Institute</label>
                <select
                  value={formData.institute}
                  onChange={(e) => setFormData({ ...formData, institute: e.target.value })}
                  className={`${inputClass} appearance-none cursor-pointer`}
                >
                  <option value="CSPIT" className="bg-slate-900">CSPIT</option>
                  <option value="DEPSTAR" className="bg-slate-900">DEPSTAR</option>
                  <option value="CMPICA" className="bg-slate-900">CMPICA</option>
                </select>
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-600 hover:from-cyan-400 hover:via-blue-400 hover:to-emerald-500 text-white font-black text-sm uppercase tracking-widest rounded-xl shadow-[0_0_30px_rgba(34,211,238,0.4)] flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              >
                <Sparkles className="w-5 h-5" /> Launch Project To Matrix
              </button>
            </div>

          </form>
        ) : (
          <div className="p-12 text-center space-y-6 relative z-10">
            <div className="w-24 h-24 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border-4 border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.4)] animate-bounce">
              <Check className="w-12 h-12" />
            </div>
            <h4 className="text-3xl font-black text-white font-heading drop-shadow-lg">Initialization Complete!</h4>
            <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              Your project is now live in the Git Club CHARUSAT Showcase Matrix. Prepare for incoming traffic from 150+ elite hackers.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
