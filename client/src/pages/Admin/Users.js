import React, { useState, useEffect } from "react";
import AdminSider from "../../components/Sider";
import { Row, Col } from "antd";
import TableLayout from "../../components/TableLayout";
import { getAllUsers } from "./helper";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [setError] = useState([]);

  const preload = () => {
    getAllUsers().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setUsers(data);
      }
    });
  };

  useEffect(() => {
    preload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "_id",
      render: (text) => <h4>{text}</h4>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <h4>{text}</h4>,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text) => <h4>{text === 1 ? "Admin" : "User"}</h4>,
    },
  ];

  return (
    <div>
      <Row>
        <Col>
          <AdminSider selectedKey="4" />
        </Col>
        <TableLayout tab="Users" columns={columns} dataSource={users} />
      </Row>
    </div>
  );
};

export default Users;
