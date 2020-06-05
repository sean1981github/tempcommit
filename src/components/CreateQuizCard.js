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
    height: "20ch",
    // marginLeft: "5ch",
    marginRight: "5ch",
  },
  button: {
    marginTop: 5,
    marginBottom: 5,
    width: "30ch",
  },
});

const CreateQuizCard = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div className="card-hr">
        <CardContent>
          <Typography variant="h6" component="h3">
            CREATE QUIZ
          </Typography>
        </CardContent>
        <CardActions>
          <div className="button-group-hr">
            <Button
              variant="contained"
              className={classes.button}
              color="primary"
            >
              Create New Quiz
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Delete Existing Quiz
            </Button>
          </div>
        </CardActions>
      </div>
    </Card>
  );
};

export default CreateQuizCard;
