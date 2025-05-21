import React from 'react'
import './hero.css'
import { Button } from '@mui/material'

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero__content">
        <h1>Artesanias Digitales</h1>
        <p>atractivos productos y utilidades creados con las tecnologias de impresion 3d y corte laser que se adapten a tus gustos y nescesidades.
          </p>
        <Button variant='outlined' sx={{border:"1px solid var(--color-text-dark)", color:"var(--color-text-dark)"}}>Ver Proyectos</Button>
      </div>
      <div className="hero__image">
        <img src="https://join.triwee.shop/wp-content/uploads/2023/08/Snapmaker-a350t-impresora3d-cortadora-laser-cnc-1.jpg" alt="Hero" />
      </div>
    </div>
  )
}

export default Hero