import React, { useEffect, useState, useContext } from "react";
import { Card, Button, Space } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { CartContext } from "../../hooks/CartContext";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const { addProduct, cartItems, increase } = useContext(CartContext);

  const isInCart = (product) => {
    return !!cartItems.find((item) => item._id === product._id);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Card
      loading={loading}
      style={{ width: 300 }}
      cover={<img alt={product.photo.name} src={product.photo.url} />}
      actions={[
        <Button.Group>
          <Space>
            {isInCart(product) && (
              <Button
                type="primary"
                icon={<ShoppingCartOutlined />}
                onClick={() => increase(product)}
              >
                Add More
              </Button>
            )}
            {!isInCart(product) && (
              <Button
                type="primary"
                icon={<ShoppingCartOutlined />}
                onClick={() => addProduct(product)}
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
