import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./pages/Auth/Register";
import Signin from "./pages/Auth/Signin";
import CartPage from "./pages/Core/CartPage";
import HomePage from "./pages/Core/HomePage";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/register" exact component={Register} />
        <Route path="/cart" exact component={CartPage} />
      </Switch>
    </Router>
  );
};

export default Routes;
