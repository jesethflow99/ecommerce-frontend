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

export const getAllUsers = async () => {
  try{
    const res = await api.get("admin/get_all_users")
    return res.data;
  }catch (err){
    const errorMessage = err.response?.data?.msg || err.message || 'Error desconocido';
    console.error("Error al obtener la lista de usuarios: ",errorMessage)
    throw new Error(errorMessage);
  }
}




export const getUser = async () => {
  try {
    const res = await api.get('/auth/me');
    return res.data;
  } catch (err) {
    const errorMessage = err.response?.data?.msg || err.message || 'Error desconocido';
    console.error('Error al obtener el usuario:', errorMessage);
    throw new Error(errorMessage); // lanzamos un error más legible
  }
};

export const deleteUser = async (id) => {
  try {
    const res = await api.delete('/admin/delete/'+id);
    return res.data;
  } catch (err) {
    const errorMessage = err.response?.data?.msg || err.message || 'Error desconocido';
    console.error('Error al obtener el usuario:', errorMessage);
    throw new Error(errorMessage); // lanzamos un error más legible
  }
};

export const changeRole = async (id,role) => {
  try {
    const res = await api.patch(`/admin/change_role/${id}`,{role});
    return res.data;
  } catch (err) {
    const errorMessage = err.response?.data?.msg || err.message || 'Error desconocido';
    console.error('Error al obtener el usuario:', errorMessage);
    throw new Error(errorMessage); // lanzamos un error más legible
  }
};


// src/services/api.js

export const loginUser = async ({ email, password }) => {
  try {
    const res = await api.post('/auth/login', { email, password });
    return res.data; // contiene el token y lo que devuelva tu backend
  } catch (err) {
    console.error('Error al iniciar sesión:', err);
    throw err;
  }
};

export const signupUser = async ({username,email,password,phone,address}) => {
  try {
    const res = await api.post("/auth/register",{username,email,password,phone,address})
    return res.data
  }catch (err){
    console.error("Error al registrar: ")
    throw err;
  }
}


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
    
    throw err;
  }
};

export const fetchorderbyUser = async (userId) => {
  try {
    const res = await api.get(`/products/orders/${userId}`);
    return res.data;
  } catch (err) {
    
    throw err;
  }
}

export default api;
