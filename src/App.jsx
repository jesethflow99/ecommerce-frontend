import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './routes/home/home'
import Portfolio from './routes/portfolio/Portfolio'
import Product from './routes/product/Product'
import AuthForm from './routes/login/Login'
import {PrivateRoute, RoleBasedRoute} from './components/Private_route'
import Gestor_usuarios from './routes/Gestor_usuarios/Gestor_usuarios'
import Categorias from './seller/categorias/Categorias'
import Productos from './seller/products/Productos'
import { CategoryProvider } from './context/CategoryContext';

const App = () => {
  return (
    <CategoryProvider>
    <div className='app'>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/portfolio" element={<PrivateRoute><Portfolio /></PrivateRoute>} />
          <Route path="/product" element={<PrivateRoute><Product /></PrivateRoute>} />
          <Route path="/login" element={<AuthForm />} />
          <Route path="/admin/users" element={<RoleBasedRoute allowedRoles={['admin']}><Gestor_usuarios/></RoleBasedRoute>} />
          <Route path="/seller/categories" element={<RoleBasedRoute allowedRoles={['admin','seller']}><Categorias/></RoleBasedRoute>} />
          {/* Aquí agregas la ruta para productos por categoría */}
          <Route path="/products/:categoryId" element={<RoleBasedRoute allowedRoles={['admin','seller']}><Productos/></RoleBasedRoute>} />
        </Routes>
      </Router>
    </div>
    </CategoryProvider>
  )
}

export default App
