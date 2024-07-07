/// <reference types="cypress" />

describe("Login Test Suite", () => {
  let login;
  beforeEach (()=>
  {
    cy.visit("/login");
  })

  before(() => {
    cy.fixture("login/login").then((data) => {
      login = data;
    });
  });
  
  it("verify that the validation message is displayed when the user clicks on the [Login] button without entering the data", () => {
    cy.get('[data-testid="login-submit"]').click();
    cy.contains("Email address is required");
  });

  it("verify that the validation message is displayed when the user enters invalid email and password", () => {
    cy.get('[data-testid="login-email"]').type(login.invalidEmail);
    cy.get('[data-testid="login-password"]').type(login.invalidpassword);
    cy.get('[data-testid="login-submit"]').click();
    cy.contains("Email address is invalid");
  });

  it("verify that the user is redirected to the dashboard after entering the valid credentials", () => {
    cy.get('[data-testid="login-email"]').type(login.validEmail);
    cy.get('[data-testid="login-password"]').type(login.validPassword)
    cy.get('[data-testid="login-submit"]').click();
    cy.get('[data-testid="logout"]').should('be.visible')
  });
});

