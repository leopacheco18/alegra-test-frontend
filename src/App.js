import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import NotFound from "./pages/notFound/NotFound";
import { AppstoreOutlined, BookOutlined, CoffeeOutlined }  from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import logo from "./assets/img/logo.png";
import Orders from "./pages/orders/Orders";
import Warehouse from "./pages/warehouse/Warehouse";
import Plates from "./pages/plates/Plates";


function App() {
  const navigate = useNavigate();
  const location = useLocation()
  const [alreadyClick, setAlreadyClick] = useState(false);
  const [showLayout, setShowLayout] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      label: "Ordenes",
      key: "/orders",
      icon: <BookOutlined />,
    },
    {
      label: "Bodega",
      key: "/warehouse",
      icon: <AppstoreOutlined />,
    },
    {
      label: "Platos",
      key: "/plates",
      icon: <CoffeeOutlined />,
    },
  ];

  const handleMenuClick = (e) => {
    navigate(e.key);
  };

  const handleStart = () => {
    setAlreadyClick(true);
    setTimeout(() => {
      setShowLayout(true);
    }, 2000);
  };

  const validateOptionsPath = (path) => {
    if(menuItems.find((item) => item.key === path)){
      return path
    }
    return '/orders';
  
  }

  return (
    <div style={{ height: "100vh", position: "relative" }}>
      <div>
        <Layout
          className={`animation layout-collapsed ${
            alreadyClick ? "layout-expanded" : ""
          }`}
        >
          <Header
            className={`animation header-collapsed ${
              alreadyClick ? "header-expanded" : ""
            }`}
          ></Header>
          <Layout>
            {showLayout && (
              <Sider 
              breakpoint="lg" className={`animation sider-expanded b-shadow`} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={[validateOptionsPath(location.pathname)]}
                  style={{
                    height: "100%",
                    borderRight: 0,
                  }}
                  onClick={handleMenuClick}
                  items={menuItems}
                />
              </Sider>
            )}
            {showLayout && 
            <Layout
            className="padding-content layout-content"
            >
              <Routes>
                <Route path="/orders" element={<Orders />} />
                <Route path="/warehouse" element={<Warehouse />} />
                <Route path="/plates" element={<Plates />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
            }
          </Layout>
        </Layout>

          <img
            src={logo}
            alt="alegra-logo"
            className={`animation logo
            ${ alreadyClick ? "logo-end" : "" }`}
          />

        {!showLayout && (
          <Button
            type="primary"
            onClick={handleStart}
            className={`animation btn-start btn-show ${
              alreadyClick ? "btn-hide" : ""
            }`}
          >
            Bienvenido, Gerente
          </Button>
        )}
      </div>
    </div>
  );
}

export default App;
