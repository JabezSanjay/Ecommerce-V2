import React, { useState } from "react";
import { Button, Input, Form } from "antd";
import RegisterIllustration from "../../assets/images/register-illustration.svg";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Menu from "../../Layout/Menu";
import { register } from "./helper";
// import PageFooter from "../../Layout/PageFooter";

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
    loading: false,
  });

  const { name, email, password, loading } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onFinish = (userValue) => {
    setValues({ ...values, error: false, loading: true });
    register({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
            loading: true,
          });
        }
      })
      .catch();
  };

  const RegisterPage = () => {
    return (
      <div className="align">
        <div className="grid align__item">
          <div className="register">
            <img src={RegisterIllustration} alt="" />
            <h2>New Customer?</h2>

            <Form onFinish={onFinish}>
              <Form.Item
                name="userName"
                rules={[
                  {
                    required: true,
                    message: "Username is required!",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Name"
                  onChange={handleChange("name")}
                  value={name}
                  suffix={
                    <div className="align-center">
                      <UserOutlined
                        style={{
                          color: "#777777",
                          marginRight: "5px",
                        }}
                      />
                      <p>*</p>
                    </div>
                  }
                />
              </Form.Item>

              <Form.Item
                name="email"
                onChange={handleChange("email")}
                value={email}
                rules={[
                  {
                    required: true,
                    message: "Email is required!",
                  },
                  {
                    type: "email",
                    message: "Please enter a valid E-mail!",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Email"
                  suffix={
                    <div className="align-center">
                      <MailOutlined
                        style={{
                          color: "#777777",
                          marginRight: "5px",
                        }}
                      />
                      <p>*</p>
                    </div>
                  }
                />
              </Form.Item>

              <Form.Item
                name="password"
                onChange={handleChange("password")}
                value={password}
                rules={[
                  {
                    required: true,
                    message: "Password is required!",
                  },
                  {
                    min: 6,
                    message: "Password must be atleast 6 in length!",
                  },
                ]}
              >
                <Input.Password size="large" placeholder="Password" />
              </Form.Item>

              <div className="form__field">
                <Button
                  type="primary"
                  block
                  size="large"
                  htmlType="submit"
                  loading={loading}
                >
                  Register
                </Button>
              </div>
            </Form>

            <p>
              Already a member? - <Link to="/signin">Signin</Link>
            </p>
          </div>
        </div>
      </div>
    );
  };
  return (
    <RegisterTag>
      <Menu />
      {RegisterPage()}
      {/* <PageFooter /> */}
    </RegisterTag>
  );
};

export default Register;

const RegisterTag = styled.div`
  .align {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 92.5vh;
  }
  .form {
    &__field {
      margin-bottom: 1.5rem;
      button {
        margin: 0.5em 0 0.5em 0;
      }
    }
  }
  .grid {
    max-width: 26em;
    width: 90%;
  }

  h2 {
    font-size: 2.5rem;
    font-weight: 300;
    margin: 0 0 1rem;
  }
  .register {
    text-align: center;
    padding: 4rem 2rem;
    img {
      width: 85%;
      margin-bottom: 2rem;
    }
  }
`;
