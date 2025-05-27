import React from 'react'
import './footer.css'

const footer = () => {
  return (
    <div className="footer" id='Contacto'>
      <div className="cuve">
        <h3>Laser and 3d Print</h3>
        <hr />
        <div className="content">
          Transformamos ideas en diseños impactantes. Servicios de impresion 3d y corte laser profesionales.
        </div>
        <div className="social">
          <a href="#"><i className="ri-facebook-line"></i></a>
          <a href="#"><i className="ri-instagram-line"></i></a>
          <a href="#"><i className="ri-whatsapp-line"></i></a>
          <a href="#"><i className="ri-twitter-line"></i></a>
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
            <li> <i className="ri-map-pin-line"></i> Hidalgo y 9a Zona centro</li>
            <li><i className="ri-phone-line"></i> 635-120-1576</li>
            <li><i className="ri-mail-line"></i> marck3design@gmail.com</li>
          </ul>
        </div>
    </div>
  )
}

export default footer