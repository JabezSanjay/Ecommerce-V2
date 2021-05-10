import React, { useContext } from "react";
import { Row, Image } from "antd";
import { CartContext } from "../../hooks/CartContext";
import Navbar from "../../Layout/Navbar";
import TableLayout from "../../components/TableLayout";

const CartPage = () => {
  const { cartItems } = useContext(CartContext);

  const columns = [
    {
      title: "Image",
      key: "image",
      render: (record) => (
        <Image src={record.image_url} alt="Product image" width={100} />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "_id",
      render: (text) => <h4>{text}</h4>,
    },

    {
      title: "Count",
      dataIndex: "count",
      key: "count",
      render: (text) => <h4>{text}</h4>,
    },

    {
      title: "Total price in Rs.",
      dataIndex: "total",
      key: "total",
      render: (text) => <h4>{text}</h4>,
    },
  ];
  return (
    <div>
      <Navbar />
      <Row style={{ paddingTop: 80 }} justify="center" gutter={[16, 24]}>
        <TableLayout
          columns={columns}
          dataSource={cartItems}
          createButton={false}
          pagination={false}
          scroll={550}
        />
      </Row>
    </div>
  );
};

export default CartPage;
