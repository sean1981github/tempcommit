import React, { Component, Fragment } from "react";
import { Typography } from "@material-ui/core";
import { withRouter } from "react-router-dom";

import ProblemConfirmationUI from "./ProblemConfirmationUI";

class ProblemConfirmation extends Component {
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
          {indexToDisplay}.&nbsp;{option.option}
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

  showProblemConfirmationUI = () => {
    return (
      <Fragment>
        <ProblemConfirmationUI
          problem={this.props.location.state}
          showQuestion={this.showQuestion}
          showOptions={this.showOptions}
          showAnswer={this.showAnswer}
          showProblemSetCode={this.showProblemSetCode}
        />
      </Fragment>
    );
  };

  render() {
    return <div>{this.showProblemConfirmationUI()}</div>;
  }
}
export default withRouter(ProblemConfirmation);
