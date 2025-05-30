import React, { useState, useEffect } from 'react';
import {
  Badge,
  Modal,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from '@mui/material';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { getOrderById, fetchProductById, updateProductStock } from '../utils';
import { useNavigate } from "react-router-dom";

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '12px',
  boxShadow: 24,
  p: 4,
};

const CartModal = () => {
  const [open, setOpen] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const order_id = localStorage.getItem('order');

  useEffect(() => {
    const fetchOrders = async () => {
      if (!order_id) {
        setLoading(false);
        return;
      }
      try {
        const data = await getOrderById(order_id);
        const itemsWithNames = await Promise.all(
          data.order_items.map(async (item) => {
            try {
              const product = await fetchProductById(item.product_id);
              return { ...item, product_name: product.name };
            } catch (err) {
              return { ...item, product_name: 'Producto desconocido' };
            }
          })
        );
        setOrderItems(itemsWithNames);
      } catch (error) {
        console.error('Error al obtener la orden:', error);
        setOrderItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [order_id]);

  const handleCheckout = () => {
    localStorage.removeItem('order');
    setOpen(false);
    setOpenPayment(true);
  };

  const handlePaymentMethod = (method) => {
    console.log('Método de pago seleccionado:', method);
    setOpenPayment(false);
    // Aquí podés hacer lo que necesites con el método de pago
    alert("Compra Exitosa!")
    
    window.location.reload();

  };

  return (
    <>
      <div className="cart" onClick={handleOpen} style={{ cursor: 'pointer' }}>
        <Badge badgeContent={orderItems.length} color="primary">
          <ShoppingCartIcon fontSize="large" />
        </Badge>
      </div>

      {/* Modal del carrito */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" gutterBottom>
            Carrito de Compras
          </Typography>
          {loading ? (
            <Typography>Cargando...</Typography>
          ) : orderItems.length === 0 ? (
            <Typography>Tu carrito está vacío.</Typography>
          ) : (
            <>
              <List>
                {orderItems.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={item.product_name}
                      secondary={`Cantidad: ${item.quantity || 1}`}
                    />
                  </ListItem>
                ))}
              </List>
              <button
                onClick={handleCheckout}
                style={{
                  marginTop: '1rem',
                  backgroundColor: '#1976d2',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                Hacer compra
              </button>
            </>
          )}
        </Box>
      </Modal>

      {/* Modal de métodos de pago */}
      <Modal open={openPayment} onClose={() => setOpenPayment(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" gutterBottom>
            Selecciona un método de pago
          </Typography>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handlePaymentMethod('Tarjeta')}>
                <ListItemText primary="Tarjeta de crédito" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handlePaymentMethod('Transferencia')}>
                <ListItemText primary="Transferencia bancaria" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handlePaymentMethod('Efectivo')}>
                <ListItemText primary="Pago en efectivo" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Modal>
    </>
  );
};

export default CartModal;
