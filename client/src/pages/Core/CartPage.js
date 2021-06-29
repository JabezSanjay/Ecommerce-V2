import React, { useState, useContext } from "react";
import {
  Row,
  Image,
  Button,
  Breadcrumb,
  Col,
  message,
  Modal,
  Form,
  Input,
  Select,
} from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { CartContext } from "../../hooks/CartContext";
import Navbar from "../../Layout/Navbar";
import TableLayout from "../../components/TableLayout";
import styled from "styled-components";
import { API } from "../../backend";
import { isAuthenticated } from "../Auth/helper";
import { createOrder } from "./helper";
import { Link, Redirect } from "react-router-dom";
import indianStates from "../../utils/indianStates";

const CartPage = () => {
  const { cartItems, total, removeProduct } = useContext(CartContext);

  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [address, setAddress] = useState({
    doorNo: "",
    streetName: "",
    district: "",
    state: "",
    country: "",
  });

  const { doorNo, streetName, district, country } = address;

  const handleChange = (name) => (event) => {
    setAddress({ ...address, [name]: event.target.value });
  };
  const handleSelect = (value) => {
    if (value === "India") {
      setAddress({ ...address, country: value });
    } else {
      setAddress({ ...address, state: value });
    }
  };

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
    setLoading(true);

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
      return response.json();
    });

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "Ecommerce-V2",
      description: "This is a test transaction!",
      order_id: data.id,
      handler: async function (response) {
        if (response) {
          // eslint-disable-next-line no-unused-vars
          const verification = await fetch(`${API}/verification`, {
            method: "POST",
            body: response.razorpay_signature,
          }).then((res) => {
            cartItems.map((item, key) => {
              return removeProduct(item);
            });
            const orderData = {
              products: cartItems,
              amount: total,
              address: address,
            };
            createOrder(userId, authToken, orderData);
          });
          setRedirect(true);
        }
      },
      theme: {
        color: "#1890FF",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    setLoading(false);
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
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
        {cartItems.length >= 1 && userId && (
          <Button type="primary" onClick={showModal}>
            Checkout
          </Button>
        )}
        {!userId && (
          <Link to="/signin">
            <Button type="primary">Signin</Button>
          </Link>
        )}
      </Row>
      {redirect && <Redirect to="/user/dashboard" />}
      <Modal
        title="Enter your shipping address!"
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={displayRazorPay}
        okText="Checkout"
        footer={false}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={displayRazorPay}
        >
          <Form.Item
            label="Door No."
            name="doorNo"
            onChange={handleChange("doorNo")}
            value={doorNo}
            rules={[
              { required: true, message: "Please enter your door number!" },
              { max: 30, message: "Enter within 30 words!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Street Name"
            name="streetName"
            onChange={handleChange("streetName")}
            value={streetName}
            rules={[
              { required: true, message: "Please enter your street name!" },
              { max: 30, message: "Enter within 30 words!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="District"
            name="districtName"
            onChange={handleChange("district")}
            value={district}
            rules={[
              { required: true, message: "Please enter your district name!" },
              { max: 30, message: "Enter within 30 words!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="State"
            name="state"
            rules={[{ required: true, message: "Please enter your state!" }]}
          >
            <Select
              onChange={handleSelect}
              showSearch
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {indianStates.map((indianState, key) => {
                return (
                  <Select.Option key={key} value={indianState}>
                    {indianState}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="Country"
            name="countryName"
            rules={[{ required: true, message: "Please enter your country!" }]}
          >
            <Select onChange={handleSelect} value={country}>
              <Select.Option value="India">India</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              loading={loading}
              style={{ float: "right" }}
            >
              Checkout
            </Button>
          </Form.Item>
        </Form>
      </Modal>
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
