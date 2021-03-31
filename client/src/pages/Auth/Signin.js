import React, { useState } from "react";
import { Button, Input, Form, message } from "antd";
import SigninIllustration from "../../assets/images/signin-illustration.svg";
import { MailOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Menu from "../../Layout/Menu";
import { authenticate, signin, isAuthenticated } from "./helper";
import { Redirect } from "react-router-dom";

// import PageFooter from "../../Layout/PageFooter";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    success: false,
    loading: false,
  });
  const { email, password, loading, success, error } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const performRedirect = () => {
    if (success) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard"></Redirect>;
      } else {
        return <Redirect to="/"></Redirect>;
      }
    }
  };
  const errorMessage = () => {
    if (error) {
      message.error(error);
    }
  };

  const onFinish = () => {
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            loading: true,
            email: "",
            password: "",
            error: "",
            success: true,
          });
        });
      }
    });
  };

  const SigninPage = () => {
    return (
      <div className="align">
        <div className="grid align__item">
          <div className="register">
            <img src={SigninIllustration} alt="" />
            <h2>Sign In</h2>

            <Form onFinish={onFinish}>
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
                  Continue
                </Button>
              </div>
            </Form>

            <p>
              New to Ecommerce-V2? - <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    );
  };
  return (
    <SigninTag>
      <Menu />
      {SigninPage()}
      {errorMessage()}
      {performRedirect()}
      {/* <PageFooter /> */}
    </SigninTag>
  );
};

export default Signin;

const SigninTag = styled.div`
  .align {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
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
