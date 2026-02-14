import axios from 'axios';

const API = axios.create({
  baseURL: 'https://saarthiai-3fam.onrender.com',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get scheme recommendations
export const getRecommendations = async (userData) => {
  try {
    const response = await API.post('/api/recommend', userData);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Chat with AI bot
export const sendChatMessage = async (message, language, context) => {
  try {
    const response = await API.post('/api/chat', {
      message,
      language,
      context,
    });
    return response.data;
  } catch (error) {
    console.error('Chat Error:', error);
    throw error;
  }
};

// Get all schemes
export const getAllSchemes = async (filters = {}) => {
  try {
    const response = await API.get('/api/schemes', { params: filters });
    return response.data;
  } catch (error) {
    console.error('Schemes Error:', error);
    throw error;
  }
};

// Get supported languages
export const getLanguages = async () => {
  try {
    const response = await API.get('/api/languages');
    return response.data;
  } catch (error) {
    console.error('Languages Error:', error);
    throw error;
  }
};

// Get states
export const getStates = async () => {
  try {
    const response = await API.get('/api/states');
    return response.data;
  } catch (error) {
    console.error('States Error:', error);
    throw error;
  }
};

// Health check
export const healthCheck = async () => {
  try {
    const response = await API.get('/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default API;