import React, { useState, useEffect } from "react";
import AdminSider from "../../components/Sider/AdminSider";
import TableLayout from "../../components/TableLayout";
import { Col, message, Row, Typography } from "antd";
import { isAuthenticated } from "../Auth/helper";
import { getAllOrders } from "./helper";
const { Paragraph } = Typography;

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
    {
      title: "Address",
      dataIndex: "address",
      key: "_id",
      render: (record) => (
        <Paragraph
          ellipsis={{
            rows: 1,
            expandable: true,
            symbol: "more",
          }}
        >
          {record.doorNo}, {record.streetName}, {record.district},{" "}
          {record.state}
        </Paragraph>
      ),
    },
  ];

  return (
    <Row>
      <Col>
        <AdminSider selectedKey="4" />
      </Col>
      <TableLayout
        columns={columns}
        dataSource={orders}
        tab="Orders"
        loading={loading}
        scroll={470}
      />
      {error && message.error(error)}
    </Row>
  );
};

export default Orders;
