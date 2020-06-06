import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  ButtonGroup,
  Typography,
} from "@material-ui/core";
import ButtonFactory from "./ButtonFactory";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: 240,
    backgroundColor: "beige",
  },
});

const HomeCard = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h6" component="h3">
          {props.title}
        </Typography>
      </CardContent>
      <CardActions>
        <ButtonGroup
          orientation="vertical"
          color="primary"
          aria-label="vertical contained primary button group"
          variant="text"
        >
          <ButtonFactory
            history={props.history}
            role={props.role}
            title={props.title}
          />
        </ButtonGroup>
      </CardActions>
    </Card>
  );
};

export default HomeCard;
