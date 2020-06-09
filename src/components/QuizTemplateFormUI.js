import React from "react";
import {
  Button,
  Grid,
  Container,
  TextField,
  Typography,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";
const PARENT_PAGE_LINK = "/login";

const QuizTemplateFormUI = (props) => {
  const renderProblemSetList = () => {
    return (
      <TextField
        select
        helperText={
          props.errorMessages.problemSetCode || "Select the problem set"
        }
        error={!!props.errorMessages.problemSetCode}
        required
        value={props.problemSetCode}
        onChange={props.handleUpdateProblemSetCode}
        SelectProps={{
          SelectDisplayProps: {
            "data-testid": "problemSetCode-select",
          },
        }}
      >
        <MenuItem>
          <em>None</em>
        </MenuItem>
        {props.problemSets.map((problemSet) => {
          return (
            <MenuItem value={problemSet.categoryCode} key={problemSet.id}>
              {problemSet.categoryCode}
            </MenuItem>
          );
        })}
      </TextField>
    );
  };

  return (
    <Container className="problem-page-container" maxWidth={"md"}>
      <Grid container spacing={6} direction="column">
        <Grid justify={"center"} item xs={12} container>
          <Typography variant="h2">Create Quiz Template</Typography>
        </Grid>

        <Grid item xs={12} container>
          <Grid
            item
            xs={4}
            container
            direction={"row"}
            justify={"flex-start"}
            alignItems={"center"}
          >
            <Typography variant="h6">Quiz Template Code:</Typography>
          </Grid>
          <TextField
            inputProps={{ "data-testid": "quiztemplate-code-textfield" }}
            error={!!props.errorMessages.quizTemplateCode}
            className="quiztemplate-code-textfield"
            label="Enter Quiz Template Code"
            rows={2}
            value={props.quizTemplateCode}
            onChange={props.handleQuizTemplateCode}
            variant="outlined"
            helperText={props.errorMessages.quizTemplateCode}
          />
        </Grid>

        <Grid
          item
          xs={12}
          container
          justify={"flex-start"}
          alignItems={"baseline"}
        >
          <Grid
            item
            xs={4}
            container
            justify={"flex-start"}
            alignItems={"baseline"}
          >
            {renderProblemSetList()}
          </Grid>

          <Grid
            item
            xs={4}
            container
            justify={"flex-start"}
            alignItems={"baseline"}
          >
            <TextField
              inputProps={{ "data-testid": "problemset-number-textfield" }}
              error={
                !!(
                  props.errorMessages.problemSetNumberText +
                  props.errorMessages.problemSetQuestionNumberText
                )
              }
              className="problemset-number-textfield"
              label="Number"
              // rows={2}
              value={props.problemSetNumberText}
              onChange={props.handleProblemSetNumberText}
              variant="outlined"
              helperText={
                props.errorMessages.problemSetNumberText +
                props.errorMessages.problemSetQuestionNumberText
              }
              type="Number"
            />
          </Grid>

          <Grid
            item
            xs={4}
            container
            justify={"flex-end"}
            alignItems={"baseline"}
          >
            <Button
              data-testid="add-problemset-button"
              size={"large"}
              className="submit-button"
              variant="contained"
              color="primary"
              disableElevation={true}
              onClick={props.handleAddNewProblemSet}
            >
              Add
            </Button>
          </Grid>
        </Grid>

        <Grid item xs={12} container direction={"column"} spacing={2}>
          {props.showProblemSetList()}
          <FormHelperText error={!!props.errorMessages.problemSetList}>
            {props.errorMessages.problemSetList}
          </FormHelperText>
        </Grid>

        <Grid item xs={12} container>
          <Grid
            item
            xs={4}
            container
            direction={"row"}
            justify={"flex-start"}
            alignItems={"center"}
          >
            <Typography variant="h6">Passing Score %:</Typography>
          </Grid>
          <TextField
            inputProps={{ "data-testid": "passing-score-textfield" }}
            error={!!props.errorMessages.passingScoreText}
            className="passing-score-textfield"
            label="Enter Passing Score %"
            value={props.passingScoreText}
            onChange={props.handlePassingScoreText}
            variant="outlined"
            helperText={props.errorMessages.passingScoreText}
            type="Number"
          />
        </Grid>

        <Grid item xs={12} container>
          <Grid
            item
            xs={4}
            container
            direction={"row"}
            justify={"flex-start"}
            alignItems={"center"}
          >
            <Typography variant="h6">Total Score:</Typography>
          </Grid>
          <TextField
            inputProps={{ "data-testid": "total-score-textfield" }}
            className="total-score-textfield"
            label="Total Score"
            value={props.totalScoreText}
            variant="outlined"
            disabled="true"
          />
        </Grid>

        <Grid item xs={12} container>
          <Grid
            item
            xs={4}
            container
            direction={"row"}
            justify={"flex-start"}
            alignItems={"center"}
          >
            <Typography variant="h6">Total Duration (Mins):</Typography>
          </Grid>
          <TextField
            inputProps={{ "data-testid": "total-duration-textfield" }}
            error={!!props.errorMessages.totalDurationText}
            className="total-duration-textfield"
            label="Enter Total Duration in Mins"
            value={props.totalDurationText}
            onChange={props.handleTotalDurationText}
            variant="outlined"
            helperText={props.errorMessages.totalDurationText}
            type="Number"
          />
        </Grid>

        <Grid item xs={12} container justify={"space-evenly"}>
          <Button
            data-testid="back-button"
            size={"large"}
            href={PARENT_PAGE_LINK}
            className="submit-button"
            variant="contained"
            color="primary"
            disableElevation={true}
          >
            Back
          </Button>
          <Button
            data-testid="submit-button"
            disabled={props.isLoading}
            size={"large"}
            className="submit-button"
            variant="contained"
            color="primary"
            disableElevation={true}
            onClick={props.submit}
          >
            {props.isLoading ? "Loading..." : "Submit"}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default QuizTemplateFormUI;
