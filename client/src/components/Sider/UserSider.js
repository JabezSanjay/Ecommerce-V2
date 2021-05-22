import React from "react";
import { HeartOutlined, PieChartOutlined } from "@ant-design/icons";
import { Menu, Layout } from "antd";

import Navbar from "../../Layout/Navbar";
import { Link } from "react-router-dom";

const { Sider } = Layout;

const UserSider = ({ selectedKey }) => {
  return (
    <div>
      <Navbar padding={75} />
      <Sider breakpoint="md" collapsible theme="light">
        <Menu
          mode="inline"
          style={{ minHeight: "92.5vh" }}
          defaultSelectedKeys={[selectedKey]}
        >
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <Link to="/user/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<HeartOutlined />}>
            <Link to="/user/favourites">Favourites</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </div>
  );
};

export default UserSider;
