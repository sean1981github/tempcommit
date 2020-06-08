import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Select,
  Grid,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 220,
      textAlign: "center",
    },
    marginTop: 20,
  },
  buttonStyles: {
    width: 120,
  },
  select: {
    width: 220,
  },
  inputLabel: {
    textAlign: "left",
  },
  form: {
    margin: "auto",
    marginBottom: "1.5%",
    width: 600,
    padding: "2rem 1rem 2rem 1rem",
  },
}));

const QuizForm = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h6">Create Quiz</Typography>
      <form className={classes.form} noValidate autoComplete="off">
        <Grid container justify="center" spacing="5">
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
              <Typography variant="h6">Candidate Name:</Typography>
            </Grid>
            <Grid
              item
              xs={8}
              container
              direction={"row"}
              justify={"flex-start"}
              alignItems={"baseline"}
            >
              <TextField
                required
                inputProps={{ "data-testid": "candidate-name" }}
                id="candidateName"
                label="Input the candidate's name"
                value={props.candidateName}
                onChange={props.handleCandidateName}
              />
            </Grid>
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
              <Typography variant="h6">Candidate Email:</Typography>
            </Grid>
            <Grid
              item
              xs={8}
              container
              direction={"row"}
              justify={"flex-start"}
              alignItems={"baseline"}
            >
              <TextField
                required
                inputProps={{ "data-testid": "candidate-email" }}
                id="candidateEmail"
                label="Input the candidate's email"
                value={props.candidateEmail}
                onChange={props.handleCandidateEmail}
              />
            </Grid>
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
              <Typography variant="h6">Quiz Template:</Typography>
            </Grid>
            <Grid
              item
              xs={8}
              container
              direction={"row"}
              justify={"flex-start"}
              alignItems={"baseline"}
            >
              <Select
                className={classes.select}
                labelId="select-quiz-template"
                id="select-quiz-template"
                inputProps={{ "data-testid": "select-quiz-template" }}
                value={props.quizTemplateCode}
                onChange={props.handleSelectQuizTemplateCode}
              >
                <MenuItem value={"template1"}>Template1</MenuItem>
                <MenuItem value={"template2"}>Template2</MenuItem>
                <MenuItem value={"template3"}>Template3</MenuItem>
              </Select>
            </Grid>
          </Grid>
          <Grid container xs={12} justify="center">
            <Grid item xs={3}>
              <Button
                data-testid="create-quiz-back"
                className={classes.buttonStyles}
                color="primary"
                variant="contained"
                onClick={props.handleBack}
              >
                Back
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                data-testid="create-quiz-submit"
                className={classes.buttonStyles}
                color="primary"
                variant="contained"
                onClick={props.handleSubmit}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default QuizForm;
