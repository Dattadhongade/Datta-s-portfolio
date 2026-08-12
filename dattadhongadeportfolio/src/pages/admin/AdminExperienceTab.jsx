import React from 'react';
import { createPortal } from 'react-dom';
import { Award, Plus, Trash2, X } from 'lucide-react';

export default function AdminExperienceTab({
  experiences,
  showAddExp,
  setShowAddExp,
  newExp,
  setNewExp,
  handleAddExp,
  deleteExperience,
  showToast
}) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="fluid-h3 font-semibold text-black dark:text-white flex items-center gap-2">
          <Award size={18} className="text-purple-600 dark:text-purple-400" />
          <span>Organizations &amp; Timeline ({experiences.length})</span>
        </h3>
        <button
          onClick={() => setShowAddExp(true)}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
        >
          <Plus size={14} />
          <span>Add Organization</span>
        </button>
      </div>

      {experiences.map((exp) => (
        <div key={exp.id} className="glass-card rounded-2xl p-6 space-y-4 border border-slate-200/80 dark:border-white/10">
          <div className="flex justify-between items-start border-b border-slate-200 dark:border-white/10 pb-3">
            <div>
              <h4 className="fluid-h3 font-bold text-black dark:text-white">{exp.company}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">{exp.location} • {exp.duration}</p>
            </div>
            <button
              onClick={() => {
                if (window.confirm(`Delete organization "${exp.company}"?`)) {
                  deleteExperience(exp.id);
                  showToast('Organization deleted', 'warning');
                }
              }}
              className="p-2 rounded-xl bg-rose-50 dark:bg-rose-500/10 text-rose-600 hover:bg-rose-600 hover:text-white cursor-pointer"
            >
              <Trash2 size={14} />
            </button>
          </div>

          {/* Roles */}
          <div className="space-y-3 pl-2 border-l-2 border-purple-500/30">
            {(exp.roles || []).map((role, rIdx) => (
              <div key={rIdx} className="space-y-1 pl-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-black dark:text-white">{role.title}</span>
                  <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-500 text-[10px] font-mono">{role.type}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{role.period}</span>
                </div>
                {(Array.isArray(role.responsibilities) ? role.responsibilities : [role.responsibilities]).map((res, resIdx) => (
                  <p key={resIdx} className="text-xs text-slate-600 dark:text-slate-300">• {res}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* ADD EXP MODAL */}
      {showAddExp &&
        createPortal(
          <div className="fixed inset-0 z-[9999] bg-slate-950/85 backdrop-blur-xl flex items-center justify-center p-4">
            <div className="glass-card rounded-2xl p-6 sm:p-8 max-w-lg w-full border border-slate-200/80 dark:border-white/10 space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center border-b pb-3">
                <h3 className="text-base font-bold text-black dark:text-white">Add Work Experience</h3>
                <button onClick={() => setShowAddExp(false)} className="text-slate-400 hover:text-white cursor-pointer"><X size={18} /></button>
              </div>
              <form onSubmit={handleAddExp} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Company Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Integral Development Corp."
                    value={newExp.company}
                    onChange={(e) => setNewExp({ ...newExp, company: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border text-xs"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold mb-1">Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Nashik, India"
                      value={newExp.location}
                      onChange={(e) => setNewExp({ ...newExp, location: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">Total Duration</label>
                    <input
                      type="text"
                      placeholder="e.g. Jul 2024 - Present"
                      value={newExp.duration}
                      onChange={(e) => setNewExp({ ...newExp, duration: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border text-xs"
                    />
                  </div>
                </div>

                {/* Primary Role Details */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border space-y-2">
                  <h5 className="text-xs font-bold text-purple-500">Primary Role</h5>
                  <div>
                    <label className="block text-[11px] font-semibold mb-1">Role Title</label>
                    <input
                      type="text"
                      placeholder="Software Engineer"
                      value={newExp.roles[0].title}
                      onChange={(e) => {
                        const updatedRoles = [...newExp.roles];
                        updatedRoles[0].title = e.target.value;
                        setNewExp({ ...newExp, roles: updatedRoles });
                      }}
                      className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border text-xs"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold mb-1">Key Responsibilities (one per line)</label>
                    <textarea
                      rows={3}
                      value={newExp.roles[0].responsibilities}
                      onChange={(e) => {
                        const updatedRoles = [...newExp.roles];
                        updatedRoles[0].responsibilities = e.target.value;
                        setNewExp({ ...newExp, roles: updatedRoles });
                      }}
                      className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border text-xs"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3">
                  <button type="button" onClick={() => setShowAddExp(false)} className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-white/10 text-xs font-bold">Cancel</button>
                  <button type="submit" className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold">Save Experience</button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
