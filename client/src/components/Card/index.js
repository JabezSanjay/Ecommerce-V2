import React, { useState } from "react";

import { Card, Button, Space } from "antd";
import {
  ShoppingCartOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { Meta } = Card;

const ProductCard = ({ name, category, image, imageName, count }) => {
  const [productCount, setProductCount] = useState(count);

  return (
    <Card
      style={{ width: 300 }}
      cover={<img alt={imageName} src={image} />}
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
      <Meta title={name} description={category} />
    </Card>
  );
};

export default ProductCard;
