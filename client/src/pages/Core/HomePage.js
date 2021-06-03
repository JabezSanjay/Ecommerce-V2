import React, { useState, useEffect } from "react";
import Navbar from "../../Layout/Navbar";
import ProductCard from "../../components/Card/ProductCard";
import { Row, Col, Pagination, Input, Button, Space, Spin } from "antd";
import styled from "styled-components";
import { getAllProducts } from "../Admin/helper";
import { SearchOutlined } from "@ant-design/icons";

const HomePage = () => {
  // const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const [total, setTotal] = useState();
  const [searchValue, setSearchValue] = useState("");

  const preloadProducts = async (page, search) => {
    setLoading(true);
    await getAllProducts(page, search).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setTotal(data.total);
        setProducts(
          data.products.map((d) => {
            return {
              name: d.name,
              category: d.category,
              photo: d.photo,
              price_in_rs: `Rs.${d.price}`,
              price: d.price,
              _id: d._id,
              image_url: d.photo.url,
            };
          })
        );
      }
    });
    setLoading(false);
  };

  const preload = async () => {
    setPageLoading(true);
    // getAllCategories().then((data) => {
    //   if (data.error) {
    //     setError(data.error);
    //   } else {
    //     setCategories(data);
    //   }
    // });
    await preloadProducts();

    setPageLoading(false);
  };

  useEffect(() => {
    preload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HomepageTag>
      <Navbar />

      <Row justify="center">
        <Input
          placeholder="input search text"
          style={{ width: 250 }}
          allowClear
          size="large"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button
          icon={<SearchOutlined />}
          size="large"
          onClick={() => preloadProducts(1, searchValue)}
        />
      </Row>

      <div className="product-card">
        <Row justify="space-around" align="middle" gutter={[16, 24]}>
          {pageLoading && <Spin size="large" />}
          {products &&
            products.length > 0 &&
            products
              // eslint-disable-next-line array-callback-return
              .map((product, key) => {
                return (
                  <Col key={key} xxl={5}>
                    <ProductCard
                      product={product}
                      products={products}
                      loading={loading}
                    />
                  </Col>
                );
              })}
          {products.length === 0 && searchValue !== "" && (
            <Space>
              <h1>No Products!</h1>
              <Button
                onClick={() => {
                  preloadProducts();
                }}
              >
                Show All
              </Button>
            </Space>
          )}
        </Row>

        {products.length !== 0 && searchValue === "" && (
          <Row justify="center" style={{ marginTop: "30px" }}>
            <Pagination
              total={total}
              defaultPageSize={4}
              onChange={(value) => {
                preloadProducts(value);
              }}
              defaultCurrent={1}
            />
          </Row>
        )}
      </div>
    </HomepageTag>
  );
};

export default HomePage;

const HomepageTag = styled.div`
  .product-card {
    padding: 7.5vh 0 7.5vh 0;
  }
`;
