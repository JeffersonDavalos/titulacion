import React, { useState, useEffect } from 'react';
import { PlusOutlined, CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Upload, Image, message, Layout, Form, Input, Button, Select, Card, Row, Col, Modal } from 'antd';
import { useNavigate } from 'react-router-dom'; 
import MigajasdePan from './MigajasdePan';
import MenuLateral from './MenuLateral';
import MenuSuperior from './MenuSuperior';

const { Option } = Select;
const { Content, Sider } = Layout;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ActualizarUsuario = ({ id_perfil }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState({});
  const navigate = useNavigate(); 

  const userData = JSON.parse(localStorage.getItem('userData')) || {};

  const validarCedula = (cedula) => {
    if (cedula.length !== 10) return false;
    const digitos = cedula.split('').map(Number);
    const verificador = digitos.pop();
    const suma = digitos.reduce((acc, curr, idx) => {
      const temp = curr * (idx % 2 === 0 ? 2 : 1);
      return acc + (temp > 9 ? temp - 9 : temp);
    }, 0);
    const residuo = suma % 10;
    const resultado = residuo === 0 ? 0 : 10 - residuo;
    return resultado === verificador;
  };

  const toggleCollapsed = () => setCollapsed(!collapsed);

  const handleSubmit = async (values) => {
    if (!validarCedula(values.cedula)) {
      setModalInfo({
        title: 'Error en la Cédula',
        content: 'La cédula ingresada no es válida',
        icon: <ExclamationCircleOutlined style={{ color: 'red', fontSize: '100px' }} />,
      });
      setIsModalVisible(true);
      return;
    }

    try {
      const payload = { ...values, id_usuario: userData.id_usuario };

      const response = await fetch('http://127.0.0.1:8000/api/actualizarUsuario', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload), 
      });

      const data = await response.json();

      if (response.ok) {
        setModalInfo({
          title: 'Usuario Actualizado',
          content: '¡El usuario se ha actualizado correctamente!',
          icon: <CheckCircleOutlined style={{ color: 'green', fontSize: '100px' }} />,
          onOk: () => navigate('/Loginn'),
        });
      } else {
        setModalInfo({
          title: 'Error en la Actualización',
          content: data.error || 'Ocurrió un error al actualizar el usuario.',
          icon: <ExclamationCircleOutlined style={{ color: 'red', fontSize: '100px' }} />,
        });
      }

      setIsModalVisible(true);
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      setModalInfo({
        title: 'Error en la Actualización',
        content: 'Ocurrió un error inesperado al intentar actualizar el usuario.',
        icon: <ExclamationCircleOutlined style={{ color: 'red', fontSize: '100px' }} />,
      });
      setIsModalVisible(true);
    }
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('Solo puedes seleccionar archivos JPG/PNG');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('La imagen debe ser menor a 2MB');
    }
    return isJpgOrPng && isLt2M;
  };

  useEffect(() => {
    if (id_perfil !== 1 && userData) {
      form.setFieldsValue({
        cedula: userData.cedula || '',
        nombre: userData.nombre || '',
        apellido: userData.apellido || '',
        correo: userData.correo || '',
        usuario: userData.usuario || '',
      });
    }
  }, [id_perfil, form, userData]);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Subir Foto</div>
    </div>
  );

  const soloLetras = (e) => {
    const key = String.fromCharCode(e.keyCode || e.which);
    const regex = /^[a-zA-Z\s]*$/;
    if (!regex.test(key)) {
      e.preventDefault();
      return false;
    }
  };

  const toUpperCase = (e) => {
    e.target.value = e.target.value.toUpperCase();
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapsed}>
        <MenuLateral collapsed={collapsed} />
      </Sider>

      <Layout>
        <MenuSuperior />
        <Content style={{ margin: '16px' }}>
          <Row>
            <Col span={24}>
              <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>Actualizar Usuario</h1>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col span={24}>
              <MigajasdePan 
                paginas={[
                  { nombre: 'Usuarios', ruta: '' },
                  { nombre: 'Actualizar Usuario', ruta: '' }
                ]}
              />
            </Col>
          </Row>
          <Card bordered={false} style={{ width: '100%' }}>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
            >
              <Row gutter={16}>
                <Col xs={24} md={6}>
                  <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    beforeUpload={beforeUpload}
                    style={{ width: '100%', maxWidth: '300px' }}
                  >
                    {fileList.length === 0 && uploadButton}
                  </Upload>

                  {previewImage && (
                    <Image
                      wrapperStyle={{
                        display: 'none',
                      }}
                      preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                      }}
                      src={previewImage}
                    />
                  )}
                </Col>
                <Col xs={24} md={18}>
                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label="Cédula"
                        name="cedula"
                        rules={[{ required: true, message: 'Por favor ingresa la cédula' }]}
                      >
                        <Input placeholder="Ingrese la cédula" maxLength={10} />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label="Nombre"
                        name="nombre"
                        rules={[{ required: true, message: 'Por favor ingresa el nombre' }]}
                      >
                        <Input
                          placeholder="Ingrese el nombre"
                          onKeyPress={soloLetras}
                          onInput={toUpperCase}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label="Apellido"
                        name="apellido"
                        rules={[{ required: true, message: 'Por favor ingresa el apellido' }]}
                      >
                        <Input
                          placeholder="Ingrese el apellido"
                          onKeyPress={soloLetras}
                          onInput={toUpperCase}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label="Usuario"
                        name="usuario"
                        rules={[{ required: true, message: 'Por favor ingresa el usuario' }]}
                      >
                        <Input
                          placeholder="Ingrese el usuario"
                          onKeyPress={soloLetras}
                          onInput={toUpperCase}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label="Correo"
                        name="correo"
                        rules={[{ type: 'email', required: true, message: 'Por favor ingresa un correo válido' }]}
                      >
                        <Input placeholder="Ingrese el correo electrónico" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label="Contraseña"
                        name="contraseña"
                        rules={[{ required: true, message: 'Por favor ingresa la contraseña' }]}
                      >
                        <Input.Password placeholder="Ingrese la contraseña" />
                      </Form.Item>
                    </Col>
                    {id_perfil === 1 && (
                      <>
                        <Col xs={24} md={12}>
                          <Form.Item
                            label="Perfil"
                            name="perfil"
                            rules={[{ required: true, message: 'Por favor selecciona un perfil' }]}
                          >
                            <Select placeholder="Selecciona el perfil">
                              <Option value="1">Administrador</Option>
                              <Option value="2">Usuario</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item
                            label="Estado"
                            name="estado"
                            rules={[{ required: true, message: 'Por favor selecciona un estado' }]}
                          >
                            <Select placeholder="Selecciona el estado">
                              <Option value="A">Activo</Option>
                              <Option value="I">Inactivo</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                      </>
                    )}
                    <Col span={24}>
                      <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                          Actualizar Usuario
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form>
          </Card>
        </Content>
      </Layout>
      <Modal
        open={isModalVisible}
        title={null}
        onOk={() => {
          setIsModalVisible(false);
          if (modalInfo.onOk) {
            modalInfo.onOk();
          }
        }}
        onCancel={() => setIsModalVisible(false)}
        centered
        width={400}
        footer={[
          <Button key="ok" type="primary" onClick={() => {
            setIsModalVisible(false);
            if (modalInfo.onOk) {
              modalInfo.onOk(); 
            }
          }}>
            Aceptar
          </Button>
        ]}
      >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          {modalInfo.icon}
          <h2 style={{ textAlign: 'center', fontSize: '24px', marginTop: '16px' }}>{modalInfo.title}</h2>
          <p style={{ textAlign: 'center', fontSize: '18px' }}>{modalInfo.content}</p>
        </div>
      </Modal>
    </Layout>
  );
};

export default ActualizarUsuario;
