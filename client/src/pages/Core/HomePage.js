import React from "react";
import Navbar from "../../Layout/Navbar";
import ProductCard from "../../components/Card";
import { Row, Col, AutoComplete } from "antd";
import styled from "styled-components";

const HomePage = () => {
  return (
    <HomepageTag>
      <Navbar />

      <div className="product-card">
        <Row justify="space-around" align="middle" gutter={[16, 24]}>
          <Col>
            <ProductCard />
          </Col>
          <Col>
            <ProductCard />
          </Col>
        </Row>
      </div>
    </HomepageTag>
  );
};

export default HomePage;

const HomepageTag = styled.div`
  .product-card {
    padding: 15vh 0 10vh 0;
  }
`;
