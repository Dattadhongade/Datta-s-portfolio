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

  // Delete skill
  deleteSkill: async (category, index) => {
    return api.delete(`/skills/skill/${category}/${index}`);
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
