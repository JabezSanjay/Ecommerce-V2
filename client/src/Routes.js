import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminRoute from "./auth/helper/AdminRoute";
import PrivateRoute from "./auth/helper/PrivateRoute";
import Register from "./pages/Auth/Register";
import Signin from "./pages/Auth/Signin";
import CartPage from "./pages/Core/CartPage";
import HomePage from "./pages/Core/HomePage";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import UserDashboard from "./pages/Dashboard/UserDashboard";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/register" exact component={Register} />
        <Route path="/cart" exact component={CartPage} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
      </Switch>
    </Router>
  );
};

export default Routes;
