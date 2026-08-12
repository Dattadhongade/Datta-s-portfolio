import api from './api';

export const skillsApi = {
  // Fetch skills and educations
  getSkillsData: async () => {
    return api.get('/skills');
  },

  // Add skill to category
  addSkill: async (category, skill) => {
    return api.post('/skills/skill', { category, skill });
  },

  // Update skill by index
  updateSkill: async (category, index, updatedSkill) => {
    return api.put(`/skills/skill/${encodeURIComponent(category)}/${index}`, updatedSkill);
  },

  // Delete skill
  deleteSkill: async (category, index) => {
    return api.delete(`/skills/skill/${encodeURIComponent(category)}/${index}`);
  },

  // Add a new empty category
  addSkillCategory: async (category) => {
    return api.post('/skills/category', { category });
  },

  // Bulk save entire skills object
  saveAllSkills: async (skills) => {
    return api.put('/skills/all', { skills });
  },

  // Educations CRUD
  addEducation: async (eduData) => {
    return api.post('/skills/educations', eduData);
  },

  updateEducation: async (id, eduData) => {
    return api.put(`/skills/educations/${id}`, eduData);
  },

  deleteEducation: async (id) => {
    return api.delete(`/skills/educations/${id}`);
  }
};

export default skillsApi;
