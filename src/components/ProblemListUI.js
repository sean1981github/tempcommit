import React from "react";
import {
  Button,
  Grid,
  Container,
  ButtonGroup,
  Typography,
} from "@material-ui/core";

import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const ProblemListUI = (props) => {
  return (
    <Container className="problem-page-container" maxWidth={"md"}>
      <Grid container spacing={6} direction="column">
        <Grid justify={"center"} item xs={12} container>
          <Typography variant="h2" component={"div"}>
            {"Select Problem to Edit"}
          </Typography>
        </Grid>

        <Grid item xs={12} container justify={"center"}>
          <ButtonGroup
            orientation="vertical"
            className="submit-button"
            color="primary"
            aria-label="vertical contained primary button group"
            variant="outlined"
          >
            {props.problems.map((problem, index) => {
              console.log("problem", problem);
              return (
                <Button
                  data-testid="problem-list-button"
                  value={index}
                  key={problem.id}
                  onClick={props.goToEditPage}
                  href={`/problem/edit/${problem.id}`}
                >
                  <Typography variant="h6">{problem.question}</Typography>
                  <Grid item xs />
                  <ArrowForwardIosIcon />
                </Button>
              );
            })}
          </ButtonGroup>

          {/* <Button
          // data-testid="add-option-button"
          // size={"large"}
          // className="submit-button"
          // variant="contained"
          // color="primary"
          // disableElevation={true}
          // onClick={props.handleAddNewOption}
          >
            Add Option
          </Button> */}
        </Grid>

        <Grid item xs={12} container justify={"space-evenly"}>
          <Button
            data-testid="back-button"
            size={"large"}
            className="submit-button"
            variant="contained"
            color="primary"
            disableElevation={true}
            onClick={props.backToPrevPage}
          >
            Back
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProblemListUI;
