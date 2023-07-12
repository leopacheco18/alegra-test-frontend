import React from "react";
import "./Warehouse.css";
import { Card, Tabs } from "antd";
import Tab1 from "../../components/warehouse/Tab1";
import Tab2 from "../../components/warehouse/Tab2";

const Warehouse = () => {
  const items = [
    {
      key: "1",
      label: `Ingredientes`,
      children: <Tab1 />,
    },
    {
      key: "2",
      label: `Compras a la tienda`,
      children: <Tab2 />,
    }
  ];

  return (
    <Card className="w-100 h-content-100 b-shadow">
      <Tabs defaultActiveKey="1" items={items}  />
    </Card>
  );
};

export default Warehouse;
