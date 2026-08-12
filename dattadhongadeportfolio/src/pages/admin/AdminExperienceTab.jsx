import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Award, Plus, Trash2, Edit2, X, Check, Briefcase } from 'lucide-react';

const BLANK_EXP = {
  company: '',
  location: '',
  duration: '',
  badge: 'Completed',
  roles: [{ title: '', type: 'Full-time', duration: '', description: '', achievements: '', technologies: '' }]
};

export default function AdminExperienceTab({
  experiences,
  showAddExp,
  setShowAddExp,
  newExp,
  setNewExp,
  handleAddExp,
  deleteExperience,
  updateExperience,
  showToast
}) {
  const [editingExp, setEditingExp] = useState(null);

  const handleStartEdit = (exp) => {
    // Stringify arrays for editing
    const editCopy = {
      ...exp,
      roles: exp.roles.map(r => ({
        ...r,
        achievements: Array.isArray(r.achievements) ? r.achievements.join('\n') : (r.achievements || ''),
        technologies: Array.isArray(r.technologies) ? r.technologies.join(', ') : (r.technologies || '')
      }))
    };
    setEditingExp(editCopy);
  };

  const handleSaveEdit = () => {
    if (!editingExp || !editingExp.company.trim()) return;
    const processed = {
      ...editingExp,
      roles: editingExp.roles.map(r => ({
        ...r,
        achievements: typeof r.achievements === 'string'
          ? r.achievements.split('\n').map(l => l.trim()).filter(Boolean)
          : r.achievements,
        technologies: typeof r.technologies === 'string'
          ? r.technologies.split(',').map(t => t.trim()).filter(Boolean)
          : r.technologies
      }))
    };
    if (updateExperience) updateExperience(editingExp.id, processed);
    setEditingExp(null);
    showToast('Experience updated!', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="fluid-h3 font-semibold text-black dark:text-white flex items-center gap-2">
          <Award size={18} className="text-purple-600 dark:text-purple-400" />
          <span>Work Experience ({experiences.length})</span>
        </h3>
        <button
          onClick={() => setShowAddExp(true)}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
        >
          <Plus size={14} />
          <span>Add Experience</span>
        </button>
      </div>

      {/* Experience Cards */}
      {experiences.map((exp) => (
        <div key={exp.id} className="glass-card rounded-2xl p-6 space-y-4 border border-slate-200/80 dark:border-white/10 group">
          {/* Company Header */}
          <div className="flex justify-between items-start border-b border-slate-200 dark:border-white/10 pb-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="fluid-h3 font-bold text-black dark:text-white">{exp.company}</h4>
                {exp.badge && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${exp.badgeColor || 'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10'}`}>
                    {exp.badge}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{exp.location} · {exp.duration}</p>
            </div>
            <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
              <button
                onClick={() => handleStartEdit(exp)}
                className="p-2 rounded-xl bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20 cursor-pointer"
              >
                <Edit2 size={14} />
              </button>
              <button
                onClick={() => {
                  if (window.confirm(`Delete "${exp.company}"?`)) {
                    deleteExperience(exp.id);
                    showToast('Experience deleted', 'warning');
                  }
                }}
                className="p-2 rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 cursor-pointer"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>

          {/* Roles */}
          <div className="space-y-5 pl-3 border-l-2 border-purple-500/30">
            {(exp.roles || []).map((role, rIdx) => (
              <div key={rIdx} className="space-y-2 pl-3">
                {/* Role Title + Type + Duration */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-bold text-black dark:text-white">{role.title}</span>
                  <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-500 dark:text-purple-400 text-[10px] font-bold border border-purple-500/20">{role.type}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{role.duration}</span>
                </div>

                {/* Description */}
                {role.description && (
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{role.description}</p>
                )}

                {/* Achievement Bullet Points — centered */}
                {(Array.isArray(role.achievements) ? role.achievements : []).length > 0 && (
                  <ul className="space-y-1 ml-1">
                    {(Array.isArray(role.achievements) ? role.achievements : []).map((ach, aIdx) => (
                      <li key={aIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Technologies */}
                {(Array.isArray(role.technologies) ? role.technologies : []).length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {(Array.isArray(role.technologies) ? role.technologies : []).map((tech, tIdx) => (
                      <span key={tIdx} className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 text-[10px] font-mono border border-slate-200 dark:border-white/10">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {experiences.length === 0 && (
        <div className="py-16 flex flex-col items-center gap-3 text-slate-400">
          <Briefcase size={32} className="opacity-40" />
          <p className="text-sm font-medium">No experience entries yet. Add one above.</p>
        </div>
      )}

      {/* EDIT EXPERIENCE MODAL */}
      {editingExp && createPortal(
        <div className="fixed inset-0 z-9999 bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="glass-card rounded-2xl p-6 max-w-2xl w-full border border-cyan-500/30 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
              <h3 className="text-base font-bold text-black dark:text-white flex items-center gap-2">
                <Edit2 size={16} className="text-cyan-500" />
                Edit: {editingExp.company}
              </h3>
              <button onClick={() => setEditingExp(null)} className="text-slate-400 hover:text-white cursor-pointer"><X size={18} /></button>
            </div>

            <div className="space-y-3">
              {/* Company fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold mb-1 text-slate-500">Company</label>
                  <input
                    value={editingExp.company}
                    onChange={(e) => setEditingExp({ ...editingExp, company: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border text-sm text-black dark:text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold mb-1 text-slate-500">Location</label>
                  <input
                    value={editingExp.location}
                    onChange={(e) => setEditingExp({ ...editingExp, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border text-sm text-black dark:text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold mb-1 text-slate-500">Duration</label>
                  <input
                    value={editingExp.duration}
                    onChange={(e) => setEditingExp({ ...editingExp, duration: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border text-sm text-black dark:text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold mb-1 text-slate-500">Badge</label>
                  <input
                    value={editingExp.badge}
                    onChange={(e) => setEditingExp({ ...editingExp, badge: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border text-sm text-black dark:text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Roles */}
              {editingExp.roles.map((role, rIdx) => (
                <div key={rIdx} className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border space-y-3">
                  <h5 className="text-xs font-bold text-purple-500">Role {rIdx + 1}</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold mb-0.5 text-slate-500">Title</label>
                      <input
                        value={role.title}
                        onChange={(e) => {
                          const r = [...editingExp.roles]; r[rIdx] = { ...r[rIdx], title: e.target.value };
                          setEditingExp({ ...editingExp, roles: r });
                        }}
                        className="w-full px-2 py-1.5 rounded-lg bg-white dark:bg-slate-900 border text-xs text-black dark:text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold mb-0.5 text-slate-500">Type</label>
                      <input
                        value={role.type}
                        onChange={(e) => {
                          const r = [...editingExp.roles]; r[rIdx] = { ...r[rIdx], type: e.target.value };
                          setEditingExp({ ...editingExp, roles: r });
                        }}
                        className="w-full px-2 py-1.5 rounded-lg bg-white dark:bg-slate-900 border text-xs text-black dark:text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold mb-0.5 text-slate-500">Duration</label>
                      <input
                        value={role.duration}
                        onChange={(e) => {
                          const r = [...editingExp.roles]; r[rIdx] = { ...r[rIdx], duration: e.target.value };
                          setEditingExp({ ...editingExp, roles: r });
                        }}
                        className="w-full px-2 py-1.5 rounded-lg bg-white dark:bg-slate-900 border text-xs text-black dark:text-white focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold mb-0.5 text-slate-500">Description</label>
                    <textarea
                      rows={2}
                      value={role.description}
                      onChange={(e) => {
                        const r = [...editingExp.roles]; r[rIdx] = { ...r[rIdx], description: e.target.value };
                        setEditingExp({ ...editingExp, roles: r });
                      }}
                      className="w-full px-2 py-1.5 rounded-lg bg-white dark:bg-slate-900 border text-xs text-black dark:text-white focus:outline-none resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold mb-0.5 text-slate-500">Achievements (one per line)</label>
                    <textarea
                      rows={3}
                      value={role.achievements}
                      onChange={(e) => {
                        const r = [...editingExp.roles]; r[rIdx] = { ...r[rIdx], achievements: e.target.value };
                        setEditingExp({ ...editingExp, roles: r });
                      }}
                      className="w-full px-2 py-1.5 rounded-lg bg-white dark:bg-slate-900 border text-xs text-black dark:text-white focus:outline-none resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold mb-0.5 text-slate-500">Technologies (comma-separated)</label>
                    <input
                      value={role.technologies}
                      onChange={(e) => {
                        const r = [...editingExp.roles]; r[rIdx] = { ...r[rIdx], technologies: e.target.value };
                        setEditingExp({ ...editingExp, roles: r });
                      }}
                      className="w-full px-2 py-1.5 rounded-lg bg-white dark:bg-slate-900 border text-xs text-black dark:text-white focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setEditingExp(null)}
                className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-white/10 text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Check size={14} />
                Save Changes
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* ADD EXP MODAL */}
      {showAddExp && createPortal(
        <div className="fixed inset-0 z-9999 bg-slate-950/85 backdrop-blur-xl flex items-center justify-center p-4">
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
                  <label className="block text-[11px] font-semibold mb-1">Key Achievements (one per line)</label>
                  <textarea
                    rows={3}
                    placeholder="Built X using Y..."
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
