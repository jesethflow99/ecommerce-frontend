import React, { useEffect, useState } from 'react';
import Header from '../layouts/header/Header';
import { getOrders, updateOrderStatus, fetchProducts } from '../utils';
import './Reportes.css';

const Reportes = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersData, productsData] = await Promise.all([
          getOrders(),
          fetchProducts()
        ]);
        setOrders(ordersData);
        setProducts(productsData);
      } catch (err) {
        console.error('Error al obtener datos:', err.message);
      }
    };

    fetchData();
  }, []);

  const handleStatusChange = async (orderId) => {
    try {
      await updateOrderStatus(orderId, 'entregado');
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: 'entregado' } : order
        )
      );
    } catch (err) {
      console.error('Error al actualizar el estado de la orden:', err.message);
    }
  };

  // Función para obtener el nombre de un producto por ID
  const getProductName = (productId) => {
    const product = products.find((p) => p.id === productId);
    return product ? product.name : `Producto #${productId}`;
  };

  return (
    <div className="Reportes">
      <Header />
      <h1>Reportes de ventas</h1>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Cliente (ID)</th>
            <th>Productos</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id}>
              <td>{index + 1}</td>
              <td>{order.user_id}</td>
              <td>
                <ul>
                  {order.order_items.map((item, i) => (
                    <li key={i}>
                      {getProductName(item.product_id)} (x{item.quantity || 1})
                    </li>
                  ))}
                </ul>
              </td>
              <td>{order.status}</td>
              <td>
                {order.status === 'pending' && (
                  <button
                    className="btn btn-success"
                    onClick={() => handleStatusChange(order.id)}
                  >
                    Marcar como entregado
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reportes;
