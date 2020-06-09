import React from "react";
import { Grid } from "@material-ui/core";

export const QuizTemplateGrid = (props) => {
  return (
    <Grid
      item
      xs={4}
      container
      direction={"row"}
      justify={"flex-start"}
      alignItems={"center"}
    >
      {props.children}
    </Grid>
  );
};
