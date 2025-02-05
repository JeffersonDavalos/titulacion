import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Componentes/login/Loginn';
import Principal from './Componentes/Principal/Principal';
import PrivateRoute from './Componentes/login/PrivateRoute';
import ActualizarUsuario from './Componentes/Principal/ActualizarUsuario';
import Carga_masiva from './Componentes/Principal/Carga_masiva';
import Register from './Componentes/login/Register';
import Recomendacion from './Componentes/Principal/Recomendacion';
import Aprobacion from './Componentes/Principal/Aprobacion';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Register />} /> 
        <Route path="/principal" element={<PrivateRoute element={Principal} />} />
        <Route path="/actualizar-usuario" element={<ActualizarUsuario />} /> 
        <Route path="/carga_masiva" element={<Carga_masiva />} /> 
        <Route path='/Recomendacion' element={<Recomendacion />} />
        <Route path='/aprobacion-adopcion' element={<Aprobacion />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
