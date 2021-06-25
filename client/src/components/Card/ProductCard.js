import React, { useState, useContext, useEffect } from "react";
import { Card, Button, Space, Image, message } from "antd";
import {
  ShoppingCartOutlined,
  MinusOutlined,
  PlusOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { CartContext } from "../../hooks/CartContext";
import ProgressiveLoading from "../../assets/images/image-loading.png";
import {
  addFavorites,
  loadFavorites,
  removeFavorites,
} from "../../pages/Core/helper";
import { isAuthenticated } from "../../pages/Auth/helper";

const { Meta } = Card;

const ProductCard = ({ product, loading, page }) => {
  const { user, token } = isAuthenticated();
  const [productCount, setProductCount] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    user &&
      loadFavorites(user._id, token).then((data) => {
        // eslint-disable-next-line array-callback-return
        data.map((d) => {
          if (d._id === product._id) {
            setIsFavorite(true);
          }
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { addProduct, cartItems, increase } = useContext(CartContext);

  const isInCart = (product) => {
    return !!cartItems.find((item) => item._id === product._id);
  };

  const addToCart = () => {
    addProduct(product, productCount);
    message.success(`${product.name} added to cart!`);
  };

  const decreaseCount = () => {
    return productCount > 1
      ? setProductCount(productCount - 1)
      : setProductCount(1);
  };

  const increaseCount = () => {
    setProductCount(productCount + 1);
  };

  const increaseCartItems = (product, productCount) => {
    increase(product, productCount);
  };

  const addToFavorite = (product) => {
    setIsFavorite(!isFavorite);
    addFavorites(user._id, token, product);
    message.success(`${product.name} is added to your favorites!`);
  };

  const removeFromFavorite = (favorite) => {
    setIsFavorite(!isFavorite);
    removeFavorites(user._id, token, favorite);
    message.error(`${product.name} is removed from your favorites!`);
  };

  return (
    <>
      {page === "Dashboard" ? (
        <Card loading={loading} style={{ width: 300 }}>
          <Meta title={product.name} description={product.amount} />
        </Card>
      ) : (
        <Card
          loading={loading}
          style={{ width: 300 }}
          cover={
            <Image
              alt={product.photo.name}
              src={loading ? ProgressiveLoading : product.photo.url}
              placeholder={
                <Image preview={false} src={ProgressiveLoading} height={200} />
              }
            />
          }
          actions={[
            <Button.Group>
              <Space>
                <Button icon={<MinusOutlined />} onClick={decreaseCount} />
                <h2>{productCount}</h2>
                <Button icon={<PlusOutlined />} onClick={increaseCount} />
                {isInCart(product) && (
                  <Button
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    onClick={() => increaseCartItems(product, productCount)}
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
                {user && !isFavorite ? (
                  <Button
                    icon={<HeartOutlined />}
                    onClick={() => {
                      addToFavorite(product);
                    }}
                  />
                ) : (
                  user && (
                    <Button
                      type="primary"
                      icon={<HeartOutlined />}
                      onClick={() => {
                        removeFromFavorite(product);
                      }}
                    />
                  )
                )}
              </Space>
            </Button.Group>,
          ]}
        >
          <Meta title={product.name} description={product.price_in_rs} />
        </Card>
      )}
    </>
  );
};

export default ProductCard;
