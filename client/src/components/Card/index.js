import React, { useEffect, useState } from "react";

import { Card, Button, Space } from "antd";
import {
  ShoppingCartOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const [productCount, setProductCount] = useState(product.count);
  const [loading, setLoading] = useState(true);

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
            <Button type="primary" icon={<ShoppingCartOutlined />}>
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
