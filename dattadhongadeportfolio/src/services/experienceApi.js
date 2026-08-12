import api from './api';

export const experienceApi = {
  // Get all experiences
  getExperiences: async () => {
    return api.get('/experience');
  },

  // Add organization
  addExperience: async (expData) => {
    return api.post('/experience', expData);
  },

  // Delete organization
  deleteExperience: async (id) => {
    return api.delete(`/experience/${id}`);
  }
};

export default experienceApi;
