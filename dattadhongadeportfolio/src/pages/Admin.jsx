import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  User, 
  Briefcase, 
  FileText, 
  Code2, 
  MessageSquare, 
  Plus, 
  Trash2, 
  Save, 
  Download, 
  Upload, 
  Award,
  Zap,
  CheckCircle,
  Send,
  X,
  ExternalLink,
  RotateCcw,
  Shield,
  Layers,
  GraduationCap,
  Calendar,
  MapPin,
  Mail,
  Info,
  Edit2,
  Image as ImageIcon,
  Check,
  Server,
  Phone,
  BrainCircuit,
  TerminalSquare,
  ShieldCheck,
  Database,
  TestTube2,
  Wrench,
  Search,
  LogOut,
  AlertTriangle,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import TechIcon, { TECH_ICON_REGISTRY } from '../components/TechIcon';
import AdminLogin from '../components/AdminLogin';
import { api } from '../services';
import heroDark from "../assets/hero.png";
import heroLight from "../assets/hero.png";

const getCategoryIcon = (category) => {
  switch (category) {
    case "Frontend":           return <Code2        className="text-cyan-600 dark:text-cyan-400"   size={16} />;
    case "Backend":            return <Server       className="text-indigo-600 dark:text-indigo-400" size={16} />;
    case "AI / ML":            return <BrainCircuit className="text-emerald-600 dark:text-emerald-400" size={16} />;
    case "Languages":          return <TerminalSquare className="text-amber-600 dark:text-amber-400" size={16} />;
    case "DevOps & Tools":     return <Wrench       className="text-blue-600 dark:text-blue-400"   size={16} />;
    case "Auth & Security":    return <ShieldCheck  className="text-purple-600 dark:text-purple-400" size={16} />;
    case "Infra / Architecture": return <Database   className="text-teal-600 dark:text-teal-400"   size={16} />;
    case "Testing / Quality":  return <TestTube2    className="text-rose-600 dark:text-rose-400"   size={16} />;
    default:                   return <Code2        className="text-cyan-600 dark:text-cyan-400"   size={16} />;
  }
};

