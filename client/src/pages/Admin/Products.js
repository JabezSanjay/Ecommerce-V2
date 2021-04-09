import { Button, Popconfirm, Row, Col, Table } from "antd";
import React, { useState, useEffect } from "react";
import { getAllProducts } from "../Admin/helper";
import AdminSider from "../../components/Sider";
import TableLayout from "../../components/TableLayout";

const Products = () => {
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  }, []);

  const expandedRowRender = () => {
    const columns = [
      {
        title: "Price",
        dataIndex: "price",
        key: "_id",
        render: (text) => <h4>₹ {text}</h4>,
      },
      {
        title: "Sold",
        dataIndex: "sold",
        key: "_id",
        render: (text) => <h4>{text}</h4>,
      },
      {
        title: "Stock",
        dataIndex: "stock",
        key: "_id",
        render: (text) => <h4>{text}</h4>,
      },
    ];

    const data = products;
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "_id",
      render: (text) => <h4>{text}</h4>,
    },

    {
      title: "Action",
      key: "action",
      render: (record) => (
        <div>
          <Button type="link">Edit</Button>

          <Popconfirm title="Sure to delete?">
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const dataSource = products;
  console.log(products);

  return (
    <div>
      <Row>
        <Col>
          <AdminSider selectedKey="3" />
        </Col>
        <TableLayout
          columns={columns}
          dataSource={dataSource}
          tab="Products"
          expandableValues={{ expandedRowRender }}
        />
      </Row>
    </div>
  );
};

export default Products;
