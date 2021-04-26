import React, { useState, useEffect } from "react";
import Navbar from "../../Layout/Navbar";
import ProductCard from "../../components/Card";
import { Row, Col, AutoComplete, Select, Space, Button } from "antd";
import styled from "styled-components";
import { SearchOutlined } from "@ant-design/icons";
import { getAllCategories, getAllProducts } from "../Admin/helper";

const { Option } = Select;

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [setError] = useState("");

  const preload = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
    getAllProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            {categories.map((category, key) => {
              return (
                <Option value={category.name} key={category._id}>
                  {category.name}
                </Option>
              );
            })}
          </Select>
        </Space>
        <Button icon={<SearchOutlined />} />
      </Row>

      <div className="product-card">
        <Row justify="space-around" align="middle" gutter={[16, 24]}>
          {products.map((product, key) => {
            return (
              <Col>
                <ProductCard
                  name={product.name}
                  category={product.category.name}
                  image={product.photo.url}
                  imageName={product.photo.name}
                />
              </Col>
            );
          })}
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
