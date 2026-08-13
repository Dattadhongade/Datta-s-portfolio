import React, { useState } from 'react';
import {
  Zap,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Shield,
  Heart,
  Dumbbell,
  Mountain,
  Film,
  Camera,
  BookOpen,
  Gamepad2,
  Music,
  Coffee,
  Bike,
  Trophy,
  Sparkles,
  Code,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { createPortal } from 'react-dom';

export default function AdminCapabilitiesTab({
  stats,
  showAddStat,
  setShowAddStat,
  editingStat,
  setEditingStat,
  newStatForm,
  setNewStatForm,
  addStat,
  updateStat,
  deleteStat,
  capabilities,
  addCapability,
  updateCapability,
  deleteCapability,
  moveCapability,
  reorderCapabilities,
  lifestyle,
  addLifestyle,
  updateLifestyle,
  deleteLifestyle,
  moveLifestyle,
  reorderLifestyle,
  showToast
}) {
  const [editingCap, setEditingCap] = useState(null);

  // Lifestyle Form & Edit State
  const [showAddLifestyle, setShowAddLifestyle] = useState(false);
  const [editingLifestyle, setEditingLifestyle] = useState(null);
  const [newLifestyleForm, setNewLifestyleForm] = useState({
    title: '',
    subtitle: '',
    iconName: 'Dumbbell',
    iconColor: 'text-amber-600 dark:text-amber-400',
    glow: 'bg-amber-500/10'
  });

  const getLifestyleIcon = (iconName) => {
    switch (iconName) {
      case "Dumbbell": return <Dumbbell size={16} />;
      case "Mountain": return <Mountain size={16} />;
      case "Film": return <Film size={16} />;
      case "Camera": return <Camera size={16} />;
      case "BookOpen": return <BookOpen size={16} />;
      case "Gamepad2": return <Gamepad2 size={16} />;
      case "Music": return <Music size={16} />;
      case "Coffee": return <Coffee size={16} />;
      case "Bike": return <Bike size={16} />;
      case "Plane": return <Plane size={16} />;
      case "Heart": return <Heart size={16} />;
      case "Trophy": return <Trophy size={16} />;
      case "Sparkles": return <Sparkles size={16} />;
      case "Code": return <Code size={16} />;
      default: return <Zap size={16} />;
    }
  };

  const handleAddLifestyleSubmit = (e) => {
    e.preventDefault();
    if (!newLifestyleForm.title.trim()) {
      showToast('Interest Title is required', 'error');
      return;
    }
    addLifestyle({
      title: newLifestyleForm.title.trim(),
      subtitle: newLifestyleForm.subtitle.trim() || 'Interest & Passion',
      iconName: newLifestyleForm.iconName || 'Dumbbell',
      iconColor: newLifestyleForm.iconColor || 'text-amber-600 dark:text-amber-400',
      glow: newLifestyleForm.glow || 'bg-amber-500/10'
    });
    setNewLifestyleForm({
      title: '',
      subtitle: '',
      iconName: 'Dumbbell',
      iconColor: 'text-amber-600 dark:text-amber-400',
      glow: 'bg-amber-500/10'
    });
    setShowAddLifestyle(false);
    showToast('New Interest / Lifestyle card added!', 'success');
  };

  return (
    <div className="space-y-6">

      {/* ─── 1. METRIC STATS ─── */}
      <div className="glass-card rounded-2xl p-6 space-y-4 border border-slate-200/80 dark:border-white/10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h3 className="fluid-h3 font-semibold text-black dark:text-white flex items-center gap-2">
              <Zap size={18} className="text-cyan-600 dark:text-cyan-400" />
              <span>Hero Stat Metric Counters ({stats.length})</span>
            </h3>
            <p className="fluid-xs text-black dark:text-slate-400 font-medium">Click Edit to change metric numbers &amp; labels</p>
          </div>
          <button
            type="button"
            onClick={() => setShowAddStat(!showAddStat)}
            className="px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Plus size={14} />
            <span>Add Stat Counter</span>
          </button>
        </div>

        {/* Add Stat Form */}
        {showAddStat && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!newStatForm.value.trim() || !newStatForm.label.trim()) return;
              addStat(newStatForm);
              setNewStatForm({ value: '', label: '', color: 'text-cyan-500 dark:text-cyan-400', border: 'border-cyan-500/20' });
              setShowAddStat(false);
              showToast('New stat metric added!', 'success');
            }}
            className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-cyan-500/40 space-y-3"
          >
            <h4 className="text-xs font-bold text-black dark:text-white">Create New Stat Metric</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Value (e.g. 5+, 95%, 8.5)"
                value={newStatForm.value}
                onChange={(e) => setNewStatForm({ ...newStatForm, value: e.target.value })}
                className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-black dark:text-white font-bold"
                required
              />
              <input
                type="text"
                placeholder="Label (e.g. Client Rating, Certifications)"
                value={newStatForm.label}
                onChange={(e) => setNewStatForm({ ...newStatForm, label: e.target.value })}
                className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-black dark:text-white font-bold"
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setShowAddStat(false)} className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-white/10 text-xs font-bold">Cancel</button>
              <button type="submit" className="px-4 py-1.5 rounded-xl bg-cyan-600 text-white text-xs font-bold">Save Stat Metric</button>
            </div>
          </form>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((st) => (
            <div key={st.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-2 relative group">
              {editingStat && editingStat.id === st.id ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editingStat.value}
                    onChange={(e) => setEditingStat({ ...editingStat, value: e.target.value })}
                    className="w-full px-2 py-1 rounded bg-white dark:bg-slate-900 border text-xs font-bold"
                  />
                  <input
                    type="text"
                    value={editingStat.label}
                    onChange={(e) => setEditingStat({ ...editingStat, label: e.target.value })}
                    className="w-full px-2 py-1 rounded bg-white dark:bg-slate-900 border text-xs"
                  />
                  <div className="flex justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        updateStat(st.id, editingStat);
                        setEditingStat(null);
                        showToast('Stat updated!', 'success');
                      }}
                      className="p-1 text-emerald-500 font-bold text-xs"
                    >
                      Save
                    </button>
                    <button type="button" onClick={() => setEditingStat(null)} className="p-1 text-slate-400 text-xs">X</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <span className={`text-2xl font-black ${st.color || 'text-cyan-500'}`}>{st.value}</span>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setEditingStat({ ...st })} className="p-1 text-slate-400 hover:text-cyan-500"><Edit2 size={12} /></button>
                      <button onClick={() => {
                        if (window.confirm(`Delete stat "${st.label}"?`)) {
                          deleteStat(st.id);
                          showToast('Stat deleted', 'warning');
                        }
                      }} className="p-1 text-slate-400 hover:text-rose-500"><Trash2 size={12} /></button>
                    </div>
                  </div>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{st.label}</p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ─── 2. CAPABILITIES LIST ─── */}
      <div className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="fluid-h3 font-semibold text-black dark:text-white flex items-center gap-2">
            <Shield size={18} className="text-cyan-600 dark:text-cyan-400" />
            <span>Core Engineering Capabilities ({capabilities.length})</span>
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {capabilities.map((cap, idx) => (
            <div key={cap.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border space-y-2 relative group">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-sm font-bold text-black dark:text-white">{cap.title}</h4>
                  {/* Sequence Pill */}
                  <div className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-200">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => {
                        if (moveCapability) moveCapability(idx, -1);
                        else if (reorderCapabilities) reorderCapabilities(idx, idx - 1);
                        showToast(`Moved "${cap.title}" up to #${idx}`, 'success');
                      }}
                      className="p-0.5 hover:text-cyan-500 disabled:opacity-25 cursor-pointer disabled:cursor-not-allowed"
                      title="Move Earlier"
                    >
                      <ChevronLeft size={11} />
                    </button>
                    <select
                      value={idx}
                      onChange={(e) => {
                        const targetIdx = Number(e.target.value);
                        if (targetIdx !== idx) {
                          if (reorderCapabilities) reorderCapabilities(idx, targetIdx);
                          showToast(`Shifted "${cap.title}" to position #${targetIdx + 1}`, 'success');
                        }
                      }}
                      className="bg-transparent font-black text-cyan-600 dark:text-cyan-400 text-[10px] focus:outline-none cursor-pointer"
                    >
                      {capabilities.map((_, cIdx) => (
                        <option key={cIdx} value={cIdx} className="bg-white dark:bg-slate-900 text-black dark:text-white">
                          #{cIdx + 1}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      disabled={idx === capabilities.length - 1}
                      onClick={() => {
                        if (moveCapability) moveCapability(idx, 1);
                        else if (reorderCapabilities) reorderCapabilities(idx, idx + 1);
                        showToast(`Moved "${cap.title}" down to #${idx + 2}`, 'success');
                      }}
                      className="p-0.5 hover:text-cyan-500 disabled:opacity-25 cursor-pointer disabled:cursor-not-allowed"
                      title="Move Later"
                    >
                      <ChevronRight size={11} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  <button
                    onClick={() => setEditingCap({ ...cap })}
                    className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20 cursor-pointer"
                  >
                    <Edit2 size={13} />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete capability "${cap.title}"?`)) {
                        deleteCapability(cap.id);
                        showToast('Capability deleted', 'warning');
                      }
                    }}
                    className="p-1.5 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 cursor-pointer"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
              <p className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold">{cap.tagline}</p>
              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">{cap.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── 3. INTERESTS & LIFESTYLE SECTION ─── */}
      <div className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h3 className="fluid-h3 font-semibold text-black dark:text-white flex items-center gap-2">
              <Heart size={18} className="text-amber-500" />
              <span>Interests &amp; Lifestyle ({(lifestyle || []).length})</span>
            </h3>
            <p className="fluid-xs text-black dark:text-slate-400 font-medium">
              Manage personal hobbies, passions &amp; lifestyle badges displayed on About page
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowAddLifestyle(!showAddLifestyle)}
            className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Plus size={14} />
            <span>Add Interest / Hobby</span>
          </button>
        </div>

        {/* Add Lifestyle Form */}
        {showAddLifestyle && (
          <form
            onSubmit={handleAddLifestyleSubmit}
            className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-amber-500/40 space-y-3 animate-in fade-in duration-200"
          >
            <h4 className="text-xs font-bold text-black dark:text-white">Add New Interest / Lifestyle Card</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Title (e.g. Photography, Gaming)"
                value={newLifestyleForm.title}
                onChange={(e) => setNewLifestyleForm({ ...newLifestyleForm, title: e.target.value })}
                className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-black dark:text-white font-bold"
                required
              />
              <input
                type="text"
                placeholder="Subtitle (e.g. Landscape & street shots)"
                value={newLifestyleForm.subtitle}
                onChange={(e) => setNewLifestyleForm({ ...newLifestyleForm, subtitle: e.target.value })}
                className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-black dark:text-white font-medium"
              />
              <select
                value={newLifestyleForm.iconName}
                onChange={(e) => setNewLifestyleForm({ ...newLifestyleForm, iconName: e.target.value })}
                className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-black dark:text-white font-medium"
              >
                <option value="Dumbbell">Dumbbell (Fitness & Gym)</option>
                <option value="Mountain">Mountain (Trekking & Hiking)</option>
                <option value="Film">Film (Cinema & Movies)</option>
                <option value="Camera">Camera (Photography)</option>
                <option value="BookOpen">BookOpen (Reading & Books)</option>
                <option value="Gamepad2">Gamepad2 (Gaming & Esports)</option>
                <option value="Music">Music (Music & Instruments)</option>
                <option value="Coffee">Coffee (Coffee & Cafes)</option>
                <option value="Bike">Bike (Cycling & Riding)</option>
                <option value="Plane">Plane (Travel & Hikes)</option>
                <option value="Heart">Heart (Wellness & Social)</option>
                <option value="Trophy">Trophy (Sports & Competitions)</option>
                <option value="Sparkles">Sparkles (Creative Arts)</option>
                <option value="Code">Code (Open Source & Coding)</option>
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setShowAddLifestyle(false)} className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-white/10 text-xs font-bold cursor-pointer">Cancel</button>
              <button type="submit" className="px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold cursor-pointer">Save Interest</button>
            </div>
          </form>
        )}

        {/* Lifestyle Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {(lifestyle || []).map((item, idx) => (
            <div
              key={item.id}
              className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-between gap-3 group relative"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className={`p-2 rounded-lg ${item.glow || 'bg-amber-500/10'} ${item.iconColor || 'text-amber-600 dark:text-amber-400'} shrink-0`}>
                  {getLifestyleIcon(item.iconName)}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h5 className="text-xs font-bold text-black dark:text-white truncate">{item.title}</h5>
                    {/* Sequence Badge */}
                    <div className="inline-flex items-center gap-0.5 px-1 py-0.2 rounded text-[9px] font-bold bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => {
                          if (moveLifestyle) moveLifestyle(idx, -1);
                          else if (reorderLifestyle) reorderLifestyle(idx, idx - 1);
                          showToast(`Moved "${item.title}" up to #${idx}`, 'success');
                        }}
                        className="p-0.5 hover:text-amber-500 disabled:opacity-25 cursor-pointer disabled:cursor-not-allowed"
                        title="Move Earlier"
                      >
                        <ChevronLeft size={10} />
                      </button>
                      <select
                        value={idx}
                        onChange={(e) => {
                          const targetIdx = Number(e.target.value);
                          if (targetIdx !== idx) {
                            if (reorderLifestyle) reorderLifestyle(idx, targetIdx);
                            showToast(`Shifted "${item.title}" to position #${targetIdx + 1}`, 'success');
                          }
                        }}
                        className="bg-transparent font-black text-amber-600 dark:text-amber-400 text-[9px] focus:outline-none cursor-pointer"
                      >
                        {(lifestyle || []).map((_, lIdx) => (
                          <option key={lIdx} value={lIdx} className="bg-white dark:bg-slate-900 text-black dark:text-white">
                            #{lIdx + 1}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        disabled={idx === (lifestyle || []).length - 1}
                        onClick={() => {
                          if (moveLifestyle) moveLifestyle(idx, 1);
                          else if (reorderLifestyle) reorderLifestyle(idx, idx + 1);
                          showToast(`Moved "${item.title}" down to #${idx + 2}`, 'success');
                        }}
                        className="p-0.5 hover:text-amber-500 disabled:opacity-25 cursor-pointer disabled:cursor-not-allowed"
                        title="Move Later"
                      >
                        <ChevronRight size={10} />
                      </button>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">{item.subtitle}</p>
                </div>
              </div>

              {/* Actions on hover */}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                <button
                  type="button"
                  onClick={() => setEditingLifestyle({ ...item })}
                  className="p-1 rounded bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 cursor-pointer"
                  title="Edit"
                >
                  <Edit2 size={12} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(`Delete interest "${item.title}"?`)) {
                      deleteLifestyle(item.id);
                      showToast('Interest deleted', 'warning');
                    }
                  }}
                  className="p-1 rounded bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 cursor-pointer"
                  title="Delete"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── EDIT CAPABILITY MODAL ─── */}
      {editingCap && createPortal(
        <div className="fixed inset-0 z-9999 bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="glass-card rounded-2xl p-6 max-w-lg w-full border border-cyan-500/30 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
              <h3 className="text-base font-bold text-black dark:text-white flex items-center gap-2">
                <Edit2 size={16} className="text-cyan-500" />
                Edit Capability
              </h3>
              <button onClick={() => setEditingCap(null)} className="text-slate-400 hover:text-white cursor-pointer"><X size={18} /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold mb-1 text-slate-500 dark:text-slate-400">Title</label>
                <input
                  type="text"
                  value={editingCap.title}
                  onChange={(e) => setEditingCap({ ...editingCap, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-sm font-bold text-black dark:text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold mb-1 text-slate-500 dark:text-slate-400">Tagline</label>
                <input
                  type="text"
                  value={editingCap.tagline}
                  onChange={(e) => setEditingCap({ ...editingCap, tagline: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-sm text-black dark:text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold mb-1 text-slate-500 dark:text-slate-400">Card Icon</label>
                <select
                  value={editingCap.iconName || 'Code2'}
                  onChange={(e) => setEditingCap({ ...editingCap, iconName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-white/10 text-sm font-medium text-black dark:text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="Infinity">Infinity (DevOps, CI/CD, Docker)</option>
                  <option value="Webhook">Webhook (API Development, Endpoints)</option>
                  <option value="Network">Network (Microservices, Network APIs)</option>
                  <option value="Workflow">Workflow (DevOps Pipelines, Automation)</option>
                  <option value="GitBranch">GitBranch (Git, CI/CD Workflows)</option>
                  <option value="Boxes">Boxes (Containers, Docker, Modules)</option>
                  <option value="Code2">Code2 (Frontend, UI/UX)</option>
                  <option value="Server">Server (Backend, Microservices)</option>
                  <option value="Database">Database (SQL, MongoDB, Cache)</option>
                  <option value="ShieldCheck">ShieldCheck (Security, Auth)</option>
                  <option value="Cpu">Cpu (System Architecture)</option>
                  <option value="Layers">Layers (Full Stack, Architecture)</option>
                  <option value="Globe">Globe (Web Apps, Cloud)</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold mb-1 text-slate-500 dark:text-slate-400">Description</label>
                <textarea
                  rows={3}
                  value={editingCap.description}
                  onChange={(e) => setEditingCap({ ...editingCap, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-sm text-black dark:text-white focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <button
                onClick={() => setEditingCap(null)}
                className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-white/10 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (updateCapability) {
                    updateCapability(editingCap.id, editingCap);
                  } else {
                    deleteCapability(editingCap.id);
                    addCapability(editingCap);
                  }
                  setEditingCap(null);
                  showToast('Capability updated!', 'success');
                }}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold cursor-pointer"
              >
                <Check size={14} className="inline mr-1" />
                Save Changes
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* ─── EDIT LIFESTYLE MODAL ─── */}
      {editingLifestyle && createPortal(
        <div className="fixed inset-0 z-9999 bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="glass-card rounded-2xl p-6 max-w-md w-full border border-amber-500/30 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
              <h3 className="text-base font-bold text-black dark:text-white flex items-center gap-2">
                <Edit2 size={16} className="text-amber-500" />
                Edit Interest / Hobby
              </h3>
              <button onClick={() => setEditingLifestyle(null)} className="text-slate-400 hover:text-white cursor-pointer"><X size={18} /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold mb-1 text-slate-500 dark:text-slate-400">Title</label>
                <input
                  type="text"
                  value={editingLifestyle.title}
                  onChange={(e) => setEditingLifestyle({ ...editingLifestyle, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-sm font-bold text-black dark:text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold mb-1 text-slate-500 dark:text-slate-400">Subtitle</label>
                <input
                  type="text"
                  value={editingLifestyle.subtitle}
                  onChange={(e) => setEditingLifestyle({ ...editingLifestyle, subtitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-sm text-black dark:text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold mb-1 text-slate-500 dark:text-slate-400">Icon</label>
                <select
                  value={editingLifestyle.iconName || 'Dumbbell'}
                  onChange={(e) => setEditingLifestyle({ ...editingLifestyle, iconName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-white/10 text-sm font-medium text-black dark:text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Dumbbell">Dumbbell (Fitness & Gym)</option>
                  <option value="Mountain">Mountain (Trekking & Hiking)</option>
                  <option value="Film">Film (Cinema & Movies)</option>
                  <option value="Camera">Camera (Photography)</option>
                  <option value="BookOpen">BookOpen (Reading & Books)</option>
                  <option value="Gamepad2">Gamepad2 (Gaming & Esports)</option>
                  <option value="Music">Music (Music & Instruments)</option>
                  <option value="Coffee">Coffee (Coffee & Cafes)</option>
                  <option value="Bike">Bike (Cycling & Riding)</option>
                  <option value="Plane">Plane (Travel & Hikes)</option>
                  <option value="Heart">Heart (Wellness & Social)</option>
                  <option value="Trophy">Trophy (Sports & Competitions)</option>
                  <option value="Sparkles">Sparkles (Creative Arts)</option>
                  <option value="Code">Code (Open Source & Coding)</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <button
                onClick={() => setEditingLifestyle(null)}
                className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-white/10 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (updateLifestyle) {
                    updateLifestyle(editingLifestyle.id, editingLifestyle);
                  } else {
                    deleteLifestyle(editingLifestyle.id);
                    addLifestyle(editingLifestyle);
                  }
                  setEditingLifestyle(null);
                  showToast('Interest updated!', 'success');
                }}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold cursor-pointer"
              >
                <Check size={14} className="inline mr-1" />
                Save Changes
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
}
