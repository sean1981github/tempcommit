import loginHelper from "../support/login-helper";

describe("Login Cypress", () => {
  it("visit the CASE site", () => {
    cy.visit("https://case-selfeval-frontend.herokuapp.com/");
  });

  it("should render WELCOME TO CASE text", () => {
    cy.contains("WELCOME TO CASE");
    cy.contains("(Competency Assessment & Self Evaluation)");
    cy.contains("Account sign in");
  });

  it("should fill in the hr username", () => {
    loginHelper.enterUsername("hr");
  });

  it("should fill in the hr password", () => {
    loginHelper.enterPassword("passwordhr");
  });

  it("should see HR tab after sign in", () => {
    loginHelper.clickSignIn();
    cy.get('[aria-label="audio-loading"]');
    cy.contains(".MuiTab-root", "HR");
  });

  it("it should should 'You have logged out' after clicking on the logout button", () => {
    loginHelper.clickLogOut();
  });

  it("should fill in the QM username", () => {
    loginHelper.enterUsername("qm");
  });

  it("should fill in the QM password", () => {
    loginHelper.enterPassword("passwordqm");
  });

  it("should see HR tab after sign in", () => {
    loginHelper.clickSignIn();
    cy.get('[aria-label="audio-loading"]');
    cy.contains(".MuiTab-root", "QUIZ MASTER");
  });

  it("it should should 'You have logged out' after clicking on the logout button", () => {
    loginHelper.clickLogOut();
  });

  it("should fill in the Assessor username", () => {
    loginHelper.enterUsername("assessor");
  });

  it("should fill in the Assessor password", () => {
    loginHelper.enterPassword("passwordas");
  });

  it("should after entering the Assessor username and password and upon click, display Login as Assessor successfully", () => {
    loginHelper.clickSignIn();
    cy.get('[aria-label="audio-loading"]');
    cy.contains(".MuiTab-root", "ASSESSOR");
  });

  it("it should should 'You have logged out' after clicking on the logout button", () => {
    loginHelper.clickLogOut();
  });
});
