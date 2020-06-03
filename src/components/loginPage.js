import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Typography } from "@material-ui/core";
import "./loginPage.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  buttonStyles: {
    width: "16rem",
  },
}));

const LoginPage = (props) => {
  const classes = useStyles();
  return (
    <div className="container">
      <Typography variant="h6">WELCOME TO CASE</Typography>
      <Typography variant="h5">
        (Competency Assessment &amp; Self Evaluation)
      </Typography>

      <div className="form-box">
        <form className={classes.root} noValidate autoComplete="off">
          <Typography>Account sign in</Typography>
          <div>
            <TextField
              required
              inputProps={{ "data-testid": "username" }}
              id="username"
              label="User Name"
              variant="outlined"
              value={props.username}
              onChange={props.handleUsername}
            />
          </div>
          <div>
            <TextField
              required
              inputProps={{ "data-testid": "password" }}
              id="password"
              label="Password"
              variant="outlined"
              type="password"
              value={props.password}
              onChange={props.handlePassword}
            />
          </div>
          <div>
            <Button
              data-testid="signin"
              className={classes.buttonStyles}
              color="primary"
              variant="contained"
              onClick={props.handleLogin}
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
