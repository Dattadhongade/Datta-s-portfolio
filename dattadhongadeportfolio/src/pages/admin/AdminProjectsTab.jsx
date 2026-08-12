import React from 'react';
import { createPortal } from 'react-dom';
import { Briefcase, Plus, Edit2, Trash2, Check, Upload, ExternalLink, X } from 'lucide-react';

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

      {/* Project Categories Bar (Centered & Fully Editable) */}
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
                        onClick={() => {
                          setEditingCategory(cat);
                          setCategoryEditInput(cat);
                        }}
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

          {/* Add Category Form Inline */}
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

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {projects.map((project) => (
          <div key={project.id} className="glass-card rounded-2xl p-5 border border-slate-200/80 dark:border-white/10 flex flex-col justify-between space-y-4 hover:border-cyan-500/40 transition-all duration-300">
            <div className="space-y-3">
              {project.image && (
                <div className="w-full h-44 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 relative group">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 flex gap-1">
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
                  <span className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-slate-900/80 text-cyan-400 text-[10px] font-mono font-bold backdrop-blur-md border border-white/10">
                    {project.category}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-base font-bold text-black dark:text-white">{project.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{project.description}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {(project.tags || []).map((tag, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 text-[10px] font-mono border border-slate-200 dark:border-white/5">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Links & Status */}
            <div className="pt-3 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                {project.status || 'Published'}
              </span>
              <div className="flex items-center gap-2">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg text-slate-500 hover:text-black dark:hover:text-white transition-colors">
                    <ExternalLink size={13} />
                  </a>
                )}
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-bold hover:bg-cyan-500 hover:text-white transition-colors">
                    Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADD PROJECT MODAL */}
      {showAddProject &&
        createPortal(
          <div className="fixed inset-0 z-[9999] bg-slate-950/85 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="glass-card rounded-2xl p-6 sm:p-8 max-w-2xl w-full border border-slate-200/80 dark:border-white/10 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-200/80 dark:border-white/10 pb-3">
              <h3 className="text-lg font-bold text-black dark:text-white">Add New Production Project</h3>
              <button onClick={() => setShowAddProject(false)} className="text-slate-400 hover:text-white cursor-pointer"><X size={18} /></button>
            </div>
            <form onSubmit={handleAddProject} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-black dark:text-slate-300">Project Title</label>
                  <input
                    type="text"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border text-black dark:text-white text-xs sm:text-sm font-medium focus:outline-none focus:border-cyan-500"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-black dark:text-slate-300">Category</label>
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
              <div className="space-y-1">
                <label className="text-xs font-bold text-black dark:text-slate-300">Project Image — Upload File or Paste Direct Image URL</label>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <label className="px-3.5 py-2 rounded-xl bg-linear-to-r from-cyan-600 to-indigo-600 text-white text-xs font-bold cursor-pointer transition-colors inline-flex items-center gap-1.5 shadow-sm">
                      <Upload size={13} />
                      <span>Upload Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, false)}
                      />
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder="Or paste direct image URL (https://...)"
                    value={newProject.image}
                    onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-white/5 border text-black dark:text-white text-xs font-medium focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-black dark:text-slate-300">Description</label>
                <textarea
                  rows={3}
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border text-black dark:text-white text-xs sm:text-sm font-normal focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-black dark:text-slate-300">GitHub URL</label>
                  <input
                    type="text"
                    value={newProject.github}
                    onChange={(e) => setNewProject({ ...newProject, github: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border text-black dark:text-white text-xs font-medium focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-black dark:text-slate-300">Live Demo URL</label>
                  <input
                    type="text"
                    value={newProject.demo}
                    onChange={(e) => setNewProject({ ...newProject, demo: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border text-black dark:text-white text-xs font-medium focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-black dark:text-slate-300">Tech Stack Tags (Comma separated)</label>
                <input
                  type="text"
                  placeholder="React, TypeScript, Node.js"
                  value={newProject.tags}
                  onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border text-black dark:text-white text-xs font-medium focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-black dark:text-slate-300">Key Feature Highlights (One per line)</label>
                <textarea
                  rows={3}
                  placeholder="Vector embeddings for similarity search&#10;Streaming responses with markdown math"
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

      {/* EDIT PROJECT MODAL */}
      {editingProject &&
        createPortal(
          <div className="fixed inset-0 z-[9999] bg-slate-950/85 backdrop-blur-xl flex items-center justify-center p-4">
            <div className="glass-card rounded-2xl p-6 sm:p-8 max-w-2xl w-full border border-slate-200/80 dark:border-white/10 space-y-5 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center border-b border-slate-200/80 dark:border-white/10 pb-3">
                <h3 className="text-lg font-bold text-black dark:text-white">Edit Project Details</h3>
                <button onClick={() => setEditingProject(null)} className="text-slate-400 hover:text-white cursor-pointer"><X size={18} /></button>
              </div>
              <form onSubmit={handleUpdateProject} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-black dark:text-slate-300">Project Title</label>
                    <input
                      type="text"
                      value={editingProject.title}
                      onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border text-black dark:text-white text-xs sm:text-sm font-medium focus:outline-none focus:border-cyan-500"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-black dark:text-slate-300">Category</label>
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
                <div className="space-y-1">
                  <label className="text-xs font-bold text-black dark:text-slate-300">Project Image — Upload File or Paste Direct Image URL</label>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-2">
                    <div className="flex items-center gap-3 flex-wrap">
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
                    </div>
                    <input
                      type="text"
                      placeholder="Or paste direct image URL (https://...)"
                      value={editingProject.image || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-white/5 border text-black dark:text-white text-xs font-medium focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-black dark:text-slate-300">Description</label>
                  <textarea
                    rows={3}
                    value={editingProject.description}
                    onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border text-black dark:text-white text-xs sm:text-sm font-normal focus:outline-none focus:border-cyan-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-black dark:text-slate-300">GitHub URL</label>
                    <input
                      type="text"
                      value={editingProject.github || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, github: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border text-black dark:text-white text-xs font-medium focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-black dark:text-slate-300">Live Demo URL</label>
                    <input
                      type="text"
                      value={editingProject.demo || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, demo: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border text-black dark:text-white text-xs font-medium focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-black dark:text-slate-300">Tech Stack Tags (Comma separated)</label>
                  <input
                    type="text"
                    value={typeof editingProject.tags === 'string' ? editingProject.tags : (editingProject.tags || []).join(', ')}
                    onChange={(e) => setEditingProject({ ...editingProject, tags: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border text-black dark:text-white text-xs font-medium focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-black dark:text-slate-300">Key Feature Highlights (One per line)</label>
                  <textarea
                    rows={3}
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
