import React from "react";
import { Menu, Layout } from "antd";
import {
  PartitionOutlined,
  PieChartOutlined,
  ShopOutlined,
  SkinOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Navbar from "../../Layout/Navbar";
import { Link } from "react-router-dom";

const { Sider } = Layout;

const AdminDashboard = () => {
  return (
    <>
      <Navbar />
      <Sider
        style={{ paddingTop: "7.5vh" }}
        breakpoint="sm"
        collapsible
        theme="light"
      >
        <Menu
          defaultSelectedKeys={["1"]}
          mode="vertical"
          style={{ minHeight: "92.5vh" }}
        >
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <Link to="/admin/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<PartitionOutlined />}>
            <Link to="/admin/dashboard">Manage Categories</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<SkinOutlined />}>
            <Link to="/admin/dashboard">Manage Products</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            <Link to="/admin/dashboard">Users</Link>
          </Menu.Item>

          <Menu.Item key="5" icon={<ShopOutlined />}>
            <Link to="/admin/dashboard">Orders</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
};

export default AdminDashboard;
