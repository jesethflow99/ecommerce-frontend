import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Nav_items from "./Nav_items/Nav_items";
import { useNavigate } from "react-router-dom";
import { time } from "framer-motion";
import document from "../../assets/documents/SOBRE.pdf";
import DashboardMenu from "../BasicMenu";

export default function Navmobile({ list }) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem("token"); // Limpia el token
    setOpen(false); // Cierra el drawer
    setTimeout(() => {
      navigate("/login"); // Redirige
      alert("Has cerrado sesión correctamente."); // Después muestra el mensaje
    }, 100); // Le das un pequeño delay para que React procese
  };

  const handleNavigation = (text) => {
    switch (text) {
      case "Inicio":
        navigate("/");
        break;
      case "Sobre":
        navigate(document);
        break;
      case "Servicios":
        window.location.href = "/#content";
        break;
      case "Contacto":
        window.location.href = "/#Contacto";
        break;
      case "Salir":
        handleLogout();
        window.location.href = "/login";
        return;
      default:
        break;
    }

    // Ahora sí, cerramos el drawer después de manejar la navegación
    setOpen(false);
  };

  const DrawerList = (
    <Box
      sx={{ width: 250, background: "var(--color-bg)", height: "100%" }}
      role="presentation"
    >
      <List>
        {list.map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => {
              handleNavigation(text)}}>
              <ListItemText
                primary={text}
                sx={{ color: "var(--color-text)" }}
              />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem>
          <DashboardMenu/>
        </ListItem>
      </List>
      <Divider />
      <div
        className="items"
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "10px",
          position: "absolute",
          bottom: "0",
          width: "100%",
        }}
      >
         <br />
        <Nav_items />
        
      </div>
    </Box>
  );

  return (
    <div className="navmobile">
      <Button
        variant="outlined"
        sx={{
          color: "var(--color-text-dark)",
          borderColor: "var(--color-text-dark)",
        }}
        onClick={toggleDrawer(true)}
      >
        <i className="ri-menu-line"></i>
      </Button>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
