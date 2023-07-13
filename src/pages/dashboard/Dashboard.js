import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import {
  Chart as ChartJS,
  ArcElement,
  RadialLinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut, Pie, PolarArea } from "react-chartjs-2";
import { Card } from "antd";
import useHttp from "../../hooks/useHttp";
import Loading from "../../components/global/Loading";
ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const defaultDoughnut = {
  labels: [],
  datasets: [
    {
      label: "",
      data: [],
      backgroundColor: [
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 99, 132, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(54, 162, 235, 1)",
        "rgba(255, 99, 132, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};
const defaultPolar = {
  labels: [],
  datasets: [
    {
      label: "",
      data: [],
      backgroundColor: [
        "rgba(255, 99, 132, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(255, 206, 86, 0.5)",
        "rgba(75, 192, 192, 0.5)",
        "rgba(153, 102, 255, 0.5)",
        "rgba(255, 159, 64, 0.5)",
      ],
      borderWidth: 1,
    },
  ],
};

const Dashboard = () => {
  const [dataChart1, setDataChart1] = useState();
  const [dataChart2, setDataChart2] = useState();
  const [dataChart3, setDataChart3] = useState();
  const [dataChart4, setDataChart4] = useState();

  const { isLoading, requestGet } = useHttp();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const responseOrders = await requestGet("api/orders/dashboard");
    const responseWarehouse = await requestGet("api/ingredients/dashboard");
    if (responseOrders.chart1) {
      setDataChart1({
        ...defaultPolar,
        labels: responseOrders.chart1.map((item) => item.name),
        datasets: [
          {
            ...defaultPolar.datasets[0],
            label: "# Pedidos",
            data: responseOrders.chart1.map((item) => item.total),
          },
        ],
      });
    }
    if (responseWarehouse.chart2) {
      setDataChart2({
        ...defaultDoughnut,
        labels: responseWarehouse.chart2.map((item) => item.name),
        datasets: [
          {
            ...defaultDoughnut.datasets[0],
            label: "Cantidad",
            data: responseWarehouse.chart2.map((item) => item.total),
          },
        ],
      });
    }
    if (responseWarehouse.chart3) {
      setDataChart3({
        ...defaultDoughnut,
        labels: responseWarehouse.chart3.map((item) => item.name),
        datasets: [
          {
            ...defaultDoughnut.datasets[0],
            label: "Cantidad",
            data: responseWarehouse.chart3.map((item) => item.total),
          },
        ],
      });
    }
    if (responseWarehouse.chart4) {
      const total = responseWarehouse.chart4.reduce(
        (acc, item) => acc + item.total,
        0
      );
      setDataChart4({
        ...defaultDoughnut,
        labels: responseWarehouse.chart4.map((item) =>
          item.status === "success" ? "Exitoso" : "Error"
        ),
        datasets: [
          {
            ...defaultDoughnut.datasets[0],
            label: "Porcentaje",
            data: responseWarehouse.chart4.map(
              (item) => Math.round((item.total / total) * 100)
            ),
          },
        ],
      });
    }
  };

  return (
    <div className="d-flex flex-wrap container-gap">
      {isLoading && <Loading />}
      {dataChart1 && (
        <Card className="card-dashboard" title="Cantidad pedida por plato">
          <PolarArea data={dataChart1} />
        </Card>
      )}
      {dataChart4 && (
        <Card className="card-dashboard" title="Compras exitosas vs fallidas">
          <Pie data={dataChart4} />
        </Card>
      )}

      {dataChart2 && (
        <Card
          className="card-dashboard"
          title="Ingredientes con compras exitosas"
        >
          <Doughnut data={dataChart2} />
        </Card>
      )}

      {dataChart3 && (
        <Card
          className="card-dashboard"
          title="Ingredientes con compras fallidas"
        >
          <Doughnut data={dataChart3} />
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
