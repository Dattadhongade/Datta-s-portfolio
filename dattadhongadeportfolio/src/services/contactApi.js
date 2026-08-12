import api from './api';

export const contactApi = {
  // Send contact inquiry
  sendContactMessage: async (contactData) => {
    return api.post('/contact', contactData);
  },

  // Get messages
  getMessages: async () => {
    return api.get('/messages');
  },

  // Mark message as read
  markAsRead: async (id) => {
    return api.patch(`/messages/${id}/read`, {});
  },

  // Delete message
  deleteMessage: async (id) => {
    return api.delete(`/messages/${id}`);
  }
};

export default contactApi;
