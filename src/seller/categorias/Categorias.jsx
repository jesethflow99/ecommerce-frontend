import React, { useState, useEffect } from "react";
import "./Categorias.css";
import Header from "../../layouts/header/Header";
import {
  fetchCategories,
  AddCategory,
  deleteProduct,
  deleteCategory,
  ProductsByCategory
} from "../../utils";
import { useNavigate } from 'react-router-dom';


const Categorias = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [productCount, setProductCount] = useState({});

  useEffect(() => {
    const fetchCat = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
        const countMap = {};
        for (const cat of data) {
          const products = await ProductsByCategory(cat.id); // o cat.name si así está en tu backend
          countMap[cat.id] = products.length;
        }
        setProductCount(countMap);
        console.log(countMap)
      } catch (err) {
        console.error("Error al obtener categorías o productos: ", err.message);
      }
    };

    fetchCat();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AddCategory({ name, description });
      setName("");
      setDescription("");
      window.location.reload();
    } catch (err) {
      console.error("Error al agregar categoría:", err.message);
    }
  };

  const handleViewProducts = (categoryId) => {
    navigate(`/products/${categoryId}`);

  };

  const handleBack = () => {
    setSelectedCategory(null);
    setCategoryProducts([]);
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      if (productCount[categoryId] > 0) {
        return alert("No puedes eliminar una categoría con productos.");
      }
      await deleteCategory(categoryId);
      window.location.reload();
    } catch (err) {
      console.error("Error al eliminar la categoría:", err.message);
    }
  };

  return (
    <div className="Categorias">
      <Header />

      {!selectedCategory ? (
        <>
          <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="nombre">Nombre de la categoría</label>
                <input
                  id="nombre"
                  type="text"
                  placeholder="Nombre"
                  required
                  value={name}
                  autoComplete="off"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="descripcion">Descripción</label>
                <textarea
                  id="descripcion"
                  rows="5"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <button className="form-submit-btn" type="submit">
                Agregar
              </button>
            </form>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Ver productos</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={category.id}>
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td>
                    <button
                      className="btn btn-dark"
                      onClick={() => handleViewProducts(category.id)}
                    >
                      Ver Productos
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      disabled={productCount[category.id] > 0}
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <div className="products-view">
          <h2>Productos en "{selectedCategory}"</h2>
          <button className="btn btn-secondary" onClick={handleBack}>
            ← Volver
          </button>
          {categoryProducts.length === 0 ? (
            <p>No hay productos en esta categoría.</p>
          ) : (
            <ul>
              {categoryProducts.map((prod, i) => (
                <li key={prod.id || i}>{prod.name}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Categorias;
