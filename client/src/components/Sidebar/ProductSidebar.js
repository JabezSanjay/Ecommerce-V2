import React from "react";
import { Drawer, Form, Input, Button, message } from "antd";

const ProductSidebar = ({ visible, onClose }) => {
  const Close = (value) => {
    onClose(value);
  };
  return (
    <>
      <Drawer width={300} visible={visible} onClose={() => Close(false)}>
        <Form
          layout="vertical"
          size="large"
          //   onFinish={create ? onCreateSubmit : onSubmitEdit}
          fields={[
            {
              name: ["name"],
              //   value: name,
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
                // setName(e.target.value);
              }}
            />
          </Form.Item>
          {/* <Form.Item>
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
      </Form.Item> */}
        </Form>
      </Drawer>
      {/* {error && message.error(error)} */}
    </>
  );
};

export default ProductSidebar;
