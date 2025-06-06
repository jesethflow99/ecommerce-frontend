import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createOrder,addOrderItem,getOrderById } from '../../utils'; // Importar la función

export default function Service_card({id,title, description, image }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleAddToCart = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('me'));
      const user_id = userData.id;
  
      let orderId = localStorage.getItem("order");
  
      if (!orderId || isNaN(Number(orderId))) {
        const { order } = await createOrder(user_id);
        if (!order?.id) throw new Error("Orden inválida");
        orderId = order.id;
        localStorage.setItem("order", orderId);
      }
  
      await addOrderItem({ order_id: orderId, product_id:id, quantity: 1 });
  
      alert('Producto agregado al carrito');
    } catch (err) {
      console.error('Error al agregar al carrito:', err);
      alert('Error al agregar al carrito');
    }
  };
  
  
  
  

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{
            height: 200, // Tamaño fijo para todas las imágenes
            objectFit: 'cover',
            cursor: 'pointer'
          }}
          component="img"
          image={image}
          title={title}
          onClick={() => setIsOpen(true)}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            sx={{ color: "var(--color-text)" }}
            onClick={handleAddToCart} // Llamar a la función al hacer clic
          >
            Agregar al carrito
          </Button>
          <Button size="small" sx={{ color: "var(--color-text)" }}>Vista previa</Button>
        </CardActions>
      </Card>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            style={{
              position: 'fixed',
              top: 0, left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0,0,0,0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
              cursor: 'zoom-out'
            }}
          >
            <motion.img
              key="image"
              src={image}
              alt={title}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{
                maxWidth: '80vw',
                maxHeight: '80vh',
                borderRadius: '12px',
                boxShadow: '0 0 20px rgba(255,255,255,0.4)'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}