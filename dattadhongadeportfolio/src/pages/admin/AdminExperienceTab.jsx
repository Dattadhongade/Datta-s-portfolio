import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Award,
  Plus,
  Trash2,
  Edit2,
  X,
  Check,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Layers,
  MapPin,
  Calendar,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

const SUGGESTED_TITLES = [
  'Software Engineer',
  'Full stack Developer',
  'Frontend Developer',
  'Backend Developer',
  'React.js Developer',
  'MERN Stack Developer',
  'Full-Stack Developer Intern',
  'Project Intern'
];

const SUGGESTED_BADGES = [
  'Current Employer',
  'Completed',
  'Full-time',
  'Internship',
  'Contract'
];

const SUGGESTED_TYPES = ['Full-time', 'Internship', 'Part-time', 'Contract', 'Freelance'];

const createBlankRole = (type = 'Full-time', title = 'Software Engineer') => ({
  title,
  type,
  duration: '',
  description: '',
  technologies: ''
});

const createBlankExperience = () => ({
  company: '',
  location: 'Nashik, India',
  duration: 'Apr 2025 - Present · Ongoing',
  badge: 'Current Employer',
  badgeColor: 'bg-emerald-50 text-black dark:text-emerald-300 border-emerald-300',
  roles: [createBlankRole('Full-time', 'Software Engineer')]
});

