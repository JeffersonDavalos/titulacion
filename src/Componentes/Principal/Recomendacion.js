import React, { useState } from 'react';
import { Layout, Form, Input, Button, Select, Row, Col, Card, Collapse, DatePicker, Image } from 'antd';
import { SearchOutlined, SyncOutlined } from '@ant-design/icons';
import axios from 'axios';
import MenuLateral from './MenuLateral';
import MenuSuperior from './MenuSuperior';
import MigajasdePan from './MigajasdePan';

const { Content, Sider } = Layout;
const { Option } = Select;
const { Panel } = Collapse;
const { RangePicker } = DatePicker;

const Recomendacion = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [form] = Form.useForm();
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Función para obtener perros recomendados desde una API
  const fetchDogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.thedogapi.com/v1/images/search?limit=6&has_breeds=true&size=med');
      setDogs(response.data);
    } catch (error) {
      console.error('Error al obtener datos de perros:', error);
    }
    setLoading(false);
  };

  // Manejo del formulario
  const handleSubmit = (values) => {
    console.log('Filtros aplicados:', values);
    fetchDogs();
  };

  return (
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
              <MigajasdePan paginas={[{ nombre: 'Fundación', ruta: '' }, { nombre: 'Recomendación Adopción', ruta: '' }]} />
            </Col>
          </Row>

          {/* Filtros de búsqueda */}
          <Collapse defaultActiveKey={["1"]}>
            <Panel header="Filtro de Búsqueda" key="1">
              <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Row gutter={16}>
                  <Col span={6}>
                    <Form.Item label="Raza" name="raza">
                      <Input placeholder="Ingrese la raza" />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item label="Sexo" name="sexo">
                      <Select placeholder="Seleccione el sexo">
                        <Option value="Macho">Macho</Option>
                        <Option value="Hembra">Hembra</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item label="Estado" name="estado">
                      <Select placeholder="Seleccione el estado">
                        <Option value="Disponible">Disponible</Option>
                        <Option value="Adoptado">Adoptado</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item label="Fecha de Creación" name="fecha">
                      <RangePicker style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col>
                    <Button type="default" onClick={() => form.resetFields()}>
                      <SyncOutlined /> Limpiar
                    </Button>
                  </Col>
                  <Col>
                    <Button type="primary" htmlType="submit">
                      <SearchOutlined /> Recomendar
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Panel>
          </Collapse>

          {/* Resultados de recomendación */}
          <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
            {loading ? (
              <Col span={24} style={{ textAlign: 'center' }}>
                <p>Cargando recomendaciones...</p>
              </Col>
            ) : (
              dogs.map((dog, index) => {
                const breed = dog.breeds && dog.breeds.length > 0 ? dog.breeds[0] : null;

                return (
                  <Col key={index} xs={24} sm={12} md={8} lg={6}>
                    <Card hoverable>
                      <Image src={dog.url} alt="Perro" style={{ width: '100%', height: 200, objectFit: 'cover' }} />
                      <h3 style={{ marginTop: '8px' }}>{breed ? breed.name : 'Desconocido'}</h3>
                      <p><strong>Peso:</strong> {breed ? breed.weight.metric : 'N/A'} kg</p>
                      <p><strong>Altura:</strong> {breed ? breed.height.metric : 'N/A'} cm</p>
                      <p><strong>Género:</strong> {breed ? (breed.gender || 'N/A') : 'N/A'}</p>
                      <Button type="primary" style={{ backgroundColor: 'green', borderColor: 'green', marginTop: '10px', width: '100%' }}>Adoptar</Button>
                    </Card>
                  </Col>
                );
              })
            )}
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Recomendacion;
