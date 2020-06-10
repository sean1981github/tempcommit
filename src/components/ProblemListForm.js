import React, { Fragment, Component } from "react";
import "./ProblemForm.css";
import Axios from "../utils/axiosInstance";
import ButtonAppBar from "./ButtonAppBar";
//import TabPanel from "./TabPanels";
import ProblemListUI from "./ProblemListUI";
//import ProblemFormUI from "./ProblemFormUI";
//import Option from "./Option";
//import { v4 as uuid } from "uuid";
import { withRouter } from "react-router-dom";
const STATUS_OK = 200;
// const MIN_INPUT_LENGTH = 5;
// const MIN_OPTIONS_COUNT = 2;
// const API_TO_ADD_PROBLEM = "problem/add";
const LINK_TO_EDIT_PROBLEM = "/problem/edit";

export class ProblemListForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      problems: [],
      isLoading: false,
      errorMessages: {
        api: "",
      },
      apiError: "",
      problemToEdit: {},
    };
  }

  goToEditPage = () => {
    this.props.history.push({
      pathname: LINK_TO_EDIT_PROBLEM,
      state: {
        problem: this.state.problemToEdit,
        username: this.state.user.username,
        role: this.state.user.role,
      },
    });
  };

  showProblemListFormUI = () => {
    return (
      <Fragment>
        <ProblemListUI
          // questionText={this.state.questionText}
          // handleQuestionTextInput={this.handleQuestionTextInput}
          // newOptionText={this.state.newOptionText}
          // handleOptionTextInput={this.handleOptionTextInput}
          // optionList={this.state.optionList}
          // handleAddNewOption={this.handleAddNewOption}
          // showOptionList={this.showOptionList}
          // answer={this.state.answer}
          // handleUpdateAnswer={this.handleUpdateAnswer}
          // problemSets={this.state.problemSets}
          // problemSetCode={this.state.problemSetCode}
          // handleUpdateProblemSetCode={this.handleUpdateProblemSetCode}
          // submit={this.submit}
          // errorMessages={this.state.errorMessages}
          goToEditPage={this.goToEditPage}
          problemToEdit={this.state.problemToEdit}
          isLoading={this.state.isLoading}
          problems={this.state.problems}
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
        username: this.props.username,
        role: this.props.role,
      },
    });

    Axios.get("problem")
      .then((res) => {
        if (res.status === STATUS_OK && res.data) {
          this.setState({ problems: res.data });
        } else {
          this.setState({
            isLoading: false,
            errorMessages: {
              ...this.state.errorMessages,
              api:
                "Failed to retrieve problems. Please refresh page and try again.",
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
              "Failed to retrieve problems. Please refresh page and try again.",
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
          username={this.props.username}
          role={this.props.role}
        />
        {/* <TabPanel
          history={this.props.history}
          setLoggedIn={this.props.setLoggedIn}
        /> */}
        {this.showProblemListFormUI()}
      </div>
    );
  }
}

export default withRouter(ProblemListForm);
