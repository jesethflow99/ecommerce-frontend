// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers['Content-Type'] = 'application/json';
  return config;
});

// ==========================
// Funciones API
// ==========================

export const getUser = async () => {
  try {
    const res = await api.get('/auth/me');
    return res.data;
  } catch (err) {
    console.error('Error al obtener el usuario:', err);
    throw err;
  }
};

export const fetchServices = async (category) => {
  try {
    const res = await api.get(`/products/category/${category}`);
    return res.data;
  } catch (err) {
    console.error('Error al obtener servicios:', err);
    throw err;
  }
};

export const fetchCategories = async () => {
  try {
    const res = await api.get('/products/categories');
    return res.data;
  } catch (err) {
    console.error('Error al obtener categorías:', err);
    throw err;
  }
};

export const fetchProducts = async () => {
  try {
    const res = await api.get('/products/products');
    return res.data;
  } catch (err) {
    console.error('Error al obtener productos:', err);
    throw err;
  }
};

export const fetchProductById = async (id) => {
  try {
    const res = await api.get(`/products/product/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Error al obtener producto con ID ${id}:`, err);
    throw err;
  }
};

export const fetchorderbyUser = async (userId) => {
  try {
    const res = await api.get(`/orders/user/${userId}`);
    return res.data;
  } catch (err) {
    console.error(`Error al obtener pedidos del usuario con ID ${userId}:`, err);
    throw err;
  }
}

export default api;
