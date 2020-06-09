import React, { Fragment, Component } from "react";
import "./QuizTemplateForm.css";
import Axios from "../utils/axiosInstance";
import ButtonAppBar from "./ButtonAppBar";
import QuizTemplateFormUI from "./QuizTemplateFormUI";
import Option from "./Option";
import { v4 as uuid } from "uuid";
import { withRouter } from "react-router-dom";
const STATUS_OK = 200;
const MIN_QUIZ_TEMPLATE_CODE_LENGTH = 3;
const MIN_PROBLEMSETS_COUNT = 1;
const MIN_PASSING_SCORE = 1;
const MAX_PASSING_SCORE = 100;
const MIN_TOTAL_DURATION = 1;
const MAX_TOTAL_DURATION = 180;
const LINK_TO_CONFIRM_QUIZ_TEMPLATE = "/quiz-template/confirmation";

export class QuizTemplateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      quizTemplateCode: "",
      passingScoreText: "",
      totalScoreText: "",
      totalDurationText: "",
      problemSetNumberText: "",
      problemSetList: [],
      problemSets: [],
      problemSetCode: null,
      isLoading: false,
      errorMessages: {
        quizTemplateCode: "",
        passingScoreText: "",
        totalDurationText: "",
        problemSetCode: "",
        problemSetNumberText: "",
        problemSetList: "",
        problemSetQuestionNumberText: "",
        api: "",
      },
    };
  }

  handleQuizTemplateCode = (event) => {
    this.setState({
      quizTemplateCode: event.target.value,
    });
  };

  handlePassingScoreText = (event) => {
    this.setState({
      passingScoreText: event.target.value,
    });
  };

  handleTotalDurationText = (event) => {
    this.setState({
      totalDurationText: event.target.value,
    });
  };

  handleProblemSetNumberText = (event) => {
    this.setState({ problemSetNumberText: event.target.value });
  };

  validateNewProblemSetInput = () => {
    this.setState({
      errorMessages: {
        problemSetCode: "",
        problemSetNumberText: "",
      },
    });
    const problemSetNumberText = this.state.problemSetNumberText;
    const problemSetCode = this.state.problemSetCode;
    const invalidProblemSetNumberText =
      !problemSetNumberText || problemSetNumberText < 0;
    const invalidProblemSetCode = !problemSetCode;

    if (invalidProblemSetNumberText) {
      this.setState({
        errorMessages: {
          ...this.state.errorMessages,
          problemSetNumberText: invalidProblemSetNumberText
            ? "Problem set number cannot empty and needs to be > 0"
            : "",
          problemSetCode: invalidProblemSetCode
            ? "Please select a Problem Set"
            : "",
          problemSetQuestionNumberText: "",
        },
      });
      return false;
    }
    return true;
  };

  validateNewProblemSetCount = async () => {
    const problemSetNumberText = this.state.problemSetNumberText;
    const problemSetCode = this.state.problemSetCode;

    this.setState({
      errorMessages: {
        problemSetNumberText: "",
        problemSetQuestionNumberText: "",
      },
    });

    let problemCount = 0;
    await Axios.get(`problem/${problemSetCode}/countproblem`)
      .then((res) => {
        if (res.status === STATUS_OK && res.data) {
          problemCount = res.data;
        } else {
          this.setState({
            isLoading: false,
            errorMessages: {
              ...this.state.errorMessages,
              api:
                "Failed to retrieve problem count. Please refresh page and try again.",
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
              "Failed to retrieve problem count. Please refresh page and try again.",
          },
        });
      });
    if (parseInt(problemCount, 10) < parseInt(problemSetNumberText, 10)) {
      this.setState({
        errorMessages: {
          ...this.state.errorMessages,
          problemSetQuestionNumberText:
            "Number of questions should not exceed the maximum number in Problem Set",
        },
      });
      return false;
    }
    return true;
  };

  handleAddNewProblemSet = async () => {
    if (this.validateNewProblemSetInput() === false) {
      return;
    } else {
      if ((await this.validateNewProblemSetCount()) === false) {
        return;
      } else {
        const newProblemSet = {
          categoryCode: this.state.problemSetCode,
          numberOfQuestions: this.state.problemSetNumberText,
          option: `${this.state.problemSetCode} - ${this.state.problemSetNumberText}`,
        };

        this.setState({
          problemSetCode: "",
          problemSetNumberText: "",
          totalScoreText: this.calculateTotalScore([
            ...this.state.problemSetList,
            newProblemSet,
          ]),
          totalDurationText: this.calculateTotalDuration([
            ...this.state.problemSetList,
            newProblemSet,
          ]),
          problemSetList: [...this.state.problemSetList, newProblemSet],
          errorMessages: {
            ...this.state.errorMessages,
            problemSetCode: "",
            problemSetNumberText: "",
            problemSetQuestionNumberText: "",
          },
        });
      }
    }
  };

  handleUpdateProblemSetList = (newProblemSetList) => {
    this.setState({
      totalScoreText: this.calculateTotalScore(newProblemSetList),
      totalDurationText: this.calculateTotalDuration(newProblemSetList),
      problemSetList: newProblemSetList,
    });
  };

  showProblemSetList = () => {
    const problemSetList = this.state.problemSetList;

    return problemSetList.map((currentproblemSet, index) => {
      return (
        <Option
          key={uuid()}
          index={index + 1}
          option={currentproblemSet}
          deleteItem={() => {
            const filteredproblemSets = problemSetList.filter(
              (problemSet) =>
                currentproblemSet.categoryCode !== problemSet.categoryCode
            );
            this.handleUpdateProblemSetList([...filteredproblemSets]);
          }}
        />
      );
    });
  };

  handleUpdateProblemSetCode = (selecteProblemSet) => {
    this.setState({
      problemSetCode: selecteProblemSet.target.value,
    });
  };

  validateForm = () => {
    const quizTemplateCode = this.state.quizTemplateCode;
    const passingScoreText = this.state.passingScoreText;
    const totalDurationText = this.state.totalDurationText;
    const problemSetList = this.state.problemSetList;
    this.setState({
      errorMessages: {
        quizTemplateCode: "",
        passingScoreText: "",
        totalDurationText: "",
        problemSetList: "",
        problemSetNumberText: "",
        problemSetQuestionNumberText: "",
      },
    });

    const invalidQuizTemplateCode =
      !quizTemplateCode ||
      quizTemplateCode.length < MIN_QUIZ_TEMPLATE_CODE_LENGTH;
    const invalidpassingScoreText =
      !passingScoreText ||
      passingScoreText < MIN_PASSING_SCORE ||
      passingScoreText > MAX_PASSING_SCORE;
    const invalidtotalDurationText =
      !totalDurationText ||
      totalDurationText < MIN_TOTAL_DURATION ||
      totalDurationText > MAX_TOTAL_DURATION;
    const invalidProblemSetList = problemSetList.length < MIN_PROBLEMSETS_COUNT;

    if (
      invalidQuizTemplateCode ||
      invalidpassingScoreText ||
      invalidtotalDurationText ||
      invalidProblemSetList
    ) {
      this.setState({
        errorMessages: {
          ...this.state.errorMessages,
          quizTemplateCode: invalidQuizTemplateCode
            ? `Quiz Template Code cannot be empty and needs to be ${MIN_QUIZ_TEMPLATE_CODE_LENGTH} characters or longer`
            : "",
          passingScoreText: invalidpassingScoreText
            ? `Passing score cannot be empty and needs to be >= ${MIN_PASSING_SCORE} and <= ${MAX_PASSING_SCORE}`
            : "",
          totalDurationText: invalidtotalDurationText
            ? `Total duration cannot be empty and needs to be >=  ${MIN_TOTAL_DURATION} and <=  ${MAX_TOTAL_DURATION}`
            : "",
          problemSetList: invalidProblemSetList
            ? `Please add at least ${MIN_PROBLEMSETS_COUNT} Problem Sets`
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
        quizTemplateCode: this.state.quizTemplateCode,
        passingScore: this.state.passingScoreText,
        totalScore: this.state.totalScoreText,
        totalDurationInMins: this.state.totalDurationText,
        problemSetsNumber: this.state.problemSetList,
      };

      Axios.post("quiz-template/create", payload)
        .then((res) => {
          if (res.status === STATUS_OK && res.data) {
            this.setState({
              isLoading: false,
            });
            this.props.history.push({
              pathname: LINK_TO_CONFIRM_QUIZ_TEMPLATE,
              state: {
                quizTemplate: res.data,
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
                  "Failed to add quiz template. Something is wrong, please try again later.",
              },
            });
          }
        })
        .catch((error) => {
          let errMsg =
            "Failed to add quiz template. Something is wrong, please try again later.";
          if (JSON.stringify(error.response.data).includes("E11000")) {
            errMsg =
              "Quiz Template Code already exists. Please enter another Template Code.";
          }
          this.setState({
            isLoading: false,
            errorMessages: {
              ...this.state.errorMessages,
              api: errMsg,
            },
          });
        });
    }
  };

  filterProblemSet = () => {
    const filterProblemSet = [];

    this.state.problemSets.forEach((problemSet) => {
      const found = this.state.problemSetList.find(
        (selectedProblemSet) =>
          selectedProblemSet.categoryCode === problemSet.categoryCode
      );
      if (!found) {
        filterProblemSet.push(problemSet);
      }
    });

    return filterProblemSet;
  };

  calculateTotalScore = (newProblemSetList) => {
    let totalScore = 0;

    newProblemSetList.forEach((selectedProblemSet) => {
      const foundproblemSet = this.state.problemSets.find(
        (problemSet) =>
          selectedProblemSet.categoryCode === problemSet.categoryCode
      );
      totalScore +=
        foundproblemSet.score * selectedProblemSet.numberOfQuestions;
    });
    return totalScore;
  };

  calculateTotalDuration = (newProblemSetList) => {
    let totalDuration = 0;

    newProblemSetList.forEach((selectedProblemSet) => {
      const foundproblemSet = this.state.problemSets.find(
        (problemSet) =>
          selectedProblemSet.categoryCode === problemSet.categoryCode
      );
      totalDuration +=
        foundproblemSet.durationInMins * selectedProblemSet.numberOfQuestions;
    });
    return totalDuration;
  };

  showQuizTemplateFormUI = () => {
    return (
      <div>
        <QuizTemplateFormUI
          quizTemplateCode={this.state.quizTemplateCode}
          handleQuizTemplateCode={this.handleQuizTemplateCode}
          passingScoreText={this.state.passingScoreText}
          handlePassingScoreText={this.handlePassingScoreText}
          totalScoreText={this.state.totalScoreText}
          handleTotalDurationText={this.handleTotalDurationText}
          totalDurationText={this.state.totalDurationText}
          problemSetNumberText={this.state.problemSetNumberText}
          handleProblemSetNumberText={this.handleProblemSetNumberText}
          problemSetList={this.state.problemSetList}
          handleAddNewProblemSet={this.handleAddNewProblemSet}
          showProblemSetList={this.showProblemSetList}
          problemSets={this.filterProblemSet()}
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
      </div>
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
        {this.showQuizTemplateFormUI()}
      </div>
    );
  }
}

export default withRouter(QuizTemplateForm);
