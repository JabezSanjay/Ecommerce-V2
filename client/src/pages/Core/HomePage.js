import React, { useState, useEffect } from "react";
import Navbar from "../../Layout/Navbar";
import ProductCard from "../../components/Card";
import { Row, Col, Select, Button } from "antd";
import styled from "styled-components";
import { SearchOutlined } from "@ant-design/icons";
import { getAllCategories, getAllProducts } from "../Admin/helper";

const { Option } = Select;

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [setError] = useState("");
  const [searchCategory, setCategorySearch] = useState("");
  const [searchCategoryValue, setCategorySearchValue] = useState("");

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
        setProducts(
          data.map((d) => {
            return {
              count: 1,
              name: d.name,
              category: d.category,
              photo: d.photo,
              _id: d._id,
            };
          })
        );
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
        <Select
          style={{ width: 200 }}
          onChange={(value) => setCategorySearch(value)}
          placeholder="Search By Category"
        >
          <Option value="all">All</Option>
          {categories.map((category, key) => {
            return (
              <Option value={category.name} key={key}>
                {category.name}
              </Option>
            );
          })}
        </Select>

        <Button
          icon={<SearchOutlined />}
          onClick={() => {
            setCategorySearchValue(searchCategory);
          }}
        />
      </Row>

      <div className="product-card">
        <Row justify="space-around" align="middle" gutter={[16, 24]}>
          {products
            // eslint-disable-next-line array-callback-return
            .filter((typedProduct) => {
              if (
                typedProduct.category.name
                  .toLowerCase()
                  .includes(searchCategoryValue.toLowerCase())
              ) {
                return typedProduct;
              } else if (searchCategoryValue === "all") {
                return typedProduct;
              }
            })
            .map((product, key) => {
              return (
                <Col key={key} xxl={5}>
                  <ProductCard product={product} />
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
