import React from "react";
import "./option.css";
import { Button, Typography, Grid } from "@material-ui/core";

const Option = ({ index, option, deleteItem }) => {
  return (
    <Grid item xs={12} container justify={"space-between"}>
      <Typography variant="h6">{`${index}. ${option.option}`}</Typography>
      <Button
        size={"small"}
        className="submit-button"
        variant="contained"
        color="primary"
        disableElevation={true}
        onClick={deleteItem}
      >
        Delete
      </Button>
    </Grid>
  );
};

export default Option;
