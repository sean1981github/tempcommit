import "date-fns";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Grid,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

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
  gridContainer: {
    direction: "row",
    justify: "flex-start",
    alignItems: "baseline",
  },
}));

const QuizForm = (props) => {
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <Box className={classes.root}>
      <Typography component="div" variant="h6">
        Create Quiz
      </Typography>
      <form className={classes.form} noValidate autoComplete="off">
        <Grid container justify="center" spacing={5}>
          <Grid item xs={12} container className={classes.gridContainer}>
            <Grid item xs={4} container className={classes.gridContainer}>
              <Typography component="div" variant="h6">
                Candidate Name:
              </Typography>
            </Grid>
            <Grid item xs={8} container className={classes.gridContainer}>
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
          <Grid item xs={12} container className={classes.gridContainer}>
            <Grid item xs={4} container className={classes.gridContainer}>
              <Typography component="div" variant="h6">
                Candidate Email:
              </Typography>
            </Grid>
            <Grid item xs={8} container className={classes.gridContainer}>
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
          <Grid item xs={12} container className={classes.gridContainer}>
            <Grid item xs={4} container className={classes.gridContainer}>
              <Typography component="div" variant="h6">
                Quiz Template:
              </Typography>
            </Grid>
            <Grid item xs={8} container className={classes.gridContainer}>
              <TextField
                select
                required
                value={props.quizTemplateCode}
                onChange={props.handleSelectQuizTemplateCode}
                selectProps={{
                  selectDisplayprops: { "data-testid": "select-quiz-template" },
                }}
              >
                <MenuItem value={"template1"}>Template1</MenuItem>
                <MenuItem value={"template2"}>Template2</MenuItem>
                <MenuItem value={"template3"}>Template3</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <Grid item xs={12} container className={classes.gridContainer}>
            <Grid item xs={4} container className={classes.gridContainer}>
              <Typography component="div" variant="h6">
                Quiz Expiry Date:
              </Typography>
            </Grid>
            <Grid item xs={8} container className={classes.gridContainer}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="left">
                  <KeyboardDatePicker
                    margin="normal"
                    id="expiry-date-picker-dialog"
                    label="Date picker dialog"
                    format="dd/MM/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
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
