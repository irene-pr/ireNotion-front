const url = Cypress.env("PRODUCTION_URL");

describe("Given a Login view", () => {
  describe("When it goes to the Login page", () => {
    it("Then there are 2 headers", () => {
      cy.visit(`${url}/login`);
      cy.get("h1").should("have.text", "ireNotion");
      cy.get("h2").should("have.text", " Welcome back to ireNotion ");
    });
  });
  describe("When we click on the main header", () => {
    it("Then it should send us to the home page", () => {
      cy.visit(`${url}/login`);
      cy.get("h1").click();

      cy.location("pathname").should("equal", "/");
    });
  });
  describe("When we click on the sign up button", () => {
    it("Then it should not be disabled", () => {
      cy.visit(`${url}/login`);
      cy.get("button").last().should("not.be.disabled");
    });
    it("Then it should send us to the register page", () => {
      cy.visit(`${url}/login`);
      cy.get("button").last().click();

      cy.location("pathname").should("equal", "/register");
    });
  });
  describe("When we click on the login button", () => {
    it("Then it should be disabled", () => {
      cy.visit(`${url}/login`);
      cy.get("button").first().should("be.disabled");
    });
  });
  describe("When we type on the first input", () => {
    it("Then it remains written", () => {
      cy.visit(`${url}/login`);
      cy.get("input")
        .first()
        .type("Mario")
        .should("have.value", "Mario")
        .type("{del}{selectall}{backspace}")
        .should("have.value", "")
        .type("Mario lentín", { delay: 100 })
        .should("have.value", "Mario lentín");
    });
    it("Then the login button should be disabled", () => {
      cy.visit(`${url}/login`);

      cy.get("input").first().type("Mario");

      cy.get("button").first().should("be.disabled");
    });
  });
  describe("When we type on the second input", () => {
    it("Then it remains written", () => {
      cy.visit(`${url}/login`);

      cy.get("input")
        .last()
        .type("Mario")
        .should("have.value", "Mario")
        .type("{del}{selectall}{backspace}")
        .should("have.value", "")
        .type("Mario lentín", { delay: 100 })
        .should("have.value", "Mario lentín");
    });
    it("Then the signup button should be disabled", () => {
      cy.visit(`${url}/login`);

      cy.get("input").last().type("Mario");

      cy.get("button").first().should("be.disabled");
    });
  });
  describe("When we type on both inputs", () => {
    it("Then they remain written", () => {
      cy.visit(`${url}/login`);

      cy.get("input").first().type("Mario").should("have.value", "Mario");
      cy.get("input").last().type("Mario").should("have.value", "Mario");
    });
    it("Then the login button should not be disabled", () => {
      cy.visit(`${url}/login`);

      cy.get("input").first().type("Mario");
      cy.get("input").last().type("Mario");

      cy.get("button").first().should("not.be.disabled");
    });
  });
  describe("When we type on both inputs with a wrong user", () => {
    it("Then when clicking the login button a message should appear", () => {
      cy.visit(`${url}/login`);

      cy.get("input").first().type("Mario");
      cy.get("input").last().type("Mario");

      cy.get("p.message").should("have.text", "");

      cy.get("button").first().click();

      cy.wait(500);

      cy.get("p.message").should(
        "have.text",
        "Wrong username or password. Try again"
      );
    });
    it("Then when clicking the login button the login response status should be 400", () => {
      cy.visit(`${url}/login`);
      cy.server();
      cy.route("POST", "/user/login").as("login");

      cy.get("input").first().type("Mario");
      cy.get("input").last().type("Mario");

      cy.get("button").first().click();

      cy.wait("@login").its("status").should("equal", 400);
    });
  });
  describe("When we type on both inputs with an existing user", () => {
    const username = Cypress.env("USERNAME");
    const password = Cypress.env("PASSWORD");

    it("Then when clicking the login button the login respoonse status should be 201", () => {
      cy.visit(`${url}/login`);
      cy.server();
      cy.route("POST", "/user/login").as("login");

      cy.get("input").first().type(username);
      cy.get("input").last().type(password);

      cy.get("button").first().click();

      cy.wait("@login").its("status").should("equal", 201);
    });
    it("Then when clicking the login button it goes to the Board Page", () => {
      cy.visit(`${url}/login`);

      cy.get("input").first().type(username);
      cy.get("input").last().type(password);

      cy.get("p.message").should("have.text", "");

      cy.get("button").first().click();

      cy.wait(500);

      cy.location("pathname").should("include", "userBoard");
    });
  });
});
