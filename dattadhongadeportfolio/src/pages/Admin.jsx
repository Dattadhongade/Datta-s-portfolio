import React, { useState, useRef, useEffect } from 'react';
import { 
  User, 
  Briefcase, 
  Code2, 
  MessageSquare, 
  Plus, 
  Trash2, 
  Award,
  Zap,
  Send,
  RotateCcw,
  GraduationCap,
  Server,
  BrainCircuit,
  TerminalSquare,
  ShieldCheck,
  Database,
  TestTube2,
  Wrench
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import AdminLogin from '../components/AdminLogin';

import AdminToast from './admin/AdminToast';
import AdminProfileTab from './admin/AdminProfileTab';
import AdminSocialTab from './admin/AdminSocialTab';
import AdminProjectsTab from './admin/AdminProjectsTab';
import AdminSkillsTab from './admin/AdminSkillsTab';
import AdminAcademicsTab from './admin/AdminAcademicsTab';
import AdminCapabilitiesTab from './admin/AdminCapabilitiesTab';
import AdminExperienceTab from './admin/AdminExperienceTab';
import AdminMessagesTab from './admin/AdminMessagesTab';

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
    updateCapability,
    deleteCapability,
    lifestyle,
    addLifestyle,
    updateLifestyle,
    deleteLifestyle,
    projects,
    projectCategories,
    addProject,
    updateProject,
    deleteProject,
    reorderProjects,
    moveProject,
    reorderCapabilities,
    moveCapability,
    reorderLifestyle,
    moveLifestyle,
    reorderEducations,
    moveEducation,
    reorderExperiences,
    moveExperience,
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
    updateExperience,
    deleteExperience,
    messages,
    markMessageRead,
    updateMessageRemark,
    deleteMessage,
    resetToDefaults,
    uploadImage,
    isAdminAuthenticated,
    adminUser,
    isCheckingAuth,
    loginAdmin,
    logoutAdmin
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState('profile');
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleLogout = () => {
    logoutAdmin();
    showToast('Logged out of Admin Control Panel successfully.');
  };

  // Local Form States
  // 1. Profile
  const [profileForm, setProfileForm] = useState({ ...profile });

  // Sync profileForm whenever backend profile data loads/changes
  useEffect(() => {
    if (profile && Object.keys(profile).length > 0) {
      setProfileForm((prev) => ({
        ...prev,
        ...profile,
        socialLinks: profile.socialLinks || prev.socialLinks || []
      }));
    }
  }, [profile]);

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
  const [categoryEditInput, setCategoryEditInput] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);

  // 3. Education Add & Edit
  const educationList = educations && educations.length > 0 ? educations : (education ? [education] : []);
  const [showAddEdu, setShowAddEdu] = useState(false);
  const [editingEdu, setEditingEdu] = useState(null);
  const [newEdu, setNewEdu] = useState({
    degree: '',
    college: '',
    institution: '',
    duration: '',
    location: '',
    cgpa: '',
    description: '',
    highlights: ''
  });

  // 4. Skills
  const [adminSkillCategory, setAdminSkillCategory] = useState('');
  const [editingSkill, setEditingSkill] = useState(null);
  const [editSkillForm, setEditSkillForm] = useState({ name: '', level: '90%', description: '', iconName: 'Code2' });
  const [newSkill, setNewSkill] = useState({
    category: Object.keys(skills || {})[0] || 'Frontend',
    name: '',
    progress: 85,
    icon: ''
  });
  const [newCategoryName, setNewCategoryName] = useState('');

  // 5. Certifications
  const [newCert, setNewCert] = useState({ title: '', issuer: '', year: new Date().getFullYear().toString() });
  const [showAddCert, setShowAddCert] = useState(false);

  // 6. Capabilities & Stats
  const [showAddStat, setShowAddStat] = useState(false);
  const [editingStat, setEditingStat] = useState(null);
  const [newStatForm, setNewStatForm] = useState({ value: '', label: '', color: 'text-cyan-500 dark:text-cyan-400', border: 'border-cyan-500/20' });

  // 7. Experience
  const [showAddExp, setShowAddExp] = useState(false);
  const [newExp, setNewExp] = useState({
    company: '',
    location: '',
    duration: '',
    badge: 'Full-time',
    roles: [{ title: '', type: 'Full-time', responsibilities: '' }]
  });

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
    if (!newEdu.degree?.trim() || !(newEdu.college || newEdu.institution)?.trim()) {
      showToast('Degree and College / Institution are required', 'error');
      return;
    }
    const collegeName = (newEdu.college || newEdu.institution || '').trim();
    const highlightsArray = typeof newEdu.highlights === 'string'
      ? newEdu.highlights.split('\n').map((h) => h.trim()).filter(Boolean)
      : (Array.isArray(newEdu.highlights) ? newEdu.highlights : []);

    addEducation({
      ...newEdu,
      degree: newEdu.degree.trim(),
      college: collegeName,
      institution: collegeName,
      location: newEdu.location || 'Nashik, India',
      duration: newEdu.duration || '2022 - 2024',
      cgpa: newEdu.cgpa || '',
      description: newEdu.description || '',
      highlights: highlightsArray
    });

    setNewEdu({ degree: '', college: '', institution: '', duration: '', location: '', cgpa: '', description: '', highlights: '' });
    setShowAddEdu(false);
    showToast('New education entry added!');
  };

  const handleSaveEditEdu = (e) => {
    e.preventDefault();
    if (!editingEdu || !editingEdu.degree?.trim()) return;
    const collegeName = (editingEdu.college || editingEdu.institution || '').trim();
    const highlightsArray = typeof editingEdu.highlights === 'string'
      ? editingEdu.highlights.split('\n').map((h) => h.trim()).filter(Boolean)
      : (Array.isArray(editingEdu.highlights) ? editingEdu.highlights : []);

    updateEducation(editingEdu.id, {
      ...editingEdu,
      degree: editingEdu.degree.trim(),
      college: collegeName,
      institution: collegeName,
      location: editingEdu.location || 'Nashik, India',
      duration: editingEdu.duration || '',
      cgpa: editingEdu.cgpa || '',
      description: editingEdu.description || '',
      highlights: highlightsArray
    });

    setEditingEdu(null);
    showToast('Education updated successfully!');
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

  const handleAddExp = (e) => {
    e.preventDefault();
    if (!newExp.company.trim()) {
      showToast('Company name is required', 'error');
      return;
    }
    const primaryRole = newExp.roles && newExp.roles[0]
      ? newExp.roles[0]
      : { title: 'Software Engineer', type: 'Full-time', responsibilities: '' };

    const responsibilitiesArray = typeof primaryRole.responsibilities === 'string'
      ? primaryRole.responsibilities.split('\n').map((r) => r.trim()).filter(Boolean)
      : (Array.isArray(primaryRole.responsibilities) ? primaryRole.responsibilities : []);

    addExperience({
      company: newExp.company.trim(),
      location: newExp.location || 'Nashik, India',
      duration: newExp.duration || 'Jul 2024 - Present',
      roles: [{
        title: primaryRole.title || 'Software Engineer',
        type: primaryRole.type || 'Full-time',
        period: newExp.duration || 'Jul 2024 - Present',
        responsibilities: responsibilitiesArray
      }]
    });

    setNewExp({
      company: '',
      location: '',
      duration: '',
      badge: 'Full-time',
      roles: [{ title: '', type: 'Full-time', responsibilities: '' }]
    });
    setShowAddExp(false);
    showToast('Work Experience added successfully!');
  };

  // Handler aliases for sub-components
  const handleUpdateProject = handleSaveEditProject;
  const handleAddEdu = handleAddEducation;
  const handleUpdateEdu = handleSaveEditEdu;

  const tabs = [
    { id: 'profile', label: 'Profile & Bio', icon: <User size={15} /> },
    { id: 'social', label: 'Social Links', icon: <Send size={15} /> },
    { id: 'projects', label: 'Projects & SaaS', icon: <Briefcase size={15} /> },
    { id: 'skills', label: 'Skills Matrix', icon: <Code2 size={15} /> },
    { id: 'academics', label: 'Academics & Qualifications', icon: <GraduationCap size={15} /> },
    { id: 'capabilities', label: 'Capabilities & Stats', icon: <Zap size={15} /> },
    { id: 'experience', label: 'Work Experience', icon: <Award size={15} /> },
    { id: 'messages', label: `Messages (${(messages || []).filter((m) => m.unread).length})`, icon: <MessageSquare size={15} /> }
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

  if (!isAdminAuthenticated) {
    return (
      <AdminLogin
        onLoginSuccess={(user, token) => {
          loginAdmin(token || localStorage.getItem('admin_token'), user);
          showToast(`Welcome back, ${user?.username || 'Admin'}!`);
        }}
      />
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300 pb-12">
      
      {/* Center Floating Toast Notification */}
      <AdminToast toast={toast} setToast={setToast} />

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
        <AdminProfileTab
          profileForm={profileForm}
          setProfileForm={setProfileForm}
          handleSaveProfile={handleSaveProfile}
          updateProfile={updateProfile}
          uploadImage={uploadImage}
          setUploadingImage={setUploadingImage}
          showToast={showToast}
        />
      )}

      {/* TAB: SOCIAL LINKS */}
      {activeTab === 'social' && (
        <AdminSocialTab
          profileForm={profileForm}
          setProfileForm={setProfileForm}
          updateProfile={updateProfile}
          showToast={showToast}
        />
      )}

      {/* TAB 2: PROJECTS & SAAS */}
      {activeTab === 'projects' && (
        <AdminProjectsTab
          projects={projects}
          projectCategories={projectCategories}
          showAddProject={showAddProject}
          setShowAddProject={setShowAddProject}
          editingProject={editingProject}
          setEditingProject={setEditingProject}
          newProject={newProject}
          setNewProject={setNewProject}
          editingCategory={editingCategory}
          setEditingCategory={setEditingCategory}
          categoryEditInput={categoryEditInput}
          setCategoryEditInput={setCategoryEditInput}
          newCategoryInput={newCategoryInput}
          setNewCategoryInput={setNewCategoryInput}
          uploadingImage={uploadingImage}
          setUploadingImage={setUploadingImage}
          handleImageUpload={handleImageUpload}
          handleAddProject={handleAddProject}
          handleUpdateProject={handleUpdateProject}
          deleteProject={deleteProject}
          moveProject={moveProject}
          reorderProjects={reorderProjects}
          addProjectCategory={addProjectCategory}
          updateProjectCategory={updateProjectCategory}
          deleteProjectCategory={deleteProjectCategory}
          uploadImage={uploadImage}
          showToast={showToast}
        />
      )}

      {/* TAB 3: SKILLS MATRIX */}
      {activeTab === 'skills' && (
        <AdminSkillsTab
          skills={skills}
          adminSkillCategory={adminSkillCategory}
          setAdminSkillCategory={setAdminSkillCategory}
          editingSkill={editingSkill}
          setEditingSkill={setEditingSkill}
          editSkillForm={editSkillForm}
          setEditSkillForm={setEditSkillForm}
          newSkill={newSkill}
          setNewSkill={setNewSkill}
          newCategoryName={newCategoryName}
          setNewCategoryName={setNewCategoryName}
          certifications={certifications}
          newCert={newCert}
          setNewCert={setNewCert}
          showAddCert={showAddCert}
          setShowAddCert={setShowAddCert}
          updateSkill={updateSkill}
          deleteSkill={deleteSkill}
          addSkill={addSkill}
          addSkillCategory={addSkillCategory}
          addCertification={addCertification}
          deleteCertification={deleteCertification}
          showToast={showToast}
        />
      )}

      {/* TAB 4: ACADEMICS */}
      {activeTab === 'academics' && (
        <AdminAcademicsTab
          educationList={educationList}
          showAddEdu={showAddEdu}
          setShowAddEdu={setShowAddEdu}
          editingEdu={editingEdu}
          setEditingEdu={setEditingEdu}
          newEdu={newEdu}
          setNewEdu={setNewEdu}
          handleAddEdu={handleAddEducation}
          handleUpdateEdu={handleSaveEditEdu}
          deleteEducation={deleteEducation}
          moveEducation={moveEducation}
          reorderEducations={reorderEducations}
          showToast={showToast}
        />
      )}

      {/* TAB 5: CAPABILITIES & STATS */}
      {activeTab === 'capabilities' && (
        <AdminCapabilitiesTab
          stats={stats}
          showAddStat={showAddStat}
          setShowAddStat={setShowAddStat}
          editingStat={editingStat}
          setEditingStat={setEditingStat}
          newStatForm={newStatForm}
          setNewStatForm={setNewStatForm}
          addStat={addStat}
          updateStat={updateStat}
          deleteStat={deleteStat}
          capabilities={capabilities}
          addCapability={addCapability}
          updateCapability={updateCapability}
          deleteCapability={deleteCapability}
          moveCapability={moveCapability}
          reorderCapabilities={reorderCapabilities}
          lifestyle={lifestyle}
          addLifestyle={addLifestyle}
          updateLifestyle={updateLifestyle}
          deleteLifestyle={deleteLifestyle}
          moveLifestyle={moveLifestyle}
          reorderLifestyle={reorderLifestyle}
          showToast={showToast}
        />
      )}

      {/* TAB 6: WORK EXPERIENCE */}
      {activeTab === 'experience' && (
        <AdminExperienceTab
          experiences={experiences}
          showAddExp={showAddExp}
          setShowAddExp={setShowAddExp}
          newExp={newExp}
          setNewExp={setNewExp}
          handleAddExp={handleAddExp}
          deleteExperience={deleteExperience}
          updateExperience={updateExperience}
          moveExperience={moveExperience}
          reorderExperiences={reorderExperiences}
          showToast={showToast}
        />
      )}

      {/* TAB 7: MESSAGES */}
      {activeTab === 'messages' && (
        <AdminMessagesTab
          messages={messages}
          markMessageRead={markMessageRead}
          updateMessageRemark={updateMessageRemark}
          deleteMessage={deleteMessage}
          showToast={showToast}
        />
      )}

    </div>
  );
}
