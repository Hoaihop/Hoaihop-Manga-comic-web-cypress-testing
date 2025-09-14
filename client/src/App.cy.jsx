import React from "react";
import App from "./App";
import { mount } from "cypress/react";

describe("<App />", () => {
  beforeEach(() => {
    cy.viewport("macbook-16");
    // Mount the App component before each test
    mount(<App />);
  });

  it("should render the header and navbar", () => {
    // Check if Header and Navbar are rendered
    cy.get("header").should("exist");
    cy.get(".navbar").should("exist");
  });

  it("should navigate to Login page", () => {
    // Click on Login and check if LoginPage is rendered
    mount("http://localhost:5173/login"); // Navigate to login route
  });

  it("should navigate to Register page", () => {
    // Click on Register and check if RegisterPage is rendered
    mount("http://localhost:5173/register");
  });

  it("should display the footer", () => {
    // Check if the Footer is displayed
    cy.get("footer").should("exist"); // Assuming Footer has a <footer> tag
  });
});
