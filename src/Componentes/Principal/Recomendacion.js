import React, { useState } from 'react';
import { Layout, Form, Input, Button, Select, Row, Col, ConfigProvider } from 'antd';
import MenuLateral from './MenuLateral';
import MenuSuperior from './MenuSuperior';
import MigajasdePan from './MigajasdePan';
import locale from 'antd/es/locale/es_ES';

const { Content, Sider } = Layout;
const { Option } = Select;

const Recomendacion = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [form] = Form.useForm();

  // Función para manejar el envío del formulario
  const handleSubmit = (values) => {
    console.log('Datos ingresados:', values);
  };

  return (
    <ConfigProvider locale={locale}>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
          <MenuLateral collapsed={collapsed} />
        </Sider>
        <Layout>
          <MenuSuperior />
          <Content style={{ margin: '16px' }}>
            <Row>
              <Col span={24}>
                <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>Recomendación Adopción</h1>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col span={24}>
                <MigajasdePan
                  paginas={[
                    { nombre: 'Fundación', ruta: '' },
                    { nombre: 'Recomendación Adopción', ruta: '' },
                  ]}
                />
              </Col>
            </Row>

            {/* Formulario */}
            <Row justify="center">
              <Col span={12}>
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleSubmit}
                >
                  <Form.Item
                    label="Tamaño"
                    name="tamano"
                    rules={[{ required: true, message: 'Por favor ingrese el tamaño' }]}
                  >
                    <Input placeholder="Ejemplo: Grande, Mediano, Pequeño" />
                  </Form.Item>

                  <Form.Item
                    label="Altura (cm)"
                    name="altura"
                    rules={[{ required: true, message: 'Por favor ingrese la altura' }]}
                  >
                    <Input type="number" placeholder="Ingrese la altura en cm" />
                  </Form.Item>

                  <Form.Item
                    label="Sexo"
                    name="sexo"
                    rules={[{ required: true, message: 'Por favor seleccione el sexo' }]}
                  >
                    <Select placeholder="Seleccione el sexo">
                      <Option value="Macho">Macho</Option>
                      <Option value="Hembra">Hembra</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="Color"
                    name="color"
                    rules={[{ required: true, message: 'Por favor ingrese el color' }]}
                  >
                    <Input placeholder="Ejemplo: Negro, Blanco, Marrón" />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Guardar Datos
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default Recomendacion;
