import React, { useEffect, useState } from "react";
import UserSider from "../../components/Sider/UserSider";
import { getAllUserOrders } from "./helper";
import { Breadcrumb, Button, Col, message, Row, Space } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
// Import Swiper core and required modules
import SwiperCore, { Pagination } from "swiper/core";
import { isAuthenticated } from "../Auth/helper";
import ProductCard from "../../components/Card/ProductCard";
import styled from "styled-components";
import dashboardIllustration from "../../assets/images/dashboard-illustration.svg";
import { Link } from "react-router-dom";

SwiperCore.use([Pagination]);

const UserDashboard = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const { token, user } = isAuthenticated();

  useEffect(() => {
    getAllUserOrders(user._id, token).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let itemsToRender;
  products
    ? (itemsToRender = products.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <div className="userDashboard__card">
              <ProductCard product={item} page="Dashboard" />
            </div>
          </SwiperSlide>
        );
      }))
    : (itemsToRender = "Loading...");
  return (
    <DashboardTag>
      <Row>
        <Col xxl={4} xl={4} lg={4} md={5} sm={4} xs={5}>
          <UserSider selectedKey="1" />
        </Col>
        {error && message.error(error)}

        <Col xxl={20} xl={20} lg={20} md={19} sm={20} xs={19}>
          <div className="userDashboard__column">
            <Breadcrumb className="left-margin">
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>User Dashboard</Breadcrumb.Item>
            </Breadcrumb>
            <h1>Ordered Products!</h1>
            <img src={dashboardIllustration} alt="" />
            {products.length === 0 ? (
              <Space style={{ display: "flex", justifyContent: "center" }}>
                <h2>No Products Ordered!</h2>
                <Link to="/">
                  <Button type="primary" icon={<ShoppingCartOutlined />}>
                    Buy now
                  </Button>
                </Link>
              </Space>
            ) : (
              <Swiper
                spaceBetween={50}
                slidesPerView={1}
                pagination={{ clickable: true }}
              >
                {itemsToRender}
              </Swiper>
            )}
          </div>
        </Col>
      </Row>
    </DashboardTag>
  );
};

export default UserDashboard;

const DashboardTag = styled.div`
  .left-margin {
    margin-left: 2em;
  }
  .userDashboard {
    &__column {
      margin-top: 10vh;
      h1 {
        font-size: 1.5rem;
        text-align: center;
        margin: 1.5em 0 2em 0;
      }
      h2 {
        font-size: 1.05rem;
      }
      img {
        width: 40vh;
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 5em;
      }
    }
    &__card {
      display: flex;
      justify-content: center;
    }
  }
`;
