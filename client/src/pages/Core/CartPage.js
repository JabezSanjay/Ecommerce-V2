import React, { useContext } from "react";
import { Row, Image, Button, Breadcrumb, Col } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { CartContext } from "../../hooks/CartContext";
import Navbar from "../../Layout/Navbar";
import TableLayout from "../../components/TableLayout";
import styled from "styled-components";

const CartPage = () => {
  const { cartItems, total, removeProduct } = useContext(CartContext);

  const columns = [
    {
      title: "Image",
      key: "_id",
      render: (record) => (
        <Image src={record.image_url} alt="Product image" width={100} />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "_id",
      render: (text) => <h4>{text}</h4>,
    },

    {
      title: "Count",
      dataIndex: "count",
      key: "_id",
      render: (text) => <h4>{text}</h4>,
    },

    {
      title: "Total price in Rs.",
      dataIndex: "total",
      key: "_id",
      render: (text) => <h4>{text}</h4>,
    },
    {
      title: "Actions",
      key: "_id",
      render: (record) => (
        <Button
          type="danger"
          icon={<ShoppingCartOutlined />}
          onClick={() => removeProduct(record)}
        >
          Remove
        </Button>
      ),
    },
  ];
  return (
    <CartTag>
      <Navbar />

      <Row style={{ paddingTop: 120 }} justify="center">
        <Col span={19}>
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Cart</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <TableLayout
          columns={columns}
          dataSource={cartItems}
          createButton={false}
          pagination={false}
          scroll={550}
        />
      </Row>

      <Row style={{ margin: "7.5vh 0 2vh 0" }} justify="center">
        <h1>Total Price : Rs. {total}</h1>
        {cartItems === [] ? (
          <div></div>
        ) : (
          <Button type="primary">Checkout</Button>
        )}
      </Row>
    </CartTag>
  );
};

export default CartPage;

const CartTag = styled.div`
  h1 {
    font-size: 1.25rem;
    margin-right: 20px;
  }
`;
