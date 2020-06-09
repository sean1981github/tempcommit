import React, { Component, Fragment } from "react";
import { Typography } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import QuizTemplateConfirmationUI from "./QuizTemplateConfirmationUI";
import ButtonAppBar from "./ButtonAppBar";
const HOME_PAGE_LINK = "/home";

export class QuizTemplateConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizTemplate: {},
    };
  }

  showQuizTemplateCode = (quizTemplate) => {
    return quizTemplate.quizTemplateCode;
  };

  showProblemSets = (quizTemplate) => {
    return quizTemplate.problemSetsNumber.map((problemSet, index) => {
      const indexToDisplay = index + 1;
      return (
        <Typography
          component="div"
          noWrap
          variant="h6"
          key={problemSet.categoryCode}
          color="textSecondary"
        >
          {indexToDisplay}.{" "}
          {`${problemSet.categoryCode} (${problemSet.numberOfQuestions} questions)`}
        </Typography>
      );
    });
  };

  showPassingScore = (quizTemplate) => {
    return quizTemplate.passingScore;
  };

  showTotalScore = (quizTemplate) => {
    return quizTemplate.totalScore;
  };

  showTotalDuration = (quizTemplate) => {
    return quizTemplate.totalDurationInMins;
  };

  redirectHomePage = () => {
    const user = {
      username: this.props.username,
      role: this.props.role,
    };

    this.props.history.push({
      pathname: HOME_PAGE_LINK,
      state: user,
    });
  };

  showQuizTemplateConfirmationUI = () => {
    return (
      <Fragment>
        <QuizTemplateConfirmationUI
          quizTemplate={this.props.location.state.quizTemplate}
          showQuizTemplateCode={this.showQuizTemplateCode}
          showProblemSets={this.showProblemSets}
          showPassingScore={this.showPassingScore}
          showTotalScore={this.showTotalScore}
          showTotalDuration={this.showTotalDuration}
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
          username={this.props.username}
        />
        {this.showQuizTemplateConfirmationUI()}
      </div>
    );
  }
}
export default withRouter(QuizTemplateConfirmation);
