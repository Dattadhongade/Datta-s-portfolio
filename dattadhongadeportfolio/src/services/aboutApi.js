import api from './api';

export const aboutApi = {
  // Fetch profile and about information
  getAboutData: async () => {
    return api.get('/about');
  },

  // Update profile identity and bio
  updateProfile: async (profileData) => {
    return api.put('/about/profile', profileData);
  },

  // Update tech stack pills
  updateTechPills: async (techPills) => {
    return api.put('/about/tech-pills', { techPills });
  },

  // Update stat counters
  updateStats: async (stats) => {
    return api.put('/about/stats', { stats });
  }
};

export default aboutApi;
