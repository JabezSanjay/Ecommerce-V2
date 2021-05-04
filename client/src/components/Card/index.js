import React, { useState, useContext } from "react";
import { Card, Button, Space } from "antd";
import {
  ShoppingCartOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { CartContext } from "../../hooks/CartContext";

const { Meta } = Card;

const ProductCard = ({ product, loading }) => {
  const [productCount, setProductCount] = useState(1);

  const { addProduct, cartItems, increase } = useContext(CartContext);

  const isInCart = (product) => {
    return !!cartItems.find((item) => item._id === product._id);
  };

  return (
    <Card
      loading={loading}
      style={{ width: 300 }}
      cover={<img alt={product.photo.name} src={product.photo.url} />}
      actions={[
        <Button.Group>
          <Space>
            <Button
              icon={<MinusOutlined />}
              onClick={() =>
                productCount > 1
                  ? setProductCount(productCount - 1)
                  : setProductCount(1)
              }
            />
            <h2>{productCount}</h2>
            <Button
              icon={<PlusOutlined />}
              onClick={() => setProductCount(productCount + 1)}
            />
            {isInCart(product) && (
              <Button
                type="primary"
                icon={<ShoppingCartOutlined />}
                onClick={() => increase(product, productCount)}
              >
                Add More
              </Button>
            )}
            {!isInCart(product) && (
              <Button
                type="primary"
                icon={<ShoppingCartOutlined />}
                onClick={() => addProduct(product, productCount)}
              >
                Add to Cart
              </Button>
            )}
          </Space>
        </Button.Group>,
      ]}
    >
      <Meta title={product.name} description={product.category.name} />
    </Card>
  );
};

export default ProductCard;
