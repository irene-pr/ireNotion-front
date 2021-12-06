const url = Cypress.env("PRODUCTION_URL");

describe("Given a Home view", () => {
  describe("When it goes to the Home page", () => {
    it("Then there are 2 headers", () => {
      cy.visit(url);
      cy.get("h1").should("have.length", 2);
    });
    it("Then the 2 headers have text 'IRENOTION'", () => {
      cy.visit(url);
      cy.get("h1").first().should("have.text", "IRENOTION");
      cy.get("h1").last().should("have.text", "IRENOTION");
    });
    it("Then there are 2 buttons", () => {
      cy.visit(url);
      cy.get("button").should("have.length", 2);
    });
  });

  describe("When you click on the login button", () => {
    it("Then it goes to the login page", () => {
      cy.visit(url);
      cy.get("button").first().click();

      cy.location("pathname").should("equal", "/login");
    });
  });
  describe("When you click on the sign up button", () => {
    it("Then it goes to the register page", () => {
      cy.visit(url);
      cy.get("button").last().click();

      cy.location("pathname").should("equal", "/register");
    });
  });
});
