import React, { useState, useEffect } from "react";
import AdminSider from "../../components/Sider/AdminSider";
import TableLayout from "../../components/TableLayout";
import { Col, Row } from "antd";
import { isAuthenticated } from "../Auth/helper";
import { getAllOrders } from "./helper";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { token, user } = isAuthenticated();

  useEffect(() => {
    setLoading(true);
    getAllOrders(token, user._id).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setOrders(data);
        setLoading(false);
      }
    });
  }, [token, user._id]);

  const columns = [
    {
      title: "Amount",
      dataIndex: "amount",
      key: "_id",
      render: (text) => <h4>{text}</h4>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "_id",
      render: (text) => <h4>{text}</h4>,
    },
  ];

  return (
    <Row>
      <Col>
        <AdminSider selectedKey="5" />
      </Col>
      <TableLayout
        columns={columns}
        dataSource={orders}
        tab="Orders"
        loading={loading}
      />
    </Row>
  );
};

export default Orders;
