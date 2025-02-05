import React, { useState } from 'react';
import { Layout, Card, Row, Col, Typography, Image } from 'antd';
import MigajasdePan from './MigajasdePan';
import MenuLateral from './MenuLateral';
import MenuSuperior from './MenuSuperior';

const { Content, Sider } = Layout;
const { Title, Paragraph } = Typography;

const Principal = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => setCollapsed(!collapsed);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapsed}>
        <MenuLateral collapsed={collapsed} />
      </Sider>
      <Layout>
        <MenuSuperior />
        <Content style={{ margin: '16px' }}>
          <Row className="mb-2">
            <Col span={24}>
              <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>PetMatch - Recomendación de Adopción</h1>
              <MigajasdePan paginas={[{ nombre: 'Inicio', ruta: '' }]} />
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            {/* Información sobre PetMatch */}
            <Col span={24}>
              <Card bordered={false}>
                <Image
                  src="/petmatch-banner.jpg"
                  alt="PetMatch"
                  style={{ width: '100%', height: 'auto', marginBottom: '16px' }}
                />
                <Title level={3}>¿Qué es PetMatch?</Title>
                <Paragraph>
                  PetMatch es un sistema de recomendación basado en inteligencia artificial que utiliza el perfil de los usuarios y sus preferencias para sugerir animales que se ajusten a sus necesidades, ya sea por características específicas o por el tipo de ambiente que pueden ofrecer.
                </Paragraph>
                <Paragraph>
                  Con el objetivo de facilitar el proceso de adopción y ayudar a organizaciones como fundaciones y refugios a encontrar el hogar adecuado para los animales, PetMatch conecta de forma rápida y sencilla a adoptantes y animales.
                </Paragraph>
              </Card>
            </Col>

            {/* Misión */}
            <Col span={24}>
              <Card bordered={false}>
                <Image
                  src="/mision-petmatch.jpg"
                  alt="Misión"
                  style={{ width: '100%', height: 'auto', marginBottom: '16px' }}
                />
                <Title level={3}>Misión</Title>
                <Paragraph>
                  Brindar una plataforma accesible y eficiente para conectar a personas con el deseo de adoptar con animales necesitados de un hogar, utilizando tecnología de recomendación para facilitar la mejor coincidencia entre las características del adoptante y las necesidades del animal.
                </Paragraph>
                <Paragraph>
                  Contribuir al bienestar y calidad de vida de los animales y mejorar la experiencia de adopción.
                </Paragraph>
              </Card>
            </Col>

            {/* Visión */}
            <Col span={24}>
              <Card bordered={false}>
                <Image
                  src="/vision-petmatch.jpg"
                  alt="Visión"
                  style={{ width: '100%', height: 'auto', marginBottom: '16px' }}
                />
                <Title level={3}>Visión</Title>
                <Paragraph>
                  Ser la plataforma líder en recomendaciones de adopción de animales, creando un futuro donde cada animal encuentre un hogar adecuado y amoroso.
                </Paragraph>
                <Paragraph>
                  Garantizar que cada adoptante reciba el apoyo necesario para brindar el cuidado adecuado, todo dentro de un entorno transparente y de confianza.
                </Paragraph>
              </Card>
            </Col>

            {/* Objetivos */}
            <Col span={24}>
              <Card bordered={false}>
                <Title level={3}>Objetivos</Title>
                <ul>
                  <li>Facilitar el proceso de adopción de animales mediante recomendaciones personalizadas.</li>
                  <li>Mejorar la visibilidad de los animales disponibles en fundaciones y refugios.</li>
                  <li>Promover la adopción responsable y consciente.</li>
                  <li>Generar conciencia sobre la importancia de la adopción frente a la compra de mascotas.</li>
                </ul>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Principal;
