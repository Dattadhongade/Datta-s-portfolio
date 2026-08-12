import React from 'react';
import { createPortal } from 'react-dom';
import { Briefcase, Plus, Edit2, Trash2, Check, Upload, ExternalLink, X, Eye, ArrowRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export default function AdminProjectsTab({
  projects,
  projectCategories,
  showAddProject,
  setShowAddProject,
  editingProject,
  setEditingProject,
  newProject,
  setNewProject,
  editingCategory,
  setEditingCategory,
  categoryEditInput,
  setCategoryEditInput,
  newCategoryInput,
  setNewCategoryInput,
  uploadingImage,
  setUploadingImage,
  handleImageUpload,
  handleAddProject,
  handleUpdateProject,
  deleteProject,
  addProjectCategory,
  updateProjectCategory,
  deleteProjectCategory,
  uploadImage,
  showToast
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h3 className="fluid-h3 font-semibold text-black dark:text-white flex items-center gap-2">
            <Briefcase size={18} className="text-indigo-600 dark:text-indigo-400" />
            <span>Production Projects &amp; SaaS Directory ({projects.length})</span>
          </h3>
          <p className="fluid-xs text-black dark:text-slate-400 font-medium">Click Edit to modify or Add New Project to publish.</p>
        </div>
        <button
          onClick={() => setShowAddProject(true)}
          className="px-4 py-2.5 rounded-xl bg-linear-to-r from-cyan-600 to-indigo-600 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-indigo-500/20 cursor-pointer"
        >
          <Plus size={15} />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Project Categories Bar */}
      <div className="glass-card rounded-2xl p-4 border border-slate-200/80 dark:border-white/10 space-y-3">
        <div className="text-center">
          <h4 className="text-xs font-bold text-black dark:text-slate-300">Custom Project Categories</h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Click rename icon to edit or add new category</p>
        </div>
        <div className="flex flex-wrap gap-2 items-center justify-center">
          {projectCategories.map((cat) => (
            <div key={cat} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-semibold text-black dark:text-slate-200 shadow-2xs">
              {editingCategory === cat ? (
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    value={categoryEditInput}
                    onChange={(e) => setCategoryEditInput(e.target.value)}
                    className="px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-cyan-500 text-xs text-black dark:text-white w-28"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (categoryEditInput.trim()) {
                        updateProjectCategory(cat, categoryEditInput);
                        setEditingCategory(null);
                        showToast(`Renamed category to "${categoryEditInput.trim()}"`, 'success');
                      }
                    }}
                    className="text-emerald-600 hover:text-emerald-500 p-0.5"
                    title="Save Rename"
                  >
                    <Check size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingCategory(null)}
                    className="text-slate-400 p-0.5"
                  >
                    <X size={13} />
                  </button>
                </div>
              ) : (
                <>
                  <span>{cat}</span>
                  {cat !== 'All' && (
                    <div className="flex items-center gap-0.5 ml-1">
                      <button
                        onClick={() => { setEditingCategory(cat); setCategoryEditInput(cat); }}
                        className="text-slate-400 hover:text-cyan-500 p-0.5 cursor-pointer"
                        title="Rename Category"
                      >
                        <Edit2 size={11} />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete category "${cat}"? Projects in this category will move to "All".`)) {
                            deleteProjectCategory(cat);
                            showToast(`Deleted category "${cat}"`, 'warning');
                          }
                        }}
                        className="text-slate-400 hover:text-rose-500 p-0.5 cursor-pointer"
                        title="Delete Category"
                      >
                        <Trash2 size={11} />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}

          {/* Add Category Inline */}
          <div className="flex items-center gap-1.5 ml-2">
            <input
              type="text"
              placeholder="New Category..."
              value={newCategoryInput}
              onChange={(e) => setNewCategoryInput(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 text-xs text-black dark:text-white font-medium focus:outline-none focus:border-cyan-500 w-32 sm:w-40"
            />
            <button
              onClick={() => {
                if (newCategoryInput.trim()) {
                  addProjectCategory(newCategoryInput.trim());
                  showToast('Category added!', 'success');
                  setNewCategoryInput('');
                }
              }}
              className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs cursor-pointer shadow-xs"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* ─── Projects Grid — Public Card Style ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project) => (
          <div
            key={project.id}
            className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between group hover:-translate-y-1 transition-all duration-200 border border-slate-200/80 dark:border-white/10 hover:border-cyan-500/40"
          >
            {/* Image + Overlays */}
            <div className="w-full aspect-16/10 bg-slate-100 dark:bg-slate-900 overflow-hidden relative">
              <img
                src={project.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop"}
                alt={project.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

              {/* Category badge top-left */}
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/95 dark:bg-black/60 backdrop-blur-md text-black dark:text-cyan-300 border border-slate-200 dark:border-cyan-500/30 shadow-xs">
                  {project.category}
                </span>
              </div>

              {/* Edit + Delete top-right */}
              <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => setEditingProject(project)}
                  className="p-2 rounded-xl bg-slate-900/80 text-white backdrop-blur-md hover:bg-cyan-600 transition-colors shadow-lg cursor-pointer"
                  title="Edit Project"
                >
                  <Edit2 size={13} />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Delete project "${project.title}"?`)) {
                      deleteProject(project.id);
                      showToast('Project deleted', 'warning');
                    }
                  }}
                  className="p-2 rounded-xl bg-slate-900/80 text-rose-400 backdrop-blur-md hover:bg-rose-600 hover:text-white transition-colors shadow-lg cursor-pointer"
                  title="Delete Project"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5">
              <div className="space-y-1.5">
                <h3 className="fluid-h3 font-semibold text-black dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors line-clamp-1">
                  {project.title}
                </h3>
                <p className="fluid-sm text-black dark:text-slate-300 leading-relaxed font-normal line-clamp-2">
                  {project.description}
                </p>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {(project.tags || []).slice(0, 4).map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-black dark:text-slate-300 font-medium"
                  >
                    {tag}
                  </span>
                ))}
                {(project.tags || []).length > 4 && (
                  <span className="text-[11px] px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-black dark:text-slate-400 font-semibold">
                    +{project.tags.length - 4}
                  </span>
                )}
              </div>

              {/* Action row */}
              <div className="pt-3 border-t border-slate-200/80 dark:border-white/5 flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {project.status || 'Published'}
                </span>
                <div className="flex items-center gap-2">
                  {project.github && (
                    <a
                      href={project.github.startsWith('http') ? project.github : `https://${project.github}`}
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
                      href={project.demo.startsWith('http') ? project.demo : `https://${project.demo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-50 hover:bg-cyan-100 dark:bg-cyan-500/20 dark:hover:bg-cyan-500/30 border border-cyan-200 dark:border-cyan-500/30 text-black dark:text-cyan-300 text-xs font-bold transition-all"
                    >
                      <span>Demo</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ─── ADD PROJECT MODAL ─── */}
      {showAddProject && createPortal(
        <div className="fixed inset-0 z-9999 bg-slate-950/85 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="glass-card rounded-2xl p-6 sm:p-8 max-w-2xl w-full border border-slate-200/80 dark:border-white/10 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-200/80 dark:border-white/10 pb-3">
              <h3 className="text-lg font-bold text-black dark:text-white">Add New Production Project</h3>
              <button onClick={() => setShowAddProject(false)} className="text-slate-400 hover:text-white cursor-pointer"><X size={18} /></button>
            </div>
            <form onSubmit={handleAddProject} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-black dark:text-slate-300">Project Title</label>
                  <input
                    type="text"
                    placeholder="e.g. PDF-Chat SaaS Platform"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border text-black dark:text-white text-xs sm:text-sm font-medium focus:outline-none focus:border-cyan-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-black dark:text-slate-300">Category</label>
                  <select
                    value={newProject.category}
                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border text-black dark:text-white text-xs sm:text-sm font-medium focus:outline-none focus:border-cyan-500"
                  >
                    {projectCategories.map((c) => (
                      <option key={c} value={c} className="bg-white dark:bg-slate-900 text-black dark:text-white">{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Image — Upload only */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-black dark:text-slate-300">Project Image</label>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  <label className="px-3.5 py-2 rounded-xl bg-linear-to-r from-cyan-600 to-indigo-600 text-white text-xs font-bold cursor-pointer transition-colors inline-flex items-center gap-1.5 shadow-sm">
                    <Upload size={13} />
                    <span>{newProject.image ? 'Change Image' : 'Upload Image'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, false)}
                    />
                  </label>
                  {newProject.image && (
                    <div className="mt-2 w-full h-28 rounded-lg overflow-hidden border border-slate-200 dark:border-white/10">
                      <img src={newProject.image} alt="preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-black dark:text-slate-300">Description</label>
                <textarea
                  rows={3}
                  placeholder="Brief description of what this project does, key features and impact..."
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border text-black dark:text-white text-xs sm:text-sm font-normal focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-black dark:text-slate-300">GitHub URL</label>
                  <input
                    type="text"
                    placeholder="https://github.com/username/repo"
                    value={newProject.github}
                    onChange={(e) => setNewProject({ ...newProject, github: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border text-black dark:text-white text-xs font-medium focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-black dark:text-slate-300">Live Demo URL</label>
                  <input
                    type="text"
                    placeholder="https://yourproject.vercel.app"
                    value={newProject.demo}
                    onChange={(e) => setNewProject({ ...newProject, demo: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border text-black dark:text-white text-xs font-medium focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-black dark:text-slate-300">Tech Stack Tags <span className="text-slate-400 font-normal">(Comma separated)</span></label>
                <input
                  type="text"
                  placeholder="React, TypeScript, Node.js, MongoDB"
                  value={newProject.tags}
                  onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border text-black dark:text-white text-xs font-medium focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-black dark:text-slate-300">Key Feature Highlights <span className="text-slate-400 font-normal">(One per line)</span></label>
                <textarea
                  rows={3}
                  placeholder={"Vector embeddings for similarity search\nStreaming responses with markdown math\nTiered subscription paywall"}
                  value={newProject.highlights}
                  onChange={(e) => setNewProject({ ...newProject, highlights: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border text-black dark:text-white text-xs font-normal focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowAddProject(false)} className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-white/10 text-black dark:text-slate-300 text-xs font-bold cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs sm:text-sm cursor-pointer shadow-md shadow-cyan-500/20">Publish Project</button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

      {/* ─── EDIT PROJECT MODAL ─── */}
      {editingProject && createPortal(
        <div className="fixed inset-0 z-9999 bg-slate-950/85 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="glass-card rounded-2xl p-6 sm:p-8 max-w-2xl w-full border border-slate-200/80 dark:border-white/10 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-200/80 dark:border-white/10 pb-3">
              <h3 className="text-lg font-bold text-black dark:text-white">Edit Project Details</h3>
              <button onClick={() => setEditingProject(null)} className="text-slate-400 hover:text-white cursor-pointer"><X size={18} /></button>
            </div>
            <form onSubmit={handleUpdateProject} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-black dark:text-slate-300">Project Title</label>
                  <input
                    type="text"
                    placeholder="e.g. PDF-Chat SaaS Platform"
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border text-black dark:text-white text-xs sm:text-sm font-medium focus:outline-none focus:border-cyan-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-black dark:text-slate-300">Category</label>
                  <select
                    value={editingProject.category}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border text-black dark:text-white text-xs sm:text-sm font-medium focus:outline-none focus:border-cyan-500"
                  >
                    {projectCategories.map((c) => (
                      <option key={c} value={c} className="bg-white dark:bg-slate-900 text-black dark:text-white">{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Image — Upload only */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-black dark:text-slate-300">Project Image</label>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-2">
                  <label className="px-3.5 py-2 rounded-xl bg-linear-to-r from-cyan-600 to-indigo-600 text-white text-xs font-bold cursor-pointer transition-colors inline-flex items-center gap-1.5 shadow-sm">
                    <Upload size={13} />
                    <span>Upload New Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, true)}
                    />
                  </label>
                  {editingProject.image && (
                    <div className="w-full h-28 rounded-lg overflow-hidden border border-slate-200 dark:border-white/10">
                      <img src={editingProject.image} alt="preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-black dark:text-slate-300">Description</label>
                <textarea
                  rows={3}
                  placeholder="Brief description of what this project does..."
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border text-black dark:text-white text-xs sm:text-sm font-normal focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-black dark:text-slate-300">GitHub URL</label>
                  <input
                    type="text"
                    placeholder="https://github.com/username/repo"
                    value={editingProject.github || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, github: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border text-black dark:text-white text-xs font-medium focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-black dark:text-slate-300">Live Demo URL</label>
                  <input
                    type="text"
                    placeholder="https://yourproject.vercel.app"
                    value={editingProject.demo || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, demo: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border text-black dark:text-white text-xs font-medium focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-black dark:text-slate-300">Tech Stack Tags <span className="text-slate-400 font-normal">(Comma separated)</span></label>
                <input
                  type="text"
                  placeholder="React, TypeScript, Node.js"
                  value={typeof editingProject.tags === 'string' ? editingProject.tags : (editingProject.tags || []).join(', ')}
                  onChange={(e) => setEditingProject({ ...editingProject, tags: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border text-black dark:text-white text-xs font-medium focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-black dark:text-slate-300">Key Feature Highlights <span className="text-slate-400 font-normal">(One per line)</span></label>
                <textarea
                  rows={3}
                  placeholder={"Feature highlight 1\nFeature highlight 2"}
                  value={typeof editingProject.highlights === 'string' ? editingProject.highlights : (editingProject.highlights || []).join('\n')}
                  onChange={(e) => setEditingProject({ ...editingProject, highlights: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border text-black dark:text-white text-xs font-normal focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setEditingProject(null)} className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-white/10 text-black dark:text-slate-300 text-xs font-bold cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs sm:text-sm cursor-pointer shadow-md shadow-cyan-500/20">Save Changes</button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
