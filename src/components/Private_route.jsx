// PrivateRoute.jsx
import { Navigate } from 'react-router-dom';

// Solo verifica token
export const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

// Verifica token y roles
export const RoleBasedRoute = ({ children, allowedRoles = [] }) => {
  const token = localStorage.getItem('token');
  const me = JSON.parse(localStorage.getItem('me'));

  if (!token || !me) return <Navigate to="/login" replace />;

  if (!allowedRoles.includes(me.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};
