import React from "react";
import { mount } from "cypress/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ForgotPasswordPage from "../../src/pages/ForgotPasswordPage"; // Update with correct path

describe("ForgotPasswordPage", () => {
  beforeEach(() => {
    cy.viewport("macbook-16"); // Set screen size
    // Mount the component inside the MemoryRouter to handle routes
    mount(
      <MemoryRouter initialEntries={["/forgot-password"]}>
        <Routes>
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Routes>
      </MemoryRouter>
    );
  });

  it("should render the form and allow user to submit username, email, and account number", () => {
    cy.get("input#username").type("testuser");
    cy.get("input#email").type("testuser@example.com");
    cy.get("input#account-number").type("123456789");

    // Simulate clicking the "Nhận mã" button
    cy.get("button").contains("Nhận mã").click();

    // Check if the code input field for step 2 is displayed
    cy.get("input#code").should("be.visible");
  });

  it("should show error if account number is invalid", () => {
    cy.get("input#username").type("testuser");
    cy.get("input#email").type("testuser@example.com");
    cy.get("input#account-number").type("invalidaccount!");

    cy.get("button").contains("Nhận mã").click();

    cy.get(".error-message").should(
      "contain",
      "Account Number must be numeric"
    );
  });

  it("should verify the entered verification code and allow password change", () => {
    // Set up for step 1: Simulate user input and generate a verification code
    cy.get("input#username").type("testuser");
    cy.get("input#email").type("testuser@example.com");
    cy.get("input#account-number").type("123456789");

    // Simulate clicking the "Nhận mã" button
    cy.get("button").contains("Nhận mã").click();

    // Capture the verification code from the alert
    cy.on("window:alert", (alertText) => {
      // Check if the alert text contains a 6-digit code
      const match = alertText.match(/\d{6}/);
      if (match) {
        const generatedCode = match[0]; // Extract the 6-digit code if found
        expect(generatedCode).to.exist; // Ensure a 6-digit code is extracted
        // Simulate entering that code into the form
        cy.get("input#code").type(generatedCode); // Enter the code into the code input field
      }
    });

    // Enter new password and confirm password
    cy.get("input#new-password").type("newpassword123");
    cy.get("input#confirm-password").type("newpassword123");

    // Submit the form
    cy.get("button").contains("Xác nhận").click();
  });

  it("should show error if passwords do not match", () => {
    // Set up for step 1: Simulate user input and generate a verification code
    cy.get("input#username").type("testuser");
    cy.get("input#email").type("testuser@example.com");
    cy.get("input#account-number").type("123456789");

    // Simulate clicking the "Nhận mã" button
    cy.get("button").contains("Nhận mã").click();

    // Capture the verification code from the alert
    cy.on("window:alert", (alertText) => {
      // Check if the alert text contains a 6-digit code
      const match = alertText.match(/\d{6}/);
      if (match) {
        const generatedCode = match[0]; // Extract the 6-digit code if found
        expect(generatedCode).to.exist; // Ensure a 6-digit code is extracted
        // Simulate entering that code into the form
        cy.get("input#code").type(generatedCode); // Enter the code into the code input field
      }
    });

    // Enter new password and confirm password (different values to trigger the error)
    cy.get("input#new-password").type("newpassword123");
    cy.get("input#confirm-password").type("mismatchpassword");

    // Submit the form
    cy.get("button").contains("Xác nhận").click();

    // Check if the error message for mismatched passwords is displayed
    cy.get(".error-message").should("contain", "Mật khẩu xác nhận không khớp!");
  });
});
