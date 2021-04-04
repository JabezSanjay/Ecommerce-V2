import { Col, Row, Table } from "antd";
import React from "react";
import AdminSider from "../../components/AdminSider";

const Categories = () => {
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  return (
    <div>
      <Row>
        <Col xl={4} lg={6} md={7} sm={4} xs={6}>
          <AdminSider selectedKey="2" />
        </Col>
        <Col xl={19} lg={18} md={17} sm={20} xs={18}>
          <Table
            style={{ marginTop: "10vh" }}
            dataSource={dataSource}
            columns={columns}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Categories;
