import React, { useState, useEffect } from "react";
import {
  Drawer,
  Form,
  Input,
  message,
  Button,
  Select,
  InputNumber,
} from "antd";

import { isAuthenticated } from "../../pages/Auth/helper";
import {
  createProduct,
  getAllCategories,
  getProduct,
  updateProduct,
} from "../../pages/Admin/helper";

const { Option } = Select;

const ProductSidebar = ({
  visible,
  onClose,
  reload,
  setReload,
  create,
  edit,
  id,
}) => {
  const { user, token } = isAuthenticated();
  const [error, setError] = useState("");

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

  const { price, stock, categories, formData, loading, photo } = values;

  const preload = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          categories: data,
          formData: new FormData(),
        });
      }
    });
    getProduct(id).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setValues({
          ...values,
          name: data.name,
          price: data.price,
          category: data.category,
          stock: data.stock,
          formData: new FormData(),
        });
      }
    });
  };

  const createPreload = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    edit ? preload(id) : createPreload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Close = (value) => {
    onClose(value);
  };

  const onCreateSubmit = async (event) => {
    setValues({ ...values, error: "", loading: true });
    await createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setReload(!reload);
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
    Close(false);
  };

  const onEditSubmit = async (event) => {
    setValues({ ...values, error: "", loading: true });
    await updateProduct(id, user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setReload(!reload);
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
    Close(false);
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const handleCategoryChange = (value) => {
    formData.set("category", value);
    setValues({ ...values, category: value });
  };

  return (
    <>
      <Drawer width={300} visible={visible} onClose={() => Close(false)}>
        <Form
          layout="vertical"
          size="large"
          onFinish={create ? onCreateSubmit : onEditSubmit}
        >
          <Form.Item
            name="name"
            label="Product name"
            rules={
              create
                ? [{ required: true, message: "Please enter a name!" }]
                : []
            }
          >
            <Input
              name="name"
              placeholder="Enter a product name"
              onChange={handleChange("name")}
            />
          </Form.Item>

          <Form.Item
            name="category"
            label="Product category"
            rules={
              create
                ? [{ required: true, message: "Please select a category!" }]
                : []
            }
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
            rules={
              create
                ? [{ required: true, message: "Please enter a price!" }]
                : []
            }
            onChange={handleChange("price")}
          >
            <InputNumber
              style={{ width: 250 }}
              min={1}
              max={10000}
              value={price}
            />
          </Form.Item>
          <Form.Item
            name="stock"
            label="Product stock"
            rules={
              create
                ? [{ required: true, message: "Please enter a stock!" }]
                : []
            }
            onChange={handleChange("stock")}
          >
            <InputNumber
              style={{ width: 250 }}
              min={1}
              max={100}
              value={stock}
            />
          </Form.Item>
          <Form.Item
            name="photo"
            label="Product image"
            rules={
              create
                ? [{ required: true, message: "Please upload an image!" }]
                : []
            }
          >
            <input
              onChange={handleChange("photo")}
              type="file"
              name="photo"
              accept="image/*"
              placeholder="choose a file"
              value={photo}
            />
          </Form.Item>
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
        </Form>
      </Drawer>
      {values.error && message.error(values.error)}
      {error && message.error(error)}
    </>
  );
};

export default ProductSidebar;
