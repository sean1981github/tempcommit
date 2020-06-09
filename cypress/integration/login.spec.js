import loginHelper from "../support/login-helper";

describe("Login Cypress", () => {
  it("visit the CASE site", () => {
    cy.visit("https://case-selfeval-frontend.herokuapp.com");
  });

  it("should render WELCOME TO CASE text", () => {
    cy.contains("WELCOME TO CASE");
    cy.contains("(Competency Assessment & Self Evaluation)");
    cy.contains("Account sign in");
  });

  it("should after entering the hr username and password and upon click, display HR screen", () => {
    loginHelper.enterUsername(Cypress.env("HR_ID"));
    loginHelper.enterPassword(Cypress.env("HR_PASS"));
    loginHelper.clickSignIn();
    cy.get('[aria-label="audio-loading"]');

    cy.get("#simple-tab-1", { timeout: 10000 }).should(
      "have.attr",
      "aria-selected",
      "true"
    );
  });

  it("it should display 'You have logged out' after clicking on the logout button", () => {
    loginHelper.clickLogOut();
  });

  it("should after entering the QM username and password and upon click, display QM screen", () => {
    loginHelper.enterUsername(Cypress.env("QM_ID"));
    loginHelper.enterPassword(Cypress.env("QM_PASS"));
    loginHelper.clickSignIn();
    cy.get('[aria-label="audio-loading"]');
    cy.get("#simple-tab-0").should("have.attr", "aria-selected", "true");
  });

  it("it should display 'You have logged out' after clicking on the logout button", () => {
    loginHelper.clickLogOut();
  });

  it("should after entering the Assessor username and password and upon click, display Assessor screen", () => {
    loginHelper.enterUsername(Cypress.env("AS_ID"));
    loginHelper.enterPassword(Cypress.env("AS_PASS"));
    loginHelper.clickSignIn();
    cy.get('[aria-label="audio-loading"]');
    cy.get("#simple-tab-2").should("have.attr", "aria-selected", "true");
  });

  it("it should display 'You have logged out' after clicking on the logout button", () => {
    loginHelper.clickLogOut();
  });

  /*   it("it should display 'You are not authorised' when trying to access a protected route without login", () => {
    loginHelper.enterUsername(Cypress.env("HR_ID"));
    loginHelper.enterPassword(Cypress.env("HR_PASS"));
    loginHelper.clickSignIn();
    cy.get('[aria-label="audio-loading"]');
    loginHelper.clickLogOut();
    cy.visit("https://case-selfeval-frontend.herokuapp.com/home");
    cy.contains("You are not authorised"); 
  });*/
});
