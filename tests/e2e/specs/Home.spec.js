describe("Given a Home view", () => {
  describe("When it goes to the Home page", () => {
    it("Then there are 2 buttons", () => {
      cy.visit("/");
      cy.get("button").should("have.length", 2);
    });
  });

  describe("When you click on the login button", () => {
    it("Then it goes to the login page", () => {
      cy.visit("/");
      cy.get("button.nav__button--login").click();

      cy.location("pathname").should("equal", "/login");
    });
  });
  describe("When you click on the sign up button", () => {
    it("Then it goes to the register page", () => {
      cy.visit("/");
      cy.get("button.nav__button--signup").click();

      cy.location("pathname").should("equal", "/register");
    });
  });
});
