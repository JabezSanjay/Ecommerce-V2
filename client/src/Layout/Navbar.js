import React, { useState, useContext } from "react";
import { withRouter, Link } from "react-router-dom";
import styled from "styled-components";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, message } from "antd";
import { isAuthenticated, signout } from "../pages/Auth/helper";
import { CartContext } from "../hooks/CartContext";

const Navbar = ({ history, padding }) => {
  const { user } = isAuthenticated();
  const [navbar, setNavbar] = useState(false);

  const navbarClicked = () => {
    setNavbar(!navbar);
  };

  const { itemCount } = useContext(CartContext);

  const navbarComponent = () => {
    return (
      <header className="header" style={{ paddingBottom: padding || "120px" }}>
        <nav className="navbar">
          <Link to="/" className="navbar__logo">
            Ecommerce-V2
          </Link>
          <ul
            className={
              navbar ? "navbar__links navbar--active" : "navbar__links"
            }
          >
            <li>
              <Link to="/" onClick={navbarClicked}>
                Home
              </Link>
            </li>
            {!user && (
              <li>
                <Link to="/signin" onClick={navbarClicked}>
                  Sign In
                </Link>
              </li>
            )}

            {!user && (
              <li>
                <Link to="/register" onClick={navbarClicked}>
                  Register
                </Link>
              </li>
            )}

            {user && user.role === 1 && (
              <li>
                <Link to="/admin/manage/categories" onClick={navbarClicked}>
                  Dashboard
                </Link>
              </li>
            )}
            {user && user.role === 0 && (
              <li>
                <Link to="/user/dashboard" onClick={navbarClicked}>
                  Dashboard
                </Link>
              </li>
            )}
            <li>
              <Link to="/cart" onClick={navbarClicked}>
                Cart
              </Link>
            </li>

            {user && (
              <li>
                <Link
                  to="/"
                  onClick={() => {
                    signout(() => {
                      history.push("/");
                      message.success("Signout successful!");
                    });
                  }}
                >
                  Signout
                </Link>
              </li>
            )}
          </ul>
          <div className="button-group">
            <Link to="/cart">
              <Button
                shape="circle"
                type="primary"
                style={{ marginRight: "10px" }}
                icon={
                  <Badge count={itemCount} size="small">
                    <ShoppingCartOutlined
                      style={{ color: "#fff", fontSize: "1.5rem" }}
                    />
                  </Badge>
                }
              />
            </Link>
            <Button
              shape="circle"
              type="primary"
              size="large"
              style={{ marginBottom: "15px" }}
              icon={
                <Avatar
                  style={{
                    backgroundColor: "#f56a00",
                  }}
                  size="large"
                >
                  {(user && user.name) || "GUEST"}
                </Avatar>
              }
            />
          </div>

          <div
            className={navbar ? "hamburger-menu bar-change" : "hamburger-menu"}
            onClick={navbarClicked}
          >
            <div className="bar1">Menu</div>
          </div>
        </nav>
      </header>
    );
  };
  return <MenuTag>{navbarComponent()}</MenuTag>;
};

export default withRouter(Navbar);

const MenuTag = styled.div`
  .header {
    .button-group {
      display: flex;
      align-items: center;
      justify-content: center;
      p {
        font-size: 0.7rem;
      }
    }
    .navbar {
      padding: 0 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 7.5vh;
      position: fixed;
      width: 100%;
      background: #1890ff;
      z-index: 999;
      &__logo {
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: #fff;
      }
      &__links {
        display: flex;
        transition: 0.3s ease all;
        li {
          list-style-type: none;

          a {
            text-decoration: none;
            color: #fff;
            font-size: 1.05rem;
            margin: 0 1.2rem;
            position: relative;
            letter-spacing: 1px;
          }

          a::after {
            position: absolute;
            content: "";
            bottom: -4px;
            left: 0;
            height: 2px;
            width: 0%;
            background-color: #fff;
            display: block;
          }

          a:hover::after {
            width: 100%;
            transition: 0.4s ease all;
          }
        }
      }

      &--active {
        transform: translateX(0%);
      }
    }

    .hamburger-menu {
      cursor: pointer;
      display: none;

      div {
        color: #fff;
        font-size: 1.05rem;
        margin: 0 1.2rem;
        margin: 6px;
        border-radius: 10px;
        transition: 0.7s ease-in-out all;
      }
    }
  }

  @media (max-width: 1024px) {
    .navbar {
      &__links {
        position: absolute;
        top: 50px;
        left: 0;
        height: 50vh;
        width: 100%;
        background: #1890ff;
        margin: 0;
        padding: 0;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        transform: translateX(-100%);
        z-index: 10;
      }

      .hamburger-menu {
        display: block;
      }
      .bar-change .bar1 {
        transform: rotate(-360deg);
      }
    }
  }
`;
