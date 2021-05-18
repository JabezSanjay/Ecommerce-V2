import React, { useContext } from "react";
import { Row, Image, Button, Breadcrumb, Col, message } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { CartContext } from "../../hooks/CartContext";
import Navbar from "../../Layout/Navbar";
import TableLayout from "../../components/TableLayout";
import styled from "styled-components";
import { API } from "../../backend";
import { isAuthenticated } from "../Auth/helper";
import { createOrder, emptyCart } from "./helper";

const CartPage = () => {
  const { cartItems, total, removeProduct } = useContext(CartContext);

  // eslint-disable-next-line
  const authToken = isAuthenticated() && isAuthenticated().token;
  // eslint-disable-next-line
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = displayRazorPay;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorPay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      message.error("Error connecting payment!");
    }

    const { token } = isAuthenticated();

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const body = { total };

    const data = await fetch(`${API}/checkout`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    }).then((response) => {
      // const orderData = {
      //   products: cartItems,
      //   amount: total,
      // };
      // createOrder(userId, authToken, orderData);

      return response.json();
    });

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "Ecommerce-V2",
      description: "This is a test transaction!",
      order_id: data.id,
      theme: {
        color: "#1890FF",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

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
      key: "name",
      render: (text) => <h4>{text}</h4>,
    },

    {
      title: "Count",
      dataIndex: "count",
      key: "_id",
      render: (text) => <h4>{text}</h4>,
    },

    {
      title: "Price in Rs.",
      dataIndex: "price_in_rs",
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

      <Row justify="center">
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
        {cartItems.length >= 1 && (
          <Button type="primary" onClick={displayRazorPay}>
            Checkout
          </Button>
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
