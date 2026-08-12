import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Code2, Plus, Edit2, Trash2, Check, Award, X, Sliders, ChevronDown, Search } from 'lucide-react';
import TechIcon, { TECH_ICON_REGISTRY } from '../../components/TechIcon';

// Helper: given a stored icon string (could be key "react", label "React.js", or full name), find the registry key
function resolveIconKey(iconStr) {
  if (!iconStr) return '';
  const norm = iconStr.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
  // Direct key match
  let found = TECH_ICON_REGISTRY.find(item => item.key === iconStr.trim() || item.key.toLowerCase() === norm);
  // Label match
  if (!found) {
    found = TECH_ICON_REGISTRY.find(item => {
      const normLabel = item.label.toLowerCase().replace(/[^a-z0-9]/g, '');
      return normLabel === norm;
    });
  }
  // Substring match
  if (!found) {
    found = TECH_ICON_REGISTRY.find(item => {
      const normLabel = item.label.toLowerCase().replace(/[^a-z0-9]/g, '');
      return (normLabel.length > 2 && norm.includes(normLabel)) || (item.key.length > 2 && norm.includes(item.key));
    });
  }
  return found ? found.key : '';
}

// Custom Searchable Tech Icon Picker — inline search trigger, real colored SVG icons, with close button
function SearchableIconDropdown({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearch('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  const filteredIcons = search
    ? TECH_ICON_REGISTRY.filter(item =>
        item.label.toLowerCase().includes(search.toLowerCase()) ||
        item.key.toLowerCase().includes(search.toLowerCase())
      )
    : TECH_ICON_REGISTRY;

  const selectedItem = TECH_ICON_REGISTRY.find(item => item.key === value);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Trigger: selected icon preview + search input + chevron + X close */}
      <div
        className={`w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border flex items-center gap-2 cursor-pointer transition-colors ${
          isOpen ? 'border-cyan-500' : 'border-slate-300 dark:border-white/10'
        }`}
      >
        {/* Selected icon preview box */}
        <div
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shrink-0 cursor-pointer"
          onClick={() => { setIsOpen(true); setTimeout(() => inputRef.current?.focus(), 50); }}
        >
          {selectedItem
            ? React.createElement(selectedItem.icon, { className: selectedItem.color, size: 18 })
            : <Code2 className="text-cyan-500" size={18} />
          }
        </div>

        {/* Inline search input */}
        <input
          ref={inputRef}
          type="text"
          placeholder={selectedItem ? selectedItem.label : 'Search tech icon…'}
          value={search}
          onChange={(e) => { setSearch(e.target.value); setIsOpen(true); }}
          onFocus={() => setIsOpen(true)}
          className="flex-1 min-w-0 bg-transparent text-sm font-semibold text-black dark:text-white placeholder-slate-400 focus:outline-none cursor-text"
        />

        {/* X clear / close button */}
        {(isOpen || value) && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (isOpen) {
                setIsOpen(false);
                setSearch('');
              } else {
                onChange('');
                setSearch('');
              }
            }}
            className="shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-slate-200 dark:bg-white/15 text-slate-500 dark:text-slate-300 hover:bg-rose-100 dark:hover:bg-rose-500/20 hover:text-rose-500 transition-colors cursor-pointer"
            title={isOpen ? 'Close dropdown' : 'Clear selection'}
          >
            <X size={11} />
          </button>
        )}

        {/* Chevron toggle */}
        <ChevronDown
          size={14}
          className={`shrink-0 text-slate-400 transition-transform duration-200 cursor-pointer ${
            isOpen ? 'rotate-180 text-cyan-500' : ''
          }`}
          onClick={() => { setIsOpen(prev => !prev); if (!isOpen) setTimeout(() => inputRef.current?.focus(), 50); }}
        />
      </div>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 z-9999 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {/* Panel header with close */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Select Tech Icon</span>
            <button
              type="button"
              onClick={() => { setIsOpen(false); setSearch(''); }}
              className="w-5 h-5 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 hover:bg-rose-100 hover:text-rose-500 transition-colors cursor-pointer"
            >
              <X size={11} />
            </button>
          </div>

          {/* Scrollable icon list */}
          <div className="overflow-y-auto max-h-56 p-1.5 space-y-0.5">
            {filteredIcons.map((item) => {
              const isSelected = value === item.key;
              const IconComp = item.icon;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => { onChange(item.key); setIsOpen(false); setSearch(''); }}
                  className={`w-full px-3 py-2 rounded-xl text-sm font-semibold flex items-center gap-3 transition-colors cursor-pointer text-left ${
                    isSelected
                      ? 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0">
                    <IconComp className={item.color} size={20} />
                  </div>
                  <span className="truncate">{item.label}</span>
                  {isSelected && <Check size={14} className="ml-auto text-cyan-500 shrink-0" />}
                </button>
              );
            })}
            {filteredIcons.length === 0 && (
              <p className="p-4 text-center text-sm text-slate-400">No icons matching "{search}"</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminSkillsTab({
  skills,
  adminSkillCategory,
  setAdminSkillCategory,
  editingSkill,
  setEditingSkill,
  newSkill,
  setNewSkill,
  newCategoryName,
  setNewCategoryName,
  certifications,
  newCert,
  setNewCert,
  showAddCert,
  setShowAddCert,
  updateSkill,
  deleteSkill,
  addSkill,
  addSkillCategory,
  addCertification,
  deleteCertification,
  showToast
}) {
  const skillCategories = Object.keys(skills || {});
  const currentCategory = adminSkillCategory || skillCategories[0] || 'Frontend';

  // Unified Single Form State for Add and Edit
  const [formMode, setFormMode] = useState('add'); // 'add' | 'edit'
  const [editTarget, setEditTarget] = useState({ category: '', index: null });
  const [formCategory, setFormCategory] = useState(currentCategory);
  const [formSkillName, setFormSkillName] = useState('');
  const [formIcon, setFormIcon] = useState('');
  const [formProgress, setFormProgress] = useState(88);

  const formSectionRef = useRef(null);

  // Sync category selection when tabs change (only if in add mode)
  useEffect(() => {
    if (formMode === 'add') {
      setFormCategory(currentCategory);
    }
  }, [currentCategory, formMode]);

  // Handle Edit button click on any skill card — resolve stored icon string to registry key
  const handleStartEdit = (category, idx, skill) => {
    setFormMode('edit');
    setEditTarget({ category, index: idx });
    setFormCategory(category);
    setFormSkillName(skill.name);
    // Resolve whatever is stored in skill.icon/iconName/name to a valid registry key
    const rawIcon = skill.icon || skill.iconName || '';
    const resolvedKey = resolveIconKey(rawIcon) || resolveIconKey(skill.name) || '';
    setFormIcon(resolvedKey);
    const progressVal = parseInt(skill.progress || 88) || 88;
    setFormProgress(progressVal);

    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Reset form to Add mode
  const handleCancelEdit = () => {
    setFormMode('add');
    setEditTarget({ category: '', index: null });
    setFormCategory(currentCategory);
    setFormSkillName('');
    setFormIcon('');
    setFormProgress(88);
  };

  // Single Unified Submit Handler
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formSkillName.trim()) return;

    const targetCategory = formCategory || currentCategory;

    if (formMode === 'edit') {
      // Update existing skill
      updateSkill(editTarget.category, editTarget.index, {
        name: formSkillName.trim(),
        icon: formIcon || formSkillName.trim(),
        progress: parseInt(formProgress),
        level: `${formProgress}%`,
        description: 'Core Engineering Competency'
      });
      showToast(`Updated skill "${formSkillName.trim()}"!`, 'success');
      handleCancelEdit();
    } else {
      // Add new skill
      addSkill(targetCategory, {
        name: formSkillName.trim(),
        icon: formIcon || formSkillName.trim(),
        progress: parseInt(formProgress),
        level: `${formProgress}%`,
        description: 'Core Engineering Competency'
      });
      showToast(`Added "${formSkillName.trim()}" to ${targetCategory}!`, 'success');
      setFormSkillName('');
      setFormIcon('');
      setFormProgress(88);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center space-y-1">
        <h2 className="fluid-h2 font-semibold text-black dark:text-white tracking-tight flex items-center justify-center gap-2">
          <Code2 className="text-cyan-600 dark:text-cyan-400" size={20} />
          <span>Technical Skills Matrix</span>
        </h2>
        <p className="fluid-xs text-black dark:text-slate-400 font-medium">
          {skillCategories.length} Specialized Engineering Disciplines
        </p>
      </div>

      {/* Category Tabs Bar */}
      <div className="p-1.5 rounded-2xl bg-slate-100/90 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex gap-1.5 flex-wrap justify-center items-center">
        {skillCategories.map((category) => {
          const isActive = currentCategory === category;
          const count = (skills[category] || []).length;
          return (
            <button
              key={category}
              type="button"
              onClick={() => {
                setAdminSkillCategory(category);
                if (formMode === 'add') {
                  setFormCategory(category);
                }
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? "bg-white dark:bg-cyan-500/25 text-black dark:text-cyan-300 border border-slate-300 dark:border-cyan-500/40 shadow-xs font-bold"
                  : "text-black dark:text-slate-400 hover:text-cyan-600 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/5"
              }`}
            >
              <span>{category}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? "bg-cyan-100 dark:bg-white/20 text-black dark:text-white font-bold" : "bg-slate-200 dark:bg-white/10 text-black dark:text-slate-400 font-medium"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Category Skills Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {((skills || {})[currentCategory] || []).map((skill, idx) => {
          const isBeingEdited = formMode === 'edit' && editTarget.category === currentCategory && editTarget.index === idx;
          const progressNumber = parseInt(skill.progress || skill.level || 88) || 88;
          const iconIdentifier = skill.icon || skill.iconName || skill.name;

          return (
            <div
              key={idx}
              className={`glass-card rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-3 transition-all duration-300 relative group ${
                isBeingEdited
                  ? 'border-2 border-cyan-500 bg-cyan-500/10 shadow-[0_0_20px_rgba(6,182,212,0.3)] ring-2 ring-cyan-500/30'
                  : 'border border-slate-200/80 dark:border-white/10 hover:border-cyan-500/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-white/10 border border-slate-200/90 dark:border-white/10 shadow-xs flex items-center justify-center shrink-0">
                    <TechIcon name={iconIdentifier} size={20} />
                  </div>
                  <div>
                    <h4 className="fluid-h3 font-semibold text-black dark:text-white">{skill.name}</h4>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="fluid-sm font-bold text-cyan-700 dark:text-cyan-300 min-w-9 text-right font-mono">
                    {progressNumber}%
                  </span>
                  <div className="flex items-center gap-1 ml-1">
                    <button
                      type="button"
                      onClick={() => handleStartEdit(currentCategory, idx, skill)}
                      className="p-1.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer"
                      title="Edit Skill"
                    >
                      <Edit2 size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Delete skill "${skill.name}"?`)) {
                          deleteSkill(currentCategory, idx);
                          showToast(`Deleted "${skill.name}"`, 'warning');
                        }
                      }}
                      className="p-1.5 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 text-rose-500 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer"
                      title="Delete Skill"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Progress Bar matching public frontend */}
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden p-0.5 border border-slate-200/60 dark:border-transparent">
                <div
                  className="h-full rounded-full bg-linear-to-r from-cyan-600 via-indigo-600 to-fuchsia-600 transition-all duration-700 ease-out"
                  style={{ width: `${progressNumber}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* UNIFIED SINGLE FORM SECTION FOR ADD AND EDIT */}
      <div
        ref={formSectionRef}
        className={`glass-card rounded-2xl p-6 transition-all duration-300 space-y-5 ${
          formMode === 'edit'
            ? 'border-2 border-cyan-500 bg-cyan-500/5 shadow-[0_0_25px_rgba(6,182,212,0.15)]'
            : 'border border-slate-200/80 dark:border-white/10'
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
          <h3 className="text-sm sm:text-base font-bold text-black dark:text-white flex items-center gap-2">
            {formMode === 'edit' ? (
              <>
                <Edit2 size={16} className="text-cyan-600 dark:text-cyan-400" />
                <span>Editing Skill: <strong className="text-cyan-500">{formSkillName || 'Selected Skill'}</strong> ({formCategory})</span>
              </>
            ) : (
              <>
                <Plus size={16} className="text-cyan-600 dark:text-cyan-400" />
                <span>Add New Skill</span>
              </>
            )}
          </h3>

          {formMode === 'edit' ? (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="px-3 py-1 rounded-xl bg-slate-200 dark:bg-white/10 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-white/20 transition-colors cursor-pointer"
            >
              Cancel Edit
            </button>
          ) : (
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Category: <strong className="text-cyan-600 dark:text-cyan-400">{formCategory || currentCategory}</strong>
            </span>
          )}
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          {/* Single row: Target Category | Skill Name | Icon Picker */}
          <div className="flex flex-col sm:flex-row gap-3 items-end">
            {/* Target Category Dropdown */}
            <div className="flex-1 min-w-0">
              <label className="block text-[11px] font-bold text-black dark:text-slate-300 mb-1">Target Category</label>
              <select
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-xs text-black dark:text-white focus:outline-none focus:border-cyan-500 font-semibold cursor-pointer"
              >
                {skillCategories.map((cat) => (
                  <option key={cat} value={cat} className="bg-white dark:bg-slate-900 text-black dark:text-white">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Skill Name Input */}
            <div className="flex-1 min-w-0">
              <label className="block text-[11px] font-bold text-black dark:text-slate-300 mb-1">Skill Name</label>
              <input
                type="text"
                placeholder="e.g. React Native"
                value={formSkillName}
                onChange={(e) => setFormSkillName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-xs text-black dark:text-white focus:outline-none focus:border-cyan-500 font-medium"
                required
              />
            </div>

            {/* Searchable Tech Icon — aligned to bottom of row */}
            <div className="flex-1 min-w-0">
              <label className="block text-[11px] font-bold text-black dark:text-slate-300 mb-1">Tech Icon</label>
              <SearchableIconDropdown
                value={formIcon}
                onChange={(iconKey) => setFormIcon(iconKey)}
              />
            </div>
          </div>

          {/* Direct Proficiency Level Setter */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-black dark:text-slate-300 flex items-center gap-1.5">
                <Sliders size={13} className="text-cyan-500" />
                <span>Proficiency Level (Percentage)</span>
              </span>
              <span className="text-sm font-extrabold text-cyan-600 dark:text-cyan-400 font-mono">
                {formProgress}%
              </span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="10"
                max="100"
                step="1"
                value={formProgress}
                onChange={(e) => setFormProgress(parseInt(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
              />
              <input
                type="number"
                min="1"
                max="100"
                value={formProgress}
                onChange={(e) => setFormProgress(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
                className="w-16 px-2 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-bold text-center text-cyan-600 dark:text-cyan-400 font-mono"
              />
            </div>

          </div>

          <div className="flex justify-end gap-3 pt-1">
            {formMode === 'edit' && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-white/10 text-black dark:text-slate-300 text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-linear-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-md shadow-cyan-500/20 cursor-pointer"
            >
              {formMode === 'edit' ? (
                <>
                  <Check size={16} /> Save Changes
                </>
              ) : (
                <>
                  <Plus size={16} /> Add Skill to "{formCategory || currentCategory}"
                </>
              )}
            </button>
          </div>
        </form>

        {/* Add Skill Category Form */}
        <div className="pt-4 border-t border-slate-200/80 dark:border-white/10 flex items-center gap-3">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Create New Category:</span>
          <input
            type="text"
            placeholder="e.g. Cloud & DevOps"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="px-3.5 py-1.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-xs text-black dark:text-white focus:outline-none focus:border-cyan-500 font-medium"
          />
          <button
            type="button"
            onClick={() => {
              if (newCategoryName.trim()) {
                addSkillCategory(newCategoryName.trim());
                showToast(`Created category "${newCategoryName.trim()}"!`, 'success');
                setFormCategory(newCategoryName.trim());
                setAdminSkillCategory(newCategoryName.trim());
                setNewCategoryName('');
              }
            }}
            className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold cursor-pointer shadow-xs"
          >
            Create Category
          </button>
        </div>
      </div>

      {/* Certifications Section */}
      <div className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-black dark:text-white flex items-center gap-2">
            <Award className="text-amber-500" size={18} />
            <span>Professional Certifications &amp; Badges ({(certifications || []).length})</span>
          </h3>
          <button
            onClick={() => setShowAddCert(true)}
            className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus size={13} /> Add Cert
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(certifications || []).map((cert) => (
            <div key={cert.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-between">
              <div>
                <h5 className="text-xs font-bold text-black dark:text-white">{cert.title}</h5>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">{cert.issuer} • {cert.date}</p>
              </div>
              <button
                onClick={() => {
                  if (window.confirm(`Delete certification "${cert.title}"?`)) {
                    deleteCertification(cert.id);
                    showToast('Certification deleted', 'warning');
                  }
                }}
                className="p-1.5 text-slate-400 hover:text-rose-500 cursor-pointer"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>

        {/* Add Cert Modal */}
        {showAddCert &&
          createPortal(
            <div className="fixed inset-0 z-9999 bg-slate-950/85 backdrop-blur-xl flex items-center justify-center p-4">
              <div className="glass-card rounded-2xl p-6 max-w-md w-full border border-slate-200/80 dark:border-white/10 space-y-4">
                <div className="flex justify-between items-center border-b pb-3">
                  <h4 className="text-sm font-bold text-black dark:text-white">Add Certification</h4>
                  <button onClick={() => setShowAddCert(false)} className="text-slate-400 hover:text-white cursor-pointer"><X size={16} /></button>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!newCert.title.trim() || !newCert.issuer.trim()) return;
                    addCertification({ id: Date.now(), ...newCert });
                    setNewCert({ title: '', issuer: '', date: '', credentialUrl: '' });
                    setShowAddCert(false);
                    showToast(`Added certification "${newCert.title}"!`, 'success');
                  }}
                  className="space-y-3"
                >
                  <div>
                    <label className="block text-[11px] font-bold mb-1">Certification Title</label>
                    <input
                      type="text"
                      placeholder="e.g. AWS Certified Developer"
                      value={newCert.title}
                      onChange={(e) => setNewCert({ ...newCert, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border text-xs"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold mb-1">Issuer / Organization</label>
                    <input
                      type="text"
                      placeholder="e.g. Amazon Web Services"
                      value={newCert.issuer}
                      onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border text-xs"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold mb-1">Issue Date</label>
                    <input
                      type="text"
                      placeholder="e.g. 2025"
                      value={newCert.date}
                      onChange={(e) => setNewCert({ ...newCert, date: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border text-xs"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button type="button" onClick={() => setShowAddCert(false)} className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-white/10 text-xs font-bold cursor-pointer">Cancel</button>
                    <button type="submit" className="px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold cursor-pointer">Save Certification</button>
                  </div>
                </form>
              </div>
            </div>,
            document.body
          )}
      </div>
    </div>
  );
}
