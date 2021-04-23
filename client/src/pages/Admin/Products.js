import { Button, Popconfirm, Row, Col, message } from "antd";
import React, { useState, useEffect } from "react";
import { deleteProduct, getAllProducts } from "../Admin/helper";
import AdminSider from "../../components/Sider";
import TableLayout from "../../components/TableLayout";
import Sidebar from "../../components/Sidebar/ProductSidebar";
import { isAuthenticated } from "../Auth/helper";

const Products = () => {
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  const [openCreateProductSidebar, setCreateOpenProductSidebar] = useState(
    false
  );
  const preload = () => {
    getAllProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, [reload]);

  const { user, token } = isAuthenticated();

  const deleteThisProduct = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "_id",
      render: (text) => <h4>{text}</h4>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => <h4>₹ {text}</h4>,
    },
    {
      title: "Sold",
      dataIndex: "sold",
      key: "sold",
      render: (text) => <h4>{text}</h4>,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      render: (text) => <h4>{text}</h4>,
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <div>
          <Button type="link">Edit</Button>

          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => deleteThisProduct(record._id)}
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Row>
        <Col>
          <AdminSider selectedKey="3" />
        </Col>
        <TableLayout
          columns={columns}
          dataSource={products}
          tab="Products"
          state={() => setCreateOpenProductSidebar(!openCreateProductSidebar)}
          scroll={470}
        />
      </Row>
      {error && message.error(error)}
      {openCreateProductSidebar && (
        <Sidebar
          visible={openCreateProductSidebar}
          onClose={(value) => setCreateOpenProductSidebar(value)}
          setReload={setReload}
          reload={reload}
          edit={false}
          create={true}
        />
      )}
    </div>
  );
};

export default Products;
