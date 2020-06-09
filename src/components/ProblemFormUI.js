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

const ProblemFormUI = (props) => {
  const showAnswerOptionList = () => {
    return (
      <TextField
        select
        helperText={props.errorMessages.answer || "Select the correct answer"}
        error={!!props.errorMessages.answer}
        required
        value={props.answer}
        onChange={props.handleUpdateAnswer}
        SelectProps={{
          SelectDisplayProps: {
            "data-testid": "options-select",
          },
        }}
      >
        {props.optionList.map((option, index) => {
          const indexToDisplay = index + 1;
          return (
            <MenuItem value={indexToDisplay} key={indexToDisplay}>
              Option&nbsp;{indexToDisplay}
            </MenuItem>
          );
        })}
      </TextField>
    );
  };

  const showProblemSetList = () => {
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
        {props.problemSets.map((problemSet) => {
          return (
            <MenuItem
              value={problemSet.categoryCode}
              key={problemSet.categoryCode}
            >
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
          <Typography component="div" variant="h2">
            Create New Problem
          </Typography>
        </Grid>

        <Grid item xs={12} container>
          <TextField
            inputProps={{ "data-testid": "question-textfield" }}
            error={!!props.errorMessages.questionText}
            className="question-textfield"
            label="Enter Question"
            multiline
            rows={4}
            value={props.questionText}
            onChange={props.handleQuestionTextInput}
            variant="outlined"
            helperText={props.errorMessages.questionText}
          />
        </Grid>

        <Grid
          item
          xs={12}
          container
          justify={"space-between"}
          alignItems={"baseline"}
        >
          <TextField
            inputProps={{ "data-testid": "option-textfield" }}
            error={!!props.errorMessages.newOptionText}
            className="option-textfield"
            label="Enter Answer Option"
            multiline
            rowsMax={1}
            value={props.newOptionText}
            onChange={props.handleOptionTextInput}
            variant="outlined"
            helperText={props.errorMessages.newOptionText}
          />

          <Button
            data-testid="add-option-button"
            size={"large"}
            className="submit-button"
            variant="contained"
            color="primary"
            disableElevation={true}
            onClick={props.handleAddNewOption}
          >
            Add Option
          </Button>
        </Grid>

        <Grid item xs={12} container direction={"column"} spacing={2}>
          {props.showOptionList()}
          <FormHelperText error={!!props.errorMessages.optionList}>
            {props.errorMessages.optionList}
          </FormHelperText>
        </Grid>

        <Grid
          item
          xs={12}
          container
          direction={"row"}
          justify={"flex-start"}
          alignItems={"baseline"}
        >
          <Grid
            item
            xs={4}
            container
            direction={"row"}
            justify={"flex-start"}
            alignItems={"baseline"}
          >
            <Typography component="div" variant="h6">
              Choose Correct Answer:
            </Typography>
          </Grid>

          <Grid
            item
            xs={8}
            container
            direction={"row"}
            justify={"flex-start"}
            alignItems={"baseline"}
          >
            {showAnswerOptionList()}
          </Grid>
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
            <Typography component="div" variant="h6">
              Choose Problem Set:
            </Typography>
          </Grid>
          <Grid
            item
            xs={8}
            container
            justify={"flex-start"}
            alignItems={"baseline"}
          >
            {showProblemSetList()}
          </Grid>
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

export default ProblemFormUI;
