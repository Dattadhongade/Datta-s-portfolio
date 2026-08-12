import React from 'react';
import { User, Save, Image as ImageIcon, Upload, FileText, ExternalLink } from 'lucide-react';
import heroDark from "../../assets/hero.png";
import heroLight from "../../assets/hero.png";

export default function AdminProfileTab({
  profileForm,
  setProfileForm,
  handleSaveProfile,
  uploadImage,
  setUploadingImage,
  showToast
}) {
  return (
    <form onSubmit={handleSaveProfile} className="glass-card rounded-2xl p-6 sm:p-8 space-y-6 border border-slate-200/80 dark:border-white/10">
      <div className="flex justify-between items-center border-b border-slate-200/80 dark:border-white/10 pb-4">
        <h3 className="fluid-h3 font-semibold text-black dark:text-white flex items-center gap-2">
          <User size={18} className="text-cyan-600 dark:text-cyan-400" />
          <span>Identity & Biography Settings</span>
        </h3>
        <button type="submit" className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-cyan-500/20 cursor-pointer">
          <Save size={14} />
          <span>Save Profile</span>
        </button>
      </div>

      {/* Dual Theme Profile Photo Upload Section */}
      <div className="space-y-2 pt-2 border-t border-slate-200/80 dark:border-white/10">
        <h4 className="text-xs font-bold text-black dark:text-white flex items-center gap-1.5">
          <ImageIcon size={14} className="text-cyan-600 dark:text-cyan-400" />
          <span>Theme-Specific Profile Photos (Auto-switch on Theme Toggle)</span>
        </h4>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">Upload separate profile photos for Light Mode and Dark Mode.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Light Mode Photo */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-black dark:text-slate-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                Light Mode Profile Photo
              </span>
              {profileForm.avatarLight && (
                <button
                  type="button"
                  onClick={() => {
                    setProfileForm((prev) => ({ ...prev, avatarLight: '' }));
                    showToast('Light photo removed', 'warning');
                  }}
                  className="text-[10px] text-rose-500 font-bold hover:underline cursor-pointer"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-full overflow-hidden border border-slate-300 dark:border-white/20 bg-white dark:bg-slate-900 shrink-0">
                <img
                  src={profileForm.avatarLight || heroLight}
                  alt="Light Avatar Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <label className="px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold cursor-pointer transition-colors inline-flex items-center gap-1.5 shadow-sm">
                <Upload size={13} />
                <span>{profileForm.avatarLight ? "Change Light Photo" : "Upload Light Photo"}</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setUploadingImage(true);
                    showToast('Uploading light mode photo...', 'info');
                    try {
                      const url = await uploadImage(file);
                      setProfileForm((prev) => ({ ...prev, avatarLight: url }));
                      showToast('Light mode photo uploaded successfully!', 'success');
                    } catch (err) {
                      showToast('Upload failed', 'error');
                    } finally {
                      setUploadingImage(false);
                    }
                  }}
                />
              </label>
            </div>
          </div>

          {/* Dark Mode Photo */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-black dark:text-slate-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                Dark Mode Profile Photo
              </span>
              {profileForm.avatarDark && (
                <button
                  type="button"
                  onClick={() => {
                    setProfileForm((prev) => ({ ...prev, avatarDark: '' }));
                    showToast('Dark photo removed', 'warning');
                  }}
                  className="text-[10px] text-rose-500 font-bold hover:underline cursor-pointer"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-full overflow-hidden border border-slate-300 dark:border-white/20 bg-white dark:bg-slate-900 shrink-0">
                <img
                  src={profileForm.avatarDark || heroDark}
                  alt="Dark Avatar Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <label className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold cursor-pointer transition-colors inline-flex items-center gap-1.5 shadow-sm">
                <Upload size={13} />
                <span>{profileForm.avatarDark ? "Change Dark Photo" : "Upload Dark Photo"}</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setUploadingImage(true);
                    showToast('Uploading dark mode photo...', 'info');
                    try {
                      const url = await uploadImage(file);
                      setProfileForm((prev) => ({ ...prev, avatarDark: url }));
                      showToast('Dark mode photo uploaded successfully!', 'success');
                    } catch (err) {
                      showToast('Upload failed', 'error');
                    } finally {
                      setUploadingImage(false);
                    }
                  }}
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-black dark:text-slate-300">Full Name</label>
          <input
            type="text"
            value={profileForm.name || ''}
            onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-black dark:text-white text-xs sm:text-sm font-medium focus:outline-none focus:border-cyan-500"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-black dark:text-slate-300">Professional Role / Title</label>
          <input
            type="text"
            value={profileForm.role || ''}
            onChange={(e) => setProfileForm({ ...profileForm, role: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-black dark:text-white text-xs sm:text-sm font-medium focus:outline-none focus:border-cyan-500"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-black dark:text-slate-300">Location</label>
          <input
            type="text"
            value={profileForm.location || ""}
            onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-black dark:text-white text-xs sm:text-sm font-medium focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-black dark:text-slate-300">Email Address</label>
          <input
            type="email"
            value={profileForm.email || ""}
            onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
            placeholder="dattadhongade@gmail.com"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-black dark:text-white text-xs sm:text-sm font-medium focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="space-y-1 col-span-1 sm:col-span-2">
          <label className="text-xs font-bold text-black dark:text-slate-300 flex items-center gap-1.5">
            <FileText size={13} className="text-cyan-600 dark:text-cyan-400" />
            Resume PDF — Upload File or Paste URL
          </label>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-3">
            {/* File Upload */}
            <div className="flex items-center gap-3 flex-wrap">
              <label className="px-3.5 py-2 rounded-xl bg-linear-to-r from-cyan-600 to-indigo-600 text-white text-xs font-bold cursor-pointer transition-colors inline-flex items-center gap-1.5 shadow-sm">
                <Upload size={13} />
                <span>Upload Resume PDF</span>
                <input
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setUploadingImage(true);
                    showToast('Uploading resume PDF...', 'info');
                    try {
                      const url = await uploadImage(file);
                      setProfileForm((prev) => ({ ...prev, resumeDownloadUrl: url }));
                      showToast('Resume PDF uploaded successfully!', 'success');
                    } catch (err) {
                      showToast('PDF upload failed', 'error');
                    } finally {
                      setUploadingImage(false);
                    }
                  }}
                />
              </label>
              {profileForm.resumeDownloadUrl && profileForm.resumeDownloadUrl !== '#download' && (
                <a
                  href={profileForm.resumeDownloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-cyan-600 dark:text-cyan-400 font-bold hover:underline flex items-center gap-1"
                >
                  <ExternalLink size={12} /> Preview / Test Link
                </a>
              )}
            </div>
            {/* Manual URL field */}
            <div className="space-y-1">
              <label className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Or paste a direct URL:</label>
              <input
                type="text"
                placeholder="https://drive.google.com/your-resume.pdf"
                value={profileForm.resumeDownloadUrl || ''}
                onChange={(e) => setProfileForm({ ...profileForm, resumeDownloadUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 text-black dark:text-white text-xs font-medium focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
          <label className="text-xs font-bold text-black dark:text-slate-300">About Bio - Paragraph 1</label>
          <textarea
            rows={3}
            value={profileForm.bioParagraph1 || ''}
            onChange={(e) => setProfileForm({ ...profileForm, bioParagraph1: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-black dark:text-white text-xs sm:text-sm font-normal focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-black dark:text-slate-300">About Bio - Paragraph 2 (Experience & Specialization)</label>
          <textarea
            rows={3}
            value={profileForm.bioParagraph2 || ''}
            onChange={(e) => setProfileForm({ ...profileForm, bioParagraph2: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-black dark:text-white text-xs sm:text-sm font-normal focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Availability Toggle */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold text-black dark:text-white">Available for Hire Badge</h4>
          <p className="text-[11px] text-black dark:text-slate-400">Toggle green active status badge in sidebar & about section</p>
        </div>
        <button
          type="button"
          onClick={() => setProfileForm({ ...profileForm, available: !profileForm.available })}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            profileForm.available
              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
              : 'bg-slate-200 dark:bg-slate-800 text-black dark:text-slate-400'
          }`}
        >
          {profileForm.available ? 'Status: Available' : 'Status: Busy'}
        </button>
      </div>
    </form>
  );
}
