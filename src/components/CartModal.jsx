import React, { useState, useEffect } from 'react';
import { Badge, Modal, Box, Typography, IconButton, List, ListItem, ListItemText } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { fetchorderbyUser } from '../utils';

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
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const user = JSON.parse(localStorage.getItem('me'));
  const userId = user?.id;


  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) return;
      try {
        const data = await getOrderById(userId);
        setOrderItems(data); // Asume que data es un array de productos o items
      } catch (error) {
        setOrderItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <>
      <div className="cart" onClick={handleOpen} style={{ cursor: 'pointer' }}>
        <Badge badgeContent={orderItems.length} color="primary">
          <ShoppingCartIcon fontSize="large" />
        </Badge>
      </div>

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
            <List>
              {orderItems.map((item, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={item.product_name || `Producto #${index + 1}`}
                    secondary={`Cantidad: ${item.quantity || 1}`}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default CartModal;
