import React, { useEffect, useState } from 'react';
import Header from '../../layouts/header/Header';
import Aside from '../../layouts/aside/Aside';
import Content from '../../layouts/content/Content';
import Footer from '../../layouts/footer/footer';
import Hero from '../../layouts/hero/Hero';
import { getUser } from '../../utils';
import styles from './home.module.css';

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getMyData = async () => {
      try {
        const resp = await getUser();
        localStorage.setItem('me', JSON.stringify(resp));
        setUser(resp); // ← esto es la clave
        console.log(resp)
      } catch (error) {
        const errorMessage =
          error.response?.data?.msg || error.message || 'Error desconocido';
        console.log('Error al obtener los datos del usuario: ' + errorMessage);
      }
    };
    getMyData();
  }, []);

  if (!user) return <div>Cargando...</div>; // ← evita el render hasta tener el user

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
