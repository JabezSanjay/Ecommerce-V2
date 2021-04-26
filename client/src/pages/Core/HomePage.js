import React from "react";
import Navbar from "../../Layout/Navbar";
import ProductCard from "../../components/Card";
import { Row, Col, AutoComplete, Select, Space, Button } from "antd";
import styled from "styled-components";
import { SearchOutlined } from "@ant-design/icons";

const { Option } = Select;

const HomePage = () => {
  return (
    <HomepageTag>
      <Navbar />

      <Row style={{ paddingTop: 120 }} justify="center">
        <AutoComplete style={{ width: 200 }} placeholder="Search Products" />
        <Space size={60}>
          <Button icon={<SearchOutlined />} />

          <Select defaultValue="disabled" style={{ width: 200 }}>
            <Option value="disabled" disabled>
              Search by Category
            </Option>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </Space>
      </Row>

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
    padding: 10vh 0 10vh 0;
  }
`;
