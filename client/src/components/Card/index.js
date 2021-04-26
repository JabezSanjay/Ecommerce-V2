import React from "react";

import { Card, Button, Space } from "antd";
import {
  ShoppingCartOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { Meta } = Card;

const ProductCard = () => {
  return (
    <Card
      style={{ width: 300 }}
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[
        <Button.Group>
          <Space>
            <Button icon={<MinusOutlined />} />
            <h2>1</h2>
            <Button icon={<PlusOutlined />} />
            <Button type="primary" icon={<ShoppingCartOutlined />}>
              Add to Cart
            </Button>
          </Space>
        </Button.Group>,
      ]}
    >
      <Meta title="Card title" description="This is the description" />
    </Card>
  );
};

export default ProductCard;
