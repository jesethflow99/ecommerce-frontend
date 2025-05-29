import React from "react";
import "./header.css";
import logo from "../../assets/images/logo.png";
import Navmobile from "../../components/buttons/Navmobile";
import { motion } from "framer-motion";
import Nav_items from "../../components/buttons/Nav_items/Nav_items";
import { useNavigate } from "react-router-dom";
import document from "../../assets/documents/SOBRE.pdf";
import BasicMenu from "../../components/BasicMenu";

const Header = ({ list = ["Inicio", "Sobre", "Servicios", "Contacto","Salir"] }) => {
  const logotipo = logo;
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token') // Elimina el token del almacenamiento local
    localStorage.removeItem('me')
    navigate('/login') // Redirige a la página de inicio de sesión
    alert('Has cerrado sesión correctamente.'); // Muestra un mensaje de confirmación
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -50,
        overflow: "hidden",
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="header"
    >
      <motion.div
        initial={{
          opacity: 0,
          scale: 0,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="logo"
      >
        <motion.img src={logo} alt="" />
      </motion.div>
      <div className="nav" id="#inicio">
        <ul>
          <BasicMenu></BasicMenu>
          <li><a href="/">Inicio</a></li>
          <li><a href={document} target="_blank">Sobre</a></li>
          <li><a href="/#content">Servicios</a></li>
          <li>Portafolio</li>
          <li><a href="/#Contacto">Contacto</a></li>
          
          <Nav_items/>
          <li className="logout"><a onClick={handleLogout} ><i className="ri-logout-box-r-line"></i></a></li>
        </ul>
      </div>

      <Navmobile list={list} />
    </motion.div>
  );
};

export default Header;
