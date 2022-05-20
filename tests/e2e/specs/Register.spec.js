describe("Given a Register view", () => {
  describe("When we click on the main header", () => {
    it("Then it should send us to the home page", () => {
      cy.visit("/register");
      cy.get("h1").click();

      cy.location("pathname").should("equal", "/");
    });
  });
  describe("When we click on the login button", () => {
    it("Then it should not be disabled", () => {
      cy.visit("/register");
      cy.get("button.register-form__button--login").should("not.be.disabled");
    });
    it("Then it should send us to the login page", () => {
      cy.visit("/register");
      cy.get("button.register-form__button--login").click();

      cy.location("pathname").should("equal", "/login");
    });
  });
  describe("When we click on the register button", () => {
    it("Then it should be disabled", () => {
      cy.visit("/register");
      cy.get("button.register-form__button--signup").should("be.disabled");
    });
  });
  describe("When we type on the first input", () => {
    it("Then the register button should be disabled", () => {
      cy.visit("/register");

      cy.get("input#name").type("Mario");

      cy.get("button.register-form__button--signup").should("be.disabled");
    });
  });
  describe("When we type on the second input", () => {
    it("Then the register button should be disabled", () => {
      cy.visit("/register");

      cy.get("input#username").type("Mario");

      cy.get("button.register-form__button--signup").should("be.disabled");
    });
  });
  describe("When we type on the third input", () => {
    it("Then the register button should be disabled", () => {
      cy.visit("/register");

      cy.get("input#password").type("Mario");

      cy.get("button.register-form__button--signup").should("be.disabled");
    });
  });
  describe("When we type on the fourth input", () => {
    it("Then the register button should be disabled", () => {
      cy.visit("/register");

      cy.get("input#repeat-password").type("Mario");

      cy.get("button.register-form__button--signup").should("be.disabled");
    });
  });
  describe("When we type on all inputs", () => {
    it("Then the sign up button should not be disabled", () => {
      cy.visit("/register");

      cy.get("input#name").type("Mario");
      cy.get("input#username").type("mario123");
      cy.get("input#password").type("password");
      cy.get("input#repeat-password").type("password123");

      cy.get("button.register-form__button--signup").should("not.be.disabled");
    });
  });
  describe("When we type on all inputs with different password inputs and we click the sign up button", () => {
    it("Then a message 'The passwords don't match. Try again' should appear", () => {
      cy.visit("/register");

      cy.get("input#name").type("Mario");
      cy.get("input#username").type("mario123");
      cy.get("input#password").type("password");
      cy.get("input#repeat-password").type("password123");

      cy.get("button.register-form__button--signup").click();

      cy.get("p.message").should(
        "have.text",
        "The passwords don't match. Try again"
      );
    });
  });
  describe("When we type on all inputs with equal password inputs with less than 7 characters and we click the sign up button", () => {
    it("Then a message 'The password must have between 7 and 20 characters' should appear", () => {
      cy.visit("/register");

      cy.get("input#name").type("Mario");
      cy.get("input#username").type("mario123");
      cy.get("input#password").type("123");
      cy.get("input#repeat-password").type("123");

      cy.get("button.register-form__button--signup").click();

      cy.get("p.message").should(
        "have.text",
        "The password must have between 7 and 20 characters"
      );
    });
  });
  describe("When we type on all inputs with equal password inputs with more than 20 characters and we click the sign up button", () => {
    it("Then a message 'The password must have between 7 and 20 characters' should appear", () => {
      cy.visit("/register");

      cy.get("input#name").type("Mario");
      cy.get("input#username").type("mario123");
      cy.get("input#password").type("mariomariomariomariomario");
      cy.get("input#repeat-password").type("mariomariomariomariomario");

      cy.get("button.register-form__button--signup").click();

      cy.get("p.message").should(
        "have.text",
        "The password must have between 7 and 20 characters"
      );
    });
  });
  describe("When we type on all inputs with the username of an existing user and we click the sign up button", () => {
    it("Then it should receive a response status 400 and put a message 'Username already exists'", () => {
      const username = Cypress.env("USERNAME");
      cy.server();
      cy.route("POST", "/user/register").as("register");

      cy.visit("/register");

      cy.get("input#name").type("Mario");
      cy.get("input#username").type(username);
      cy.get("input#password").type("mariomario");
      cy.get("input#repeat-password").type("mariomario");

      cy.get("button.register-form__button--signup").click();

      cy.wait("@register").its("status").should("equal", 409);

      cy.get("p.message").should("have.text", "Username already exists");
    });
  });
});
