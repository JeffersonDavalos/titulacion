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
              <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>Centro Tecnológico - FUNIBER</h1>
              <MigajasdePan paginas={[{ nombre: 'FUNIBER', ruta: '' }]} />
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card bordered={false}>
                <Title level={3}>¿Qué es FUNIBER?</Title>
                <Paragraph>
                  FUNIBER es hoy en día una institución que se desarrolla con la sociedad, a través de diversos convenios y proyectos, participando en actividades, tanto académicas, científicas y de investigación, como de cooperación, desarrollo y crecimiento económico, gracias a su vinculación con universidades e instituciones profesionales para conseguir dar finalmente una Formación Global respetando las identidades locales. Funiber no es una universidad sino que dinamiza la colaboración entre ellas, y son las universidades las que otorgan los títulos.
                </Paragraph>
              </Card>
            </Col>
            <Col span={24}>
              <Card bordered={false}>
                  <Image
                    src="/mision-fam.jpg"
                    alt="Imagen Misión"
                    style={{ width: '100%', height: 'auto', marginBottom: '16px' }}
                  />
                <Title level={3}>Misión</Title>
                <Paragraph>
                  FUNIBER proyecta sus líneas de actuación basándose en que el conocimiento debe ser puesto al alcance de todos, no sólo de quiénes han terminado una carrera universitaria. Existen diferentes grupos de destinatarios del conocimiento (según el grado de educación previamente alcanzado) y diferentes niveles de profundización en cada uno. Además, cada cual debe poder elegir, el camino que más le satisfaga en la materialización de su proceso personal de aprendizaje y formación cultural e intelectual. En este marco debe encuadrarse la misión que se detalla.
                </Paragraph>
                <Paragraph>
                  Frente al requerimiento que el aprendizaje debe ser durante toda la vida, nuestra respuesta consiste en el seguimiento de los becados manteniéndoles debidamente informados de las novedades formativas y actividades que se realicen en el área de su especialidad y afines.
                </Paragraph>
              </Card>
            </Col>
            <Col span={24}>
              <Card bordered={false}>
                  <Image
                    src="/banner-queesfuniber.jpg"
                    alt="Imagen Visión"
                    style={{ width: '100%', height: 'auto', marginBottom: '16px' }}
                  />
                <Title level={3}>Visión</Title>
                <Paragraph>
                  Para cumplir su misión, FUNIBER se propone formar ciudadanos críticos y participativos para la Sociedad del Conocimiento, desde la perspectiva del desarrollo personal y el respeto y desarrollo de la identidad nacional, regional y local.
                </Paragraph>
                <Paragraph>
                  En su actividad esencial, FUNIBER no compite con las Universidades, trabaja con ellas mancomunadamente complementando sus acciones en dos sentidos:
                </Paragraph>
                <ul>
                  <li>Diversificando el destinatario del proceso de enseñanza-aprendizaje.</li>
                  <li>Ayudando a las Universidades a cubrir sus áreas poco desarrolladas.</li>
                </ul>
                <Paragraph>
                  Formar personas capaces de aprender por sí mismas, respondiendo a la exigencia de formación continua.
                </Paragraph>
                <Paragraph>
                  No es suficiente con adquirir el conocimiento, además hay que aprender a aplicarlo en contextos reales. La solución que se propone es el trabajo en grupos virtuales internacionales.
                </Paragraph>
                <Paragraph>
                  Propiciar una formación que permita a los becados sentirse competentes más que competitivos.
                </Paragraph>
                <Paragraph>
                  Esta formación se logra a través de una morfología de "red de Redes de Universidades" en la que cada institución conserva su identidad.
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Principal;
