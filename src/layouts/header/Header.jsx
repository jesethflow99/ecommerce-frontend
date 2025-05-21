import React from "react";
import "./header.css";
import logo from "../../assets/images/logo.png";
import Navmobile from "../../components/buttons/Navmobile";
import { motion } from "framer-motion";
import Nav_items from "../../components/buttons/Nav_items/Nav_items";

const Header = ({ list = ["Inicio", "Portafolio", "Productos", "Perfil"] }) => {
  const logotipo = logo;

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
      <div className="nav">
        <ul>
          <li>Inicio</li>
          <li>Sobre</li>
          <li>Servicios</li>
          <li>Portafolio</li>
          <li>Contacto</li>
          
          <Nav_items/>
          
        </ul>
      </div>

      <Navmobile list={list} />
    </motion.div>
  );
};

export default Header;
