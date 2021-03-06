import React from "react";
import {
  PartitionOutlined,
  ShopOutlined,
  SkinOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu, Layout } from "antd";

import Navbar from "../../Layout/Navbar";
import { Link } from "react-router-dom";

const { Sider } = Layout;

const AdminSider = ({ selectedKey }) => {
  return (
    <div>
      <Navbar padding={75} />
      <Sider breakpoint="md" collapsible theme="light">
        <Menu
          mode="inline"
          style={{ minHeight: "85vh" }}
          defaultSelectedKeys={[selectedKey]}
        >
          {/* <Menu.Item key="1" icon={<PieChartOutlined />}>
            <Link to="/admin/dashboard">Dashboard</Link>
          </Menu.Item> */}
          <Menu.Item key="1" icon={<PartitionOutlined />}>
            <Link to="/admin/manage/categories">Categories</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<SkinOutlined />}>
            <Link to="/admin/manage/products">Products</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            <Link to="/admin/manage/users">Users</Link>
          </Menu.Item>

          <Menu.Item key="4" icon={<ShopOutlined />}>
            <Link to="/admin/manage/orders">Orders</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </div>
  );
};

export default AdminSider;
