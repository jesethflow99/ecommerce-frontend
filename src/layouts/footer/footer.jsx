import React from 'react'
import './footer.css'

const footer = () => {
  return (
    <div className="footer">
      <div className="cuve">
        <h3>CUVE</h3>
        <hr />
        <div className="content">
          Transformamos ideas en diseños impactantes. Servicios de diseño gráfico profesionales para tu marca.
        </div>
        <div className="social">
          <a href="#"><i class="ri-facebook-line"></i></a>
          <a href="#"><i class="ri-instagram-line"></i></a>
          <a href="#"><i class="ri-whatsapp-line"></i></a>
          <a href="#"><i class="ri-twitter-line"></i></a>
        </div>
      </div>
      <div className="enlaces_rapidos">
        <h3>Enlaces Rápidos</h3>
        <hr />
          <ul>
            <li><a href="#">Servicios</a></li>
            <li><a href="#">Portafolio</a></li>
            <li><a href="#">Testimonios</a></li>
            <li><a href="#">Tienda</a></li>
          </ul>
        </div>
        <div className="contacto">
          <h3>Contacto</h3>
          <hr />
          <ul>
            <li> <i class="ri-map-pin-line"></i> Allende y 4ta Zona centro</li>
            <li><i class="ri-phone-line"></i> 625-110-0498</li>
            <li><i class="ri-mail-line"></i> Cuve@gmail.com</li>
          </ul>
        </div>
    </div>
  )
}

export default footer