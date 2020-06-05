import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./HomePage.css";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles({
  root: {
    width: "25%",
    marginLeft: "3%",
    marginRight: "3%",
    color: grey,
  },
  button: {
    marginTop: 5,
    marginBottom: 5,
  },
});

const QuizResultsCard = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          QUIZ RESULTS
        </Typography>
      </CardContent>
      <CardActions>
        <div className="button-group">
          <Button
            variant="contained"
            className={classes.button}
            color="primary"
          >
            View Results
          </Button>
        </div>
      </CardActions>
    </Card>
  );
};

export default QuizResultsCard;