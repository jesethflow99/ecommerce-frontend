import React, { useEffect, useState } from 'react';
import Header from '../../layouts/header/Header';
import Aside from '../../layouts/aside/Aside';
import Content from '../../layouts/content/Content';
import Footer from '../../layouts/footer/footer';
import Hero from '../../layouts/hero/Hero';
import { getUser } from '../../utils';
import styles from './home.module.css';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Nuevo estado
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token'); // Verifica si el token existe

    if (!token) {
      // Si no hay token, redirige al login inmediatamente
      setIsAuthenticated(false);
      setIsLoading(false);
      navigate("/login");
      return;
    }

    const getMyData = async () => {
      try {
        const resp = await getUser();
        localStorage.setItem('me', JSON.stringify(resp));
        setUser(resp);
        setIsAuthenticated(true); // Usuario autenticado
      } catch (error) {
        const errorMessage =
          error.response?.data?.msg || error.message || 'Error desconocido';
        console.log('Error al obtener los datos del usuario: ' + errorMessage);

        // Verifica si el error es por un token inválido o expirado
        if (error.response?.status === 401 || errorMessage.includes('token')) {
          localStorage.removeItem('token'); // Limpia el token expirado
          setIsAuthenticated(false); // Cambia el estado de autenticación
          navigate("/login"); // Redirige al login
        }
      } finally {
        setIsLoading(false); // Finaliza la carga
      }
    };

    getMyData();
  }, [navigate]);

  if (isLoading) return <div>Cargando...</div>; // Muestra "Cargando..." mientras se verifica el token

  if (!isAuthenticated) return null; // Evita renderizar el componente si no está autenticado

  return (
    <div className={styles.home}>
      <Header />
      <Aside />
      <Content />
      <Hero />
      <Footer />
    </div>
  );
};

export default Home;