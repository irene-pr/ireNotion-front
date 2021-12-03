describe("Given a Home view", () => {
  describe("When it goes to the Home page", () => {
    it("Then there are 2 headers", () => {
      cy.visit("https://irene-front-final-project-202109.vercel.app/");
      cy.get("h1").should("have.length", 2);
    });
    it("Then the 2 headers have text 'IRENOTION'", () => {
      cy.visit("https://irene-front-final-project-202109.vercel.app/");
      cy.get("h1").first().should("have.text", "IRENOTION");
      cy.get("h1").last().should("have.text", "IRENOTION");
    });
    it("Then there are 2 buttons", () => {
      cy.visit("https://irene-front-final-project-202109.vercel.app/");
      cy.get("button").should("have.length", 2);
    });
    it("Then if you click the login button it goes to the login page", () => {
      cy.visit("https://irene-front-final-project-202109.vercel.app/");
      cy.get("button").first().click();

      cy.location("pathname").should("include", "login");
    });
  });
});
