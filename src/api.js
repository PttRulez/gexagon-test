import axios from 'axios';

export const baseURL = 'http://79.143.31.216';

const api = axios.create({
  baseURL
})

api.interceptors.request.use(config => {
  return config;
})

export default api