import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const useStyles = makeStyles({
  button: {
    marginTop: 5,
    marginBottom: 5,
    height: 60,
    width: 200,
  },
});

const HomeButton = (props) => {
  const classes = useStyles();
  const user = {
    username: props.username,
    role: props.role,
  };

  const handleClick = () => {
    props.history.push({
      pathname: props.path,
      state: user,
    });
  };

  return (
    <Button
      variant="contained"
      className={classes.button}
      data-testid={props.title}
      color="primary"
      onClick={handleClick}
    >
      {props.title}
      <ArrowForwardIosIcon />
    </Button>
  );
};

export default HomeButton;
