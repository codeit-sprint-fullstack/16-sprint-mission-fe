import axios from 'axios';

const PRODUCTS = '/products';

const api = axios.create({
  baseURL: 'https://panda-market-api.vercel.app',
});

// api.interceptors.response.use((response) => response.data);

export const productApi = {
  getProducts: (query) => api.get(`${PRODUCTS}?${query}`),
};

export default api;