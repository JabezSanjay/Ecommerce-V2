import React, { useState, useEffect } from "react";
import Navbar from "../../Layout/Navbar";
import ProductCard from "../../components/Card/ProductCard";
import { Row, Col, Select, Button, Pagination } from "antd";
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
  const [loading, setLoading] = useState(true);
  const [minValue, setminValue] = useState(0);
  const [maxValue, setmaxValue] = useState(4);
  const [numEachPage, setNumEachPage] = useState(4);

  const preload = () => {
    setLoading(true);
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

  useEffect(() => {
    preload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePagination = (value, pagesize) => {
    setNumEachPage(pagesize);
    setminValue((value - 1) * numEachPage);
    setmaxValue(value * numEachPage);
  };

  return (
    <HomepageTag>
      <Navbar />

      <Row justify="center">
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
          {products &&
            products.length > 0 &&
            products
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
              .slice(minValue, maxValue)
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
        </Row>
        {(searchCategoryValue === "" || searchCategoryValue === "all") && (
          <Row justify="center" style={{ marginTop: "30px" }}>
            <Pagination
              defaultPageSize={numEachPage}
              total={products.length}
              onChange={handlePagination}
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
    padding: 10vh 0 10vh 0;
  }
`;
