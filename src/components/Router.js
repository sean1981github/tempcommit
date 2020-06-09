import React, { useState, useEffect, Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./LoginHandle";
import Loader from "./Spinner";
import HomePage from "./HomePage";
import ProblemForm from "./ProblemForm";
import ProblemConfirmation from "./ProblemConfirmation";
import QuizForm from "./QuizForm";
import QuizTemplateForm from "./QuizTemplateForm";
import QuizTemplateConfirmation from "./QuizTemplateConfirmation";
import Axios from "../utils/axiosInstance";

const Router = () => {
  const [isLoading, setLoading] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    Axios.post("users/checkRefreshLogin")
      .then((res) => {
        setLoggedIn(true);
        setUsername(res.data.username);
        setRole(res.data.role);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Fragment>
      {isLoading ? (
        <Loader />
      ) : (
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route
            exact
            path="/login"
            render={(props) => (
              <Login
                setLoggedIn={setLoggedIn}
                setUsername={setUsername}
                setRole={setRole}
                {...props}
              />
            )}
          />
          {isLoggedIn && (
            <div>
              <Route
                exact
                path="/home"
                render={(props) => (
                  <HomePage
                    setLoggedIn={setLoggedIn}
                    username={username}
                    role={role}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/problem/add"
                render={(props) => (
                  <ProblemForm
                    setLoggedIn={setLoggedIn}
                    username={username}
                    role={role}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/problem/confirmation"
                render={(props) => (
                  <ProblemConfirmation
                    setLoggedIn={setLoggedIn}
                    username={username}
                    role={role}
                    {...props}
                  />
                )}
              />
              <Route exact path="/quiz/add" component={QuizForm} />
              <Route
                exact
                path="/quiz-template/add"
                render={(props) => (
                  <QuizTemplateForm
                    setLoggedIn={setLoggedIn}
                    username={username}
                    role={role}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/quiz-template/confirmation"
                render={(props) => (
                  <QuizTemplateConfirmation
                    setLoggedIn={setLoggedIn}
                    username={username}
                    role={role}
                    {...props}
                  />
                )}
              />
            </div>
          )}

          {!isLoading && (
            <Redirect
              to={{
                pathname: "/login",
                state: { message: "You are not authorised" },
              }}
            />
          )}
        </Switch>
      )}
    </Fragment>
  );
};

export default Router;
