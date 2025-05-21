import React from 'react'
import Header from '../../layouts/header/Header'
import Aside from '../../layouts/aside/Aside'
import Content from '../../layouts/content/Content'
import Footer from '../../layouts/footer/footer'
import Hero from '../../layouts/hero/Hero'

import styles from './home.module.css'


const Home = () => {
  return (
    <div className={styles.home}>
        <Header />
        <Aside />
        <Content />
        <Hero />
        <Footer />
    </div>
  )
}

export default Home