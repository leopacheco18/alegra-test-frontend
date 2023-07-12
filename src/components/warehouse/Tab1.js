import React, { useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
import { Table, Tag } from "antd";

const Tab1 = () => {
  const columns = [
    {
      title: "#",
      dataIndex: "id_ingredient",
      key: "id_ingredient",
    },
    {
      title: "Ingrediente",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Cantidad disponible",
      key: "quantity_available",
      render: (_, { quantity_available }) => (
        <>
          <Tag
            style={{width: '50px', textAlign: 'center'}}
            color={getColor(quantity_available)}
          >
            {quantity_available}
          </Tag>
        </>
      ),
    },
  ];

  const [ingredients, setIngredients] = useState([]);

  const { isLoading, requestGet } = useHttp();

  useEffect(() => {
    getIngredients();
  }, []);

  
  const getIngredients = async (page = 1) => {
    let url = `api/ingredients?page=${page}`;
    const response = await requestGet("8002", url);

    setIngredients(
      response.map((item) => ({ ...item, key: item.id_ingredient }))
    );
  };

  const getColor = (quantity_available) => {
    if(quantity_available >= 5) return 'success'
    if(quantity_available >= 3) return 'warning'
    if(quantity_available >= 1) return 'error'
    if(quantity_available === 0) return 'default'
  }

  return (
    <Table
      dataSource={ingredients}
      columns={columns}
      loading={isLoading}
    />
  );
};

export default Tab1;
