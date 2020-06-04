import React from "react";
import { Button, Grid, Container, Typography } from "@material-ui/core";
import FaceIcon from "@material-ui/icons/Face";
const PARENT_PAGE_LINK = "/login";

const ProblemConfirmationUI = (props) => {
  console.log("problem confirm UI was called");
  return (
    <div>
      <Container maxWidth={"md"}>
        <Grid container spacing={3} direction="column">
          <Grid container>
            <Grid justify={"center"} item xs={12} container>
              <FaceIcon style={{ fontSize: 160 }} color="primary" />
            </Grid>
          </Grid>

          <Grid justify={"center"} item xs={12} container>
            <Grid justify={"flex-end"} item xs={6} container>
              <Typography variant="h6">Your problem&nbsp;&nbsp;</Typography>
            </Grid>
            <Grid justify={"flex-start"} item xs={6} container>
              <Typography noWrap variant="h6" color="textSecondary">
                {props.showQuestion(props.problem)}
              </Typography>
            </Grid>
          </Grid>

          <Grid justify={"center"} item xs={12} container>
            <Grid justify={"flex-end"} item xs={6} container>
              <Typography variant="h6">With the options&nbsp;&nbsp;</Typography>
            </Grid>
            <Grid
              alignItems={"flex-start"}
              item
              xs={6}
              container
              direction={"column"}
            >
              {props.showOptions(props.problem)}
            </Grid>
          </Grid>

          <Grid justify={"center"} item xs={12} container>
            <Grid justify={"flex-end"} item xs={6} container>
              <Typography variant="h6">and answer&nbsp;&nbsp;</Typography>
            </Grid>
            <Grid justify={"flex-start"} item xs={6} container>
              <Typography noWrap variant="h6" color="textSecondary">
                {props.showAnswer(props.problem)}
              </Typography>
            </Grid>
          </Grid>

          <Grid justify={"center"} item xs={12} container>
            <Grid justify={"flex-end"} item xs={6} container>
              <Typography variant="h6">tagged to&nbsp;&nbsp;</Typography>
            </Grid>
            <Grid justify={"flex-start"} item xs={6} container>
              <Typography noWrap variant="h6" color="textSecondary">
                {props.showProblemSetCode(props.problem)}
              </Typography>
            </Grid>
          </Grid>

          <Grid justify={"center"} item xs={12} container>
            <Typography variant="h6">
              is successfully saved/updated/deleted.
            </Typography>
          </Grid>

          <Grid justify={"center"} item xs={12} container>
            <Button
              data-testid="back-button"
              size={"large"}
              className="submit-button"
              variant="contained"
              color="primary"
              disableElevation={true}
              href={PARENT_PAGE_LINK}
            >
              Back To Home
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ProblemConfirmationUI;
