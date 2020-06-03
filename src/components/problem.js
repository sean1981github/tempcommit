import React, { useState, Fragment, Component } from "react";
import { v4 as uuid } from "uuid";
import "./problem.css";
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
import { Redirect } from "react-router-dom";
import Option from "./option";
import { ProblemAPI } from "../utils/axiosHelper";
import ProblemForm from "./ProblemForm";

class Problem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionText: "",
      newOptionText: "",
      optionList: [{ option: "aewdawd" }, { option: "aefawdawda" }],
      answer: null,
      problemSetCode: "ProblemSetCodeA",
      errorMessage: "",
      isLoading: false,
      isRedirecting: false,
      savedProblem: {},
    };
  }

  handleQuestionTextInput = (event) => {
    this.setState({
      questionText: event.target.value,
    });
  };

  handleOptionTextInput = (event) => {
    this.setState({ newOptionText: event.target.value });
  };

  addOption = () => {
    const inputText = this.state.newOptionText;
    if (inputText.length < 5) {
      return;
    }

    const newOption = {
      option: inputText,
    };

    this.setState({
      newOptionText: "",
      optionList: [...this.state.optionList, newOption],
    });
  };

  handleUpdateAnswer = (selectedOption) => {
    this.setState({
      answer: selectedOption.target.value,
    });
  };

  submit = () => {
    const payload = {
      question: this.state.questionText,
      options: this.state.optionList,
      answer: this.state.answer,
      problemSetCode: this.state.problemSetCode,
    };
    ProblemAPI.post("./add", payload, {
      withCredentials: true,
    })
      .then((res) => {
        this.setState({ isRedirecting: true, savedProblem: res.data });
      })
      .catch((error) => {
        if (error.response.data) {
          this.setState({
            errorMessage: `Failed to add problem - ${error.response.data} - ${error.response.status}`,
          });
        }
      });
  };

  updateOptions = (newOptions) => {
    this.setState({ optionList: newOptions });
  };

  showProblemForm = () => {
    return (
      <Fragment>
        <ProblemForm
          questionText={this.state.questionText}
          newOptionText={this.state.newOptionText}
          optionList={this.state.optionList}
          answer={this.state.answer}
          problemSetCode={this.state.problemSetCode}
          handleOptionTextInput={this.handleOptionTextInput}
          addOption={this.addOption}
          updateOptions={this.updateOptions}
          handleQuestionTextInput={this.handleQuestionTextInput}
          handleUpdateAnswer={this.handleUpdateAnswer}
          submit={this.submit}
        />
      </Fragment>
    );
  };

  render() {
    return (
      <div>
        {this.showProblemForm()}
        {this.state.isRedirecting === true ? (
          <Redirect
            to={{
              pathname: "/problem/confirmation",
              state: this.state.savedProblem,
            }}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Problem;
