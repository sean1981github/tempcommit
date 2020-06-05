import React, { Fragment, Component } from "react";
import "./ProblemForm.css";
import Axios from "../utils/axiosInstance";
import ButtonAppBar from "./ButtonAppBar";
import ProblemFormUI from "./ProblemFormUI";
import Option from "./Option";
import { v4 as uuid } from "uuid";
import { withRouter } from "react-router-dom";
const STATUS_OK = 200;
const MIN_INPUT_LENGTH = 5;
const MIN_OPTIONS_COUNT = 2;
const API_TO_ADD_PROBLEM = "problem/add";
const LINK_TO_CONFIRM_PROBLEM = "/problem/confirmation";

export class ProblemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      questionText: "",
      newOptionText: "",
      optionList: [],
      answer: "",
      problemSets: [],
      problemSetCode: "",
      isLoading: false,
      errorMessages: {
        questionText: "",
        newOptionText: "",
        optionList: "",
        answer: "",
        problemSetCode: "",
        api: "",
      },
      apiError: "",
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
    const invalidNewOptionText =
      !questionText || questionText.length < MIN_INPUT_LENGTH;

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
            this.setState({ answer: "" });
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

  validateQuestion = (questionText) => {
    return questionText === "" || questionText.length < MIN_INPUT_LENGTH;
  };

  validateOptions = (optionList) => {
    return optionList.length < MIN_OPTIONS_COUNT;
  };

  validateAnswer = (answer) => {
    return answer === "";
  };

  validateProblemSetCode = (problemSetCode) => {
    return problemSetCode === "";
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

    const invalidQuestion = this.validateQuestion(questionText);
    const invalidOptions = this.validateOptions(optionList);
    const invalidAnswer = this.validateAnswer(answer);
    const invalidProblemSetCode = this.validateProblemSetCode(problemSetCode);

    if (
      invalidQuestion ||
      invalidOptions ||
      invalidAnswer ||
      invalidProblemSetCode
    ) {
      this.setState({
        errorMessages: {
          ...this.state.errorMessages,
          questionText: invalidQuestion
            ? "Question cannot empty and needs to be 5 characters or longer"
            : "",
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

      Axios.post(API_TO_ADD_PROBLEM, payload)
        .then((res) => {
          if (res.status === STATUS_OK && res.data) {
            this.setState({
              isLoading: false,
            });
            this.props.history.push({
              pathname: LINK_TO_CONFIRM_PROBLEM,
              state: {
                problem: res.data,
                username: this.state.user.username,
                role: this.state.user.role,
              },
            });
          } else {
            this.setState({
              isLoading: false,
              errorMessages: {
                ...this.state.errorMessages,
                api:
                  "Failed to add problem. Something is wrong, please try again later.",
              },
            });
          }
        })
        .catch((error) => {
          this.setState({
            isLoading: false,
            apiError: error,
            errorMessages: {
              ...this.state.errorMessages,
              api:
                "Failed to add problem. Something is wrong, please try again later.",
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
          problemSets={this.state.problemSets}
          problemSetCode={this.state.problemSetCode}
          handleUpdateProblemSetCode={this.handleUpdateProblemSetCode}
          submit={this.submit}
          errorMessages={this.state.errorMessages}
          isLoading={this.state.isLoading}
          backToPrevPage={this.props.history.goBack}
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

  componentDidMount() {
    this.setState({
      user: {
        username: this.props.history.location.state.username,
        role: this.props.history.location.state.role,
      },
    });

    Axios.get("problem-set")
      .then((res) => {
        if (res.status === STATUS_OK && res.data) {
          this.setState({ problemSets: res.data });
        } else {
          this.setState({
            isLoading: false,
            errorMessages: {
              ...this.state.errorMessages,
              api:
                "Failed to retrieve problem set. Please refresh page and try again.",
            },
          });
        }
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
          apiError: error,
          errorMessages: {
            ...this.state.errorMessages,
            api:
              "Failed to retrieve problem set. Please refresh page and try again.",
          },
        });
      });
  }

  render() {
    return (
      <div>
        <ButtonAppBar
          history={this.props.history}
          setLoggedIn={this.props.setLoggedIn}
        />
        {this.showProblemFormUI()}
      </div>
    );
  }
}

export default withRouter(ProblemForm);
