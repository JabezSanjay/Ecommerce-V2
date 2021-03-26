import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./pages/Auth/Register";
import Signin from "./pages/Auth/Signin";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Signin} />
        <Route path="/register" exact component={Register} />
      </Switch>
    </Router>
  );
};

export default Routes;
