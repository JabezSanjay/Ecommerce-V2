import React from "react";
import { Button, Input } from "antd";
import SigninIllustration from "../../assets/images/signin-illustration.svg";
import { MailOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Menu from "../../Layout/Menu";
// import PageFooter from "../../Layout/PageFooter";

const Signin = () => {
  return (
    <SigninTag>
      <Menu />
      <div className="align">
        <div className="grid align__item">
          <div className="register">
            <img src={SigninIllustration} alt="" />
            <h2>Sign-In</h2>

            <form action="" method="post" className="form">
              <div className="form__field">
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
              </div>
              <div className="form__field">
                <Input.Password size="large" placeholder="Password" />
              </div>

              <div className="form__field">
                <Button type="primary" block size="large">
                  Continue
                </Button>
              </div>
            </form>

            <p>
              New to Ecommerce-V2? - <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
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
