import { Button, Card, Drawer, Input, Select, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import "./Orders.css";
import useHttp from "../../hooks/useHttp";
import {
  CheckCircleOutlined,
  ReloadOutlined,
  SyncOutlined,
} from "@ant-design/icons";

const Orders = () => {
  const columns = [
    {
      title: "Plato",
      dataIndex: "plate_name",
      key: "plate_name",
    },
    {
      title: "Estado",
      key: "status",
      render: (_, { status }) => (
        <>
          {status === "finish" && (
            <Tag icon={<CheckCircleOutlined />} color="success">
              Terminado
            </Tag>
          )}
          {status === "cooking" && (
            <Tag icon={<SyncOutlined spin />} color="processing">
              Preparando
            </Tag>
          )}
        </>
      ),
    },
    {
      title: "Fecha de creación",
      dataIndex: "datetime_created",
      key: "datetime_created",
    },
    {
      title: "Fecha de entrega",
      dataIndex: "datetime_delivered",
      key: "datetime_delivered",
    },
  ];

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const [orders, setOrders] = useState([]);

  const [status, setStatus] = useState("cooking");

  const [open, setOpen] = useState(false);

  const [plates, setPlates] = useState(1);

  const { isLoading, requestGet, requestPost } = useHttp();

  useEffect(() => {
    getOrders(1, status);
  }, []);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setPlates(1);
  };

  const getOrders = async (page = 1, status) => {
    let url = `api/orders?page=${page}`;
    if (status && status !== "all") {
      url += `&status=${status}`;
    }
    const response = await requestGet("8000", url);

    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        current: page,
        total: response.total,
      },
    });
    setOrders(response.data.map((item) => ({ ...item, key: item.id_order })));
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    getOrders(pagination.current, status);

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setOrders([]);
    }
  };

  const requestOrder = async (plates = 1) => {
    let data = {
      orders: plates,
    };
    if(open){
        setOpen(false)
    }
    await requestPost("8000", "api/orders", data);
    getOrders(tableParams.pagination.current, status);
  };
  const handleChange = (value) => {
    setStatus(value);
    getOrders(1, value);
  };

  return (
    <>
      <Card className="w-100 h-content-100 b-shadow">
        <div className="d-flex orders-header-container">
          <div className="w-50 d-flex btn-container-left">
            <Button
              size="large"
              type="default"
              onClick={() => getOrders(tableParams.pagination.current, status)}
            >
              <ReloadOutlined />
            </Button>
            <Select
              size="large"
              defaultValue={status}
              onChange={handleChange}
              options={[
                {
                  value: "cooking",
                  label: "Preparando",
                },
                {
                  value: "finish",
                  label: "Terminado",
                },
                {
                  value: "all",
                  label: "Todos",
                },
              ]}
            />
          </div>
          <div className="w-50 d-flex btn-container-right">
            <Button size="large" type="default" onClick={() => requestOrder(1)}>
              Solicitar Orden
            </Button>
            <Button size="large" type="primary" onClick={showDrawer}>
              Solicitar Masivamente
            </Button>
          </div>
        </div>
        <div className="table-container">
          <br />
          <Table
            dataSource={orders}
            columns={columns}
            pagination={tableParams.pagination}
            loading={isLoading}
            onChange={handleTableChange}
          />
        </div>
      </Card>

      <Drawer
        title="Ordenes masivas"
        placement="right"
        onClose={onClose}
        open={open}
      >
        <div>
          <label>Cantidad de platos:</label> <br />
          <Input
            onChange={(e) => setPlates(e.target.value)}
            value={plates}
            type="number"
            className="w-100"
          />
          <br />
          <br />
          <Button
            type="primary"
            onClick={() => requestOrder(plates)}
            disabled={plates <= 0}
            block={true}
          >
            Confirmar
          </Button>
        </div>
      </Drawer>
    </>
  );
};

export default Orders;
