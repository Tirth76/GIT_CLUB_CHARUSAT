import React from 'react';
import { Sparkles, Code2, Search, PlusCircle, Scale, Bookmark, Hexagon } from 'lucide-react';

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
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pointer-events-none">
      <header className="w-full max-w-6xl rounded-full glass-panel border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] pointer-events-auto transition-all duration-300 hover:border-emerald-500/30">
        <div className="px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-400 via-emerald-500 to-green-600 flex items-center justify-center shadow-lg group-hover:rotate-90 transition-transform duration-500">
              <Hexagon className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-tighter text-white text-xl font-heading">
                  HACK<span className="text-emerald-400">HUB</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  CHARUSAT
                </span>
              </div>
            </div>
          </div>

          {/* Search Bar in Header */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
            <div className="relative w-full group">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400/70 group-focus-within:text-emerald-400 transition-colors" />
              <input
                type="text"
                placeholder="Search projects, tech stacks, or hackers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900/40 backdrop-blur-sm border border-slate-700/50 rounded-full pl-11 pr-12 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all shadow-inner"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10px] font-mono text-slate-400 bg-slate-800/80 px-2 py-1 rounded-full border border-slate-700">
                <span>⌘K</span>
              </div>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Compare Button */}
            <button
              onClick={onOpenCompareModal}
              className={`relative flex items-center gap-2 px-3 py-2 rounded-full text-xs font-bold transition-all ${
                compareCount > 0
                  ? 'bg-green-500/20 text-green-300 border border-green-500/50 hover:bg-green-500/30 glow-green'
                  : 'bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Scale className="w-4 h-4 text-green-400" />
              <span className="hidden lg:inline">Compare</span>
              {compareCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-500 text-white text-[10px] flex items-center justify-center shadow-lg border border-slate-900">
                  {compareCount}
                </span>
              )}
            </button>

            {/* Bookmarks Counter */}
            <button
              onClick={onOpenBookmarksModal}
              className={`relative flex items-center gap-2 px-3 py-2 rounded-full text-xs font-bold transition-all ${
                bookmarkCount > 0
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 hover:bg-cyan-500/30 glow-cyan'
                  : 'bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Bookmark className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />
              <span className="hidden lg:inline">Saved</span>
              {bookmarkCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-cyan-500 text-white text-[10px] flex items-center justify-center shadow-lg border border-slate-900">
                  {bookmarkCount}
                </span>
              )}
            </button>

            {/* Submit Project CTA */}
            <button
              onClick={onOpenSubmitModal}
              className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-slate-900 text-sm font-bold shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] hover:scale-105 active:scale-95 transition-all"
            >
              <PlusCircle className="w-4 h-4 group-hover:rotate-90 transition-transform" />
              <span className="hidden sm:inline">Submit</span>
            </button>

          </div>

        </div>
      </header>
    </div>
  );
}
