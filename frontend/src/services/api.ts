import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8080/api',
  timeout: 60000, // Increased timeout to 60s for Render free tier cold starts
});

// Mock data for local development
export const mockData = {
  crops: [
    { name: 'Rice', season: 'Kharif', waterRequirement: 'High', duration: '120-150 days', yield: 'High' },
    { name: 'Wheat', season: 'Rabi', waterRequirement: 'Medium', duration: '120-130 days', yield: 'High' },
    { name: 'Cotton', season: 'Kharif', waterRequirement: 'High', duration: '150-180 days', yield: 'Medium' },
    { name: 'Sugarcane', season: 'Year-round', waterRequirement: 'Very High', duration: '12-18 months', yield: 'Very High' },
    { name: 'Maize', season: 'Kharif', waterRequirement: 'Medium', duration: '80-120 days', yield: 'Medium' },
  ],
  
  fertilizers: [
    { crop: 'Rice', nitrogen: '120 kg/ha', phosphorus: '60 kg/ha', potassium: '40 kg/ha', organic: '10 tons/ha' },
    { crop: 'Wheat', nitrogen: '100 kg/ha', phosphorus: '50 kg/ha', potassium: '30 kg/ha', organic: '8 tons/ha' },
    { crop: 'Cotton', nitrogen: '150 kg/ha', phosphorus: '70 kg/ha', potassium: '50 kg/ha', organic: '12 tons/ha' },
  ],
  
  weather: {
    temperature: 28,
    humidity: 65,
    rainfall: 12,
    condition: 'Partly Cloudy',
    forecast: [
      { day: 'Today', temp: 28, condition: 'Partly Cloudy', rainfall: 0 },
      { day: 'Tomorrow', temp: 30, condition: 'Sunny', rainfall: 0 },
      { day: 'Day 3', temp: 27, condition: 'Rainy', rainfall: 25 },
    ],
  },
};

// Add request interceptor to include token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiService = {
  // Auth Services
  auth: {
    login: async (credentials: any) => {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    },
    register: async (userData: any) => {
      const response = await api.post('/auth/register', userData);
      return response.data;
    },
    getProfile: async () => {
      const response = await api.get('/auth/profile');
      return response.data;
    },
    adminLogin: async (credentials: any) => {
      const response = await api.post('/auth/admin-login', credentials);
      return response.data;
    }
  },

  // Crop Recommendations
  getCropRecommendations: async (soilType: string, state: string) => {
    const response = await api.get(`/crops/recommend?soilType=${soilType}&state=${state}`);
    return response.data;
  },

  // Fertilizer Guide
  getFertilizerGuide: async (crop: string) => {
    const response = await api.get(`/fertilizers/guide/${crop}`);
    return response.data;
  },

  // Weather Information
  getWeatherInfo: async (district: string) => {
    const response = await api.get(`/weather/${district}`);
    return response.data;
  },

  // Expert Query
  submitQuery: async (query: { farmerName: string; farmerEmail: string; district: string; query: string }) => {
    const response = await api.post('/queries', query);
    return response.data;
  },

  getMyQueries: async () => {
    const response = await api.get('/queries/my-queries');
    return response.data;
  },

  // Admin - Get Queries
  getQueries: async () => {
    const response = await api.get('/queries');
    return response.data;
  },

  answerQuery: async (queryId: string, answer: string) => {
    const response = await api.patch(`/queries/${queryId}/answer`, { answer });
    return response.data;
  },
};

export default api;
