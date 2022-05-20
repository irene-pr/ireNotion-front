describe("Given a Login view", () => {
  describe("When we click on the main header", () => {
    it("Then it should send us to the home page", () => {
      cy.visit("/login");
      cy.get("h1").click();

      cy.location("pathname").should("equal", "/");
    });
  });
  describe("When we click on the sign up button", () => {
    it("Then it should not be disabled", () => {
      cy.visit("/login");
      cy.get("button.login-form__button--signup").should("not.be.disabled");
    });
    it("Then it should send us to the register page", () => {
      cy.visit("/login");
      cy.get("button.login-form__button--signup").click();

      cy.location("pathname").should("equal", "/register");
    });
  });
  describe("When we click on the login button", () => {
    it("Then it should be disabled", () => {
      cy.visit("/login");
      cy.get("button.login-form__button--login").should("be.disabled");
    });
  });
  describe("When we type on the first input", () => {
    it("Then the login button should be disabled", () => {
      cy.visit("/login");

      cy.get("input#username").type("Mario");

      cy.get("button.login-form__button--login").should("be.disabled");
    });
  });
  describe("When we type on the second input", () => {
    it("Then the signup button should be disabled", () => {
      cy.visit("/login");

      cy.get("input#password").type("Mario");

      cy.get("button.login-form__button--login").should("be.disabled");
    });
  });
  describe("When we type on both inputs", () => {
    it("Then the login button should not be disabled", () => {
      cy.visit("/login");

      cy.get("input#username").type("Mario");
      cy.get("input#password").type("Mario");

      cy.get("button.login-form__button--login").should("not.be.disabled");
    });
  });
  describe("When we type on both inputs with a wrong user", () => {
    it("Then when clicking the login button a message should appear", () => {
      cy.visit("/login");

      cy.get("input#username").type("Mario");
      cy.get("input#password").type("Mario");

      cy.get("p.message").should("have.text", "");

      cy.get("button.login-form__button--login").click();

      cy.get("p.message").should(
        "have.text",
        "Wrong username or password. Try again"
      );
    });
    it("Then when clicking the login button the login response status should be 400", () => {
      cy.visit("/login");
      cy.server();
      cy.route("POST", "/user/login").as("login");

      cy.get("input#username").type("Mario");
      cy.get("input#password").type("Mario");

      cy.get("button.login-form__button--login").click();

      cy.wait("@login").its("status").should("equal", 400);
    });
  });
  describe("When we type on both inputs with an existing user", () => {
    const username = Cypress.env("USERNAME");
    const password = Cypress.env("PASSWORD");

    it("Then when clicking the login button the login respoonse status should be 201", () => {
      cy.visit("/login");
      cy.server();
      cy.route("POST", "/user/login").as("login");

      cy.get("input#username").type(username);
      cy.get("input#password").type(password);

      cy.get("button.login-form__button--login").click();

      cy.wait("@login").its("status").should("equal", 201);
    });
    it("Then when clicking the login button it goes to the Board Page", () => {
      cy.visit("/login");

      cy.get("input#username").type(username);
      cy.get("input#password").type(password);

      cy.get("p.message").should("have.text", "");

      cy.get("button.login-form__button--login").click();

      cy.location("pathname").should("include", "user-board");
    });
  });
});
