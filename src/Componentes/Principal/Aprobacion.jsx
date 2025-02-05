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
const Aprobacion = () => {
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

  const fetchMateria = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/materias');
      const materiaData = await response.json();
      if (Array.isArray(materiaData.data)) {
        setMateria(materiaData.data);
      } else {
        console.error('La API no devolvió un arreglo:', materiaData);
        setMateria([]);
      }
    } catch (error) {
      console.error('Error al cargar los datos de materia:', error);
      setMateria([]);
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys, selectedRows) => {
      setSelectedRowKeys(selectedKeys);
      setSelectedRows(selectedRows);
    },
  };

  const handleUpdateEstado = async () => {
    if (!selectedEstado) {
      notification.error({
        message: 'Estado no seleccionado',
        description: 'Por favor, seleccione un estado antes de guardar los cambios.',
      });
      return;
    }
    try {
      const requestData = selectedRows.map((row) => ({
        id_tarea: row.id_tarea,
        estado: selectedEstado,
        titulo: row.titulo, 
      }));
        const response = await fetch('http://127.0.0.1:8000/api/actualizarEstado', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tareas: requestData }),
      });
  
      if (response.ok) {
        notification.success({
          message: 'Estado actualizado',
          description: 'Los estados de las tareas seleccionadas se han actualizado correctamente.',
        });
        fetchData();
        setSelectedRowKeys([]);
        setSelectedRows([]);
        setSelectedEstado(null);
      } else {
        const errorData = await response.json();
        setModalInfo({
          icon: <ExclamationCircleOutlined style={{ color: 'red', fontSize: '48px' }} />,
          title: 'Error al actualizar',
          content: errorData.message || 'Error servidor',
        });
        setIsModalVisible(true);
      }
    } catch (error) {
      setModalInfo({
        icon: <ExclamationCircleOutlined style={{ color: 'red', fontSize: '48px' }} />,
        title: 'Error de red',
        content: 'Ocurrió un error inesperado. Verifique su conexión e intente nuevamente.',
      });
      setIsModalVisible(true);
    }
  };
  
  const fetchestado = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/obtenerestado');
      const materiaData = await response.json();
      if (Array.isArray(materiaData.data)) {
        setEstado(materiaData.data);
      } else {
        console.error('La API no devolvió un arreglo:', materiaData);
        setEstado([]);
      }
    } catch (error) {
      console.error('Error al cargar los datos de materia:', error);
      setEstado([]);
    }
  };

  const fetchData = async (values = {}) => {
    setLoading(true);
    try {
      const rangoFecha = values.rangoFechaCreacion
        ? values.rangoFechaCreacion.map((date) => date.format('YYYY-MM-DD'))
        : null;
  
      const requestData = {
        titulo: values.tarea || '',
        materia: values.materia || '',
        estado: values.estado || '',
        fechaInicio: rangoFecha ? rangoFecha[0] : '',
        fechaFin: rangoFecha ? rangoFecha[1] : '',
      };
  
      const response = await fetch('http://127.0.0.1:8000/api/reporTarea', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      if (!response.ok) throw new Error(`Error ${response.statusText}`);
      const dataResponse = await response.json();
      const formattedData = dataResponse.map((item, index) => ({
        key: item.id_tareas,
        id_tarea: item.id_tareas,
        titulo: item.titulo,
        descripcion: item.descripcion,
        materia: item.materia,
        materia_des: item.materia_des,
        estado_tarea: item.estado_tarea,
        fecha_incio: item.fecha_incio,
        fecha_fin: item.fecha_fin,
        documento: item.documento,
        estado: item.estado,
      }));
      setData(formattedData);
    } catch (error) {
      notification.error({
        message: 'Error al cargar datos',
        description: error.message,
      });
      setData([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMateria(); 
    fetchestado();
  }, []);

  const handleModalOk = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {title: 'No.',dataIndex: 'index',key: 'index',render: (text, record, index) => index + 1, },
    {title: 'Tarea',dataIndex: 'titulo',key: 'tarea',},
    {title: 'Descripcion',dataIndex: 'descripcion',key: 'tarea',},
    {title: 'Materia',dataIndex: 'materia_des',key: 'materia',},
    {title: 'Estado',dataIndex: 'estado_tarea',key: 'estado',},
    {title: 'Fecha inicio',dataIndex: 'fecha_incio',key: 'fecha_inicio',render: (text) => moment(text).format('DD/MM/YYYY HH:mm'),},
    {title: 'Fecha finalización',dataIndex: 'fecha_fin',key: 'fecha_finilizacion',render: (text) => moment(text).format('DD/MM/YYYY HH:mm'),},
    {
      title: 'Acciones',
      key: 'acciones',
      render: (text, record) => {
        const isDeleted = record.estado_tarea === 'Eliminado';
        return (
          <Button
            key={record.id_tarea}
            icon={<DeleteOutlined />}
            type="primary"
            danger
            disabled={isDeleted} 
            onClick={() => showDeleteConfirm(record)}
          >
            Eliminar
          </Button>
        );
      },
      responsive: ['md'],
    },
  ];
  
  const showDeleteConfirm = (record) => {
    Modal.confirm({
      title: null,
      icon: null,
      content: (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <ExclamationCircleOutlined style={{ color: 'red', fontSize: '64px', marginBottom: '16px' }} />
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
            ¿Está seguro de que desea eliminar esta tarea?
          </h2>
          <p style={{ fontSize: '16px' }}>
            La tarea "<strong>{record.titulo}</strong>" será eliminada de forma permanente.
          </p>
        </div>
      ),
      okText: 'Sí, eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      centered: true,
      onOk: async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/eliminarTarea/${record.id_tarea}`, {
            method: 'delete',
          });
          if (response.ok) {
            notification.success({
              message: 'Tarea eliminada',
              description: `La tarea "${record.titulo}" ha sido eliminada correctamente.`,
            });
            fetchData();
          } else {
            const errorData = await response.json();
            notification.error({
              message: 'Error al eliminar',
              description: errorData.message || 'No se pudo eliminar la tarea. Intente nuevamente.',
            });
          }
        } catch (error) {
          notification.error({
            message: 'Error de red',
            description: 'Ocurrió un error inesperado. Verifique su conexión.',
          });
        }
      },
    });
  };

  const showConfirmModal = () => {
    Modal.confirm({
      title: null, 
      icon: null, 
      content: (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <ExclamationCircleOutlined
            style={{ color: '#1890ff', fontSize: '64px', marginBottom: '16px' }}
          />
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
            ¿Está seguro de guardar los cambios?
          </h2>
          <p style={{ fontSize: '16px' }}>
            Esta acción actualizará el estado de las tareas seleccionadas. ¿Desea continuar?
          </p>
        </div>
      ),
        okType: 'primary', 
      centered: true, 
      onOk: async () => {
        await handleUpdateEstado();
      },
      onCancel: () => {
      },
    });
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
                <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>Aprobacion adopcion</h1>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col span={24}>
                <MigajasdePan
                  paginas={[
                    { nombre: 'fundacion', ruta: '' },
                    { nombre: 'Aprobacion adopcion', ruta: '' },
                  ]}
                />
              </Col>
            </Row>
            <Card bordered={false} style={{ marginBottom: '16px' }}>
              <Collapse
                defaultActiveKey={['1']}
                accordion
                items={[
                  {
                    key: '1',
                    label: 'Filtro de Búsqueda',
                    children: (
                      <Form
                        form={form}
                        layout="vertical"
                        onFinish={(values) => {
                          fetchData(values);
                        }}
                      >
                        <Row gutter={[16, 16]}>
                          <Col xs={24} sm={12} md={8} lg={6}>
                            <Form.Item label="Raza:" name="tarea">
                              <Input placeholder="Ingrese la raza" />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={12} md={8} lg={6}>
                            <Form.Item label="sexo:" name="materia">
                              <Select placeholder="Seleccione el sexo">
                                {materia && Array.isArray(materia) && materia.length > 0 ? (
                                  materia.map((mate) => (
                                    <Option key={mate.id_materia} value={mate.id_materia}>
                                      {mate.descripcion}
                                    </Option>
                                  ))
                                ) : (
                                  <Option value="loading">Cargando...</Option>
                                )}
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={12} md={8} lg={6}>
                            <Form.Item label="Estado:" name="estado">
                              <Select placeholder="Seleccione el estado">
                                {estado && Array.isArray(estado) && estado.length > 0 ? (
                                  estado.map((est) => (
                                    <Option key={est.id_estado_tareas} value={est.id_estado_tareas}>
                                      {est.descripcion}
                                    </Option>
                                  ))
                                ) : (
                                  <Option value="loading">Cargando...</Option>
                                )}
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={24} md={12} lg={6}>
                            <Form.Item label="Fecha de Creación:" name="rangoFechaCreacion">
                              <RangePicker
                                format="DD/MM/YYYY"
                                disabledDate={(current) => current && current > moment().endOf('day')}
                                style={{ width: '100%' }}
                              />
                            </Form.Item>
                          </Col>
                          <Col span={24} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                              <Button
                                onClick={() => form.resetFields()}
                                icon={<ClearOutlined />}
                                style={{ marginRight: 8 }}
                              >
                                Limpiar
                              </Button>
                              <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                icon={<SearchOutlined />}
                              >
                                Buscar
                              </Button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    ),
                  },
                ]}
              />
            </Card>
            <Card bordered={false} style={{ marginBottom: '16px' }}>
              {selectedRows.length > 0 && (
                <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
                  <Col xs={24} sm={12} md={8} lg={6}>
                    <Select
                      placeholder="Seleccione un estado"
                      onChange={(value) => setSelectedEstado(value)}
                      style={{ width: '100%' }}
                    >
                      {estado
                        .filter((est) => est.id_estado_tareas !== 4)
                        .map((est) => (
                          <Option key={est.id_estado_tareas} value={est.id_estado_tareas}>
                            {est.descripcion}
                          </Option>
                        ))}
                    </Select>
                  </Col>
                  <Col>
                    <Button
                      type="primary"
                      disabled={!selectedEstado}
                      onClick={() => showConfirmModal()}
                      icon={<SaveOutlined />}
                    >
                      Guardar
                    </Button>
                  </Col>
                </Row>
              )}
              <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={data}
                loading={loading}
                rowKey="key"
                scroll={{ x: 768 }}
              />
            </Card>
            <Modal
              open={isModalVisible}
              onOk={handleModalOk}
              onCancel={handleModalOk}
              centered
              width={400}
              footer={[
                <Button key="ok" type="primary" onClick={handleModalOk}>
                  Aceptar
                </Button>,
              ]}
            >
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                {modalInfo.icon}
                <h2 style={{ textAlign: 'center', fontSize: '24px', marginTop: '16px' }}>{modalInfo.title}</h2>
                <p style={{ textAlign: 'center', fontSize: '18px' }}>{modalInfo.content}</p>
              </div>
            </Modal>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
  
};
export default Aprobacion;
