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

export const AddItem = async (data) => {
  try {
    const res = await api.post(`/products/products`,data);
    return res.data;
  } catch (err) {
    
    throw err;
  }
}

export const AddCategory = async (data) => {
  try {
    const res = await api.post(`products/categories`,data);
    return res.data;
  } catch (err) {
    
    throw err;
  }
}

export const deleteProduct = async (id) =>{
  try {
    const res = await api.delete(`/products/${id}`)
    return res.data;
  }catch(err){
    console.log("no se pudo eliminar el producto: "+err)
    throw err;
    
  }
}

export const deleteCategory = async (id) => {
  try {
    const res = await api.delete(`/products/categories/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error al eliminar la categoría: ", err);
    throw err;
  }
};

export const ProductsByCategory = async (id) => {
  try {
    const res = await api.get(`/products/categories/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error al obtener la categoría: ", err);
    throw err;
  }
};

export const updateProductStock = async (productId, stock) => {
  try {
    const res = await api.patch(`/products/${productId}`, { stock });
    return res.data;
  } catch (err) {
    console.error('Error al actualizar stock:', err.message);
    throw err;
  }
};

// Crear una nueva orden
export const createOrder = async (user_id) => {
  try {
    const res = await api.post('ventas/orders',user_id);
    return res.data;
  } catch (err) {
    console.error('Error al crear la orden:', err.message);
    throw err;
  }
};

// Obtener todas las órdenes
export const getOrders = async () => {
  try {
    const res = await api.get('/orders');
    return res.data;
  } catch (err) {
    console.error('Error al obtener las órdenes:', err.message);
    throw err;
  }
};

// Obtener una orden específica
export const getOrderById = async (user_id) => {
  try {
    const res = await api.get(`/orders/${user_id}`);
    return res.data;
  } catch (err) {
    console.error('Error al obtener la orden:', err.message);
    throw err;
  }
};

// Actualizar el estado de una orden
export const updateOrderStatus = async (orderId, status) => {
  try {
    const res = await api.patch(`/orders/${orderId}`, { status });
    return res.data;
  } catch (err) {
    console.error('Error al actualizar la orden:', err.message);
    throw err;
  }
};

// Eliminar una orden
export const deleteOrder = async (orderId) => {
  try {
    const res = await api.delete(`/orders/${orderId}`);
    return res.data;
  } catch (err) {
    console.error('Error al eliminar la orden:', err.message);
    throw err;
  }
};

// Agregar un ítem a una orden
export const addOrderItem = async (data) => {
  try {
    console.log(data)
    const res = await api.post(`/orders/${data.orderId}/items`, data);
    return res.data;
  } catch (err) {
    console.error('Error al agregar un ítem a la orden:', err.message);
    throw err;
  }
};

// Eliminar un ítem de una orden
export const deleteOrderItem = async (orderId, itemId) => {
  try {
    const res = await api.delete(`/orders/${orderId}/items/${itemId}`);
    return res.data;
  } catch (err) {
    console.error('Error al eliminar un ítem de la orden:', err.message);
    throw err;
  }
};

export default api;
