describe("Hello Cypress", () => {
  it("visit the CASE site", () => {
    cy.visit("http://localhost:3000");
  });

  it("should render WELCOME TO CASE text", () => {
    cy.contains("WELCOME TO CASE");
  });
});
