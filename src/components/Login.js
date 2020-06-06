import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Typography, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 220,
    },
    marginTop: 50,
  },
  buttonStyles: {
    width: 220,
  },
  form: {
    border: "1px solid grey",
    borderRadius: "8px",
    background: "white",
    margin: "auto",
    marginBottom: "1.5%",
    width: "30ch",
    padding: "2rem 1rem 2rem 1rem",
    marginTop: "4%",
  },
}));

const LoginPage = (props) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Typography variant="h6">WELCOME TO CASE</Typography>
      <Typography variant="h5">
        (Competency Assessment &amp; Self Evaluation)
      </Typography>
      <form className={classes.form} noValidate autoComplete="off">
        <Typography>Account sign in</Typography>

        <TextField
          required
          inputProps={{ "data-testid": "username" }}
          id="username"
          label="User Name"
          variant="outlined"
          value={props.username}
          onChange={props.handleUsername}
        />

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

        <Button
          data-testid="signin"
          className={classes.buttonStyles}
          color="primary"
          variant="contained"
          onClick={props.handleLogin}
        >
          Sign in
        </Button>
      </form>
    </Box>
  );
};

export default LoginPage;
