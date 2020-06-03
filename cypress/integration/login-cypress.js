describe("login", () => {
  it("visit the CASE site", () => {
    cy.visit("http://localhost:3000/login");
  });

  it("should render WELCOME TO CASE text", () => {
    cy.contains("WELCOME TO CASE");
  });
});
