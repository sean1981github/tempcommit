import React, { Component, Fragment } from "react";
import { Typography } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import ProblemConfirmationUI from "./ProblemConfirmationUI";
import ButtonAppBar from "./ButtonAppBar";
const HOME_PAGE_LINK = "/mock-page";

export class ProblemConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      problem: {},
    };
  }

  showQuestion = (problem) => {
    return problem.question;
  };

  showOptions = (problem) => {
    return problem.options.map((option, index) => {
      const indexToDisplay = index + 1;
      return (
        <Typography noWrap variant="h6" key={option.id} color="textSecondary">
          {indexToDisplay}. {option.option}
        </Typography>
      );
    });
  };

  showAnswer = (problem) => {
    return problem.options.find((option) => option.id === problem.answer)
      .option;
  };

  showProblemSetCode = (problem) => {
    return problem.problemSetCode;
  };

  redirectHomePage = () => {
    const user = {
      username: this.props.history.location.state.username,
      role: this.props.history.location.state.role,
    };

    this.props.history.push({
      pathname: HOME_PAGE_LINK,
      state: user,
    });
  };

  showProblemConfirmationUI = () => {
    return (
      <Fragment>
        <ProblemConfirmationUI
          problem={this.props.location.state.problem}
          showQuestion={this.showQuestion}
          showOptions={this.showOptions}
          showAnswer={this.showAnswer}
          showProblemSetCode={this.showProblemSetCode}
          redirectHomePage={this.redirectHomePage}
        />
      </Fragment>
    );
  };

  render() {
    return (
      <div>
        <ButtonAppBar
          history={this.props.history}
          setLoggedIn={this.props.setLoggedIn}
        />
        {this.showProblemConfirmationUI()}
      </div>
    );
  }
}
export default withRouter(ProblemConfirmation);
