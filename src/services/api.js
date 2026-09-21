import axios from 'axios';

const PRODUCTS = '/products';

const api = axios.create({
  baseURL: 'https://pandamarket-uav8.onrender.com/api',
});

// api.interceptors.response.use((response) => response.data);

export const productApi = {
  getPage: (query, controllerSignal) => api.get(`${PRODUCTS}?${query}`, {
    signal: controllerSignal,
  }),
  create: (product) => api.post(PRODUCTS, product),
};

export default api;