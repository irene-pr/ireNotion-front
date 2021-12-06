const url = Cypress.env("PRODUCTION_URL");

describe("Given a Not Found view", () => {
  describe("When it goes to the /404 path", () => {
    it("Then it goes to the NotFound page", () => {
      cy.visit(`${url}/404`);
      cy.get("h1").should("have.text", "404 Not found");
    });
  });
  describe("When it goes to a path not defined in router", () => {
    it("Then it goes to the NotFound page", () => {
      cy.visit(`${url}/mario`);
      cy.location("pathname").should("equal", "/404");
    });
  });
});
