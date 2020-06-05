import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./HomePage.css";
const LINK_TO_CREATE_PROBLEM = "/problem/add";

const useStyles = makeStyles({
  root: {
    width: "35ch",
    height: "25ch",
    marginLeft: "5ch",
    marginRight: "5ch",
  },
  button: {
    marginTop: 5,
    marginBottom: 5,
    width: "25ch",
    height: "8ch",
  },
});

export const ProblemCard = (props) => {
  const classes = useStyles();

  const user = {
    username: props.history.location.state.username,
    role: props.history.location.state.role,
  };

  const toAddProblemPage = () => {
    props.history.push({
      pathname: LINK_TO_CREATE_PROBLEM,
      state: user,
    });
  };

  return (
    <Card className={classes.root}>
      <div className="card-qm">
        <CardContent>
          <Typography variant="h6" component="h3">
            PROBLEM
          </Typography>
        </CardContent>
        <CardActions>
          <div className="button-group-qm">
            <Button
              onClick={toAddProblemPage}
              data-testid="create-problem-button"
              variant="contained"
              className={classes.button}
              color="primary"
            >
              Create New Problem
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Edit Existing Problem
            </Button>
          </div>
        </CardActions>
      </div>
    </Card>
  );
};

export default withRouter(ProblemCard);
