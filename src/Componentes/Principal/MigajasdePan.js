import React, { useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { Row } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";

const capitalizeFirstLetterEachWord = (str) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

const MigajasdePan = ({ paginas = [] }) => {
  const [items, setItems] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    if (Array.isArray(paginas) && paginas.length > 0) {
      const migajas = [
        {
          title: (
            <Link to="/principal">
              <HomeOutlined />
              &nbsp;Inicio
            </Link>
          ),
          key: "inicio",
        },
        ...paginas.map((pagina, index) => ({
          title: (
            <Link to={pagina.ruta} className="text-dark">
              {capitalizeFirstLetterEachWord(pagina.nombre)}
            </Link>
          ),
          key: index,
        })),
      ];

      setItems(migajas);
    }
  }, [paginas]);

  return (
    <Row className={"justify-content-between px-3"}>
      <Breadcrumb
        items={items}
        separator={<span style={{ color: '#3498DB' }}>&gt;</span>}
        className="mt-2"
      />
    </Row>
  );
};

export default MigajasdePan;
