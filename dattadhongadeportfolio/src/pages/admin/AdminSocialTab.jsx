import React from 'react';
import { Send, Plus, Trash2, Save } from 'lucide-react';

export default function AdminSocialTab({
  profileForm,
  setProfileForm,
  updateProfile,
  showToast
}) {
  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6 border border-slate-200/80 dark:border-white/10">
      <div className="flex justify-between items-center border-b border-slate-200/80 dark:border-white/10 pb-4">
        <h3 className="fluid-h3 font-semibold text-black dark:text-white flex items-center gap-2">
          <Send size={18} className="text-cyan-600 dark:text-cyan-400" />
          <span>Social Media Links</span>
        </h3>
        <button
          onClick={() => {
            const updated = [...(profileForm.socialLinks || []), { name: '', href: '', color: 'hover:text-cyan-500' }];
            setProfileForm({ ...profileForm, socialLinks: updated });
          }}
          className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
        >
          <Plus size={13} /> Add Link
        </button>
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-400">
        These links appear in the Sidebar and Connect page. Name must match: <span className="font-bold text-black dark:text-white">GitHub, LinkedIn, LeetCode, Instagram, Twitter, YouTube, Website</span>
      </p>

      <div className="space-y-3">
        {(profileForm.socialLinks || []).map((link, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Platform Name */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-black dark:text-slate-300">Platform Name</label>
                <select
                  value={link.name}
                  onChange={(e) => {
                    const colorMap = {
                      'GitHub': 'hover:text-gray-800 dark:hover:text-white',
                      'LinkedIn': 'hover:text-blue-600',
                      'LeetCode': 'hover:text-amber-500',
                      'Instagram': 'hover:text-pink-500',
                      'Twitter': 'hover:text-sky-500',
                      'YouTube': 'hover:text-red-500',
                      'Website': 'hover:text-emerald-500',
                    };
                    const updated = [...(profileForm.socialLinks || [])];
                    updated[idx] = { ...updated[idx], name: e.target.value, color: colorMap[e.target.value] || 'hover:text-cyan-500' };
                    setProfileForm({ ...profileForm, socialLinks: updated });
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-black dark:text-white text-xs font-medium focus:outline-none focus:border-cyan-500"
                >
                  <option value="" className="bg-white dark:bg-slate-900 text-black dark:text-white">— Select Platform —</option>
                  <option value="GitHub" className="bg-white dark:bg-slate-900 text-black dark:text-white">GitHub</option>
                  <option value="LinkedIn" className="bg-white dark:bg-slate-900 text-black dark:text-white">LinkedIn</option>
                  <option value="LeetCode" className="bg-white dark:bg-slate-900 text-black dark:text-white">LeetCode</option>
                  <option value="Instagram" className="bg-white dark:bg-slate-900 text-black dark:text-white">Instagram</option>
                  <option value="Twitter" className="bg-white dark:bg-slate-900 text-black dark:text-white">Twitter / X</option>
                  <option value="YouTube" className="bg-white dark:bg-slate-900 text-black dark:text-white">YouTube</option>
                  <option value="Website" className="bg-white dark:bg-slate-900 text-black dark:text-white">Personal Website</option>
                </select>
              </div>

              {/* URL */}
              <div className="space-y-1 sm:col-span-2">
                <label className="text-[11px] font-bold text-black dark:text-slate-300">Profile URL</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://..."
                    value={link.href}
                    onChange={(e) => {
                      const updated = [...(profileForm.socialLinks || [])];
                      updated[idx] = { ...updated[idx], href: e.target.value };
                      setProfileForm({ ...profileForm, socialLinks: updated });
                    }}
                    className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 text-black dark:text-white text-xs font-medium focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    onClick={() => {
                      const updated = (profileForm.socialLinks || []).filter((_, i) => i !== idx);
                      setProfileForm({ ...profileForm, socialLinks: updated });
                      showToast('Social link removed', 'warning');
                    }}
                    className="px-3 py-2 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 text-rose-500 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {(!profileForm.socialLinks || profileForm.socialLinks.length === 0) && (
          <p className="text-center text-sm text-slate-400 dark:text-slate-500 py-6">No social links added yet. Click "Add Link" to add one.</p>
        )}
      </div>

      {/* Save Button */}
      <button
        onClick={() => {
          updateProfile(profileForm);
          showToast('Social links saved successfully!', 'success');
        }}
        className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm flex items-center gap-2 shadow-md shadow-cyan-500/20 cursor-pointer"
      >
        <Save size={15} /> Save Social Links
      </button>
    </div>
  );
}
