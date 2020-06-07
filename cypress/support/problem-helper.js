class ProblemHelper {
  enterQuestion(question) {
    cy.get('[data-testid="question-textfield"]').type(question);
    cy.get('[data-testid="question-textfield"]').should("have.value", question);
  }
  enterOption(option) {
    cy.get('[data-testid="option-textfield"]').type(option);
    cy.get('[data-testid="option-textfield"]').should("have.value", option);
    cy.get('[data-testid="add-option-button"]').click();
    cy.contains(option);
  }
  deleteOption(option, optionDescr) {
    cy.get(`[data-testid="delete-option-icon-${option}"]`).click();
    cy.contains(optionDescr).should("not.exist");
  }

  selectCorrectAnswerOption(option) {
    cy.get('[data-testid="options-select"]').click();
    cy.get('[role="listbox"]');
    cy.get(`[data-value="${option}"]`).click();
    cy.get('[data-testid="options-select"]').contains(`Option ${option}`);
  }

  selectProblemSet(problemSet) {
    cy.get('[data-testid="problemSetCode-select"]').click();
    cy.get('[data-testid="problemSetCode-select"]').should(
      "have.attr",
      "aria-expanded",
      "true"
    );
    cy.get(`[data-value="${problemSet}"]`).click();
    cy.get('[data-testid="problemSetCode-select"]').contains(problemSet);
  }
}

export default new ProblemHelper();
