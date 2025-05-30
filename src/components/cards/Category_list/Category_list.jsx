import React, { useState, useEffect, useContext } from 'react';
import "./Category_list.css";
import { fetchCategories } from '../../../utils';
import { CategoryContext } from '../../../context/CategoryContext';

const Category_list = () => {
  const [categories, setCategories] = useState([]);
  const { setSelectedCategory } = useContext(CategoryContext); // 🎯 usamos el contexto

  useEffect(() => {
    const fetchCat = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error("Error al obtener categorías: ", err.message);
      }
    };
    fetchCat();
  }, []);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId); // 📌 actualiza el contexto global
    console.log(`Categoría ${categoryId} seleccionada`);
  };

  return (
    <div className='category'>
      <h1>Categorías</h1>
      <hr />
      <ul className="category_list">
        <div className="search_bar">
          <input type="text" placeholder="Buscar..." />
          <button className="search_button">
            <i className="ri-search-line"></i>
          </button>
        </div>
        {categories.map((category) => (
          <li key={category.id} className="category_list_item">
            <button onClick={() => handleCategorySelect(category.id)}>
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category_list;
