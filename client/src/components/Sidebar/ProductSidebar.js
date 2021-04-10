import React from "react";
import {
  Drawer,
  Form,
  Input,
  Upload,
  message,
  Button,
  Select,
  InputNumber,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const ProductSidebar = ({ visible, onClose }) => {
  const Close = (value) => {
    onClose(value);
  };
  const props = {
    onChange(info) {
      if (info.file.status !== "uploading") {
        message.loading("Loading!");
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
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
            label="Product name"
            rules={[{ required: true, message: "Please enter a name!" }]}
          >
            <Input
              name="name"
              placeholder="Enter a product name"
              onChange={(e) => {
                // setName(e.target.value);
              }}
            />
          </Form.Item>

          <Form.Item
            name="category"
            label="Product category"
            rules={[{ required: true, message: "Please select a category!" }]}
          >
            <Select style={{ width: 250 }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="disabled" disabled>
                Disabled
              </Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="price"
            label="Product price"
            rules={[{ required: true, message: "Please enter a price!" }]}
          >
            <InputNumber
              style={{ width: 250 }}
              min={1}
              max={10000}
              defaultValue={400}
            />
          </Form.Item>
          <Form.Item
            name="stock"
            label="Product stock"
            rules={[{ required: true, message: "Please enter a stock!" }]}
          >
            <InputNumber
              style={{ width: 250 }}
              min={1}
              max={100}
              defaultValue={30}
            />
          </Form.Item>
          <Form.Item
            name="image"
            label="Product image"
            rules={[{ required: true, message: "Please upload an image!" }]}
          >
            <Upload {...props}>
              <Button
                icon={<UploadOutlined />}
                size="large"
                htmlType="submit"
                style={{ width: 250 }}
              >
                Click to Upload
              </Button>
            </Upload>
          </Form.Item>
          <Button type="primary" block size="large" htmlType="submit">
            Create
          </Button>
        </Form>
      </Drawer>
      {/* {error && message.error(error)} */}
    </>
  );
};

export default ProductSidebar;
