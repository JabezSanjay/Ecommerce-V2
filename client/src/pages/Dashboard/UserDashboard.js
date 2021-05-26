import React, { useEffect, useState } from "react";
import UserSider from "../../components/Sider/UserSider";
import { getAllUserOrders } from "./helper";
import { Carousel, Col, Row } from "antd";
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
      <Row align="middle" gutter={[16, 24]}>
        <Col xl={3} lg={5} md={6} sm={4} xs={5}>
          <UserSider selectedKey="1" />
        </Col>

        <Col xl={21} lg={19} md={18} sm={20} xs={19}>
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            pagination={{ clickable: true }}
          >
            {itemsToRender}
          </Swiper>
        </Col>
      </Row>
    </DashboardTag>
  );
};

export default UserDashboard;

const DashboardTag = styled.div`
  .userDashboard {
    &__column {
      margin-top: 10vh;
    }
    &__card {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
