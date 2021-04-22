import React, { useState, useEffect } from "react";
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
import { isAuthenticated } from "../../pages/Auth/helper";
import { createProduct, getAllCategories } from "../../pages/Admin/helper";

const { Option } = Select;

const ProductSidebar = ({ visible, onClose }) => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getaRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    createdProduct,
    formData,
    loading,
    photo,
    category,
  } = values;

  const preload = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    preload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Close = (value) => {
    onClose(value);
  };

  const onCreateSubmit = (event) => {
    setValues({ ...values, error: "", loading: true });
    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          photo: "",
          stock: "",
          loading: false,
          createdProduct: data.name,
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    console.log(event.target.value);
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const handleCategoryChange = (value) => {
    formData.set(category, value);
    setValues({ ...values, category: value });
  };

  const props = {
    onChange(info) {
      console.log(info);
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  console.log(formData);

  return (
    <>
      <Drawer width={300} visible={visible} onClose={() => Close(false)}>
        <Form
          layout="vertical"
          size="large"
          onFinish={onCreateSubmit}
          fields={[
            {
              name: ["name"],
              price: "price",
              category: "category",
              stock: "stock",
              photo: "photo",
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
              onChange={handleChange("name")}
              value={name}
            />
          </Form.Item>

          <Form.Item
            name="category"
            label="Product category"
            rules={[{ required: true, message: "Please select a category!" }]}
          >
            <Select style={{ width: 250 }} onChange={handleCategoryChange}>
              {categories &&
                categories.map((category, index) => (
                  <Option key={index} value={category._id}>
                    {category.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="price"
            label="Product price"
            rules={[{ required: true, message: "Please enter a price!" }]}
            onChange={handleChange("price")}
          >
            <InputNumber
              style={{ width: 250 }}
              min={1}
              max={10000}
              defaultValue={400}
              value={price}
            />
          </Form.Item>
          <Form.Item
            name="stock"
            label="Product stock"
            rules={[{ required: true, message: "Please enter a stock!" }]}
            onChange={handleChange("stock")}
          >
            <InputNumber
              style={{ width: 250 }}
              min={1}
              max={100}
              defaultValue={30}
              value={stock}
            />
          </Form.Item>
          <Form.Item
            name="photo"
            label="Product image"
            rules={[{ required: true, message: "Please upload an image!" }]}
          >
            <input
              onChange={handleChange("photo")}
              type="file"
              name="photo"
              accept="image"
              placeholder="choose a file"
              value={photo}
            />
          </Form.Item>
          <Button
            type="primary"
            block
            size="large"
            htmlType="submit"
            loading={loading}
          >
            Create
          </Button>
        </Form>
      </Drawer>
      {/* {error && message.error(error)} */}
    </>
  );
};

export default ProductSidebar;
