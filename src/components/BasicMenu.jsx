import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { getUser } from '../utils';

export default function DashboardMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userRole, setUserRole] = React.useState(null); // Estado para el rol
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Obtener el rol del usuario desde el backend
  React.useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await getUser();
        setUserRole(res.data.role); // Asume que tu backend retorna un campo `role`
      } catch (err) {
        console.error('Error al obtener datos del usuario:', err);
      }
    };

    fetchUserRole();
  }, []);

  // Si el usuario no tiene permisos, no mostramos nada
  if (!['admin', 'seller'].includes(userRole)) {
    console.log('Usuario sin permisos para ver el menú de Dashboard');
    console.log('Rol del usuario:', userRole);
    return null;
  }

  return (
    <div>
      <Button
        id="dashboard-button"
        aria-controls={open ? 'dashboard-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button>
      <Menu
        id="dashboard-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          listbox: {
            'aria-labelledby': 'dashboard-button',
          },
        }}
      >
        <MenuItem onClick={handleClose}>Agregar categoría</MenuItem>
        <MenuItem onClick={handleClose}>Agregar producto</MenuItem>
        {userRole === 'admin' && (
          <>
            <MenuItem onClick={handleClose}>Gestionar usuarios</MenuItem>
            <MenuItem onClick={handleClose}>Ver reportes</MenuItem>
          </>
        )}
      </Menu>
    </div>
  );
}
