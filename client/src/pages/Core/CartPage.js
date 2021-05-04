import { Row, Col } from "antd";
import React from "react";
import Navbar from "../../Layout/Navbar";

const CartPage = () => {
  return (
    <div>
      <Navbar />
      <Row style={{ paddingTop: 120 }} justify="center" gutter={[16, 24]}>
        <Col>
          <h1>Hey</h1>
        </Col>
        <Col>
          <h1>Hey</h1>
        </Col>
      </Row>
    </div>
  );
};

export default CartPage;
