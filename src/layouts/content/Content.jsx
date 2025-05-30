import React, { useEffect, useState, useContext } from "react";
import "./content.css";
import Service_card from "../../components/cards/Service_card";
import Testimonios from "../../components/cards/testimonios/Testimonios";
import { ProductsByCategory } from "../../utils";
import { CategoryContext } from "../../context/CategoryContext";

const Content = () => {
  const { selectedCategory } = useContext(CategoryContext); // 🎯 obtenemos la categoría seleccionada
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!selectedCategory) return;
      try {
        const data = await ProductsByCategory(selectedCategory);
        setProducts(data);
      } catch (error) {
        console.error("Error al obtener productos por categoría:", error.message);
      }
    };

    fetchProducts();
  }, [selectedCategory]); // 🧠 reactualiza solo si cambia la categoría

  return (
    <div className="content" id="content">
      <h1>Productos</h1>

      <div className="Service_cards">
        {products.length > 0 ? (
          products.map((product) => (
            <Service_card
            key={product.id}
              id={product.id}
              title={product.name}
              description={product.description}
              image={product.image_url}
            />
          ))
        ) : (
          <p>No hay productos para esta categoría.</p>
        )}
      </div>

      <Testimonios />
    </div>
  );
};

export default Content;
