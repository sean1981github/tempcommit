import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./HomePage.css";

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

const ProblemCard = () => {
  const classes = useStyles();

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

export default ProblemCard;
