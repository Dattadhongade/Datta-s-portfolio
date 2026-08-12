import React from 'react';
import { Zap, Plus, Edit2, Trash2, Check, X, Shield, Heart } from 'lucide-react';

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
  deleteCapability,
  lifestyle,
  addLifestyle,
  deleteLifestyle,
  showToast
}) {
  return (
    <div className="space-y-6">

      {/* Metric Stats */}
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

      {/* Capabilities List */}
      <div className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-white/10 space-y-4">
        <h3 className="fluid-h3 font-semibold text-black dark:text-white flex items-center gap-2">
          <Shield size={18} className="text-cyan-600 dark:text-cyan-400" />
          <span>Core Engineering Capabilities ({capabilities.length})</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {capabilities.map((cap) => (
            <div key={cap.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border space-y-2 relative group">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-black dark:text-white">{cap.title}</h4>
                <button
                  onClick={() => {
                    if (window.confirm(`Delete capability "${cap.title}"?`)) {
                      deleteCapability(cap.id);
                      showToast('Capability deleted', 'warning');
                    }
                  }}
                  className="p-1 text-slate-400 hover:text-rose-500 cursor-pointer"
                >
                  <Trash2 size={13} />
                </button>
              </div>
              <p className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold">{cap.tagline}</p>
              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">{cap.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
