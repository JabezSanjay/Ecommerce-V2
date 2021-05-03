import React from "react";
import ReactDOM from "react-dom";
import CartContextProvider from "./hooks/CartContext";
import "./index.css";
import Routes from "./Routes";

ReactDOM.render(
  <CartContextProvider>
    <Routes />
  </CartContextProvider>,
  document.getElementById("root")
);
