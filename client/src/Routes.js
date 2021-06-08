import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const AdminRoute = lazy(() => import("./auth/helper/AdminRoute"));
const PrivateRoute = lazy(() => import("./auth/helper/PrivateRoute"));
const Categories = lazy(() => import("./pages/Admin/Categories"));
const Orders = lazy(() => import("./pages/Admin/Orders"));
const Products = lazy(() => import("./pages/Admin/Products"));
const Users = lazy(() => import("./pages/Admin/Users"));
const Register = lazy(() => import("./pages/Auth/Register"));
const Signin = lazy(() => import("./pages/Auth/Signin"));
const HomePage = lazy(() => import("./pages/Core/HomePage"));
const CartPage = lazy(() => import("./pages/Core/CartPage"));
const FavouritesPage = lazy(() => import("./pages/Core/FavouritesPage"));
const AdminDashboard = lazy(() => import("./pages/Dashboard/AdminDashboard"));
const UserDashboard = lazy(() => import("./pages/Dashboard/UserDashboard"));
const NotFound = lazy(() => import("./pages/Core/NotFound"));

const Routes = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/register" exact component={Register} />
          <Route path="/cart" exact component={CartPage} />
          <AdminRoute
            path="/admin/dashboard"
            exact
            component={AdminDashboard}
          />
          <AdminRoute
            path="/admin/manage/categories"
            exact
            component={Categories}
          />
          <AdminRoute
            path="/admin/manage/products"
            exact
            component={Products}
          />
          <AdminRoute path="/admin/manage/users" exact component={Users} />
          <AdminRoute path="/admin/manage/orders" exact component={Orders} />
          <PrivateRoute
            path="/user/dashboard"
            exact
            component={UserDashboard}
          />
          <PrivateRoute
            path="/user/favourites"
            exact
            component={FavouritesPage}
          />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default Routes;
