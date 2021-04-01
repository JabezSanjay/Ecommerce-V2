import React from "react";
import { Menu, Layout } from "antd";
import {
  TeamOutlined,
  FileOutlined,
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Navbar from "../../Layout/Navbar";

const { Header, Sider, Content } = Layout;

const { SubMenu } = Menu;

const AdminDashboard = () => {
  return (
    <>
      <Navbar />
      <Sider collapsed={true} style={{ paddingTop: "7.5vh" }}>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Option 1
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Option 2
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="User">
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<FileOutlined />}>
            Files
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
};

export default AdminDashboard;
