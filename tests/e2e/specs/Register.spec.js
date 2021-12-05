describe("Given a Register view", () => {
  describe("When it goes to the Register page", () => {
    it("Then there is a header", () => {
      cy.visit("https://irene-front-final-project-202109.vercel.app/register");
      cy.get("h1").should("have.text", "ireNotion");
    });
  });
  describe("When we click on the main header", () => {
    it("Then it should send us to the home page", () => {
      cy.visit("https://irene-front-final-project-202109.vercel.app/register");
      cy.get("h1").click();

      cy.location("pathname").should("equal", "/");
    });
  });
  describe("When we click on the login button", () => {
    it("Then it should not be disabled", () => {
      cy.visit("https://irene-front-final-project-202109.vercel.app/register");
      cy.get("button").last().should("not.be.disabled");
    });
    it("Then it should send us to the login page", () => {
      cy.visit("https://irene-front-final-project-202109.vercel.app/register");
      cy.get("button").last().click();

      cy.location("pathname").should("equal", "/login");
    });
  });
  describe("When we click on the register button", () => {
    it("Then it should be disabled", () => {
      cy.visit("https://irene-front-final-project-202109.vercel.app/register");
      cy.get("button").first().should("be.disabled");
    });
  });
  describe("When we type on the first input", () => {
    it("Then it remains written", () => {
      cy.visit("https://irene-front-final-project-202109.vercel.app/register");
      cy.get("input").first().type("Mario").should("have.value", "Mario");
    });
    it("Then the register button should be disabled", () => {
      cy.visit("https://irene-front-final-project-202109.vercel.app/register");

      cy.get("input").first().type("Mario");

      cy.get("button").first().should("be.disabled");
    });
  });
  describe("When we type on the second input", () => {
    it("Then it remains written", () => {
      cy.visit("https://irene-front-final-project-202109.vercel.app/register");
      cy.get("input").eq(1).type("Mario").should("have.value", "Mario");
    });
    it("Then the register button should be disabled", () => {
      cy.visit("https://irene-front-final-project-202109.vercel.app/register");

      cy.get("input").eq(1).type("Mario");

      cy.get("button").first().should("be.disabled");
    });
  });
  describe("When we type on the third input", () => {
    it("Then it remains written", () => {
      cy.visit("https://irene-front-final-project-202109.vercel.app/register");
      cy.get("input").eq(2).type("Mario").should("have.value", "Mario");
    });
    it("Then the register button should be disabled", () => {
      cy.visit("https://irene-front-final-project-202109.vercel.app/register");

      cy.get("input").eq(2).type("Mario");

      cy.get("button").first().should("be.disabled");
    });
  });
  describe("When we type on the fourth input", () => {
    it("Then it remains written", () => {
      cy.visit("https://irene-front-final-project-202109.vercel.app/register");
      cy.get("input").eq(3).type("Mario").should("have.value", "Mario");
    });
    it("Then the register button should be disabled", () => {
      cy.visit("https://irene-front-final-project-202109.vercel.app/register");

      cy.get("input").eq(3).type("Mario");

      cy.get("button").first().should("be.disabled");
    });
  });
  describe("When we type on all inputs", () => {
    it("Then the sign up button should not be disabled", () => {
      cy.visit("https://irene-front-final-project-202109.vercel.app/register");

      cy.get("input").eq(0).type("Mario");
      cy.get("input").eq(1).type("mario123");
      cy.get("input").eq(2).type("password");
      cy.get("input").eq(3).type("password123");

      cy.get("button").first().should("not.be.disabled");
    });
  });
  describe("When we type on all inputs with different password inputs and we click the sign up button", () => {
    it("Then a message 'The passwords don't match. Try again' should appear", () => {
      cy.visit("https://irene-front-final-project-202109.vercel.app/register");

      cy.get("input").eq(0).type("Mario");
      cy.get("input").eq(1).type("mario123");
      cy.get("input").eq(2).type("password");
      cy.get("input").eq(3).type("password123");

      cy.get("button").first().click();

      cy.get("p.message").should(
        "have.text",
        "The passwords don't match. Try again"
      );
    });
  });
  describe("When we type on all inputs with equal password inputs with less than 7 characters and we click the sign up button", () => {
    it("Then a message 'The password must have between 7 and 20 characters' should appear", () => {
      cy.visit("https://irene-front-final-project-202109.vercel.app/register");

      cy.get("input").eq(0).type("Mario");
      cy.get("input").eq(1).type("mario123");
      cy.get("input").eq(2).type("123");
      cy.get("input").eq(3).type("123");

      cy.get("button").first().click();

      cy.get("p.message").should(
        "have.text",
        "The password must have between 7 and 20 characters"
      );
    });
  });
  describe("When we type on all inputs with equal password inputs with more than 20 characters and we click the sign up button", () => {
    it("Then a message 'The password must have between 7 and 20 characters' should appear", () => {
      cy.visit("https://irene-front-final-project-202109.vercel.app/register");

      cy.get("input").eq(0).type("Mario");
      cy.get("input").eq(1).type("mario123");
      cy.get("input").eq(2).type("mariomariomariomariomario");
      cy.get("input").eq(3).type("mariomariomariomariomario");

      cy.get("button").first().click();

      cy.get("p.message").should(
        "have.text",
        "The password must have between 7 and 20 characters"
      );
    });
  });
  describe("When we type on all inputs with the username of an existing user and we click the sign up button", () => {
    it("Then it should receive a response status 400", () => {
      const username = Cypress.env("USERNAME");
      cy.server();
      cy.route("POST", "/user/register").as("register");

      cy.visit("https://irene-front-final-project-202109.vercel.app/register");

      cy.get("input").eq(0).type("Mario");
      cy.get("input").eq(1).type(username);
      cy.get("input").eq(2).type("mariomario");
      cy.get("input").eq(3).type("mariomario");

      cy.get("button").first().click();

      cy.wait("@register").its("status").should("equal", 400);
    });
    it("Then it should put a message 'Username already exists'", () => {
      const username = Cypress.env("USERNAME");
      cy.server();
      cy.route("POST", "/user/register").as("register");

      cy.visit("https://irene-front-final-project-202109.vercel.app/register");

      cy.get("input").eq(0).type("Mario");
      cy.get("input").eq(1).type(username);
      cy.get("input").eq(2).type("mariomario");
      cy.get("input").eq(3).type("mariomario");

      cy.get("button").first().click();

      cy.wait("@register");

      cy.get("p.message").should("have.text", "Username already exists");
    });
  });
});
