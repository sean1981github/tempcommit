import React from "react";
import { Switch, Route, NavLink, BrowserRouter } from "react-router-dom";
import ProblemForm from "./ProblemForm";
import DummyOtherPage from "./dummyOtherPage";
import ProblemConfirmation from "./ProblemConfirmation";

const DummyRouter = () => {
  return (
    <BrowserRouter>
      <NavLink exact to="/problem/add">
        Create New Problem
      </NavLink>
      <Switch>
        <Route exact path="/problem/add" component={ProblemForm} />
        <Route exact path="/problem/" component={DummyOtherPage} />
        <Route
          exact
          path="/problem/confirmation"
          component={ProblemConfirmation}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default DummyRouter;
