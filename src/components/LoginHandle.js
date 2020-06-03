import React, { Fragment } from "react";
import Loader from "./Spinner";
import Login from "./LoginForm";
import Axios from "../utils/axios";
import "./LoginForm.css";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorMessage: null,
      isLoading: false,
    };
  }

  handleUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  handlePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  handleLogin = () => {
    this.setState({
      isLoading: true,
    });
    const username = this.state.username;
    const password = this.state.password;
    this.setState({ errorMessage: null });

    if (!username || username.length === 0) {
      if (!password || password.length === 0) {
        this.setState({
          isLoading: false,
          errorMessage: "Username and password should not be empty",
        });
      } else {
        this.setState({
          isLoading: false,
          errorMessage: "Username should not be empty",
        });
      }
    } else if (!password || password.length === 0) {
      this.setState({
        isLoading: false,
        errorMessage: "Password should not be empty",
      });
    } else {
      const user = {
        username: username,
        password: password,
      };

      Axios.post("/users/login", user)
        .then((res) => {
          if (res.status === 200) {
            this.setState({
              isLoading: false,
            });

            this.props.history.push("/mock-page", { role: res.data });
          } else {
            console.log(res.status);
            this.setState({
              isLoading: false,
              errorMessage: "Something is wrong.Please try again",
            });
          }
        })
        .catch((error) => {
          this.setState({
            isLoading: false,
          });
          let message = "";
          if (!error.response) {
            message = "Something is wrong.Please try again";
          } else {
            message = "Login failed. Username and/or password is incorrect";
          }
          this.setState({
            errorMessage: message,
          });
        });
    }
  };

  render() {
    return (
      <div>
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <Fragment>
            <Login
              username={this.state.username}
              password={this.state.password}
              handleUsername={this.handleUsername}
              handlePassword={this.handlePassword}
              handleLogin={this.handleLogin}
            />
            {this.state.errorMessage ? (
              <div className="error" data-testid="error">
                {this.state.errorMessage}
              </div>
            ) : (
              <div></div>
            )}
          </Fragment>
        )}
      </div>
    );
  }
}

export default LoginPage;
