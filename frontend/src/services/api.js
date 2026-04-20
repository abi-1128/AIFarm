import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export const authService = {
  login: (data) => api.post('/auth/login/', data),
  register: (data) => api.post('/auth/register/', data),
  getMe: () => api.get('/auth/me/'),
};

export const landService = {
  getLands: () => api.get('/lands/'),
  addLand: (data) => api.post('/lands/', data),
};

export const cropService = {
  getRecommendations: () => api.get('/recommendations/'),
  getRecommendation: (id) => api.get(`/recommendations/${id}/`),
  createRecommendation: (landId) => api.post('/recommendations/', { land: landId }),
  getTasks: (recId) => api.get(`/tasks/?recommendation=${recId}`),
  updateTask: (id, data) => api.patch(`/tasks/${id}/`, data),
};

export const marketplaceService = {
  getProducts: () => api.get('/products/'),
  getMyListings: () => api.get('/products/my_listings/'),
  createProduct: (data) => api.post('/products/', data),
  createOrder: (data) => api.post('/orders/', data),
  getOrders: () => api.get('/orders/'),
};

export const aiMentorService = {
  sendMessage: (query) => api.post('/chat/', { user_query: query }),
  getHistory: () => api.get('/chat/'),
};

export const weatherService = {
  getWeather: (lat, lon) => api.get(`/weather/?lat=${lat}&lon=${lon}`),
};

export default api;
