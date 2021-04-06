import React, { useEffect, useState } from "react";
import { Drawer, Form, Input, Button, message } from "antd";
import {
  createCategory,
  getaCategory,
  updateCategory,
} from "../../pages/Admin/helper";
import { isAuthenticated } from "../../pages/Auth/helper";

const Siderbar = ({
  visible,
  onClose,
  success,
  reload,
  setReload,
  create,
  edit,
  id,
}) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user, token } = isAuthenticated();

  const preload = (id) => {
    getaCategory(id).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setName(data.name);
      }
    });
  };

  useEffect(() => {
    edit ? preload(id) : <div></div>;
  }, [edit, id]);

  const Close = (value) => {
    onClose(value);
  };

  const onCreateSubmit = () => {
    setError("");
    success(false);
    setLoading(!loading);

    //backend request
    createCategory(user._id, token, { name }).then((data) => {
      setReload(!reload);
      if (data.error) {
        setError(true);
      } else {
        setError(false);
        success(true);
        setName("");
      }
    });
    onClose(false);
  };

  const onSubmitEdit = (event) => {
    setLoading(true);
    updateCategory(id, user._id, token, { name }).then((data) => {
      setReload(!reload);
      if (data.error) {
        setError(true);
      } else {
        setName(data.name);
        success(true);
        onClose(false);
      }
    });
  };

  return (
    <>
      <Drawer width={300} visible={visible} onClose={() => Close(false)}>
        <Form
          layout="vertical"
          size="large"
          onFinish={create ? onCreateSubmit : onSubmitEdit}
          fields={[
            {
              name: ["name"],
              value: name,
            },
          ]}
        >
          <Form.Item
            name="name"
            label="Category name"
            rules={[{ required: true, message: "Please enter a name!" }]}
          >
            <Input
              name="name"
              placeholder="Enter a category name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item>
            {create ? (
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                loading={loading}
                block
              >
                Create
              </Button>
            ) : (
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                loading={loading}
                block
              >
                Edit
              </Button>
            )}
          </Form.Item>
        </Form>
      </Drawer>
      {error && message.error(error)}
    </>
  );
};

export default Siderbar;
