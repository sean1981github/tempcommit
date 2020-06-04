import React, { Fragment } from "react";
import Loader from "./Spinner";
import Login from "./Login";
import Axios from "../utils/axiosInstance";
import "./Login.css";
const STATUS_OK = 200;

class LoginHandle extends React.Component {
  constructor(props) {
    super(props);
    let message = "";

    if (
      props.location.state === undefined ||
      props.location.state.message === undefined
    ) {
      message = "";
    } else {
      message = props.location.state.message;
    }

    this.state = {
      username: "",
      password: "",
      errorMessage: message,
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

    const invalidUsername = !username || username.length === 0;
    const invalidPassword = !password || password.length === 0;

    if (invalidUsername && invalidPassword) {
      this.setState({
        isLoading: false,
        errorMessage: "Username and password should not be empty",
      });
    } else if (invalidUsername) {
      this.setState({
        isLoading: false,
        errorMessage: "Username should not be empty",
      });
    } else if (invalidPassword) {
      this.setState({
        isLoading: false,
        errorMessage: "Password should not be empty",
      });
    } else {
      const user = {
        username,
        password,
      };

      Axios.post("/users/login", user)
        .then((res) => {
          if (res.status === STATUS_OK) {
            this.setState({
              isLoading: false,
            });

            this.props.setLoggedIn(true);
            this.props.history.push("/mock-page", {
              role: res.data,
            });
          } else {
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

  showLoginForm = () => {
    return (
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
    );
  };

  render() {
    return (
      <div>{this.state.isLoading ? <Loader /> : this.showLoginForm()}</div>
    );
  }
}

export default LoginHandle;
