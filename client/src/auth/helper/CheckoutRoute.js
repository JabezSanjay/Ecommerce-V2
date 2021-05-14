import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { CartContext } from "../../hooks/CartContext";
import { isAuthenticated } from "../../pages/Auth/helper";

const CheckoutRoute = ({ component: Component, ...rest }) => {
  const { cartItems } = useContext(CartContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() && cartItems.length >= 1 ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: "/cart",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default CheckoutRoute;
