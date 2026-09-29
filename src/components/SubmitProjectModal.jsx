import React, { useState } from 'react';
import { X, PlusCircle, Sparkles, Code2, Check, ExternalLink } from 'lucide-react';
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
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl flex flex-col rounded-3xl glass-panel border border-slate-700/80 shadow-2xl overflow-hidden text-slate-100 my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-heading">Submit Your Git Club Project</h3>
              <p className="text-xs text-slate-400">Share your technical creation with 130+ CHARUSAT builders</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ExamSync CHARUSAT"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Domain / Category *</label>
                <select
                  value={formData.domain}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  {DOMAINS.filter(d => d !== 'All Projects').map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">Short Description *</label>
              <textarea
                required
                rows={2}
                placeholder="What does this project do in 1-2 sentences?"
                value={formData.shortDesc}
                onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">The Problem Solved</label>
                <textarea
                  rows={2}
                  placeholder="Why did you build this?"
                  value={formData.problem}
                  onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Your Solution</label>
                <textarea
                  rows={2}
                  placeholder="How does your project solve it?"
                  value={formData.solution}
                  onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">Tech Stack (comma separated)</label>
              <input
                type="text"
                placeholder="React, Node.js, Python, TailwindCSS..."
                value={formData.techStack}
                onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">GitHub Repository Link</label>
                <input
                  type="url"
                  placeholder="https://github.com/yourusername/project"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Live Demo / Deployed Link</label>
                <input
                  type="url"
                  placeholder="https://yourproject.vercel.app"
                  value={formData.demo}
                  onChange={(e) => setFormData({ ...formData, demo: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-800">
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Om Rashiya"
                  value={formData.authorName}
                  onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Year & Branch</label>
                <input
                  type="text"
                  placeholder="e.g. 3rd Year CSE"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Institute</label>
                <select
                  value={formData.institute}
                  onChange={(e) => setFormData({ ...formData, institute: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="CSPIT">CSPIT</option>
                  <option value="DEPSTAR">DEPSTAR</option>
                  <option value="CMPICA">CMPICA</option>
                </select>
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 transition"
              >
                <Sparkles className="w-4 h-4" /> Publish Project to Git Club Showcase
              </button>
            </div>

          </form>
        ) : (
          <div className="p-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <Check className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-black text-white font-heading">Project Published Successfully!</h4>
            <p className="text-xs text-slate-300">
              Your project is now live in the Git Club CHARUSAT Showcase. Other participants can now upvote and explore your work.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
