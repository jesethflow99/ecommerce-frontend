import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './routes/home/home'
import Portfolio from './routes/portfolio/Portfolio'
import Product from './routes/product/Product'
import AuthForm from './routes/login/Login'
import PrivateRoute from './components/Private_route'

const App = () => {
  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/portfolio" element={<PrivateRoute><Portfolio /></PrivateRoute>} />
          <Route path="/product" element={<PrivateRoute><Product /></PrivateRoute>} />
          <Route path="/login" element={<AuthForm />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App