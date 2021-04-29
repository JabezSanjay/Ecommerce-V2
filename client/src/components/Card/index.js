import React, { useEffect, useState, useContext } from "react";
import { Card, Button, Space, message } from "antd";
import {
  ShoppingCartOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { addItemtoCart } from "../../pages/Core/helper";
import { CartContext } from "../../hooks/CartContext";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const [productCount, setProductCount] = useState(product.count);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [cart, setCart] = useContext(CartContext);

  useEffect(() => {
    setLoading(false);
  }, []);

  const addToCart = () => {
    product.count = productCount;
    setCart(productCount);
    addItemtoCart(product);
    message.success(`${product.name} has been added to the cart!`);
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
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              onClick={addToCart}
            >
              Add to Cart
            </Button>
          </Space>
        </Button.Group>,
      ]}
    >
      <Meta title={product.name} description={product.category.name} />
    </Card>
  );
};

export default ProductCard;
