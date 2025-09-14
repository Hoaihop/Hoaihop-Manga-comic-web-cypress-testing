import React from "react";
import { mount } from "cypress/react";
import RegisterPage from "../../src/pages/RegisterPage";

describe("<RegisterPage />", () => {
  beforeEach(() => {
    cy.viewport("macbook-16");
  });

  it("should render the register form", () => {
    mount(<RegisterPage />);
    cy.contains("Đăng ký").should("be.visible");
    cy.get("form").within(() => {
      cy.get("#username").should("exist");
      cy.get("#email").should("exist");
      cy.get("#phone").should("exist");
      cy.get("#password").should("exist");
      cy.get("#confirm-password").should("exist");
      cy.get("#customer-id").should("exist");
      cy.get("#initial-deposit").should("exist");
    });
  });

  it("should show an error when email is invalid", () => {
    mount(<RegisterPage />);
    // Điền các trường hợp lệ
    cy.get("#username").type("validUser");
    cy.get("#phone").type("1234567890");
    cy.get("#password").type("password123");
    cy.get("#confirm-password").type("password123");
    cy.get("#customer-id").type("customer123");
    cy.get("#initial-deposit").type("1000");

    // Điền email không hợp lệ
    cy.get("#email").type("invalid-email");
    cy.get("button[type='submit']").click();
  });

  it("should show an error when passwords do not match", () => {
    mount(<RegisterPage />);
    // Điền các trường hợp lệ
    cy.get("#username").type("validUser");
    cy.get("#email").type("test@example.com");
    cy.get("#phone").type("1234567890");
    cy.get("#password").type("password123");

    // Điền mật khẩu xác nhận không khớp
    cy.get("#confirm-password").type("differentpassword");
    cy.get("#customer-id").type("customer123");
    cy.get("#initial-deposit").type("1000");
    cy.get("button[type='submit']").click();

    // Kiểm tra lỗi
    cy.contains("Mật khẩu xác nhận không khớp!").should("be.visible");
  });

  it("should validate customer ID correctly", () => {
    mount(<RegisterPage />);
    // Điền các trường hợp lệ
    cy.get("#username").type("validUser");
    cy.get("#email").type("test@example.com");
    cy.get("#phone").type("1234567890");
    cy.get("#password").type("password123");
    cy.get("#confirm-password").type("password123");

    // Điền Customer ID không hợp lệ
    cy.get("#customer-id").type("invalid id");
    cy.get("#initial-deposit").type("1000");
    cy.get("button[type='submit']").click();
  });

  it("should validate initial deposit correctly", () => {
    mount(<RegisterPage />);
    // Điền các trường hợp lệ
    cy.get("#username").type("validUser");
    cy.get("#email").type("test@example.com");
    cy.get("#phone").type("1234567890");
    cy.get("#password").type("password123");
    cy.get("#confirm-password").type("password123");
    cy.get("#customer-id").type("customer123");

    // Điền Initial Deposit không hợp lệ
    cy.get("#initial-deposit").type("abc");
    cy.get("button[type='submit']").click();

    // Kiểm tra lỗi
    cy.contains("Initial Deposit must be numeric").should("be.visible");
  });

  it("should submit the form when all fields are valid", () => {
    mount(<RegisterPage />);
    // Điền tất cả các trường hợp lệ
    cy.get("#username").type("validUser");
    cy.get("#email").type("test@example.com");
    cy.get("#phone").type("1234567890");
    cy.get("#password").type("password123");
    cy.get("#confirm-password").type("password123");
    cy.get("#customer-id").type("customer123");
    cy.get("#initial-deposit").type("1000");

    // Gửi form
    cy.get("button[type='submit']").click();

    // Kiểm tra trạng thái đang tải và hoàn thành
    cy.contains("Đang đăng ký...").should("be.visible");
    cy.contains("Đăng ký thành công!").should("not.exist"); // Xác nhận hoàn thành
  });
});
