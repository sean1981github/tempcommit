import React, { Fragment, Component } from "react";
import "./ProblemForm.css";
import { ProblemAPI } from "../utils/axiosHelper";
import ProblemFormUI from "./ProblemFormUI";
import Option from "./option";
import { v4 as uuid } from "uuid";
const STATUS_OK = 200;

class ProblemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionText: "",
      newOptionText: "",
      optionList: [],
      answer: null,
      problemSetCode: null,
      isLoading: false,
      errorMessages: {
        questionText: "",
        newOptionText: "",
        optionList: "",
        answer: "",
        problemSetCode: "",
        api: "",
      },
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

  validateNewOption = () => {
    this.setState({
      errorMessages: {
        newOptionText: "",
      },
    });
    const questionText = this.state.newOptionText;
    const invalidNewOptionText = !questionText || questionText.length < 5;

    if (invalidNewOptionText) {
      this.setState({
        errorMessages: {
          ...this.state.errorMessages,
          newOptionText:
            "Answer cannot empty and needs to be 5 characters or longer",
        },
      });
      return false;
    }
    return true;
  };

  handleAddNewOption = () => {
    if (this.validateNewOption() === false) {
      return;
    } else {
      const newOption = {
        option: this.state.newOptionText,
      };

      this.setState({
        newOptionText: "",
        optionList: [...this.state.optionList, newOption],
        errorMessages: {
          ...this.state.errorMessages,
          newOptionText: "",
        },
      });
    }
  };

  handleUpdateOptions = (newOptions) => {
    this.setState({ optionList: newOptions });
  };

  showOptionList = () => {
    const optionList = this.state.optionList;

    return optionList.map((currentItem, index) => {
      return (
        <Option
          key={uuid()}
          index={index + 1}
          option={currentItem}
          deleteItem={() => {
            const filteredItem = optionList.filter(
              (item) => currentItem.option !== item.option
            );
            this.handleUpdateOptions([...filteredItem]);
          }}
        />
      );
    });
  };

  handleUpdateAnswer = (selectedOption) => {
    this.setState({
      answer: selectedOption.target.value,
    });
  };

  handleUpdateProblemSetCode = (selectedOption) => {
    this.setState({
      problemSetCode: selectedOption.target.value,
    });
  };

  validateForm = () => {
    const questionText = this.state.questionText;
    const optionList = this.state.optionList;
    const answer = this.state.answer;
    const problemSetCode = this.state.problemSetCode;
    this.setState({
      errorMessages: {
        questionText: "",
        newOptionText: "",
        optionList: "",
        answer: "",
        problemSetCode: "",
      },
    });

    const invalidQuestion = !questionText || questionText.length === 0;
    const invalidOptions = optionList.length < 2;
    const invalidAnswer = !answer || answer === null;
    const invalidProblemSetCode = !problemSetCode || problemSetCode === null;

    if (
      invalidQuestion ||
      invalidOptions ||
      invalidAnswer ||
      invalidProblemSetCode
    ) {
      this.setState({
        errorMessages: {
          ...this.state.errorMessages,
          questionText: invalidQuestion ? "Question should not be empty" : "",
          optionList: invalidOptions ? "Please add at least 2 answers" : "",
          answer: invalidAnswer ? "Correct Answer cannot be empty" : "",
          problemSetCode: invalidProblemSetCode
            ? "Problem Set cannot be empty"
            : "",
        },
      });
      return false;
    }

    return true;
  };

  submit = () => {
    if (this.validateForm() === false) {
      return;
    } else {
      this.setState({ isLoading: true });
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
          if (res.status === STATUS_OK) {
            this.setState({
              isLoading: false,
            });
            this.props.history.push("/problem/confirmation", res.data);
          } else {
            this.setState({
              isLoading: false,
              errorMessages: {
                ...this.state.errorMessages,
                api: "Something is wrong, please try again later.",
              },
            });
          }
        })
        .catch((error) => {
          this.setState({
            isLoading: false,
            errorMessages: {
              ...this.state.errorMessages,
              api: error.response
                ? `Failed to add problem - ${error.response.data} - ${error.response.status}`
                : "Something is wrong, please try again later.",
            },
          });
        });
    }
  };

  showProblemFormUI = () => {
    return (
      <Fragment>
        <ProblemFormUI
          questionText={this.state.questionText}
          handleQuestionTextInput={this.handleQuestionTextInput}
          newOptionText={this.state.newOptionText}
          handleOptionTextInput={this.handleOptionTextInput}
          optionList={this.state.optionList}
          handleAddNewOption={this.handleAddNewOption}
          showOptionList={this.showOptionList}
          answer={this.state.answer}
          handleUpdateAnswer={this.handleUpdateAnswer}
          problemSetCode={this.state.problemSetCode}
          handleUpdateProblemSetCode={this.handleUpdateProblemSetCode}
          submit={this.submit}
          errorMessages={this.state.errorMessages}
          isLoading={this.state.isLoading}
        />
        {this.state.errorMessages.api ? (
          <div className="api-error-message" data-testid="api-error-message">
            {this.state.errorMessages.api}
          </div>
        ) : (
          <div></div>
        )}
      </Fragment>
    );
  };

  render() {
    return <div>{this.showProblemFormUI()}</div>;
  }
}

export default ProblemForm;
