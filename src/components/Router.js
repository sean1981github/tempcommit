import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./LoginHandle";
import HomePage from "./HomePage";
import MockPage from "./MockPage";
import ProblemForm from "./ProblemForm";
import ProblemConfirmation from "./ProblemConfirmation";

function Router() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route
          exact
          path="/login"
          render={(props) => <Login setLoggedIn={setLoggedIn} {...props} />}
        />
        {isLoggedIn && (
          <Route
            exact
            path="/mock-page"
            render={(props) => (
              <HomePage setLoggedIn={setLoggedIn} {...props} />
            )}
          />
        )}
        <Redirect
          to={{
            pathname: "/login",
            state: { message: "You are not authorised" },
          }}
        />
        <Route exact path="/problem/add" component={ProblemForm} />
        <Route
          exact
          path="/problem/confirmation"
          component={ProblemConfirmation}
        />
        <Redirect to="/login" />
      </Switch>
    </div>
  );
}

export default Router;
