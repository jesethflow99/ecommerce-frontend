import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './routes/home/home'
import Portfolio from './routes/portfolio/Portfolio'
import Product from './routes/product/Product'
import AuthForm from './routes/login/Login'
import {PrivateRoute, RoleBasedRoute} from './components/Private_route'
import { useEffect } from 'react'
import Gestor_usuarios from './routes/Gestor_usuarios/Gestor_usuarios'
import Categorias from './seller/categorias/Categorias'

const App = () => {
  
  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/portfolio" element={<PrivateRoute><Portfolio /></PrivateRoute>} />
          <Route path="/product" element={<PrivateRoute><Product /></PrivateRoute>} />
          <Route path="/login" element={<AuthForm />} />
          <Route path="/admin/users" element={<RoleBasedRoute allowedRoles={['admin']}><Gestor_usuarios/></RoleBasedRoute>} />
          <Route path="/seller/categories" element={<RoleBasedRoute allowedRoles={['admin',"seller"]}><Categorias/></RoleBasedRoute>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App