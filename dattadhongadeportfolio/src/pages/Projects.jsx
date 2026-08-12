import React, { useState } from "react";
import { createPortal } from "react-dom";
import { ExternalLink, Filter, X, CheckCircle2, ArrowRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { usePortfolio } from "../context/PortfolioContext";

const formatExternalUrl = (url) => {
  if (!url) return "";
  const trimmed = String(url).trim();
  if (!trimmed || trimmed === "#") return "";
  if (/^(https?:\/\/|mailto:|tel:)/i.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed}`;
};

const Projects = () => {
  const { projects, projectCategories } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = projectCategories || ["All", "Full Stack", "AI / SaaS", "Frontend", "Extensions"];

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      
      {/* Category Filter Bar - Centered */}
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="flex items-center justify-center gap-1.5 p-1 rounded-2xl bg-slate-100/90 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex-wrap">
          {categories.map((cat) => {
            const count = cat === "All" ? projects.length : projects.filter(p => p.category === cat).length;
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  isActive 
                    ? "bg-white dark:bg-cyan-500/25 text-black dark:text-cyan-300 border border-slate-300 dark:border-cyan-500/40 shadow-xs font-bold" 
                    : "text-black dark:text-slate-400 hover:text-cyan-600 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/5"
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-cyan-100 dark:bg-white/20 text-black dark:text-white font-bold' : 'bg-slate-200 dark:bg-white/10 text-black dark:text-slate-400'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map((project) => (
          <div 
            key={project.id} 
            className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between group hover:-translate-y-1 transition-all duration-200 border border-slate-200/80 dark:border-white/10 hover:border-cyan-500/40"
          >
            {/* Project Image & Badge */}
            <div className="w-full aspect-16/10 bg-slate-100 dark:bg-slate-900 overflow-hidden relative">
              <img 
                src={project.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop"} 
                alt={project.title} 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/95 dark:bg-black/60 backdrop-blur-md text-black dark:text-cyan-300 border border-slate-200 dark:border-cyan-500/30 shadow-xs">
                  {project.category}
                </span>
              </div>
            </div>
            
            {/* Card Content with Solid Black Text in Light Mode */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5">
              <div className="space-y-1.5">
                <h3 className="fluid-h3 font-semibold text-black dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors line-clamp-1">
                  {project.title}
                </h3>
                <p className="fluid-sm text-black dark:text-slate-300 leading-relaxed font-normal line-clamp-2">
                  {project.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-200/80 dark:border-white/5 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline transition-colors cursor-pointer"
                >
                  <span>Details</span>
                  <ArrowRight size={12} />
                </button>

                <div className="flex items-center gap-2">
                  {project.github && (
                    <a 
                      href={formatExternalUrl(project.github)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-black dark:text-slate-300 hover:text-cyan-600 dark:hover:text-white transition-colors"
                      title="Source Code"
                    >
                      <FaGithub size={14} />
                    </a>
                  )}
                  {project.demo && (
                    <a 
                      href={formatExternalUrl(project.demo)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-50 hover:bg-cyan-100 dark:bg-cyan-500/20 dark:hover:bg-cyan-500/30 border border-cyan-200 dark:border-cyan-500/30 text-black dark:text-cyan-300 text-xs font-bold transition-all"
                    >
                      <span>Go Live</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Project Detail Modal — 2-Column Responsive Layout (Left: Square Image Card, Right: Details) */}
      {selectedProject &&
        createPortal(
          <div 
            className="fixed inset-0 z-9999 bg-slate-950/85 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200"
            onClick={() => setSelectedProject(null)}
          >
            <div 
              className="glass-card max-w-3xl w-full rounded-2xl p-5 sm:p-7 space-y-5 border border-slate-200/80 dark:border-white/10 shadow-2xl relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Header */}
              <div className="flex  items-start justify-between gap-4 border-b border-slate-200/80 dark:border-white/10 pb-3">
                <div className="space-y-1">
               
                  <h3 className="fluid-h2 font-semibold text-black dark:text-white">
                    {selectedProject.title}
                  </h3>
                     <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-50 dark:bg-cyan-500/20 text-black dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/40 inline-block">
                    {selectedProject.category}
                  </span>
                </div>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-500 dark:text-slate-300 hover:text-black dark:hover:text-white transition-colors cursor-pointer shrink-0"
                  title="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* 2-Column Grid Body */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 sm:gap-6 items-start">
                
                {/* Left Column: Small Square Image Card */}
                {selectedProject.image && (
                  <div className="sm:col-span-4 flex flex-col items-center gap-3">
                    <div className="w-full aspect-square max-w-60 sm:max-w-none rounded-2xl overflow-hidden border border-slate-200/80 dark:border-white/10 bg-slate-100 dark:bg-slate-900/80 p-2.5 flex items-center justify-center shadow-lg relative group">
                      <img 
                        src={selectedProject.image} 
                        alt={selectedProject.title} 
                        className="w-full h-full object-contain rounded-xl transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                 
                  </div>
                )}

                {/* Right Column: Full Details & Information */}
                <div className={`${selectedProject.image ? 'sm:col-span-8' : 'sm:col-span-12'} space-y-4`}>
                  
                  {/* Description */}
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Overview</h4>
                    <p className="fluid-body text-black dark:text-slate-300 leading-relaxed font-normal">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Feature Highlights */}
                  {selectedProject.highlights && selectedProject.highlights.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-black dark:text-slate-400 uppercase tracking-wider">Key Architectural Features</h4>
                      <div className="space-y-1.5">
                        {selectedProject.highlights.map((point, idx) => (
                          <div key={idx} className="flex items-start gap-2 fluid-sm text-black dark:text-slate-300">
                            <CheckCircle2 size={15} className="text-emerald-600 dark:text-emerald-500 shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tech Stack Chips */}
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-bold text-black dark:text-slate-400 uppercase tracking-wider">Technologies Used</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {(selectedProject.tags || []).map((tag, idx) => (
                        <span 
                          key={idx} 
                          className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-black dark:text-cyan-300 font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                    {selectedProject.demo && (
                      <a 
                        href={formatExternalUrl(selectedProject.demo)} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-3.5 rounded-xl bg-linear-to-r from-cyan-600 to-indigo-600 text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-cyan-500/20 hover:opacity-95 transition-all"
                      >
                        <span>Launch Live Demo</span>
                        <ExternalLink size={14} />
                      </a>
                    )}
                    {selectedProject.github && (
                      <a 
                        href={formatExternalUrl(selectedProject.github)} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-black dark:text-slate-200 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
                      >
                        <FaGithub size={14} />
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>

                </div>
              </div>

            </div>
          </div>,
          document.body
        )}

    </div>
  );
};

export default Projects;
