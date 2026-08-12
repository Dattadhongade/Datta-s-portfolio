import React from 'react';
import { createPortal } from 'react-dom';
import { GraduationCap, Plus, Edit2, Trash2, Calendar, MapPin, X } from 'lucide-react';

export default function AdminAcademicsTab({
  educationList,
  showAddEdu,
  setShowAddEdu,
  editingEdu,
  setEditingEdu,
  newEdu,
  setNewEdu,
  handleAddEdu,
  handleUpdateEdu,
  deleteEducation,
  showToast
}) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header Badge & Add Education Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/20 text-emerald-800 dark:text-emerald-400 text-xs font-bold">
          <GraduationCap size={16} />
          <span>Academic Background &amp; Qualifications ({educationList.length})</span>
        </div>

        <button
          type="button"
          onClick={() => setShowAddEdu(true)}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-600/20 transition-all hover:scale-105 active:scale-95"
        >
          <Plus size={15} />
          <span>Add Education</span>
        </button>
      </div>

      {/* Main Card Container with Vertical Timeline */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-white/10">
        <div className="relative pl-8">
          {/* Single Vertical Timeline Line */}
          <div className="absolute left-3 top-0 bottom-0 w-px bg-indigo-200 dark:bg-indigo-500/25" />

          <div className="space-y-8">
            {educationList.map((edu) => (
              <div key={edu.id || edu.degree} className="relative group">
                {/* Dot on Timeline Line */}
                <span className="absolute left-[-1.45rem] top-1.5 w-3 h-3 rounded-full bg-indigo-500 dark:bg-indigo-400 ring-2 ring-white dark:ring-[#0d121e] shadow-sm" />

                {/* Degree & CGPA Badge */}
                <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
                    {edu.degree}
                  </h3>
                  {edu.cgpa && (
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-50 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/40 text-[11px] font-bold shrink-0">
                      CGPA: {edu.cgpa}
                    </span>
                  )}
                </div>

                {/* College / Institution Name */}
                <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  {edu.college || edu.institution}
                </p>

                {/* Metadata Badges: Duration & Location */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-3">
                  <span className="flex items-center gap-1 font-mono">
                    <Calendar size={13} className="text-cyan-500" />
                    {edu.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={13} className="text-cyan-500" />
                    {edu.location}
                  </span>
                </div>

                {/* Description Text */}
                {edu.description && (
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                    {edu.description}
                  </p>
                )}

                {/* Highlights List */}
                {(() => {
                  const highlightsList = Array.isArray(edu.highlights)
                    ? edu.highlights
                    : typeof edu.highlights === 'string' && edu.highlights.trim()
                    ? edu.highlights.split('\n').map((h) => h.trim()).filter(Boolean)
                    : [];

                  if (highlightsList.length === 0) return null;

                  return (
                    <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 mb-3 pl-1">
                      {highlightsList.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 leading-relaxed">
                          <span className="text-cyan-500 font-bold mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  );
                })()}

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-200/50 dark:border-white/5">
                  <button
                    type="button"
                    onClick={() => setEditingEdu(edu)}
                    className="px-3 py-1.5 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 hover:bg-cyan-100 dark:hover:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/30 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all"
                  >
                    <Edit2 size={12} />
                    <span>Edit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(`Delete education entry for "${edu.degree}"?`)) {
                        deleteEducation(edu.id);
                        showToast('Education deleted', 'warning');
                      }
                    }}
                    className="px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-500/10 hover:bg-rose-100 dark:hover:bg-rose-500/20 text-rose-700 dark:text-rose-400 border border-rose-300 dark:border-rose-500/30 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all"
                  >
                    <Trash2 size={12} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ADD EDUCATION MODAL */}
      {showAddEdu && createPortal(
        <div className="fixed inset-0 z-9999 bg-slate-950/85 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="glass-card rounded-2xl p-6 sm:p-8 max-w-lg w-full border border-slate-200/80 dark:border-white/10 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-base font-bold text-black dark:text-white">Add Education Entry</h3>
              <button onClick={() => setShowAddEdu(false)} className="text-slate-400 hover:text-white cursor-pointer"><X size={18} /></button>
            </div>
            <form onSubmit={handleAddEdu} className="space-y-3">
              <div>
                <label className="block text-xs font-bold mb-1">Degree Name</label>
                <input
                  type="text"
                  placeholder="e.g. Master of Computer Applications (MCA)"
                  value={newEdu.degree}
                  onChange={(e) => setNewEdu({ ...newEdu, degree: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border text-xs"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">College / Institution</label>
                <input
                  type="text"
                  placeholder="e.g. KBTCOE, Nashik"
                  value={newEdu.college}
                  onChange={(e) => setNewEdu({ ...newEdu, college: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border text-xs"
                  required
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-bold mb-1">Duration</label>
                  <input
                    type="text"
                    placeholder="2022 - 2024"
                    value={newEdu.duration}
                    onChange={(e) => setNewEdu({ ...newEdu, duration: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="Nashik, India"
                    value={newEdu.location}
                    onChange={(e) => setNewEdu({ ...newEdu, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">CGPA / Score</label>
                  <input
                    type="text"
                    placeholder="8.34 / 10"
                    value={newEdu.cgpa}
                    onChange={(e) => setNewEdu({ ...newEdu, cgpa: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border text-xs"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Academic Description / Overview</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Specialized in enterprise full-stack development, cloud architecture, and data engineering."
                  value={newEdu.description || ''}
                  onChange={(e) => setNewEdu({ ...newEdu, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Academic Highlights (one per line)</label>
                <textarea
                  rows={3}
                  placeholder="Specialized in Full Stack Development&#10;Published Research Paper"
                  value={newEdu.highlights || ''}
                  onChange={(e) => setNewEdu({ ...newEdu, highlights: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border text-xs"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowAddEdu(false)} className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-white/10 text-xs font-bold">Cancel</button>
                <button type="submit" className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold">Save Education</button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

      {/* EDIT EDUCATION MODAL */}
      {editingEdu && createPortal(
        <div className="fixed inset-0 z-9999 bg-slate-950/85 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="glass-card rounded-2xl p-6 sm:p-8 max-w-lg w-full border border-slate-200/80 dark:border-white/10 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-base font-bold text-black dark:text-white">Edit Education Entry</h3>
              <button onClick={() => setEditingEdu(null)} className="text-slate-400 hover:text-white cursor-pointer"><X size={18} /></button>
            </div>
            <form onSubmit={handleUpdateEdu} className="space-y-3">
              <div>
                <label className="block text-xs font-bold mb-1">Degree Name</label>
                <input
                  type="text"
                  value={editingEdu.degree || ''}
                  onChange={(e) => setEditingEdu({ ...editingEdu, degree: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border text-xs"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">College / Institution</label>
                <input
                  type="text"
                  value={editingEdu.college || editingEdu.institution || ''}
                  onChange={(e) => setEditingEdu({ ...editingEdu, college: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border text-xs"
                  required
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-bold mb-1">Duration</label>
                  <input
                    type="text"
                    value={editingEdu.duration || ''}
                    onChange={(e) => setEditingEdu({ ...editingEdu, duration: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Location</label>
                  <input
                    type="text"
                    value={editingEdu.location || ''}
                    onChange={(e) => setEditingEdu({ ...editingEdu, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">CGPA / Score</label>
                  <input
                    type="text"
                    value={editingEdu.cgpa || editingEdu.score || ''}
                    onChange={(e) => setEditingEdu({ ...editingEdu, cgpa: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border text-xs"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Academic Description / Overview</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Specialized in enterprise full-stack development, cloud architecture, and data engineering."
                  value={editingEdu.description || ''}
                  onChange={(e) => setEditingEdu({ ...editingEdu, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Academic Highlights (one per line)</label>
                <textarea
                  rows={3}
                  value={typeof editingEdu.highlights === 'string' ? editingEdu.highlights : (editingEdu.highlights || []).join('\n')}
                  onChange={(e) => setEditingEdu({ ...editingEdu, highlights: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border text-xs"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setEditingEdu(null)} className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-white/10 text-xs font-bold">Cancel</button>
                <button type="submit" className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold">Update Education</button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
