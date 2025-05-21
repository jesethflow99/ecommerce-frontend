import React from 'react'
import './hero.css'
import { Button } from '@mui/material'

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero__content">
        <h1>Diseño Gráfico Digital</h1>
        <p>Contamos con una gran variedad de recursos para posicionar su marca de <br />
          manera creativa y profesional <br />
          Transformamos ideas en diseños impactantes. Servicios de diseño gráfico personalizados para tu marca.
          </p>
        <Button variant='outlined'>Ver Proyectos</Button>
      </div>
      <div className="hero__image">
        <img src="https://isil.pe/blog/wp-content/uploads/2023/02/disenador-grafico-que-hace-scaled.webp" alt="Hero" />
      </div>
    </div>
  )
}

export default Hero