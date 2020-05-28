describe("Hello Cypress", () => {
  it("visit the CASE site", () => {
    cy.visit("http://localhost:3000");
  });

  it("should render Hello World! text", () => {
    cy.contains("Hello World!");
  });
});
