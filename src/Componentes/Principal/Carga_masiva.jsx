import React, { useState, useEffect } from 'react';
import { Layout, Form, Input, Button, DatePicker, Card, Row, Col, Table, Modal, ConfigProvider, notification, Select, Collapse } from 'antd';
import { SearchOutlined, ClearOutlined, EditOutlined, ExclamationCircleOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import MigajasdePan from './MigajasdePan';
import MenuLateral from './MenuLateral';
import MenuSuperior from './MenuSuperior';
import locale from 'antd/es/locale/es_ES';
import moment from 'moment';
import 'moment/locale/es';
const { RangePicker } = DatePicker;
const { Option } = Select;
const { Content, Sider } = Layout;
const Carga_masiva = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [materia, setMateria] = useState([]);
  const [estado, setEstado] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [modalInfo, setModalInfo] = useState({}); 
  const [isAgregarModalVisible, setIsAgregarModalVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedEstado, setSelectedEstado] = useState(null);

 
  
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
                <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>Carga masiva</h1>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col span={24}>
                <MigajasdePan
                  paginas={[
                    { nombre: 'fundacion', ruta: '' },
                    { nombre: 'Carga masiva', ruta: '' },
                  ]}
                />
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
  
};
export default Carga_masiva;
