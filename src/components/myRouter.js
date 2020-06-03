import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./LoginHandle";
import MockPage from "./mockHomePage";

const myRouter = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/mock-page" component={MockPage} />
    </Switch>
  </div>
);

export default myRouter;
