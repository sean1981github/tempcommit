import loginHelper from "../support/login-helper";
import problemHelper from "../support/problem-helper";

describe("Create new Problem test", () => {
  it("visit the CASE site", () => {
    cy.visit("https://case-selfeval-frontend.herokuapp.com/");
  });

  it("should render WELCOME TO CASE text", () => {
    cy.contains("WELCOME TO CASE");
    cy.contains("(Competency Assessment & Self Evaluation)");
    cy.contains("Account sign in");
  });

  it("should after entering the QM username and password and upon click, display QM screen", () => {
    loginHelper.enterUsername(Cypress.env("QM_ID"));
    loginHelper.enterPassword(Cypress.env("QM_PASS"));
    loginHelper.clickSignIn();
    cy.get('[aria-label="audio-loading"]');
    cy.get("#simple-tab-0", { timeout: 10000 }).should(
      "have.attr",
      "aria-selected",
      "true"
    );
  });

  it("should display 'Create New Problem' page after clicking the create new problem '>'", () => {
    cy.get('[data-testid="Create New Problem"]')
      .children(".MuiButton-label")
      .children(".MuiSvgIcon-root")
      .click();
    cy.contains("Create New Problem");
  });

  it("should be able to fill up the form and edit and delete options", () => {
    cy.contains("Create New Problem");
    problemHelper.enterQuestion("This is a sample question");

    problemHelper.enterOption("This is a wrong option 1");
    problemHelper.enterOption("This is a wrong option 2");
    problemHelper.enterOption("This is a correct option 3");
    problemHelper.deleteOption(2, "This is a wrong option 2");

    problemHelper.selectCorrectAnswerOption(2);
    problemHelper.selectProblemSet("Agile-easy");
  });
});
