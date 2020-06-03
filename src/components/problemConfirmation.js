import React, { Component } from "react";
import { Button, Grid, Container, Typography } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import FaceIcon from "@material-ui/icons/Face";

class ProblemConfirmation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const savedProblem = this.props.location.state;

    return (
      <Container className="problem-page-container" maxWidth={"md"}>
        <Grid container spacing={3} direction="column">
          <Grid container>
            <Grid
              className="problem-title-container"
              justify={"center"}
              item
              xs={12}
              container
            >
              <FaceIcon style={{ fontSize: 160 }} />
            </Grid>
          </Grid>

          <Grid
            className="problem-title-container"
            justify={"center"}
            item
            xs={12}
            container
          >
            <Grid
              className="problem-title-container"
              justify={"flex-end"}
              item
              xs={6}
              container
            >
              <Typography variant="h6">Your problem&nbsp; &nbsp;</Typography>
            </Grid>
            <Grid
              className="problem-title-container"
              justify={"flex-start"}
              item
              xs={6}
              container
            >
              <Typography variant="h6">{savedProblem.question}</Typography>
            </Grid>
          </Grid>

          <Grid
            className="problem-title-container"
            justify={"center"}
            item
            xs={12}
            container
          >
            <Grid
              className="problem-title-container"
              justify={"flex-end"}
              item
              xs={6}
              container
            >
              <Typography variant="h6">
                With the options&nbsp; &nbsp;
              </Typography>
            </Grid>
            <Grid
              className="problem-title-container"
              alignItems={"flex-start"}
              item
              xs={6}
              container
              direction={"column"}
            >
              {savedProblem.options.map((option) => {
                return (
                  <Typography variant="h6" key={option.id}>
                    {option.option}
                  </Typography>
                );
              })}
            </Grid>
          </Grid>

          <Grid
            className="problem-title-container"
            justify={"center"}
            item
            xs={12}
            container
          >
            <Grid
              className="problem-title-container"
              justify={"flex-end"}
              item
              xs={6}
              container
            >
              <Typography variant="h6">and answer&nbsp; &nbsp;</Typography>
            </Grid>
            <Grid
              className="problem-title-container"
              justify={"flex-start"}
              item
              xs={6}
              container
            >
              <Typography variant="h6">
                {
                  savedProblem.options.find(
                    (option) => option.id === savedProblem.answer
                  ).option
                }
              </Typography>
            </Grid>
          </Grid>

          <Grid
            className="problem-title-container"
            justify={"center"}
            item
            xs={12}
            container
          >
            <Grid
              className="problem-title-container"
              justify={"flex-end"}
              item
              xs={6}
              container
            >
              <Typography variant="h6">tagged to&nbsp; &nbsp;</Typography>
            </Grid>
            <Grid
              className="problem-title-container"
              justify={"flex-start"}
              item
              xs={6}
              container
            >
              <Typography variant="h6">
                {savedProblem.problemSetCode}
              </Typography>
            </Grid>
          </Grid>

          <Grid
            className="problem-title-container"
            justify={"center"}
            item
            xs={12}
            container
          >
            <Typography variant="h6">
              is successfully saved/updated/deleted.
            </Typography>
          </Grid>

          <Grid
            className="problem-title-container"
            justify={"center"}
            item
            xs={12}
            container
          >
            <Button
              size={"large"}
              className="submit-button"
              variant="contained"
              color="primary"
              disableElevation={true}
              href="/problem/"
            >
              Back To Home
            </Button>
          </Grid>
        </Grid>
      </Container>
    );
  }
}
export default withRouter(ProblemConfirmation);
