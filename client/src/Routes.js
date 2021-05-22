import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminRoute from "./auth/helper/AdminRoute";
import PrivateRoute from "./auth/helper/PrivateRoute";
import Categories from "./pages/Admin/Categories";
import Orders from "./pages/Admin/Orders";
import Products from "./pages/Admin/Products";
import Users from "./pages/Admin/Users";
import Register from "./pages/Auth/Register";
import Signin from "./pages/Auth/Signin";
import HomePage from "./pages/Core/HomePage";
import CartPage from "./pages/Core/CartPage";
import FavouritesPage from "./pages/Core/FavouritesPage";
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
        <AdminRoute
          path="/admin/manage/categories"
          exact
          component={Categories}
        />
        <AdminRoute path="/admin/manage/products" exact component={Products} />
        <AdminRoute path="/admin/manage/users" exact component={Users} />
        <AdminRoute path="/admin/manage/orders" exact component={Orders} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
        <PrivateRoute
          path="/user/favourites"
          exact
          component={FavouritesPage}
        />
      </Switch>
    </Router>
  );
};

export default Routes;
