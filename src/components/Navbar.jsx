import React from 'react';
import { Sparkles, Code2, Search, PlusCircle, Scale, Bookmark, Heart, Layers } from 'lucide-react';

export default function Navbar({
  searchTerm,
  setSearchTerm,
  onOpenSubmitModal,
  onOpenCompareModal,
  compareCount,
  bookmarkCount,
  onOpenBookmarksModal,
  totalProjectsCount
}) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#090d16]/90 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-tight text-white text-lg font-heading">
                GIT CLUB
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                CHARUSAT
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono -mt-0.5">Project Showcase Hub</p>
          </div>
        </div>

        {/* Search Bar in Header */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search projects by name, tech (React, Python...), author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-800 rounded-full pl-10 pr-12 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10px] font-mono text-slate-500 bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-700">
              <span>⌘K</span>
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Compare Button */}
          <button
            onClick={onOpenCompareModal}
            className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              compareCount > 0
                ? 'bg-purple-950/60 text-purple-300 border border-purple-500/40 hover:bg-purple-900/60'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200 hover:bg-slate-800'
            }`}
            title="Compare Projects Side-by-Side"
          >
            <Scale className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">Compare</span>
            {compareCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-purple-600 text-white text-[10px] flex items-center justify-center font-bold">
                {compareCount}
              </span>
            )}
          </button>

          {/* Bookmarks Counter */}
          <button
            onClick={onOpenBookmarksModal}
            className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              bookmarkCount > 0
                ? 'bg-indigo-950/60 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-900/60'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200 hover:bg-slate-800'
            }`}
            title="View Bookmarked Projects"
          >
            <Bookmark className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400/20" />
            <span className="hidden sm:inline">Saved</span>
            {bookmarkCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] flex items-center justify-center font-bold">
                {bookmarkCount}
              </span>
            )}
          </button>

          {/* Submit Project CTA */}
          <button
            onClick={onOpenSubmitModal}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 active:scale-95 transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Submit Project</span>
          </button>

        </div>

      </div>
    </header>
  );
}
