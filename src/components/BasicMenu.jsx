import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function DashboardMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // Validación segura del localStorage
  let userData = null;
  let userRole = null;

  try {
    const me = localStorage.getItem('me');
    if (me) {
      userData = JSON.parse(me);
      userRole = userData.role;
    }
  } catch (error) {
    console.error('Error al leer datos del usuario:', error);
    return null;
  }

  if (!userRole || !['admin', 'seller'].includes(userRole)) {
    console.log('Usuario sin permisos para ver el menú de Dashboard');
    return null;
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
