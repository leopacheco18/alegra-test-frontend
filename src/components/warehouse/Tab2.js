import React, { useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
import { Table, Tag } from "antd";

const Tab2 = () => {
  const columns = [
    {
      title: "Ingrediente",
      dataIndex: "ingredient_name",
      key: "ingredient_name",
    },
    {
      title: "Cantidad vendida",
      key: "quantity_sold",
      dataIndex: "quantity_sold",
    },
    {
      title: "Resultado",
      key: "status",
      render: (_, { status }) => (
        <>
          {status === "success" && <Tag color="success">Exitosa</Tag>}
          {status === "error" && <Tag color="error">Error</Tag>}
        </>
      ),
    },
    
    {
        title: "Fecha de solicitud",
        key: "datetime_request",
        dataIndex: "datetime_request",
      },
  ];

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const [purchases, setPurchases] = useState([]);

  const { isLoading, requestGet } = useHttp();

  useEffect(() => {
    getPurchases();
  }, []);

  const getPurchases = async (page = 1) => {
    let url = `api/purchases?page=${page}`;
    const response = await requestGet("8002", url);

    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        current: page,
        total: response.total,
      },
    });
    setPurchases(
      response.data.map((item) => ({ ...item, key: item.id_purchase }))
    );
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    getPurchases(pagination.current);

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setPurchases([]);
    }
  };

  return (
    <Table
      dataSource={purchases}
      columns={columns}
      loading={isLoading}
      pagination={tableParams.pagination}
      onChange={handleTableChange}
    />
  );
};

export default Tab2;
