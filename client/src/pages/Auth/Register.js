import React from "react";
import { Button, Input, Form } from "antd";
import RegisterIllustration from "../../assets/images/register-illustration.svg";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Menu from "../../Layout/Menu";
// import PageFooter from "../../Layout/PageFooter";

const Register = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
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
                  suffix={
                    <UserOutlined
                      style={{
                        color: "#777777",
                      }}
                    />
                  }
                />
              </Form.Item>

              <Form.Item
                name="email"
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
                    <MailOutlined
                      style={{
                        color: "#777777",
                      }}
                    />
                  }
                />
              </Form.Item>

              <Form.Item
                name="password"
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
                <Button type="primary" block size="large" htmlType="submit">
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
