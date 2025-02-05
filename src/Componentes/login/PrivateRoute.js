import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element }) => {
  const userData = localStorage.getItem('userData');
  
  if (userData) {
    const user = JSON.parse(userData); 
    const isAuthenticated = user.usuario && user.contraseña ;
    return isAuthenticated ? <Element /> : <Navigate to="/" replace />;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default PrivateRoute;
