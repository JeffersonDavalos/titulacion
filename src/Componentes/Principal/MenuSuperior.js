import React from 'react';
import { Layout, Avatar, Dropdown, Typography, Card, Button, Divider } from 'antd';
import { UserOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;
const { Text } = Typography;

const MenuSuperior = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('userData')) || {};
  console.log("eferferferferferferf");
  console.log(userData);
  console.log("eferferferferferferf");
  console.log("eferferferferferferf");

  const nombreCompleto = `${userData.nombre || 'Nombre'} ${userData.apellido || 'Apellido'}`;
  const correo = userData.correo || 'correo@desconocido.com';
  const usuario = userData.usuario || 'Usuario Desconocido';
  const cedula = userData.cedula || '';

  const handleConfigClick = () => {
    navigate('/actualizar-usuario');
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    navigate('/Loginn');
  };

  const dropdownContent = (
    <Card
      bordered={false}
      style={{
        width: 320,
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div style={{ paddingBottom: '10px', textAlign: 'center' }}>
        <Avatar size={64} icon={<UserOutlined />} style={{ backgroundColor: '#1890ff', marginBottom: '10px' }} />
        <p><Text strong style={{ fontSize: '16px' }}>{nombreCompleto}</Text></p>
        <p><Text type="secondary" style={{ fontSize: '14px' }}>{correo}</Text></p>
        <p><Text type="secondary" style={{ fontSize: '14px' }}>Cédula: {cedula}</Text></p>
      </div>

      <Divider style={{ margin: '12px 0' }} />

      <Button
        icon={<SettingOutlined />}
        style={{
          width: '100%',
          marginBottom: 10,
          backgroundColor: '#f0f2f5',
          borderColor: '#d9d9d9',
        }}
        onClick={handleConfigClick}
      >
        Configuración de cuenta
      </Button>

      <Button
        icon={<LogoutOutlined />}
        type="primary"
        danger
        style={{ width: '100%' }}
        onClick={handleLogout}
      >
        Cerrar Sesión
      </Button>
    </Card>
  );

  return (
    <Header
      className="site-layout-background"
      style={{
        padding: '0 24px',
        background: '#fff',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: 16, fontWeight: 'bold', fontSize: '16px' }}>{usuario}</span>
        <Dropdown
          dropdownRender={() => dropdownContent} 
          trigger={['click']}
          placement="bottomRight"
          overlayStyle={{ zIndex: 1050 }}
        >
          <Avatar size="large" icon={<UserOutlined />} style={{ cursor: 'pointer', backgroundColor: '#1890ff' }} />
        </Dropdown>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .site-layout-background {
            padding: 0 16px;
            justify-content: space-between;
          }
          .ant-dropdown-trigger {
            font-size: 14px;
          }
        }
      `}</style>
    </Header>
  );
};

export default MenuSuperior;
