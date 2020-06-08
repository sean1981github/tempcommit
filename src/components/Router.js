import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./LoginHandle";
import HomePage from "./HomePage";
import ProblemForm from "./ProblemForm";
import ProblemConfirmation from "./ProblemConfirmation";
import QuizForm from "./QuizForm";
import QuizTemplateForm from "./QuizTemplateForm";
import QuizTemplateConfirmation from "./QuizTemplateConfirmation";
import QuizForm from "./QuizForm";

const Router = () => {
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
            path="/home"
            render={(props) => (
              <HomePage setLoggedIn={setLoggedIn} {...props} />
            )}
          />
        )}
        {isLoggedIn && (
          <Route
            exact
            path="/problem/add"
            render={(props) => (
              <ProblemForm setLoggedIn={setLoggedIn} {...props} />
            )}
          />
        )}
        {isLoggedIn && (
          <Route
            exact
            path="/problem/confirmation"
            render={(props) => (
              <ProblemConfirmation setLoggedIn={setLoggedIn} {...props} />
            )}
          />
        )}
        <Route exact path="/quiz/add" component={QuizForm} />
        {isLoggedIn && (
          <Route
            exact
            path="/quiz-template/add"
            render={(props) => (
              <QuizTemplateForm setLoggedIn={setLoggedIn} {...props} />
            )}
          />
        )}
        {isLoggedIn && (
          <Route
            exact
            path="/quiz-template/confirmation"
            render={(props) => (
              <QuizTemplateConfirmation setLoggedIn={setLoggedIn} {...props} />
            )}
          />
        )}
        <Route exact path="/quiz/add" component={QuizForm} />
        <Redirect
          to={{
            pathname: "/login",
            state: { message: "You are not authorised" },
          }}
        />
        <Redirect to="/login" />
      </Switch>
    </div>
  );
};

export default Router;
