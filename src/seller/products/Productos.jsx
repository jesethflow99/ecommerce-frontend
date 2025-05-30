import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductsByCategory, AddItem, updateProductStock, deleteProduct } from '../../utils';
import "./Products.css";
import Header from '../../layouts/header/Header';

const Productos = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    image_url: '',
    category_id: categoryId,
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const data = await ProductsByCategory(categoryId);
        setProducts(data);
      } catch (err) {
        console.error('Error al obtener datos:', err.message);
      }
    };

    fetchInitialData();
  }, [categoryId]);

  const handleInputChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await AddItem(newProduct);
      setNewProduct({
        name: '',
        description: '',
        price: '',
        stock: '',
        image_url: '',
        category_id: categoryId,
      });
      const data = await ProductsByCategory(categoryId);
      setProducts(data);
    } catch (err) {
      console.error('Error al agregar producto:', err.message);
    }
  };

  const handleStockChange = (productId, newStock) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, stock: newStock } : product
      )
    );
  };

  const handleStockBlur = async (productId, newStock) => {
    try {
      await updateProductStock(productId, newStock);
    } catch (err) {
      console.error('Error al actualizar stock:', err.message);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      try {
        await deleteProduct(productId);
        setProducts((prev) => prev.filter((p) => p.id !== productId));
      } catch (err) {
        console.error('Error al eliminar producto:', err.message);
      }
    }
  };

  return (
    <>
      <Header />
      <div className='Productos'>
        <h2>Administrar Productos</h2>
        <form onSubmit={handleAddProduct}>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={newProduct.name}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="description"
            placeholder="Descripción"
            value={newProduct.description}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Precio"
            value={newProduct.price}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="image_url"
            placeholder="URL de Imagen"
            value={newProduct.image_url}
            onChange={handleInputChange}
          />
          <button type="submit">Agregar Producto</button>
        </form>

        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>
                  <input
                    type="number"
                    value={product.stock}
                    onChange={(e) => handleStockChange(product.id, e.target.value)}
                    onBlur={() => handleStockBlur(product.id, product.stock)}
                  />
                </td>
                <td>
                  <button onClick={() => handleDeleteProduct(product.id)} className='btn btn-danger'>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Productos;
