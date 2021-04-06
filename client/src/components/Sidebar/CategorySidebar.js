import React, { useState } from "react";
import { Drawer, Form, Input, Button, message } from "antd";
import { createCategory } from "../../pages/Admin/helper";
import { isAuthenticated } from "../../pages/Auth/helper";

const Siderbar = ({ visible, onClose, success }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { user, token } = isAuthenticated();
  const Close = (value) => {
    onClose(value);
  };
  const onSubmit = () => {
    setError("");
    success(false);
    setLoading(!loading);

    //backend request
    createCategory(user._id, token, { name }).then((data) => {
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
  return (
    <>
      <Drawer
        title="Create a new category"
        width={300}
        visible={visible}
        onClose={() => Close(false)}
      >
        <Form layout="vertical" size="large">
          <Form.Item
            name="name"
            label="Category name"
            rules={[{ required: true, message: "Please enter a name!" }]}
          >
            <Input
              placeholder="Enter a category name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              onClick={onSubmit}
              loading={loading}
              block
            >
              Create
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
      {error && message.error(error)}
    </>
  );
};

export default Siderbar;
