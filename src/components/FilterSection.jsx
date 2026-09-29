import React from 'react';
import { Search, Filter, X, ArrowUpDown, Tag, Check, Sparkles, Grid, List } from 'lucide-react';
import { DOMAINS, TECH_TAGS } from '../data/projectsData';

export default function FilterSection({
  selectedDomain,
  setSelectedDomain,
  searchTerm,
  setSearchTerm,
  selectedTech,
  setSelectedTech,
  selectedStatus,
  setSelectedStatus,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  filteredCount,
  totalCount,
  onResetFilters
}) {
  
  const handleTechToggle = (tech) => {
    if (selectedTech.includes(tech)) {
      setSelectedTech(selectedTech.filter(t => t !== tech));
    } else {
      setSelectedTech([...selectedTech, tech]);
    }
  };

  const hasActiveFilters = selectedDomain !== "All Projects" || searchTerm !== "" || selectedTech.length > 0 || selectedStatus !== "All";

  return (
    <div id="projects-section" className="scroll-mt-24 mb-10 space-y-6">
      
      {/* Category Domain Tabs */}
      <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-none no-scrollbar">
        {DOMAINS.map((domain) => {
          const isActive = selectedDomain === domain;
          return (
            <button
              key={domain}
              onClick={() => setSelectedDomain(domain)}
              className={`whitespace-nowrap px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(34,211,238,0.4)] scale-105 border border-cyan-400/50'
                  : 'glass-panel text-slate-400 hover:text-white hover:border-cyan-500/50 hover:bg-white/5'
              }`}
            >
              {domain}
            </button>
          );
        })}
      </div>

      {/* Main Filter Controls Toolbar */}
      <div className="p-5 rounded-3xl glass-panel flex flex-col lg:flex-row items-center justify-between gap-5 relative overflow-hidden">
        
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 blur-[80px] pointer-events-none" />

        {/* Search Bar */}
        <div className="relative w-full lg:w-96 group">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400/70 group-focus-within:text-cyan-400 transition-colors" />
          <input
            type="text"
            placeholder="Search hackers, projects, or stacks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl pl-12 pr-10 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/50 transition-all shadow-inner hover:border-white/20"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-400 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Status Dropdown & Sorting Dropdown */}
        <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto justify-between lg:justify-end relative z-10">
          
          {/* Status Filter */}
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Filter className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-black/50 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 appearance-none cursor-pointer hover:border-white/20 transition-colors"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="In Development">In Development</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <ArrowUpDown className="w-4 h-4 text-green-400" />
            <span className="hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-black/50 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-green-500 appearance-none cursor-pointer hover:border-white/20 transition-colors"
            >
              <option value="upvotes">Most Stars</option>
              <option value="newest">Newest First</option>
              <option value="featured">Featured First</option>
              <option value="title">A-Z</option>
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex items-center bg-black/40 backdrop-blur-sm p-1.5 rounded-xl border border-white/10">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg text-sm transition-all duration-300 ${viewMode === 'grid' ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg text-sm transition-all duration-300 ${viewMode === 'list' ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

      {/* Tech Tags Filter Row */}
      <div className="flex items-center flex-wrap gap-2.5 text-sm p-2">
        <span className="text-slate-400 font-semibold flex items-center gap-1.5 mr-2">
          <Tag className="w-4 h-4 text-cyan-400" />
          Stacks:
        </span>
        {TECH_TAGS.map((tech) => {
          const isSelected = selectedTech.includes(tech);
          return (
            <button
              key={tech}
              onClick={() => handleTechToggle(tech)}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all duration-300 flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-[0_0_15px_rgba(217,70,239,0.3)]'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10'
              }`}
            >
              {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
              {tech}
            </button>
          );
        })}
      </div>

      {/* Active Filter Summary Bar */}
      <div className="flex items-center justify-between text-sm text-slate-400 px-2 pt-2 border-t border-white/5">
        <div>
          Showing <span className="font-black text-white text-lg">{filteredCount}</span> of{' '}
          <span className="font-medium text-slate-300">{totalCount}</span> Projects
        </div>
        
        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold transition-colors bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20 hover:border-emerald-500/40"
          >
            <X className="w-4 h-4" />
            <span>Clear Filters</span>
          </button>
        )}
      </div>

    </div>
  );
}
