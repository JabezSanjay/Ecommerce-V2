import { Col, Row, Button, message, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import AdminSider from "../../components/Sider/AdminSider";
import TableLayout from "../../components/TableLayout";
import { getAllCategories, deleteCategory } from "./helper";
import Sidebar from "../../components/Sidebar/CategorySidebar";
import { isAuthenticated } from "../Auth/helper";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [reload, setReload] = useState(false);
  const [openCreateCategorySidebar, setCreateOpenCategorySidebar] =
    useState(false);
  const [openEditCategorySidebar, setEditOpenCategorySidebar] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, token } = isAuthenticated();
  const preload = () => {
    setLoading(true);
    getAllCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
        setLoading(false);
      }
    });
  };
  useEffect(() => {
    preload();
  }, [reload]);

  const onClickEdit = (record) => {
    setCategoryId(record._id);
    setEditOpenCategorySidebar(true);
  };

  const deleteThisCategory = (productId) => {
    setLoading(true);
    deleteCategory(productId, user._id, token).then((data) => {
      if (data.error) {
        setError(error);
      } else {
        message.success("Category deleted!");
        preload();
        setLoading(false);
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
      title: "Action",
      key: "action",
      render: (record) => (
        <div>
          <Button
            type="link"
            onClick={() => {
              onClickEdit(record);
            }}
          >
            Edit
          </Button>

          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => deleteThisCategory(record._id)}
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
          <AdminSider selectedKey="1" />
        </Col>
        <TableLayout
          columns={columns}
          dataSource={categories}
          tab="Categories"
          state={() => setCreateOpenCategorySidebar(!openCreateCategorySidebar)}
          success={success}
          setSuccess={(value) => setSuccess(value)}
          loading={loading}
        />
      </Row>
      {error && message.error(error)}

      {openCreateCategorySidebar && (
        <Sidebar
          visible={openCreateCategorySidebar}
          onClose={(value) => setCreateOpenCategorySidebar(value)}
          success={(value) => setSuccess(value)}
          setReload={setReload}
          reload={reload}
          edit={false}
          create={true}
        />
      )}
      {openEditCategorySidebar && (
        <Sidebar
          visible={openEditCategorySidebar}
          onClose={(value) => setEditOpenCategorySidebar(value)}
          success={(value) => setSuccess(value)}
          setReload={setReload}
          reload={reload}
          edit={true}
          create={false}
          id={categoryId}
        />
      )}
    </div>
  );
};

export default Categories;
