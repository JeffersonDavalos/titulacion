import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined, ReconciliationOutlined } from '@ant-design/icons';

const MenuLateral = ({ collapsed }) => {
  const userData = JSON.parse(localStorage.getItem('userData')) || {};
  const { id_perfil } = userData;
  let menuItems = [];

  if (id_perfil === 2) {
    menuItems = [
      {
        key: 'adopcion',
        icon: <UserOutlined />,
        label: 'Adopcion',
        children: [
          {
            key: 'recomendacion',
            label: <Link to="/Recomendacion">Recomendaciones</Link>,
          },
        ],
      },
    ];
  }

  if (id_perfil === 1) {
    menuItems.push(
      {
        key: 'fundacion',
        icon: <ReconciliationOutlined />,
        label: 'Fundacion',
        children: [
          {
            key: 'cargamasiva',
            label: <Link to="/carga_masiva">Carga Masiva</Link>,
          },
          {
            key: 'aprobacionLista',
            label: <Link to="/aprobacion-adopcion">Aprobacion</Link>,
          },
        ],
      },
    );
  }
  

  return (
    <div style={{ height: '100%' }}>
      <div
        style={{
          padding: '0 16px',
          textAlign: 'center',
          backgroundColor: '#fff',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={collapsed ? require('../Imagenes/logo.png') : require('../Imagenes/logo2.png')}
          alt="Logo"
          style={{
            height: '100%',
            maxHeight: '64px',
            width: 'auto',
            transition: 'width 0.2s ease-in-out',
          }}
        />
      </div>
      <Menu
        theme="dark"
        mode="inline"
        style={{ height: '100%', transition: 'all 0.2s ease-in-out' }}
        items={menuItems}
      />
    </div>
  );
};

export default MenuLateral;
