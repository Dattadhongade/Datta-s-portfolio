import api from './api';

export const projectsApi = {
  // Fetch all projects & categories
  getProjects: async () => {
    return api.get('/projects');
  },

  // Create new project
  createProject: async (projectData) => {
    return api.post('/projects', projectData);
  },

  // Update existing project
  updateProject: async (id, projectData) => {
    return api.put(`/projects/${id}`, projectData);
  },

  // Delete project
  deleteProject: async (id) => {
    return api.delete(`/projects/${id}`);
  },

  // Upload project image directly
  uploadImage: async (file) => {
    return api.uploadFile('/projects/upload', file);
  }
};

export default projectsApi;
