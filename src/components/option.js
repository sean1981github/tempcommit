import React from "react";
import { Typography, Grid } from "@material-ui/core";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

const Option = ({ index, option, deleteItem }) => {
  return (
    <Grid item xs={12} container justify={"space-between"}>
      <Grid item xs={10} container>
        <Typography
          noWrap
          variant="h6"
        >{`${index}. ${option.option}`}</Typography>
      </Grid>
      <Grid item xs={1} container justify={"flex-end"}>
        <RemoveCircleIcon
          data-testid={`delete-option-icon-${index}`}
          onClick={deleteItem}
          color="error"
          fontSize={"large"}
        />
      </Grid>
    </Grid>
  );
};

export default Option;
