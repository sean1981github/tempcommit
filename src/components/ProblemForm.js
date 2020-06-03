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
import React, { useState, Fragment } from "react";
import { v4 as uuid } from "uuid";
import Option from "./option";

const ProblemForm = (props) => {
  return (
    <Container className="problem-page-container" maxWidth={"md"}>
      <Grid container spacing={6} direction="column">
        <Grid
          className="problem-title-container"
          justify={"center"}
          item
          xs={12}
          container
        >
          <Typography variant="h2">Add Problem</Typography>
        </Grid>

        <Grid item xs={12} container className="problem-grid-row-container">
          <TextField
            className="question-textfield"
            label="Enter Question"
            multiline
            rows={4}
            value={props.questionText}
            onChange={props.handleQuestionTextInput}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} container justify={"space-between"}>
          <TextField
            className="option-textfield"
            label="Enter Answer Option"
            multiline
            rowsMax={4}
            value={props.newOptionText}
            onChange={props.handleOptionTextInput}
            variant="outlined"
          />
          <Button
            className="submit-button"
            variant="contained"
            color="primary"
            disableElevation={true}
            onClick={props.addOption}
          >
            Add Option
          </Button>
        </Grid>

        <Grid item xs={12} container direction={"column"} spacing={3}>
          {props.optionList.map((currentItem, index) => {
            return (
              <Option
                key={uuid()}
                index={index + 1}
                option={currentItem}
                deleteItem={() => {
                  const filteredItem = props.optionList.filter(
                    (item) => currentItem.option !== item.option
                  );
                  props.updateOptions(...filteredItem);
                }}
              />
            );
          })}
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
            <FormControl>
              <Select value={props.answer} onChange={props.handleUpdateAnswer}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {props.optionList.map((option, index) => {
                  return (
                    <MenuItem value={index} key={uuid()}>
                      Choice {index + 1}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>
                Populate options before choosing the correct answer
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
            <FormControl>
              <Select value={props.problemSetCode}>
                <MenuItem value={props.problemSetCode}>
                  ProblemSetCodeA
                </MenuItem>
              </Select>
              <FormHelperText>
                Select the problem set this problem belongs to
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
            size={"large"}
            className="submit-button"
            variant="contained"
            color="primary"
            disableElevation={true}
            onClick={props.submit}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProblemForm;