export default function Admin() {
  const {
    profile,
    updateProfile,
    stats,
    addStat,
    updateStat,
    deleteStat,
    capabilities,
    addCapability,
    deleteCapability,
    lifestyle,
    addLifestyle,
    deleteLifestyle,
    projects,
    projectCategories,
    addProject,
    updateProject,
    deleteProject,
    addProjectCategory,
    updateProjectCategory,
    deleteProjectCategory,
    educations,
    education,
    addEducation,
    updateEducation,
    deleteEducation,
    skills,
    addSkill,
    updateSkill,
    deleteSkill,
    addSkillCategory,
    certifications,
    addCertification,
    deleteCertification,
    experiences,
    addExperience,
    deleteExperience,
    addRoleToExperience,
    deleteRoleFromExperience,
    messages,
    markMessageRead,
    deleteMessage,
    resetToDefaults,
    backendConnected,
    uploadImage
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState('profile');
  const [toast, setToast] = useState(null);
  const [editingStat, setEditingStat] = useState(null);
  const [showAddStat, setShowAddStat] = useState(false);
  const [newStatForm, setNewStatForm] = useState({ value: '', label: '', color: 'text-cyan-500 dark:text-cyan-400', border: 'border-cyan-500/20' });
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryEditInput, setCategoryEditInput] = useState('');

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Verify Admin JWT token session on component mount
  useEffect(() => {
    const verifySession = async () => {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        setIsAuthenticated(false);
        setIsCheckingAuth(false);
        return;
      }

      try {
        const res = await api.get('/auth/me');
        if (res.success && res.user) {
          setIsAuthenticated(true);
          setAdminUser(res.user);
        } else {
          localStorage.removeItem('admin_token');
          setIsAuthenticated(false);
        }
      } catch (err) {
        localStorage.removeItem('admin_token');
        setIsAuthenticated(false);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    verifySession();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
    setAdminUser(null);
    showToast('Logged out of Admin Control Panel successfully.');
  };

  // Local Form States
  // 1. Profile
  const [profileForm, setProfileForm] = useState({ ...profile });

  // 2. Project Add & Edit Modals
  const [showAddProject, setShowAddProject] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [newProject, setNewProject] = useState({
    title: '',
    category: 'Full Stack',
    description: '',
    tags: '',
    image: '',
    github: '',
    demo: '',
    highlights: '',
    status: 'Published'
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [newCategoryInput, setNewCategoryInput] = useState('');
  const addProjectFileInputRef = useRef(null);
  const editProjectFileInputRef = useRef(null);

  // 3. Education Add & Edit
  const educationList = educations && educations.length > 0 ? educations : (education ? [education] : []);
  const [showAddEdu, setShowAddEdu] = useState(false);
  const [editingEdu, setEditingEdu] = useState(null);
  const [newEdu, setNewEdu] = useState({
    degree: '',
    institution: '',
    duration: '',
    cgpa: '',
    description: ''
  });

  // 4. Skills
  const skillFormRef = useRef(null);
  const [adminSkillCategory, setAdminSkillCategory] = useState('');
  const [editingSkill, setEditingSkill] = useState(null);
  const [iconSearchQuery, setIconSearchQuery] = useState('');
  const [showIconDropdown, setShowIconDropdown] = useState(false);
  const [newSkill, setNewSkill] = useState({
    category: Object.keys(skills || {})[0] || 'Frontend',
    name: '',
    progress: 85,
    icon: ''
  });
  const [newSkillCategoryInput, setNewSkillCategoryInput] = useState('');

  // 5. Certifications
  const [newCert, setNewCert] = useState({ title: '', issuer: '', year: new Date().getFullYear().toString() });

  // 6. Capabilities
  const [newCap, setNewCap] = useState({ title: '', tagline: '', description: '', iconName: 'Code2' });
  const [newStat, setNewStat] = useState({ label: '', value: '', color: 'text-cyan-500' });
  const [newLifestyle, setNewLifestyle] = useState({ title: '', subtitle: '', iconName: 'Zap' });

  // 7. Experience
  const [showAddExp, setShowAddExp] = useState(false);
  const [newExp, setNewExp] = useState({ company: '', location: '', duration: '', badge: 'Full-time' });
  const [selectedCompanyIdForRole, setSelectedCompanyIdForRole] = useState(experiences[0]?.id || null);
  const [newRole, setNewRole] = useState({ title: '', type: 'Full-time', duration: '', description: '', achievements: '', technologies: '' });

  // Image Upload Handler
  const handleImageFileChange = async (e, isEditing = false) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const url = await uploadImage(file);
      if (isEditing && editingProject) {
        setEditingProject((prev) => ({ ...prev, image: url }));
      } else {
        setNewProject((prev) => ({ ...prev, image: url }));
      }
      showToast('Image uploaded successfully!');
    } catch (err) {
      showToast('Image upload failed', 'error');
    } finally {
      setUploadingImage(false);
    }
  };
  const handleImageUpload = handleImageFileChange;

  // Submit Handlers
  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile(profileForm);
    showToast('Profile & Bio updated successfully!');
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProject.title.trim() || !newProject.description.trim()) {
      showToast('Project Title and Description are required', 'error');
      return;
    }

    const tagsArray = newProject.tags ? newProject.tags.split(',').map((t) => t.trim()).filter(Boolean) : [];
    const highlightsArray = newProject.highlights ? newProject.highlights.split('\n').map((h) => h.trim()).filter(Boolean) : [];

    addProject({
      ...newProject,
      image: newProject.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
      tags: tagsArray,
      highlights: highlightsArray
    });

    setNewProject({
      title: '',
      category: projectCategories[1] || 'Full Stack',
      description: '',
      tags: '',
      image: '',
      github: '',
      demo: '',
      highlights: '',
      status: 'Published'
    });
    setShowAddProject(false);
    showToast('New project created!');
  };

  const handleSaveEditProject = (e) => {
    e.preventDefault();
    if (!editingProject || !editingProject.title.trim()) return;

    const tagsArray = typeof editingProject.tags === 'string' 
      ? editingProject.tags.split(',').map((t) => t.trim()).filter(Boolean) 
      : editingProject.tags;

    const highlightsArray = typeof editingProject.highlights === 'string'
      ? editingProject.highlights.split('\n').map((h) => h.trim()).filter(Boolean)
      : editingProject.highlights;

    updateProject(editingProject.id, {
      ...editingProject,
      tags: tagsArray,
      highlights: highlightsArray
    });

    setEditingProject(null);
    showToast('Project updated successfully!');
  };

  const handleAddEducation = (e) => {
    e.preventDefault();
    if (!newEdu.degree.trim() || !newEdu.institution.trim()) {
      showToast('Degree and Institution are required', 'error');
      return;
    }
    addEducation(newEdu);
    setNewEdu({ degree: '', institution: '', duration: '', cgpa: '', description: '' });
    setShowAddEdu(false);
    showToast('New education entry added!');
  };

  const handleSaveEditEdu = (e) => {
    e.preventDefault();
    if (!editingEdu || !editingEdu.degree.trim()) return;
    updateEducation(editingEdu.id, editingEdu);
    setEditingEdu(null);
    showToast('Education updated successfully!');
  };

  const handleSkillFormSubmit = (e) => {
    e.preventDefault();
    if (!newSkill.name.trim()) return;

    const payload = {
      name: newSkill.name.trim(),
      progress: Number(newSkill.progress),
      icon: newSkill.icon || newSkill.name.trim()
    };

    if (editingSkill) {
      if (newSkill.category !== editingSkill.category) {
        deleteSkill(editingSkill.category, editingSkill.index);
        addSkill(newSkill.category, payload);
      } else {
        updateSkill(editingSkill.category, editingSkill.index, payload);
      }
      showToast(`Updated skill "${newSkill.name.trim()}"!`);
      setEditingSkill(null);
    } else {
      addSkill(newSkill.category, payload);
      showToast(`Added ${newSkill.name.trim()} to ${newSkill.category}!`);
    }

    setNewSkill((prev) => ({ ...prev, name: '', icon: '' }));
    setIconSearchQuery('');
    setShowIconDropdown(false);
  };

  const handleAddCertification = (e) => {
    e.preventDefault();
    if (!newCert.title.trim() || !newCert.issuer.trim()) return;
    addCertification({
      title: newCert.title.trim(),
      issuer: newCert.issuer.trim(),
      year: newCert.year.trim() || new Date().getFullYear().toString()
    });
    setNewCert({ title: '', issuer: '', year: new Date().getFullYear().toString() });
    showToast(`Added certification "${newCert.title}"!`);
  };

  const tabs = [
    { id: 'profile', label: 'Profile & Bio', icon: <User size={15} /> },
    { id: 'social', label: 'Social Links', icon: <Send size={15} /> },
    { id: 'projects', label: 'Projects & SaaS', icon: <Briefcase size={15} /> },
    { id: 'skills', label: 'Skills Matrix', icon: <Code2 size={15} /> },
    { id: 'academics', label: 'Academics & Qualifications', icon: <GraduationCap size={15} /> },
    { id: 'capabilities', label: 'Capabilities & Stats', icon: <Zap size={15} /> },
    { id: 'experience', label: 'Work Experience', icon: <Award size={15} /> },
    { id: 'messages', label: `Messages (${(messages || []).filter((m) => m.unread).length})`, icon: <MessageSquare size={15} /> },
    { id: 'backup', label: 'Backup & Reset', icon: <RotateCcw size={15} /> },
  ];

  if (isCheckingAuth) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-8">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
          <p className="text-sm font-mono text-slate-500 dark:text-slate-400 animate-pulse">
            Verifying Admin Security Clearance...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <AdminLogin
        onLoginSuccess={(user) => {
          setIsAuthenticated(true);
          setAdminUser(user);
          showToast(`Welcome back, ${user.username || 'Admin'}!`);
        }}
      />
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300 pb-12">
      
      {/* Center Floating Toast Notification */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] pointer-events-auto min-w-[320px] max-w-lg px-2 animate-in fade-in slide-in-from-top-6 duration-300">
          {(() => {
            const isError = toast.type === 'error';
            const isWarning = toast.type === 'warning';
            const isInfo = toast.type === 'info';

            const styles = isError
              ? 'bg-slate-900/95 text-rose-200 border-rose-500/50 shadow-[0_0_30px_rgba(244,63,94,0.3)]'
              : isWarning
              ? 'bg-slate-900/95 text-amber-200 border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.3)]'
              : isInfo
              ? 'bg-slate-900/95 text-cyan-200 border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.3)]'
              : 'bg-slate-900/95 text-emerald-200 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.3)]';

            const Icon = isError
              ? AlertCircle
              : isWarning
              ? AlertTriangle
              : isInfo
              ? Info
              : CheckCircle2;

            const iconColor = isError
              ? 'text-rose-400'
              : isWarning
              ? 'text-amber-400'
              : isInfo
              ? 'text-cyan-400'
              : 'text-emerald-400';

            const badgeBg = isError
              ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
              : isWarning
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              : isInfo
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
              : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';

            const label = isError ? 'ERROR' : isWarning ? 'WARNING' : isInfo ? 'NOTICE' : 'SUCCESS';

            return (
              <div className={`w-full px-4 py-3 rounded-2xl backdrop-blur-xl border flex items-center justify-between gap-3 text-sm font-semibold shadow-2xl ${styles}`}>
                <div className="flex items-center gap-2.5">
                  <Icon size={20} className={`shrink-0 ${iconColor}`} />
                  <span className={`px-2 py-0.5 rounded-md border text-[10px] font-mono uppercase tracking-wider ${badgeBg}`}>
                    {label}
                  </span>
                  <span className="text-slate-100 text-xs sm:text-sm font-medium">{toast.message}</span>
                </div>
                <button
                  onClick={() => setToast(null)}
                  className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Dismiss notification"
                >
                  <X size={15} />
                </button>
              </div>
            );
          })()}
        </div>
      )}

      {/* Admin Security Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 text-white shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-indigo-500/20 text-cyan-400 border border-indigo-500/30 shadow-inner">
            <ShieldCheck size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-white tracking-tight">
                Datta's Control Panel
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono uppercase tracking-wider">
                Authenticated: {adminUser?.username || 'admin'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              MongoDB Database Connection Active • 256-bit Token Encryption
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-xs font-semibold transition-all cursor-pointer shadow-xs hover:border-rose-500/50"
        >
          <LogOut size={15} />
          <span>Log Out</span>
        </button>
      </div>

      {/* Responsive Navigation Tabs (Never overflows screen) */}
      <div className="p-1.5 rounded-2xl bg-slate-100/90 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-wrap gap-1.5 justify-start sm:justify-center">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-white dark:bg-cyan-500/20 text-black dark:text-cyan-300 border border-slate-300 dark:border-cyan-500/40 shadow-xs font-bold'
                  : 'text-black dark:text-slate-400 hover:text-cyan-600 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-white/5 border border-transparent'
              }`}
            >
              <span className={isActive ? 'text-cyan-600 dark:text-cyan-300' : 'text-slate-500 dark:text-slate-400'}>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: PROFILE & BIO */}
      {activeTab === 'profile' && (
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
                      onClick={() => setProfileForm((prev) => ({ ...prev, avatarLight: '' }))}
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
                        try {
                          const url = await uploadImage(file);
                          setProfileForm((prev) => ({ ...prev, avatarLight: url }));
                          showToast('Light mode photo uploaded!');
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
                      onClick={() => setProfileForm((prev) => ({ ...prev, avatarDark: '' }))}
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
                        try {
                          const url = await uploadImage(file);
                          setProfileForm((prev) => ({ ...prev, avatarDark: url }));
                          showToast('Dark mode photo uploaded!');
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
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-black dark:text-white text-xs sm:text-sm font-medium focus:outline-none focus:border-cyan-500"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-black dark:text-slate-300">Professional Role / Title</label>
              <input
                type="text"
                value={profileForm.role}
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
                        try {
                          const url = await uploadImage(file);
                          setProfileForm((prev) => ({ ...prev, resumeDownloadUrl: url }));
                          showToast('Resume PDF uploaded successfully!');
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
                    value={profileForm.resumeDownloadUrl}
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
                value={profileForm.bioParagraph1}
                onChange={(e) => setProfileForm({ ...profileForm, bioParagraph1: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-black dark:text-white text-xs sm:text-sm font-normal focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-black dark:text-slate-300">About Bio - Paragraph 2 (Experience & Specialization)</label>
              <textarea
                rows={3}
                value={profileForm.bioParagraph2}
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
      )}

      {/* TAB: SOCIAL LINKS */}
      {activeTab === 'social' && (
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
              showToast('Social links saved!');
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm flex items-center gap-2 shadow-md shadow-cyan-500/20 cursor-pointer"
          >
            <Save size={15} /> Save Social Links
          </button>
        </div>
      )}

      {/* TAB 2: PROJECTS & SAAS (Rich Cards + Edit Modal + Direct Image Upload) */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h3 className="fluid-h3 font-semibold text-black dark:text-white flex items-center gap-2">
                <Briefcase size={18} className="text-indigo-600 dark:text-indigo-400" />
                <span>Production Projects & SaaS Directory ({projects.length})</span>
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
                            showToast(`Renamed category to "${categoryEditInput.trim()}"`);
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
                        className="text-slate-400 hover:text-slate-600 p-0.5"
                        title="Cancel"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <span>{cat}</span>
                      {cat !== 'All' && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingCategory(cat);
                            setCategoryEditInput(cat);
                          }}
                          className="text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 p-0.5 cursor-pointer"
                          title="Rename Category"
                        >
                          <Edit2 size={11} />
                        </button>
                      )}
                      {cat !== 'All' && (
                        <button
                          type="button"
                          onClick={() => {
                            deleteProjectCategory(cat);
                            showToast(`Deleted category "${cat}"`);
                          }}
                          className="text-slate-400 hover:text-rose-500 p-0.5 cursor-pointer"
                          title="Delete Category"
                        >
                          <X size={11} />
                        </button>
                      )}
                    </>
                  )}
                </div>
              ))}
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  placeholder="New Category..."
                  value={newCategoryInput}
                  onChange={(e) => setNewCategoryInput(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-xs text-black dark:text-white w-32 focus:outline-none focus:border-cyan-500"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newCategoryInput.trim()) {
                      addProjectCategory(newCategoryInput);
                      setNewCategoryInput('');
                      showToast('Category added!');
                    }
                  }}
                  className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs cursor-pointer shadow-sm"
                  title="Add Category"
                >
                  <Plus size={13} />
                </button>
              </div>
            </div>
          </div>

          {/* Projects Display in Frontend Card Design with Edit and Delete */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="glass-card rounded-2xl overflow-hidden border border-slate-200/80 dark:border-white/10 flex flex-col justify-between hover:border-cyan-500/40 transition-all duration-300 group"
              >
                <div>
                  {/* Thumbnail */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-950/80 backdrop-blur-md text-cyan-400 border border-cyan-500/30">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-2.5">
                    <h4 className="fluid-h3 font-semibold text-black dark:text-white tracking-tight line-clamp-1">
                      {project.title}
                    </h4>
                    <p className="fluid-xs text-black dark:text-slate-300 line-clamp-2 font-normal">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {(project.tags || []).slice(0, 4).map((tag, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-white/5 text-black dark:text-slate-300 border border-slate-200 dark:border-white/10">
                          {tag}
                        </span>
                      ))}
                      {(project.tags || []).length > 4 && (
                        <span className="px-1.5 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-white/5 text-black dark:text-slate-400">
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Action Controls: Edit & Delete */}
                <div className="p-3 bg-slate-50/80 dark:bg-white/5 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setEditingProject({
                      ...project,
                      tags: (project.tags || []).join(', '),
                      highlights: (project.highlights || []).join('\n')
                    })}
                    className="flex-1 py-1.5 px-3 rounded-xl bg-slate-200 dark:bg-white/10 hover:bg-cyan-600 hover:text-white dark:hover:bg-cyan-600 text-black dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Edit2 size={13} />
                    <span>Edit Project</span>
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm(`Delete project "${project.title}"?`)) {
                        deleteProject(project.id);
                        showToast('Project deleted');
                      }
                    }}
                    className="p-2 rounded-xl bg-rose-50 dark:bg-rose-500/10 hover:bg-rose-500 text-rose-600 hover:text-white dark:text-rose-400 border border-rose-200 dark:border-rose-500/30 transition-colors cursor-pointer"
                    title="Delete Project"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ADD PROJECT MODAL - Rendered via Portal to cover 100% full screen */}
          {showAddProject && createPortal(
            <div className="fixed inset-0 bg-slate-900/65 dark:bg-black/85 backdrop-blur-md z-9999 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
              <div className="bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-7 space-y-4 border-2 border-cyan-500/40 dark:border-cyan-500/30 shadow-[0_25px_80px_rgba(0,0,0,0.6)] dark:shadow-[0_25px_80px_rgba(0,0,0,0.95)] relative z-10000">
                <div className="flex justify-between items-center border-b border-slate-200 dark:border-white/10 pb-3">
                  <h3 className="fluid-h3 font-semibold text-black dark:text-white flex items-center gap-2">
                    <Plus size={18} className="text-cyan-500" />
                    <span>Add New Production Project</span>
                  </h3>
                  <button onClick={() => setShowAddProject(false)} className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 text-black dark:text-slate-400">
                    <X size={18} />
                  </button>
                </div>

                <form onSubmit={handleAddProject} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-black dark:text-slate-300">Project Title *</label>
                      <input
                        type="text"
                        placeholder="e.g. Real-time Video Calling Platform"
                        value={newProject.title}
                        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-black dark:text-white text-xs sm:text-sm font-medium focus:outline-none focus:border-cyan-500"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-black dark:text-slate-300">Category</label>
                      <select
                        value={newProject.category}
                        onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-black dark:text-white text-xs sm:text-sm font-medium focus:outline-none focus:border-cyan-500"
                      >
                        <option value="Full Stack" className="bg-white dark:bg-slate-900 text-black dark:text-white">Full Stack</option>
                        <option value="Frontend" className="bg-white dark:bg-slate-900 text-black dark:text-white">Frontend</option>
                        <option value="Backend" className="bg-white dark:bg-slate-900 text-black dark:text-white">Backend</option>
                        <option value="AI / ML" className="bg-white dark:bg-slate-900 text-black dark:text-white">AI / ML</option>
                        <option value="Mobile App" className="bg-white dark:bg-slate-900 text-black dark:text-white">Mobile App</option>
                        <option value="DevOps" className="bg-white dark:bg-slate-900 text-black dark:text-white">DevOps</option>
                      </select>
                    </div>
                  </div>

                  {/* Image Upload Area */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-black dark:text-slate-300">Direct Project Image Upload</label>
                    <div 
                      onClick={() => addProjectFileInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-300 dark:border-white/20 hover:border-cyan-500 dark:hover:border-cyan-400 rounded-2xl p-4 text-center cursor-pointer transition-colors bg-slate-50/50 dark:bg-white/5"
                    >
                      <input 
                        type="file" 
                        ref={addProjectFileInputRef} 
                        onChange={(e) => handleImageUpload(e, false)} 
                        accept="image/*" 
                        className="hidden" 
                      />
                      {newProject.image ? (
                        <div className="relative group">
                          <img src={newProject.image} alt="Preview" className="h-36 w-full object-cover rounded-xl border border-slate-200 dark:border-white/10" />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center text-white text-xs font-bold gap-2">
                            <Upload size={16} />
                            <span>Click to replace image</span>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-1.5 py-3">
                          <ImageIcon className="mx-auto text-slate-400 dark:text-slate-500" size={28} />
                          <p className="text-xs font-bold text-cyan-600 dark:text-cyan-400">Click to Upload Image directly from your device</p>
                          <p className="text-[10px] text-slate-400">PNG, JPG, WebP supported</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-black dark:text-slate-300">Description *</label>
                    <textarea
                      rows={3}
                      placeholder="Brief overview of problem solved and technical features..."
                      value={newProject.description}
                      onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-black dark:text-white text-xs sm:text-sm font-medium focus:outline-none focus:border-cyan-500 resize-y"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-black dark:text-slate-300">GitHub Repository URL</label>
                      <input
                        type="url"
                        placeholder="https://github.com/..."
                        value={newProject.githubUrl}
                        onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-black dark:text-white text-xs sm:text-sm font-medium focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-black dark:text-slate-300">Live Demo URL</label>
                      <input
                        type="url"
                        placeholder="https://..."
                        value={newProject.demoUrl}
                        onChange={(e) => setNewProject({ ...newProject, demoUrl: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-black dark:text-white text-xs sm:text-sm font-medium focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-black dark:text-slate-300">Technology Tags (comma-separated)</label>
                    <input
                      type="text"
                      placeholder="e.g. React, Node.js, Socket.IO, Redis, Docker"
                      value={newProject.techInput}
                      onChange={(e) => setNewProject({ ...newProject, techInput: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-black dark:text-white text-xs sm:text-sm font-medium focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 dark:border-white/10">
                    <button
                      type="button"
                      onClick={() => setShowAddProject(false)}
                      className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-white/10 text-black dark:text-white font-bold text-xs sm:text-sm cursor-pointer hover:bg-slate-300 dark:hover:bg-white/20"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-cyan-600 text-white font-bold text-xs sm:text-sm cursor-pointer hover:bg-cyan-700"
                    >
                      Create Project
                    </button>
                  </div>
                </form>
              </div>
            </div>,
            document.body
          )}

          {/* EDIT PROJECT MODAL - Rendered via Portal to cover 100% full screen */}
          {editingProject && createPortal(
            <div className="fixed inset-0 bg-slate-900/65 dark:bg-black/85 backdrop-blur-md z-9999 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
              <div className="bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-7 space-y-4 border-2 border-cyan-500/40 dark:border-cyan-500/30 shadow-[0_25px_80px_rgba(0,0,0,0.6)] dark:shadow-[0_25px_80px_rgba(0,0,0,0.95)] relative z-10000">
                <div className="flex justify-between items-center border-b border-slate-200 dark:border-white/10 pb-3">
                  <h3 className="fluid-h3 font-semibold text-black dark:text-white flex items-center gap-2">
                    <Edit2 size={18} className="text-cyan-500" />
                    <span>Edit Project: {editingProject.title}</span>
                  </h3>
                  <button onClick={() => setEditingProject(null)} className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 text-black dark:text-slate-400">
                    <X size={18} />
                  </button>
                </div>

                <form onSubmit={handleSaveEditProject} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-black dark:text-slate-300">Project Title *</label>
                      <input
                        type="text"
                        value={editingProject.title}
                        onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-black dark:text-white text-xs sm:text-sm font-medium focus:outline-none focus:border-cyan-500"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-black dark:text-slate-300">Category</label>
                      <select
                        value={editingProject.category}
                        onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-black dark:text-white text-xs sm:text-sm font-medium focus:outline-none focus:border-cyan-500"
                      >
                        <option value="Full Stack" className="bg-white dark:bg-slate-900 text-black dark:text-white">Full Stack</option>
                        <option value="Frontend" className="bg-white dark:bg-slate-900 text-black dark:text-white">Frontend</option>
                        <option value="Backend" className="bg-white dark:bg-slate-900 text-black dark:text-white">Backend</option>
                        <option value="AI / ML" className="bg-white dark:bg-slate-900 text-black dark:text-white">AI / ML</option>
                        <option value="Mobile App" className="bg-white dark:bg-slate-900 text-black dark:text-white">Mobile App</option>
                        <option value="DevOps" className="bg-white dark:bg-slate-900 text-black dark:text-white">DevOps</option>
                      </select>
                    </div>
                  </div>

                  {/* Image Upload Area */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-black dark:text-slate-300">Direct Project Image Upload</label>
                    <div 
                      onClick={() => editProjectFileInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-300 dark:border-white/20 hover:border-cyan-500 dark:hover:border-cyan-400 rounded-2xl p-4 text-center cursor-pointer transition-colors bg-slate-50/50 dark:bg-white/5"
                    >
                      <input 
                        type="file" 
                        ref={editProjectFileInputRef} 
                        onChange={(e) => handleImageUpload(e, true)} 
                        accept="image/*" 
                        className="hidden" 
                      />
                      {editingProject.image ? (
                        <div className="relative group">
                          <img src={editingProject.image} alt="Preview" className="h-36 w-full object-cover rounded-xl border border-slate-200 dark:border-white/10" />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center text-white text-xs font-bold gap-2">
                            <Upload size={16} />
                            <span>Click to replace image</span>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-1.5 py-3">
                          <ImageIcon className="mx-auto text-slate-400 dark:text-slate-500" size={28} />
                          <p className="text-xs font-bold text-cyan-600 dark:text-cyan-400">Click to Upload Image directly from your device</p>
                          <p className="text-[10px] text-slate-400">PNG, JPG, WebP supported</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-black dark:text-slate-300">Description *</label>
                    <textarea
                      rows={3}
                      value={editingProject.description}
                      onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-black dark:text-white text-xs sm:text-sm font-medium focus:outline-none focus:border-cyan-500 resize-y"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-black dark:text-slate-300">GitHub Repository URL</label>
                      <input
                        type="url"
                        value={editingProject.githubUrl}
                        onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-black dark:text-white text-xs sm:text-sm font-medium focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-black dark:text-slate-300">Live Demo URL</label>
                      <input
                        type="url"
                        value={editingProject.demoUrl}
                        onChange={(e) => setEditingProject({ ...editingProject, demoUrl: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-black dark:text-white text-xs sm:text-sm font-medium focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-black dark:text-slate-300">Technology Tags (comma-separated)</label>
                    <input
                      type="text"
                      value={editingProject.techInput}
                      onChange={(e) => setEditingProject({ ...editingProject, techInput: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-black dark:text-white text-xs sm:text-sm font-medium focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 dark:border-white/10">
                    <button
                      type="button"
                      onClick={() => setEditingProject(null)}
                      className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-white/10 text-black dark:text-white font-bold text-xs sm:text-sm cursor-pointer hover:bg-slate-300 dark:hover:bg-white/20"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-cyan-600 text-white font-bold text-xs sm:text-sm cursor-pointer hover:bg-cyan-700"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>,
            document.body
          )}
        </div>
      )}

      {/* TAB 4: SKILLS MATRIX (Identical Frontend Look + Full Admin CRUD) */}
      {activeTab === 'skills' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* Header */}
          <div className="text-center space-y-1">
            <h2 className="fluid-h2 font-semibold text-black dark:text-white tracking-tight flex items-center justify-center gap-2">
              <Code2 className="text-cyan-600 dark:text-cyan-400" size={20} />
              <span>Technical Skills Matrix</span>
            </h2>
            <p className="fluid-xs text-black dark:text-slate-400 font-medium">
              {Object.keys(skills || {}).length} Specialized Engineering Disciplines
            </p>
          </div>

          {/* Category Tabs Bar */}
          <div className="p-1.5 rounded-2xl bg-slate-100/90 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex gap-1.5 flex-wrap justify-center items-center">
            {Object.keys(skills || {}).map((category) => {
              const isActive = (adminSkillCategory || Object.keys(skills || {})[0] || 'Frontend') === category;
              const count = (skills[category] || []).length;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setAdminSkillCategory(category)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? "bg-white dark:bg-cyan-500/25 text-black dark:text-cyan-300 border border-slate-300 dark:border-cyan-500/40 shadow-xs font-bold"
                      : "text-black dark:text-slate-400 hover:text-cyan-600 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/5"
                  }`}
                >
                  <span>{category}</span>
                  <span className={`text-[10px] px-1.5 rounded-full ${isActive ? "bg-cyan-100 dark:bg-white/20 text-black dark:text-white font-bold" : "bg-slate-200 dark:bg-white/10 text-black dark:text-slate-400 font-medium"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Category Skills Cards Grid (Frontend Look + CRUD Edit & Delete) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {((skills || {})[adminSkillCategory || Object.keys(skills || {})[0] || 'Frontend'] || []).map((skill, idx) => {
              const curCategory = adminSkillCategory || Object.keys(skills || {})[0] || 'Frontend';
              const isBeingEdited = editingSkill && editingSkill.category === curCategory && editingSkill.index === idx;

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
                      <div className="p-2.5 rounded-xl bg-white dark:bg-white/10 border border-slate-200/90 dark:border-white/10 shadow-xs flex items-center justify-center">
                        <TechIcon name={skill.icon || skill.name} size={20} />
                      </div>
                      <div>
                        <h4 className="fluid-h3 font-semibold text-black dark:text-white flex items-center gap-2">
                          <span>{skill.name}</span>
                        </h4>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="fluid-sm font-bold text-cyan-700 dark:text-cyan-300 min-w-9 text-right">
                        {skill.progress}%
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingSkill({
                            category: curCategory,
                            index: idx,
                            name: skill.name
                          });
                          setNewSkill({
                            category: curCategory,
                            name: skill.name,
                            progress: skill.progress,
                            icon: skill.icon || skill.name
                          });
                          setIconSearchQuery(skill.icon || skill.name);
                          setTimeout(() => {
                            skillFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          }, 50);
                        }}
                        className={`p-1 rounded-lg transition-colors cursor-pointer ml-1 ${
                          isBeingEdited
                            ? 'bg-cyan-500 text-white font-bold'
                            : 'bg-slate-100 dark:bg-white/10 text-black dark:text-slate-200 hover:bg-cyan-600 hover:text-white'
                        }`}
                        title="Edit Skill"
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Delete skill "${skill.name}" from ${curCategory}?`)) {
                            deleteSkill(curCategory, idx);
                            if (isBeingEdited) setEditingSkill(null);
                            showToast(`Deleted ${skill.name}`);
                          }
                        }}
                        className="p-1 rounded-lg bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-600 hover:text-white transition-colors cursor-pointer"
                        title="Delete Skill"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden p-0.5 border border-slate-200/60 dark:border-transparent">
                    <div
                      className="h-full rounded-full bg-linear-to-r from-cyan-600 via-indigo-600 to-fuchsia-600 transition-all duration-700 ease-out"
                      style={{ width: `${skill.progress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Unified Skill Form (Add & Edit) */}
          <form
            ref={skillFormRef}
            onSubmit={handleSkillFormSubmit}
            className={`glass-card rounded-2xl p-6 space-y-4 transition-all duration-300 contain-none! overflow-visible relative z-30 ${
              editingSkill
                ? 'border-2 border-cyan-500 shadow-[0_0_25px_rgba(6,182,212,0.25)] bg-cyan-500/5 dark:bg-cyan-500/10'
                : 'border border-slate-200/80 dark:border-white/10'
            }`}
          >
            <div className="flex justify-between items-center">
              <h3 className="fluid-h3 font-semibold text-black dark:text-white flex items-center gap-2">
                {editingSkill ? (
                  <>
                    <Edit2 size={18} className="text-cyan-600 dark:text-cyan-400 animate-pulse" />
                    <span className="text-cyan-600 dark:text-cyan-300 font-bold">Edit Skill: {editingSkill.name}</span>
                  </>
                ) : (
                  <>
                    <Plus size={18} className="text-cyan-600 dark:text-cyan-400" />
                    <span>Add New Skill to Matrix</span>
                  </>
                )}
              </h3>

              {editingSkill && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingSkill(null);
                    setNewSkill({
                      category: adminSkillCategory || Object.keys(skills || {})[0] || 'Frontend',
                      name: '',
                      progress: 85,
                      icon: ''
                    });
                    setIconSearchQuery('');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-white/10 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                >
                  <X size={14} />
                  <span>Cancel Edit</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 overflow-visible relative">
              <div className="space-y-1">
                <label className="text-xs font-bold text-black dark:text-slate-300">Category</label>
                <select
                  value={newSkill.category}
                  onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-black dark:text-white text-xs font-medium focus:outline-none focus:border-cyan-500"
                >
                  {Object.keys(skills || {}).map((cat) => (
                    <option key={cat} value={cat} className="bg-white dark:bg-slate-900 text-black dark:text-white">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-bold text-black dark:text-slate-300">Skill Name</label>
                <input
                  type="text"
                  placeholder="e.g. Next.js 15, RabbitMQ, Docker"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-black dark:text-white text-xs font-medium focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              {/* Technology Icon Picker Field (In-Place Search Dropdown) */}
              <div className="space-y-1 relative">
                <label className="text-xs font-bold text-black dark:text-slate-300 flex items-center justify-between">
                  <span>Technology Icon</span>
                </label>
                
                <div className="relative">
                  <div className="flex items-center gap-2 w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-xs focus-within:border-cyan-500">
                    <div className="shrink-0 p-1 rounded-lg bg-slate-200 dark:bg-white/10 flex items-center justify-center">
                      <TechIcon name={newSkill.icon || iconSearchQuery || newSkill.name} size={16} />
                    </div>
                    <input
                      type="text"
                      placeholder="Search icon (e.g. React, Rate Limiting, API)..."
                      value={iconSearchQuery}
                      onFocus={() => setShowIconDropdown(true)}
                      onChange={(e) => {
                        const val = e.target.value;
                        setIconSearchQuery(val);
                        setShowIconDropdown(true);

                        const match = TECH_ICON_REGISTRY.find(item => 
                          item.label.toLowerCase().includes(val.toLowerCase()) || 
                          item.key.includes(val.toLowerCase().replace(/[^a-z0-9]/g, ''))
                        );
                        if (match) {
                          setNewSkill(prev => ({ ...prev, icon: match.key }));
                        } else {
                          setNewSkill(prev => ({ ...prev, icon: val }));
                        }
                      }}
                      className="w-full bg-transparent text-black dark:text-white text-xs font-medium focus:outline-none"
                    />
                  </div>

                  {/* Inline Search Dropdown List - Positioned right at the input, unclipped */}
                  {showIconDropdown && (
                    <>
                      <div 
                        className="fixed inset-0 z-99" 
                        onClick={() => setShowIconDropdown(false)} 
                      />
                      <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 shadow-[0_20px_60px_rgba(0,0,0,0.85)] z-100 overflow-hidden flex flex-col">
                        <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/90 shrink-0">
                          <span>Select Icon ({TECH_ICON_REGISTRY.filter(item => item.label.toLowerCase().includes(iconSearchQuery.toLowerCase()) || item.key.includes(iconSearchQuery.toLowerCase().replace(/[^a-z0-9]/g, ''))).length})</span>
                          <button type="button" onClick={() => setShowIconDropdown(false)} className="text-slate-400 hover:text-white p-0.5 cursor-pointer">
                            <X size={12} />
                          </button>
                        </div>

                        <div className="max-h-64 overflow-y-auto p-1.5 space-y-1">
                          {TECH_ICON_REGISTRY.filter(item => 
                            item.label.toLowerCase().includes(iconSearchQuery.toLowerCase()) || 
                            item.key.includes(iconSearchQuery.toLowerCase().replace(/[^a-z0-9]/g, ''))
                          ).map((item) => {
                            const IconComp = item.icon;
                            const isSelected = (newSkill.icon || newSkill.name).toLowerCase() === item.key;
                            return (
                              <button
                                key={item.key}
                                type="button"
                                onClick={() => {
                                  setNewSkill({ ...newSkill, icon: item.key });
                                  setIconSearchQuery(item.label);
                                  setShowIconDropdown(false);
                                }}
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-cyan-50 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 font-bold border border-cyan-500/30'
                                    : 'hover:bg-slate-100 dark:hover:bg-white/10 text-black dark:text-slate-200 border border-transparent'
                                }`}
                              >
                                <div className="flex items-center gap-2.5">
                                  <div className="p-1 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center">
                                    <IconComp className={item.color} size={16} />
                                  </div>
                                  <span>{item.label}</span>
                                </div>
                                {isSelected && <Check size={14} className="text-cyan-500 font-bold" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-1 w-full space-y-1">
                <div className="flex justify-between text-xs font-bold text-black dark:text-slate-300">
                  <span>Proficiency Percentage</span>
                  <span className="text-cyan-600 dark:text-cyan-400 font-bold">{newSkill.progress}%</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={newSkill.progress}
                  onChange={(e) => setNewSkill({ ...newSkill, progress: Number(e.target.value) })}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>
              <button type="submit" className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/20 cursor-pointer shrink-0">
                {editingSkill ? <Save size={14} /> : <Plus size={14} />}
                <span>{editingSkill ? "Update Skill" : "Add Skill"}</span>
              </button>
            </div>
          </form>

          {/* Add Skill Category Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!newSkillCategoryInput.trim()) return;
              addSkillCategory(newSkillCategoryInput.trim());
              setNewSkillCategoryInput('');
              showToast(`Added new category "${newSkillCategoryInput.trim()}"!`);
            }}
            className="glass-card rounded-2xl p-5 border border-slate-200/80 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3"
          >
            <div>
              <h4 className="text-xs font-bold text-black dark:text-white">Create New Skill Category</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Add a custom category tab (e.g. Mobile Apps, Cloud)</p>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Category Name..."
                value={newSkillCategoryInput}
                onChange={(e) => setNewSkillCategoryInput(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-xs text-black dark:text-white w-full sm:w-48"
              />
              <button type="submit" className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shrink-0 cursor-pointer">
                Create Tab
              </button>
            </div>
          </form>

          {/* Certifications & Focus Areas Section */}
          <div className="space-y-4 pt-2">
            <div className="flex justify-between items-center">
              <h3 className="fluid-h2 font-semibold text-black dark:text-white tracking-tight flex items-center gap-2">
                <Award size={18} className="text-cyan-600 dark:text-cyan-400" />
                <span>Certifications &amp; Focus Areas</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {(certifications || []).map((cert) => (
                <div
                  key={cert.id}
                  className="glass-card rounded-xl p-4 border border-slate-200/80 dark:border-white/10 space-y-2 relative group"
                >
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="fluid-sm font-semibold text-black dark:text-white leading-snug">{cert.title}</h4>
                    <div className="flex items-center gap-1">
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-cyan-50 dark:bg-cyan-500/10 text-black dark:text-cyan-300 font-bold border border-cyan-200 dark:border-cyan-500/30">
                        {cert.year}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Delete certification "${cert.title}"?`)) {
                            deleteCertification(cert.id);
                            showToast('Certification deleted');
                          }
                        }}
                        className="p-1 rounded bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-600 hover:text-white transition-colors cursor-pointer"
                        title="Delete Certification"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                  <p className="fluid-xs text-black dark:text-slate-400 font-medium">{cert.issuer}</p>
                </div>
              ))}
            </div>

            {/* Add Certification Form */}
            <form onSubmit={handleAddCertification} className="glass-card rounded-2xl p-5 border border-slate-200/80 dark:border-white/10 space-y-3">
              <h4 className="text-xs font-bold text-black dark:text-white flex items-center gap-1.5">
                <Plus size={14} className="text-cyan-600 dark:text-cyan-400" />
                <span>Add New Certification</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Certification Title (e.g. AWS Certified)"
                  value={newCert.title}
                  onChange={(e) => setNewCert({ ...newCert, title: e.target.value })}
                  className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-xs text-black dark:text-white"
                  required
                />
                <input
                  type="text"
                  placeholder="Issuing Organization"
                  value={newCert.issuer}
                  onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })}
                  className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-xs text-black dark:text-white"
                  required
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Year"
                    value={newCert.year}
                    onChange={(e) => setNewCert({ ...newCert, year: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-xs text-black dark:text-white"
                  />
                  <button type="submit" className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs shrink-0 cursor-pointer">
                    Add
                  </button>
                </div>
              </div>
            </form>
          </div>

        </div>
      )}

      {/* TAB 5: ACADEMICS & QUALIFICATIONS (Identical Timeline Frontend Match + Full Admin CRUD) */}
      {activeTab === 'academics' && (
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

          {/* Main Card Container with Vertical Timeline - Identical to Frontend Qualifications.jsx */}
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

                    {/* Institution & Duration */}
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <span className="font-bold text-cyan-700 dark:text-cyan-400">{edu.institution}</span>
                      <span className="text-slate-300 dark:text-slate-600">·</span>
                      <span className="text-slate-500 dark:text-slate-400 font-medium">{edu.duration}</span>
                    </div>

                    {/* Academic Description */}
                    {edu.description && (
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                        {edu.description}
                      </p>
                    )}

                    {/* Admin Action Buttons (Edit & Delete) */}
                    <div className="flex justify-end gap-2 pt-2 border-t border-slate-200/60 dark:border-white/5">
                      <button
                        type="button"
                        onClick={() => setEditingEdu({ ...edu })}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/10 text-black dark:text-slate-200 hover:bg-cyan-600 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Edit2 size={13} />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Delete education entry "${edu.degree}"?`)) {
                            deleteEducation(edu.id);
                            showToast('Education entry deleted');
                          }
                        }}
                        className="p-1.5 rounded-xl bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-600 hover:text-white transition-colors cursor-pointer"
                        title="Delete Education"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ADD EDUCATION FORM / MODAL */}
          {showAddEdu && (
            <form onSubmit={handleAddEducation} className="glass-card rounded-2xl p-6 border border-slate-300 dark:border-white/10 space-y-4">
              <h4 className="text-sm font-bold text-black dark:text-white flex items-center gap-2">
                <Plus size={16} className="text-emerald-500" />
                <span>Add New Education Entry</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Degree Name (e.g. Bachelor of Computer Applications)"
                  value={newEdu.degree}
                  onChange={(e) => setNewEdu({ ...newEdu, degree: e.target.value })}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm text-black dark:text-white focus:outline-none focus:border-emerald-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Institution / University (e.g. Savitribai Phule Pune University)"
                  value={newEdu.institution}
                  onChange={(e) => setNewEdu({ ...newEdu, institution: e.target.value })}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm text-black dark:text-white focus:outline-none focus:border-emerald-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Duration (e.g. 2021 - 2024)"
                  value={newEdu.duration}
                  onChange={(e) => setNewEdu({ ...newEdu, duration: e.target.value })}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm text-black dark:text-white focus:outline-none focus:border-emerald-500"
                />
                <input
                  type="text"
                  placeholder="CGPA / Percentage (e.g. 8.50)"
                  value={newEdu.cgpa}
                  onChange={(e) => setNewEdu({ ...newEdu, cgpa: e.target.value })}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm text-black dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <textarea
                rows={3}
                placeholder="Academic Description & Key Subjects..."
                value={newEdu.description}
                onChange={(e) => setNewEdu({ ...newEdu, description: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm text-black dark:text-white focus:outline-none focus:border-emerald-500"
              />
              <div className="flex justify-end gap-2.5 pt-2">
                <button type="button" onClick={() => setShowAddEdu(false)} className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-white/10 text-xs font-bold text-black dark:text-slate-200">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20">Save Education</button>
              </div>
            </form>
          )}

          {/* EDIT EDUCATION FORM / MODAL */}
          {editingEdu && (
            <form onSubmit={handleSaveEditEdu} className="glass-card rounded-2xl p-6 border border-slate-300 dark:border-white/10 space-y-4">
              <h4 className="text-sm font-bold text-black dark:text-white flex items-center gap-2">
                <Edit2 size={16} className="text-cyan-500" />
                <span>Edit Education Entry</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={editingEdu.degree}
                  onChange={(e) => setEditingEdu({ ...editingEdu, degree: e.target.value })}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm text-black dark:text-white"
                  required
                />
                <input
                  type="text"
                  value={editingEdu.institution}
                  onChange={(e) => setEditingEdu({ ...editingEdu, institution: e.target.value })}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm text-black dark:text-white"
                  required
                />
                <input
                  type="text"
                  value={editingEdu.duration}
                  onChange={(e) => setEditingEdu({ ...editingEdu, duration: e.target.value })}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm text-black dark:text-white"
                />
                <input
                  type="text"
                  value={editingEdu.cgpa}
                  onChange={(e) => setEditingEdu({ ...editingEdu, cgpa: e.target.value })}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm text-black dark:text-white"
                />
              </div>
              <textarea
                rows={3}
                value={editingEdu.description}
                onChange={(e) => setEditingEdu({ ...editingEdu, description: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm text-black dark:text-white"
              />
              <div className="flex justify-end gap-2.5 pt-2">
                <button type="button" onClick={() => setEditingEdu(null)} className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-white/10 text-xs font-bold text-black dark:text-slate-200">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold shadow-md shadow-cyan-600/20">Update Entry</button>
              </div>
            </form>
          )}

        </div>
      )}

      {/* TAB 4: CAPABILITIES & STATS */}
      {activeTab === 'capabilities' && (
        <div className="space-y-6">

          {/* Metric Stats (Centered & Fully Editable) */}
          <div className="glass-card rounded-2xl p-6 space-y-4 border border-slate-200/80 dark:border-white/10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h3 className="fluid-h3 font-semibold text-black dark:text-white flex items-center gap-2">
                  <Zap size={18} className="text-cyan-600 dark:text-cyan-400" />
                  <span>Hero Stat Metric Counters ({stats.length})</span>
                </h3>
                <p className="fluid-xs text-black dark:text-slate-400 font-medium">Click Edit to change metric numbers & labels</p>
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
                  showToast('New stat metric added!');
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
                    className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-black dark:text-white font-medium"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setShowAddStat(false)} className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-white/10 text-xs font-bold">Cancel</button>
                  <button type="submit" className="px-4 py-1.5 rounded-xl bg-cyan-600 text-white text-xs font-bold">Save Stat</button>
                </div>
              </form>
            )}

            {/* Edit Stat Modal */}
            {editingStat && createPortal(
              <div className="fixed inset-0 bg-slate-900/65 dark:bg-black/85 backdrop-blur-md z-9999 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
                <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl p-6 space-y-4 border-2 border-cyan-500/40 dark:border-cyan-500/30 shadow-[0_25px_80px_rgba(0,0,0,0.6)] dark:shadow-[0_25px_80px_rgba(0,0,0,0.95)] relative z-10000">
                  <div className="flex justify-between items-center border-b border-slate-200 dark:border-white/10 pb-3">
                    <h4 className="text-sm font-bold text-black dark:text-white flex items-center gap-2">
                      <Edit2 size={16} className="text-cyan-500" />
                      <span>Edit Stat Metric</span>
                    </h4>
                    <button onClick={() => setEditingStat(null)} className="text-slate-400 hover:text-slate-600 p-1">
                      <X size={16} />
                    </button>
                  </div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!editingStat.value.trim() || !editingStat.label.trim()) return;
                      updateStat(editingStat.id, editingStat);
                      setEditingStat(null);
                      showToast('Stat updated successfully!');
                    }}
                    className="space-y-3"
                  >
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-black dark:text-slate-300">Metric Value (e.g. 2+, 7+, 8.34, 100%)</label>
                      <input
                        type="text"
                        value={editingStat.value}
                        onChange={(e) => setEditingStat({ ...editingStat, value: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-black dark:text-white font-bold"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-black dark:text-slate-300">Metric Label (e.g. Years Coding, Built Projects)</label>
                      <input
                        type="text"
                        value={editingStat.label}
                        onChange={(e) => setEditingStat({ ...editingStat, label: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-black dark:text-white font-medium"
                        required
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 dark:border-white/10">
                      <button type="button" onClick={() => setEditingStat(null)} className="px-3.5 py-1.5 rounded-xl bg-slate-200 dark:bg-white/10 text-xs font-bold">Cancel</button>
                      <button type="submit" className="px-4 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold">Save Changes</button>
                    </div>
                  </form>
                </div>
              </div>,
              document.body
            )}

            {/* Stat Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((st) => (
                <div key={st.id} className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex justify-between items-center hover:border-cyan-500/40 transition-all duration-200 group">
                  <div>
                    <h4 className={`text-lg font-bold ${st.color || 'text-cyan-500 dark:text-cyan-400'}`}>{st.value}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{st.label}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setEditingStat(st)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-200 dark:hover:bg-white/10 cursor-pointer transition-colors"
                      title="Edit Stat Counter"
                    >
                      <Edit2 size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        deleteStat(st.id);
                        showToast(`Deleted "${st.label}"`);
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 cursor-pointer transition-colors"
                      title="Delete Stat Counter"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: WORK EXPERIENCE */}
      {activeTab === 'experience' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="fluid-h3 font-semibold text-black dark:text-white flex items-center gap-2">
              <Award size={18} className="text-purple-600 dark:text-purple-400" />
              <span>Organizations & Timeline ({experiences.length})</span>
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
                      showToast('Organization deleted');
                    }
                  }}
                  className="p-2 rounded-xl bg-rose-50 dark:bg-rose-500/10 text-rose-600 hover:bg-rose-600 hover:text-white cursor-pointer"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              {/* Roles */}
              <div className="space-y-3">
                <h5 className="text-xs font-bold text-black dark:text-slate-300 uppercase tracking-wider">Roles in Company ({exp.roles.length})</h5>
                {exp.roles.map((role, rIdx) => (
                  <div key={rIdx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-1.5">
                    <div className="flex justify-between items-center">
                      <h5 className="text-xs sm:text-sm font-bold text-black dark:text-white">{role.title} ({role.type})</h5>
                      <button
                        onClick={() => deleteRoleFromExperience(exp.id, rIdx)}
                        className="text-slate-400 hover:text-rose-500 cursor-pointer"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                    <p className="text-[11px] text-cyan-600 dark:text-cyan-400 font-semibold">{role.duration}</p>
                    <p className="text-xs text-black dark:text-slate-300">{role.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 6: MESSAGE CENTER */}
      {activeTab === 'messages' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="fluid-h3 font-semibold text-black dark:text-white flex items-center gap-2">
              <MessageSquare size={18} className="text-cyan-600 dark:text-cyan-400" />
              <span>Inbound Contact Inquiries ({(messages || []).length})</span>
            </h3>
          </div>

          {(messages || []).length === 0 ? (
            <div className="glass-card rounded-2xl p-8 text-center text-slate-400 text-xs font-medium border border-slate-200 dark:border-white/10">
              No inquiries yet. When visitors submit the contact form, messages will appear here.
            </div>
          ) : (
            <div className="space-y-3">
              {(messages || []).map((msg) => (
                <div key={msg.id} className={`glass-card rounded-2xl p-5 border space-y-3 transition-all ${
                  msg.unread ? 'border-cyan-500/50 bg-cyan-500/5' : 'border-slate-200/80 dark:border-white/10'
                }`}>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div className="flex items-center gap-2">
                      <h4 className="fluid-sm font-bold text-black dark:text-white">
                        {msg.firstName} {msg.lastName || ''}
                      </h4>
                      {msg.unread && (
                        <span className="px-2 py-0.5 rounded-full bg-cyan-500 text-white text-[10px] font-bold">
                          NEW
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400">{msg.time}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-black dark:text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <Mail size={13} className="text-cyan-500" />
                      <span>{msg.email}</span>
                    </div>
                    {msg.mobileNumber && (
                      <div className="flex items-center gap-1.5">
                        <Phone size={13} className="text-emerald-500" />
                        <span>{msg.mobileNumber}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-black dark:text-slate-200 p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 font-normal">
                    {msg.description}
                  </p>

                  <div className="flex justify-end gap-2 pt-1">
                    <a
                      href={`mailto:${msg.email}?subject=Re: Portfolio Inquiry`}
                      className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Send size={12} />
                      <span>Reply via Email</span>
                    </a>
                    {msg.unread && (
                      <button
                        onClick={() => markMessageRead(msg.id)}
                        className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-white/10 text-black dark:text-slate-300 text-xs font-bold cursor-pointer"
                      >
                        Mark Read
                      </button>
                    )}
                    <button
                      onClick={() => deleteMessage(msg.id)}
                      className="p-1.5 rounded-xl bg-rose-50 dark:bg-rose-500/10 text-rose-600 hover:bg-rose-600 hover:text-white cursor-pointer"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 7: BACKUP & FACTORY RESET */}
      {activeTab === 'backup' && (
        <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6 border border-slate-200/80 dark:border-white/10">
          <h3 className="fluid-h3 font-semibold text-black dark:text-white flex items-center gap-2">
            <RotateCcw size={18} className="text-indigo-600 dark:text-indigo-400" />
            <span>Portfolio Data Backup & Reset Controls</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-3">
              <h4 className="text-sm font-bold text-black dark:text-white">Export Full JSON Backup</h4>
              <p className="text-xs text-black dark:text-slate-300 font-normal">Download a snapshot of your complete portfolio configuration.</p>
              <button
                onClick={() => {
                  const stateString = localStorage.getItem("portfolio_master_data_v3");
                  const blob = new Blob([stateString || '{}'], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `datta-portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
                  a.click();
                  showToast('Backup downloaded successfully!');
                }}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer"
              >
                <Download size={14} />
                <span>Download JSON Backup</span>
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-rose-50/60 dark:bg-rose-500/5 border border-rose-200 dark:border-rose-500/20 space-y-3">
              <h4 className="text-sm font-bold text-rose-800 dark:text-rose-300">Reset Factory Defaults</h4>
              <p className="text-xs text-rose-700 dark:text-rose-400 font-normal">Revert all profile, projects, skills, and configuration to default template.</p>
              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to reset everything back to factory defaults?")) {
                    resetToDefaults();
                    showToast('Portfolio reset to defaults!');
                  }
                }}
                className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw size={14} />
                <span>Reset to Factory Defaults</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
