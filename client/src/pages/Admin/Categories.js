import { Col, Row, Button, message } from "antd";
import React, { useEffect, useState } from "react";
import AdminSider from "../../components/Sider";
import TableLayout from "../../components/TableLayout";
import { getAllCategories } from "./helper";
import Sidebar from "../../components/Sidebar/CategorySidebar";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [openCategorySidebar, setOpenCategorySidebar] = useState(false);

  useEffect(() => {
    getAllCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  }, []);

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
      render: (text, record) => (
        <div>
          <Button type="link">Edit</Button>
          <Button type="link" danger>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const dataSource = categories;

  return (
    <div>
      <Row>
        <Col>
          <AdminSider selectedKey="2" />
        </Col>
        <TableLayout
          columns={columns}
          dataSource={dataSource}
          tab="Categories"
          state={() => setOpenCategorySidebar(!openCategorySidebar)}
        />
      </Row>
      {error ? message.error(error) : <div></div>}
      {openCategorySidebar && (
        <Sidebar
          visible={openCategorySidebar}
          onClose={(value) => setOpenCategorySidebar(value)}
          success={(value) => setSuccess(value)}
        />
      )}
      {success && message.success("Successful operation!")}
    </div>
  );
};

export default Categories;
