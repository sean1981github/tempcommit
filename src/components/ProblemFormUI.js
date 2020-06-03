import React from "react";
import {
  Button,
  Grid,
  Container,
  TextField,
  Typography,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";

const ProblemFormUI = (props) => {
  const renderAnswerOptionList = () => {
    return props.optionList.map((option, index) => {
      const indexToDisplay = index + 1;
      return (
        <MenuItem value={indexToDisplay} key={indexToDisplay}>
          Option&nbsp;{indexToDisplay}
        </MenuItem>
      );
    });
  };

  return (
    <Container className="problem-page-container" maxWidth={"md"}>
      <Grid container spacing={6} direction="column">
        <Grid justify={"center"} item xs={12} container>
          <Typography variant="h2">Add Problem</Typography>
        </Grid>

        <Grid item xs={12} container>
          <TextField
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
            <Typography variant="h6">Choose Correct Answer:</Typography>
          </Grid>

          <Grid
            item
            xs={8}
            container
            direction={"row"}
            justify={"flex-start"}
            alignItems={"baseline"}
          >
            <FormControl error={!!props.errorMessages.answer}>
              <Select value={props.answer} onChange={props.handleUpdateAnswer}>
                <MenuItem>
                  <em>None</em>
                </MenuItem>
                {renderAnswerOptionList()}
              </Select>
              <FormHelperText>
                {props.errorMessages.answer || "Select the correct answer"}
              </FormHelperText>
            </FormControl>
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
            <Typography variant="h6">Choose Problem Set:</Typography>
          </Grid>
          <Grid
            item
            xs={8}
            container
            justify={"flex-start"}
            alignItems={"baseline"}
          >
            <FormControl error={!!props.errorMessages.problemSetCode}>
              <Select
                value={props.problemSetCode}
                onChange={props.handleUpdateProblemSetCode}
              >
                <MenuItem>
                  <em>None</em>
                </MenuItem>
                <MenuItem value="ProblemSetCodeA">Problem Set A</MenuItem>
              </Select>
              <FormHelperText>
                {props.errorMessages.problemSetCod || "Select the problem set"}
              </FormHelperText>
            </FormControl>
          </Grid>
        </Grid>

        <Grid item xs={12} container justify={"space-evenly"}>
          <Button
            size={"large"}
            href="/problem/"
            className="submit-button"
            variant="contained"
            color="primary"
            disableElevation={true}
          >
            Back
          </Button>
          <Button
            disabled={props.isLoading}
            size={"large"}
            className="submit-button"
            variant="contained"
            color="primary"
            disableElevation={true}
            onClick={props.submit}
          >
            {props.isLoading ? "Loading..." : "Save"}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProblemFormUI;
