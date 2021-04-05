import { Col, Row, Button } from "antd";
import React from "react";
import AdminSider from "../../components/Sider";
import TableLayout from "../../components/TableLayout";

const Categories = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <h4>{text}</h4>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div>
          <Button type="link">Edit</Button>
          <Button type="link" danger>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const dataSource = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
    },
  ];

  return (
    <div>
      <Row>
        <Col>
          <AdminSider selectedKey="2" />
        </Col>
        <TableLayout
          columns={columns}
          dataSource={dataSource}
          tab={"Categories"}
        />
      </Row>
    </div>
  );
};

export default Categories;