export default function AdminExperienceTab({
  experiences = [],
  showAddExp,
  setShowAddExp,
  addExperience,
  deleteExperience,
  updateExperience,
  moveExperience,
  reorderExperiences,
  showToast
}) {
  const [editingExp, setEditingExp] = useState(null);
  const [formData, setFormData] = useState(createBlankExperience());
  const [isEditMode, setIsEditMode] = useState(false);

  // Open Add Modal
  const handleOpenAdd = () => {
    setFormData(createBlankExperience());
    setIsEditMode(false);
    setShowAddExp(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (exp) => {
    const editCopy = {
      ...exp,
      roles: (exp.roles || []).map((r) => {
        // Merge achievements into description if description was empty
        let combinedDesc = r.description || '';
        if (!combinedDesc && (r.achievements || r.responsibilities)) {
          const rawAch = r.achievements || r.responsibilities;
          combinedDesc = Array.isArray(rawAch) ? rawAch.join('\n') : rawAch;
        }

        return {
          ...r,
          description: combinedDesc,
          technologies: Array.isArray(r.technologies)
            ? r.technologies.join(', ')
            : typeof r.technologies === 'string'
            ? r.technologies
            : ''
        };
      })
    };

    if (editCopy.roles.length === 0) {
      editCopy.roles = [createBlankRole()];
    }

    setFormData(editCopy);
    setIsEditMode(true);
    setEditingExp(exp);
  };

  // Close Modal
  const handleCloseModal = () => {
    setShowAddExp(false);
    setEditingExp(null);
    setIsEditMode(false);
  };

  // add another role (promoted role added FIRST at the top)
  const handleAddRoleToForm = (type = 'Full-time') => {
    setFormData((prev) => ({
      ...prev,
      roles: [createBlankRole(type, 'Software Engineer'), ...prev.roles]
    }));
  };

  // move role up or down
  const handleMoveRole = (fromIndex, direction) => {
    const toIndex = fromIndex + direction;
    if (toIndex < 0 || toIndex >= formData.roles.length) return;
    setFormData((prev) => {
      const updated = [...prev.roles];
      const temp = updated[fromIndex];
      updated[fromIndex] = updated[toIndex];
      updated[toIndex] = temp;
      return { ...prev, roles: updated };
    });
  };

  // Remove role from current form
  const handleRemoveRoleFromForm = (roleIndex) => {
    if (formData.roles.length <= 1) return;
    setFormData((prev) => ({
      ...prev,
      roles: prev.roles.filter((_, idx) => idx !== roleIndex)
    }));
  };

  // Update specific role field
  const handleRoleChange = (roleIndex, field, value) => {
    setFormData((prev) => {
      const updatedRoles = [...prev.roles];
      updatedRoles[roleIndex] = {
        ...updatedRoles[roleIndex],
        [field]: value
      };
      return { ...prev, roles: updatedRoles };
    });
  };

  // Save Add or Edit
  const handleSave = (e) => {
    if (e) e.preventDefault();
    if (!formData.company.trim()) {
      if (showToast) showToast('Company name is required', 'error');
      return;
    }

    // Process roles
    const processedRoles = formData.roles.map((r, idx) => {
      const techArray = typeof r.technologies === 'string'
        ? r.technologies
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean)
        : Array.isArray(r.technologies)
        ? r.technologies
        : [];

      return {
        title: r.title.trim() || 'Software Engineer',
        type: r.type || 'Full-time',
        duration: r.duration?.trim() || (formData.roles.length === 1 ? formData.duration : `Role ${idx + 1}`),
        description: r.description?.trim() || '',
        technologies: techArray
      };
    });

    const payload = {
      company: formData.company.trim(),
      location: formData.location.trim() || 'Nashik, India',
      duration: formData.duration.trim() || 'Apr 2025 - Present · Ongoing',
      badge: formData.badge.trim() || 'Current Employer',
      badgeColor: formData.badgeColor || 'bg-emerald-50 text-black dark:text-emerald-300 border-emerald-300',
      roles: processedRoles
    };

    if (isEditMode && editingExp) {
      if (updateExperience) updateExperience(editingExp.id, payload);
      if (showToast) showToast(`Updated "${payload.company}" successfully!`, 'success');
    } else {
      if (addExperience) addExperience(payload);
      if (showToast) showToast(`Added "${payload.company}" to experience!`, 'success');
    }

    handleCloseModal();
  };

  const isModalOpen = showAddExp || Boolean(editingExp);

  return (
    <div className="space-y-6">
      {/* header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h3 className="fluid-h3 font-semibold text-black dark:text-white flex items-center gap-2">
            <Award size={18} className="text-cyan-600 dark:text-cyan-400" />
            <span>Work Experience &amp; Positions ({experiences.length})</span>
          </h3>
          <p className="fluid-xs text-black dark:text-slate-400 font-medium">
            Timeline of your employment history, promotions, roles &amp; descriptions.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-linear-to-r from-cyan-600 to-indigo-600 hover:from-cyan-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-cyan-500/20 cursor-pointer transition-all"
        >
          <Plus size={15} />
          <span>Add Work Experience</span>
        </button>
      </div>

      {/* experience list */}
      <div className="space-y-4 sm:space-y-5">
        {experiences.map((exp, idx) => (
          <div
            key={exp.id}
            className="glass-card rounded-2xl p-5 sm:p-7 space-y-4 border border-slate-200/80 dark:border-white/10 group hover:border-cyan-500/40 transition-all duration-200"
          >
            {/* company header */}
            <div className="flex justify-between items-start border-b border-slate-200/80 dark:border-white/10 pb-3 gap-3">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-base sm:text-lg font-bold italic tracking-tight text-slate-900 dark:text-white">
                  {exp.company}
                </h3>
                {exp.duration && (
                  <span className="text-xs sm:text-sm font-semibold italic text-cyan-600 dark:text-cyan-400">
                    {exp.duration}
                  </span>
                )}
                {exp.location && (
                  <span className="text-xs text-slate-400 dark:text-slate-500 font-normal">
                    ({exp.location})
                  </span>
                )}
                {exp.badge && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                    {exp.badge}
                  </span>
                )}
              </div>

              {/* action buttons */}
              <div className="flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity shrink-0">
                <button
                  onClick={() => handleOpenEdit(exp)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-cyan-50 dark:bg-white/5 dark:hover:bg-cyan-500/20 text-slate-600 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-300 border border-slate-200 dark:border-white/10 transition-colors cursor-pointer"
                  title="Edit Experience"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Delete experience entry for "${exp.company}"?`)) {
                      deleteExperience(exp.id);
                      if (showToast) showToast('Experience deleted', 'warning');
                    }
                  }}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-rose-50 dark:bg-white/5 dark:hover:bg-rose-500/20 text-slate-600 hover:text-rose-600 dark:text-slate-300 dark:hover:text-rose-400 border border-slate-200 dark:border-white/10 transition-colors cursor-pointer"
                  title="Delete Experience"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            {/* roles timeline */}
            <div className="relative ml-3 sm:ml-5 pl-6 space-y-6 pt-1">
              {/* timeline line */}
              <div className="absolute left-1.5 top-2.5 bottom-2 w-0.5 bg-cyan-400/35 dark:bg-cyan-500/35 -translate-x-1/2" />

              {(exp.roles || []).map((role, rIdx) => {
                const rawDesc = role.description || (Array.isArray(role.achievements) ? role.achievements.join('\n') : (role.achievements || ''));
                const descLines = rawDesc
                  ? rawDesc.split('\n').map((l) => l.trim()).filter(Boolean)
                  : [];
                const isBulletList = descLines.length > 1 || descLines.some((l) => l.startsWith('•') || l.startsWith('-') || l.startsWith('*'));

                const rawTech = role.technologies || [];
                const techList = Array.isArray(rawTech)
                  ? rawTech
                  : typeof rawTech === 'string'
                  ? rawTech.split(',').map((s) => s.trim()).filter(Boolean)
                  : [];

                return (
                  <div key={rIdx} className="relative space-y-1.5">
                    {/* timeline dot */}
                    <span className="absolute -left-4.5 top-1.5 w-3 h-3 rounded-full bg-cyan-400 dark:bg-cyan-400 ring-4 ring-white dark:ring-[#080b14] shadow-xs z-10 -translate-x-1/2" />

                    {/* role and type */}
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm sm:text-base font-bold italic text-slate-900 dark:text-white">
                        {role.title}
                      </h4>
                      {role.type && (
                        <span className="px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-700 dark:text-purple-300 text-[10px] sm:text-xs font-semibold border border-purple-500/20">
                          {role.type}
                        </span>
                      )}
                    </div>

                    {/* duration */}
                    {role.duration && (
                      <p className="text-xs italic text-cyan-600/90 dark:text-cyan-400/90 font-medium">
                        {role.duration}
                      </p>
                    )}

                    {/* description */}
                    {descLines.length > 0 && (
                      <div className="space-y-1 pt-0.5">
                        {descLines.map((line, lIdx) => {
                          const cleanText = line.replace(/^[•\-\*]\s*/, '');
                          return (
                            <p key={lIdx} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed flex items-start gap-2">
                              {isBulletList && <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />}
                              <span>{cleanText}</span>
                            </p>
                          );
                        })}
                      </div>
                    )}

                    {/* tech stack */}
                    {techList.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1.5">
                        {techList.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-semibold"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* sequence controls */}
            <div className="pt-3 border-t border-slate-200/80 dark:border-white/5 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-medium">
                Position in Timeline:
              </span>
              <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-white/10 text-black dark:text-white border border-slate-200 dark:border-white/15 shadow-2xs">
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => {
                    if (moveExperience) moveExperience(idx, -1);
                    else if (reorderExperiences) reorderExperiences(idx, idx - 1);
                    if (showToast) showToast(`Moved "${exp.company}" earlier`, 'success');
                  }}
                  className="p-1 text-slate-600 dark:text-slate-300 hover:text-cyan-500 disabled:opacity-25 disabled:hover:text-slate-400 cursor-pointer disabled:cursor-not-allowed transition-colors"
                  title="Move Earlier"
                >
                  <ChevronLeft size={13} />
                </button>
                <select
                  value={idx}
                  onChange={(e) => {
                    const targetIdx = Number(e.target.value);
                    if (targetIdx !== idx) {
                      if (reorderExperiences) reorderExperiences(idx, targetIdx);
                      if (showToast) showToast(`Shifted "${exp.company}" to position ${targetIdx + 1}`, 'success');
                    }
                  }}
                  className="bg-transparent text-cyan-600 dark:text-cyan-400 font-black text-[11px] px-1 focus:outline-none cursor-pointer text-center"
                  title="Select sequence position"
                >
                  {experiences.map((_, pIdx) => (
                    <option key={pIdx} value={pIdx} className="bg-white dark:bg-slate-900 text-black dark:text-white">
                      {pIdx + 1}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  disabled={idx === experiences.length - 1}
                  onClick={() => {
                    if (moveExperience) moveExperience(idx, 1);
                    else if (reorderExperiences) reorderExperiences(idx, idx + 1);
                    if (showToast) showToast(`Moved "${exp.company}" later`, 'success');
                  }}
                  className="p-1 text-slate-600 dark:text-slate-300 hover:text-cyan-500 disabled:opacity-25 disabled:hover:text-slate-400 cursor-pointer disabled:cursor-not-allowed transition-colors"
                  title="Move Later"
                >
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {experiences.length === 0 && (
        <div className="py-16 flex flex-col items-center gap-3 text-slate-400 glass-card rounded-2xl border border-dashed border-slate-300 dark:border-white/10">
          <Briefcase size={32} className="opacity-40" />
          <p className="text-sm font-medium">No experience entries yet. Click "Add Work Experience" above.</p>
        </div>
      )}

      {/* add and edit modal */}
      {isModalOpen && createPortal(
        <div className="fixed inset-0 z-9999 bg-slate-950/85 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="glass-card rounded-2xl p-5 sm:p-7 max-w-2xl w-full border border-slate-200/80 dark:border-white/10 space-y-4 max-h-[92vh] overflow-y-auto shadow-2xl">
            {/* Modal Top Header */}
            <div className="flex justify-between items-center border-b border-slate-200/80 dark:border-white/10 pb-3">
              <h3 className="text-base font-bold text-black dark:text-white flex items-center gap-2">
                {isEditMode ? <Edit2 size={16} className="text-cyan-500" /> : <Plus size={16} className="text-cyan-500" />}
                <span>{isEditMode ? `Edit Experience: ${formData.company || 'Company'}` : 'Add New Work Experience'}</span>
              </h3>
              <button onClick={handleCloseModal} className="text-slate-400 hover:text-white cursor-pointer p-1 rounded-lg">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              {/* 1. Company Primary Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Company Name */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-black dark:text-slate-300">Company Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Integral Development Corp."
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-xs font-medium text-black dark:text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {/* Location */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-black dark:text-slate-300">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Nashik, India (Hybrid)"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-xs font-medium text-black dark:text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {/* Overall Duration */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-black dark:text-slate-300">Duration (Overall Period)</label>
                  <input
                    type="text"
                    placeholder="e.g. Apr 2025 - Present · ongoing"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-xs font-medium text-black dark:text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {/* Badge */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-black dark:text-slate-300">Badge Tag</label>
                  <input
                    type="text"
                    placeholder="e.g. Current Employer or Completed"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-xs font-medium text-black dark:text-white focus:outline-none focus:border-cyan-500"
                  />
                  {/* Preset Badge Chips */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {SUGGESTED_BADGES.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setFormData({ ...formData, badge: b })}
                        className={`text-[10px] px-2 py-0.5 rounded-md border font-semibold cursor-pointer transition-colors ${
                          formData.badge === b
                            ? 'bg-cyan-600 text-white border-cyan-600'
                            : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:border-cyan-400'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* roles section */}
              <div className="space-y-3 pt-2 border-t border-slate-200/80 dark:border-white/10">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-extrabold text-black dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Layers size={14} className="text-cyan-500" />
                    <span>Designations &amp; Roles ({formData.roles.length})</span>
                  </h4>
                  <span className="text-[11px] text-slate-400">
                    (Newest role on top)
                  </span>
                </div>

                {formData.roles.map((role, rIdx) => (
                  <div
                    key={rIdx}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 space-y-3 relative"
                  >
                    {/* role header */}
                    <div className="flex justify-between items-center border-b border-slate-200/70 dark:border-white/10 pb-2">
                      <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">
                        {rIdx === 0 ? 'Role 1 (Newest / Top)' : `Role ${rIdx + 1}`}: {role.title || 'Untitled Role'} ({role.type || 'Full-time'})
                      </span>
                      <div className="flex items-center gap-2">
                        {formData.roles.length > 1 && (
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              disabled={rIdx === 0}
                              onClick={() => handleMoveRole(rIdx, -1)}
                              className="px-2 py-0.5 rounded-lg bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-200 text-[10px] font-bold disabled:opacity-20 cursor-pointer flex items-center gap-0.5"
                              title="Move Role Up (Show Earlier/Top)"
                            >
                              <span>▲ Up</span>
                            </button>
                            <button
                              type="button"
                              disabled={rIdx === formData.roles.length - 1}
                              onClick={() => handleMoveRole(rIdx, 1)}
                              className="px-2 py-0.5 rounded-lg bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-200 text-[10px] font-bold disabled:opacity-20 cursor-pointer flex items-center gap-0.5"
                              title="Move Role Down"
                            >
                              <span>▼ Down</span>
                            </button>
                          </div>
                        )}
                        {formData.roles.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveRoleFromForm(rIdx)}
                            className="text-[11px] font-bold text-rose-500 hover:text-rose-600 flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 size={12} />
                            <span>Remove</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* designation title */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-black dark:text-slate-300">
                        Designation / Role Title *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Software Engineer, Full stack Developer"
                        value={role.title}
                        onChange={(e) => handleRoleChange(rIdx, 'title', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/10 text-xs font-semibold text-black dark:text-white focus:outline-none focus:border-cyan-500"
                      />
                      {/* Suggestion Chips */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {SUGGESTED_TITLES.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => handleRoleChange(rIdx, 'title', t)}
                            className={`text-[10px] px-2 py-0.5 rounded-md border font-medium cursor-pointer transition-colors ${
                              role.title === t
                                ? 'bg-cyan-600 text-white border-cyan-600'
                                : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:border-cyan-400'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Employment Type & Role Period */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Type */}
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-black dark:text-slate-300">
                          Employment Type
                        </label>
                        <select
                          value={role.type}
                          onChange={(e) => handleRoleChange(rIdx, 'type', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/10 text-xs font-semibold text-black dark:text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                        >
                          {SUGGESTED_TYPES.map((typeOption) => (
                            <option key={typeOption} value={typeOption}>
                              {typeOption}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Role Period */}
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-black dark:text-slate-300">
                          Role Period (Duration)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Jul 2025 - Present · Ongoing or Apr 2025 - Jul 2025 · 4 mos"
                          value={role.duration}
                          onChange={(e) => handleRoleChange(rIdx, 'duration', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/10 text-xs font-medium text-black dark:text-white focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                    </div>

                    {/* Description / Bullet Points */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-black dark:text-slate-300">
                        Description / Responsibilities <span className="text-slate-400 font-normal">(Paragraph or bullet points)</span>
                      </label>
                      <textarea
                        rows={3}
                        placeholder={"Build and maintain responsive web application features.\nDesign and build reusable UI components and integrate RESTful APIs..."}
                        value={role.description}
                        onChange={(e) => handleRoleChange(rIdx, 'description', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/10 text-xs font-normal text-black dark:text-white focus:outline-none focus:border-cyan-500 leading-relaxed"
                      />
                    </div>

                    {/* Tech Stack Tags (Comma-separated) */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-black dark:text-slate-300">
                        Tech Stack Used <span className="text-slate-400 font-normal">(Comma-separated)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. React.js, TypeScript, Node.js, GraphQL, Docker, Redis"
                        value={role.technologies}
                        onChange={(e) => handleRoleChange(rIdx, 'technologies', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/10 text-xs font-medium text-black dark:text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>
                ))}

                {/* add promoted role button */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => handleAddRoleToForm('Full-time')}
                    className="w-full py-2.5 px-4 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <Plus size={15} />
                    <span>Add Promoted Role</span>
                  </button>
                </div>
              </div>

              {/* modal buttons */}
              <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-200/80 dark:border-white/10">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-xs font-bold text-black dark:text-slate-300 cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-linear-to-r from-cyan-600 to-indigo-600 hover:from-cyan-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-cyan-500/20 cursor-pointer transition-all"
                >
                  <Check size={14} />
                  <span>{isEditMode ? 'Save Changes' : 'Publish Work Experience'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
