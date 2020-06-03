class LoginHelper {
  enterUsername(username) {
    cy.get('[data-testid="username"]').type(username);
    cy.get('[data-testid="username"]').should("have.value", username);
  }

  enterPassword(password) {
    cy.get('[data-testid="password"]').type(password);
    cy.get('[data-testid="password"]').should("have.value", password);
  }

  clickSignIn() {
    cy.get('[data-testid="signin"]').click();
  }

  clickLogOut() {
    cy.get(".MuiIconButton-label").click();
    cy.get('[data-testid="logoutButton"]').click();
    cy.contains("You have logged out");
  }

  enterOtherPushUp(pushUp) {
    cy.get(".appsMaterialWizToggleRadiogroupElContainer")
      .find('[aria-label="Other:"]')
      .click();
    cy.get(".freebirdFormviewerViewItemsRadioOtherInputElement")
      .find('[aria-label="Other response"]')
      .type(pushUp);

    cy.get(".freebirdFormviewerViewItemsRadioOtherInputElement")
      .find('[aria-label="Other response"]')
      .should("have.value", "6");
  }

  enterFavGamesAsComputerGames() {
    cy.get('[aria-label="computer games"]').should("not.be.checked");
    cy.get('[aria-label="computer games"]').click();
    cy.get('[aria-label="computer games"]').should(
      "have.attr",
      "aria-checked",
      "true"
    );
  }

  enterFavGamesAsMobileGames() {
    cy.get('[aria-label="mobile games"]').should("not.be.checked");
    cy.get('[aria-label="mobile games"]').click();
    cy.get('[aria-label="mobile games"]').should(
      "have.attr",
      "aria-checked",
      "true"
    );
  }
  enterFavGamesAsVideoConsoleGames() {
    cy.get('[aria-label="video console games"]').should("not.be.checked");
    cy.get('[aria-label="video console games"]').click();
    cy.get('[aria-label="video console games"]').should(
      "have.attr",
      "aria-checked",
      "true"
    );
  }

  selectMaleGender() {
    cy.contains("Gender")
      .parents(".freebirdFormviewerViewNumberedItemContainer")
      .contains("Choose")
      .click();

    cy.get(".exportSelectPopup").contains("Male").click();

    cy.get(".isSelected").should("have.attr", "data-value", "Male");
    cy.get(".isSelected").should("have.attr", "aria-selected", "true");
  }
  select3() {
    cy.get('[aria-label="Do you love to code?"]')
      .find('[aria-label="3"]')
      .click();

    cy.get('[aria-label="Do you love to code?"]')
      .find('[aria-label="3"]')
      .should("have.attr", "aria-checked", "true");
  }

  selectYes() {
    cy.contains("Did you enjoy this quiz?")
      .parents(".freebirdFormviewerViewItemsItemItem")
      .find('[aria-label="Yes"]')
      .click();

    cy.contains("Did you enjoy this quiz?")
      .parents(".freebirdFormviewerViewItemsItemItem")
      .find('[aria-label="Yes"]')
      .should("have.attr", "aria-checked", "true");
  }

  submitForm() {
    cy.contains("Submit").click();
  }
}

export default new LoginHelper();
