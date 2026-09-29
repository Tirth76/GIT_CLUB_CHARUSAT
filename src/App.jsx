import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FilterSection from './components/FilterSection';
import ProjectCard from './components/ProjectCard';
import ProjectDetailModal from './components/ProjectDetailModal';
import SubmitProjectModal from './components/SubmitProjectModal';
import CompareModal from './components/CompareModal';
import StatsSection from './components/StatsSection';
import Footer from './components/Footer';

import { INITIAL_PROJECTS } from './data/projectsData';
import { Sparkles, Trophy, Flame, Layers, Search, Bookmark, Scale } from 'lucide-react';

export default function App() {
  // 1. Projects State (Loaded from localStorage or initial mock data)
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('gitclub_projects');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_PROJECTS;
      }
    }
    return INITIAL_PROJECTS;
  });

  // 2. Bookmarks State
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('gitclub_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  // Save projects and bookmarks to localStorage
  useEffect(() => {
    localStorage.setItem('gitclub_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('gitclub_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // 3. Filter States
  const [selectedDomain, setSelectedDomain] = useState('All Projects');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTech, setSelectedTech] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('upvotes');
  const [viewMode, setViewMode] = useState('grid');
  const [onlyBookmarks, setOnlyBookmarks] = useState(false);

  // 4. Modal States
  const [activeDetailProject, setActiveDetailProject] = useState(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [compareIds, setCompareIds] = useState([]);

  // Keyboard shortcut Ctrl+K to focus search or open submit modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="text"]');
        if (searchInput) searchInput.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Upvote Toggle Handler
  const handleToggleUpvote = (projectId) => {
    setProjects(prevProjects =>
      prevProjects.map(proj => {
        if (proj.id === projectId) {
          const isStarred = !proj.starred;
          const newUpvotes = isStarred ? proj.upvotes + 1 : proj.upvotes - 1;
          return { ...proj, starred: isStarred, upvotes: newUpvotes };
        }
        return proj;
      })
    );

    if (activeDetailProject && activeDetailProject.id === projectId) {
      setActiveDetailProject(prev => ({
        ...prev,
        starred: !prev.starred,
        upvotes: !prev.starred ? prev.upvotes + 1 : prev.upvotes - 1
      }));
    }
  };

  // Bookmark Toggle Handler
  const handleToggleBookmark = (projectId) => {
    if (bookmarks.includes(projectId)) {
      setBookmarks(bookmarks.filter(id => id !== projectId));
    } else {
      setBookmarks([...bookmarks, projectId]);
    }
  };

  // Compare Toggle Handler
  const handleToggleCompare = (projectId) => {
    if (compareIds.includes(projectId)) {
      setCompareIds(compareIds.filter(id => id !== projectId));
    } else {
      if (compareIds.length >= 3) {
        alert("You can compare up to 3 projects side-by-side.");
        return;
      }
      setCompareIds([...compareIds, projectId]);
    }
  };

  // Submit New Project Handler
  const handleAddProject = (newProject) => {
    setProjects(prev => [newProject, ...prev]);
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSelectedDomain('All Projects');
    setSearchTerm('');
    setSelectedTech([]);
    setSelectedStatus('All');
    setSortBy('upvotes');
    setOnlyBookmarks(false);
  };

  // Filter & Sort Projects logic
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      // 1. Domain Tab Filter
      if (selectedDomain !== 'All Projects' && project.domain !== selectedDomain) {
        return false;
      }
      // 2. Bookmark Only Filter
      if (onlyBookmarks && !bookmarks.includes(project.id)) {
        return false;
      }
      // 3. Status Filter
      if (selectedStatus !== 'All' && project.status !== selectedStatus) {
        return false;
      }
      // 4. Tech Stack Tags Filter (Must match ALL selected tags)
      if (selectedTech.length > 0) {
        const matchesAllTech = selectedTech.every(tech =>
          project.techStack.map(t => t.toLowerCase()).includes(tech.toLowerCase())
        );
        if (!matchesAllTech) return false;
      }
      // 5. Keyword Search Filter
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        const matchesTitle = project.title.toLowerCase().includes(query);
        const matchesDesc = project.shortDesc.toLowerCase().includes(query);
        const matchesDomain = project.domain.toLowerCase().includes(query);
        const matchesTech = project.techStack.some(t => t.toLowerCase().includes(query));
        const matchesTeam = project.team.some(m => m.name.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDesc && !matchesDomain && !matchesTech && !matchesTeam) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'upvotes') return b.upvotes - a.upvotes;
      if (sortBy === 'newest') return new Date(b.dateAdded) - new Date(a.dateAdded);
      if (sortBy === 'featured') return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0;
    });
  }, [projects, selectedDomain, searchTerm, selectedTech, selectedStatus, sortBy, onlyBookmarks, bookmarks]);

  // Featured Spotlight Projects (top 3 upvoted/featured)
  const featuredProjects = useMemo(() => {
    return projects.filter(p => p.featured).slice(0, 3);
  }, [projects]);

  // Compared Projects Objects
  const comparedProjects = useMemo(() => {
    return projects.filter(p => compareIds.includes(p.id));
  }, [projects, compareIds]);

  // Total Upvotes Count across community
  const totalUpvotesCount = useMemo(() => {
    return projects.reduce((sum, p) => sum + p.upvotes, 0);
  }, [projects]);

  const scrollToProjects = () => {
    const el = document.getElementById('projects-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpenSubmitModal={() => setShowSubmitModal(true)}
        onOpenCompareModal={() => setShowCompareModal(true)}
        compareCount={compareIds.length}
        bookmarkCount={bookmarks.length}
        onOpenBookmarksModal={() => {
          setOnlyBookmarks(!onlyBookmarks);
          scrollToProjects();
        }}
        totalProjectsCount={projects.length}
      />

      {/* Main Container */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <HeroSection
          totalProjects={projects.length}
          totalUpvotes={totalUpvotesCount}
          onOpenSubmitModal={() => setShowSubmitModal(true)}
          onScrollToProjects={scrollToProjects}
        />

        {/* Showcase Body Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          
          {/* Featured Spotlight Banner Section */}
          {featuredProjects.length > 0 && selectedDomain === 'All Projects' && !searchTerm && (
            <div className="mb-14 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-400" />
                  <h2 className="text-xl sm:text-2xl font-black text-white font-heading">
                    Project of the Month <span className="gradient-text-gold">Spotlight</span>
                  </h2>
                </div>
                <span className="text-xs text-amber-400/80 font-mono font-semibold">Git Club Editor's Pick</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredProjects.map(proj => (
                  <ProjectCard
                    key={proj.id}
                    project={proj}
                    onOpenDetail={setActiveDetailProject}
                    onToggleUpvote={handleToggleUpvote}
                    onToggleBookmark={handleToggleBookmark}
                    isBookmarked={bookmarks.includes(proj.id)}
                    onToggleCompare={handleToggleCompare}
                    isCompared={compareIds.includes(proj.id)}
                    viewMode="grid"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Filter Toolbar & Controls */}
          <FilterSection
            selectedDomain={selectedDomain}
            setSelectedDomain={setSelectedDomain}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedTech={selectedTech}
            setSelectedTech={setSelectedTech}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            sortBy={sortBy}
            setSortBy={setSortBy}
            viewMode={viewMode}
            setViewMode={setViewMode}
            filteredCount={filteredProjects.length}
            totalCount={projects.length}
            onResetFilters={handleResetFilters}
          />

          {/* Project Gallery Grid / List */}
          {filteredProjects.length > 0 ? (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
              }
            >
              {filteredProjects.map(proj => (
                <ProjectCard
                  key={proj.id}
                  project={proj}
                  onOpenDetail={setActiveDetailProject}
                  onToggleUpvote={handleToggleUpvote}
                  onToggleBookmark={handleToggleBookmark}
                  isBookmarked={bookmarks.includes(proj.id)}
                  onToggleCompare={handleToggleCompare}
                  isCompared={compareIds.includes(proj.id)}
                  viewMode={viewMode}
                />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center rounded-3xl glass-panel border border-slate-800 space-y-4">
              <Search className="w-10 h-10 text-slate-500 mx-auto animate-bounce" />
              <h3 className="text-lg font-bold text-white">No matching projects found</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                We couldn't find any projects matching your search filter. Try clearing filters or searching for another tech stack keyword.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition"
              >
                Reset Search Filters
              </button>
            </div>
          )}

          {/* Ecosystem Matrix Stats Banner */}
          <StatsSection />

        </div>
      </main>

      {/* Footer */}
      <Footer onScrollToTop={scrollToTop} />

      {/* Modal: Project Detail */}
      {activeDetailProject && (
        <ProjectDetailModal
          project={activeDetailProject}
          onClose={() => setActiveDetailProject(null)}
          onToggleUpvote={handleToggleUpvote}
          onToggleBookmark={handleToggleBookmark}
          isBookmarked={bookmarks.includes(activeDetailProject.id)}
        />
      )}

      {/* Modal: Submit Project */}
      {showSubmitModal && (
        <SubmitProjectModal
          onClose={() => setShowSubmitModal(false)}
          onSubmitProject={handleAddProject}
        />
      )}

      {/* Modal: Compare Projects */}
      {showCompareModal && (
        <CompareModal
          comparedProjects={comparedProjects}
          onClose={() => setShowCompareModal(false)}
          onRemoveCompare={(id) => setCompareIds(compareIds.filter(cId => cId !== id))}
        />
      )}

    </div>
  );
}
