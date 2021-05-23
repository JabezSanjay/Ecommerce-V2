import React, { useState, useContext } from "react";
import { Card, Button, Space, Image, message } from "antd";
import {
  ShoppingCartOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { CartContext } from "../../hooks/CartContext";
import ProgressiveLoading from "../../assets/images/image-loading.png";

const { Meta } = Card;

const ProductCard = ({ product, loading }) => {
  const [productCount, setProductCount] = useState(1);

  const { addProduct, cartItems, increase } = useContext(CartContext);

  const isInCart = (product) => {
    return !!cartItems.find((item) => item._id === product._id);
  };

  const addToCart = () => {
    addProduct(product, productCount);
    message.success(`${product.name} added to cart!`);
  };

  return (
    <Card
      loading={loading}
      style={{ width: 300 }}
      cover={
        <Image
          alt={product.photo.name}
          src={product.photo.url}
          placeholder={
            <Image preview={false} src={ProgressiveLoading} height={200} />
          }
        />
      }
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
                onClick={addToCart}
              >
                Add to Cart
              </Button>
            )}
          </Space>
        </Button.Group>,
      ]}
    >
      <Meta title={product.name} description={product.price_in_rs} />
    </Card>
  );
};

export default ProductCard;
