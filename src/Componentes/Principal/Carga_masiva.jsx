import React, { useState } from 'react';
import { Layout, Form, Input, Button, Upload, Row, Col, Collapse, Table, ConfigProvider } from 'antd';
import { UploadOutlined, SearchOutlined, SyncOutlined } from '@ant-design/icons';
import MenuLateral from './MenuLateral';
import MenuSuperior from './MenuSuperior';
import MigajasdePan from './MigajasdePan';
import locale from 'antd/es/locale/es_ES';

const { Content, Sider } = Layout;
const { Panel } = Collapse;

const CargaMasiva = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [data, setData] = useState([]);

  const handleUpload = (info) => {
    setFileList(info.fileList);
  };

  const handleSubmit = (values) => {
    console.log('Filtros aplicados:', values);
    // Aquí iría la lógica para procesar los datos
  };

  const columns = [
    { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
    { title: 'Correo', dataIndex: 'correo', key: 'correo' },
    { title: 'Estado', dataIndex: 'estado', key: 'estado' },
  ];

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
                <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>Carga Masiva</h1>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col span={24}>
                <MigajasdePan paginas={[{ nombre: 'Fundación', ruta: '' }, { nombre: 'Carga Masiva', ruta: '' }]} />
              </Col>
            </Row>

            <Collapse defaultActiveKey={["1"]}>
              <Panel header="Filtro de Búsqueda" key="1">
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item label="Nombre" name="nombre">
                        <Input placeholder="Ingrese el nombre" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Correo" name="correo">
                        <Input placeholder="Ingrese el correo" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item>
                        <Button type="primary" htmlType="submit">
                          <SearchOutlined /> Buscar
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Panel>
            </Collapse>

            <Row justify="center" style={{ marginTop: '16px' }}>
              <Col span={12}>
                <Upload fileList={fileList} beforeUpload={() => false} onChange={handleUpload}>
                  <Button icon={<UploadOutlined />}>Subir Archivo</Button>
                </Upload>
              </Col>
            </Row>

            <Table columns={columns} dataSource={data} style={{ marginTop: '16px' }} />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default CargaMasiva;