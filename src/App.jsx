import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './routes/home/home'
import Portfolio from './routes/portfolio/Portfolio'
import Product from './routes/product/Product'

const App = () => {
  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/product" element={<Product />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App