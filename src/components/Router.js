import React from "react";
import { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./LoginHandle";
import MockPage from "./MockPage";

function Router(props) {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      <Switch>
        {/* <Route exact path="/" component={Login} /> */}
        <Route
          exact
          path="/login"
          render={(props) => <Login setLoggedIn={setLoggedIn} {...props} />}
        />
        {isLoggedIn && (
          <Route
            path="/mock-page"
            render={(props) => (
              <MockPage setLoggedIn={setLoggedIn} {...props} />
            )}
          />
        )}
        <Redirect to="/login" />
      </Switch>
    </div>
  );
}

export default Router;
