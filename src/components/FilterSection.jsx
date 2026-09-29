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
    <div id="projects-section" className="scroll-mt-20 mb-8 space-y-6">
      
      {/* Category Domain Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
        {DOMAINS.map((domain) => {
          const isActive = selectedDomain === domain;
          return (
            <button
              key={domain}
              onClick={() => setSelectedDomain(domain)}
              className={`whitespace-nowrap px-4 py-2 rounded-2xl text-xs font-bold transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/25 scale-105'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800/80 hover:bg-slate-800'
              }`}
            >
              {domain}
            </button>
          );
        })}
      </div>

      {/* Main Filter Controls Toolbar */}
      <div className="p-4 rounded-2xl glass-panel border border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Filter by title, description, team member..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-9 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Status Dropdown & Sorting Dropdown */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          
          {/* Status Filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Filter className="w-3.5 h-3.5 text-indigo-400" />
            <span>Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="In Development">In Development</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <ArrowUpDown className="w-3.5 h-3.5 text-purple-400" />
            <span>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="upvotes">Most Upvoted ⭐</option>
              <option value="newest">Newest First 🆕</option>
              <option value="featured">Featured First 🌟</option>
              <option value="title">Alphabetical (A-Z)</option>
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs transition ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              title="Grid View"
            >
              <Grid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg text-xs transition ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              title="List View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

      {/* Tech Tags Filter Row */}
      <div className="flex items-center flex-wrap gap-2 text-xs">
        <span className="text-slate-400 font-medium flex items-center gap-1 mr-1">
          <Tag className="w-3.5 h-3.5 text-indigo-400" />
          Tech Stack:
        </span>
        {TECH_TAGS.map((tech) => {
          const isSelected = selectedTech.includes(tech);
          return (
            <button
              key={tech}
              onClick={() => handleTechToggle(tech)}
              className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition-all ${
                isSelected
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/50 font-semibold'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {isSelected && <Check className="w-3 h-3 inline mr-1 text-indigo-400" />}
              {tech}
            </button>
          );
        })}
      </div>

      {/* Active Filter Summary Bar */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1 pt-1">
        <div>
          Showing <span className="font-bold text-indigo-400">{filteredCount}</span> of{' '}
          <span className="font-bold text-slate-200">{totalCount}</span> Git Club Projects
        </div>
        
        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-semibold transition"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>

    </div>
  );
}
