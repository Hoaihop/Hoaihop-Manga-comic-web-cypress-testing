/// <reference types="cypress" />

describe("Register Page", () => {
  beforeEach(() => {
    // Truy cập vào trang đăng ký trước mỗi bài kiểm tra
    cy.visit("http://localhost:5173/register");

    cy.viewport("macbook-16");
  });

  it("should display the register form", () => {
    // Kiểm tra tiêu đề trang đăng ký
    cy.get("h2").should("have.text", "Đăng ký");

    // Kiểm tra sự hiện diện của tất cả các trường và nút
    cy.get("input#username").should("exist");
    cy.get("input#email").should("exist");
    cy.get("input#phone").should("exist");
    cy.get("input#password").should("exist");
    cy.get("input#confirm-password").should("exist");
    cy.get("input#customer-id").should("exist");
    cy.get("input#initial-deposit").should("exist");
    cy.get('button[type="submit"]').should("exist");
  });

  it("should show error when Customer ID is invalid", () => {
    // Điền các trường khác đúng và nhập sai Customer ID
    cy.get("input#username").type("testuser");
    cy.get("input#email").type("test@example.com");
    cy.get("input#phone").type("0123456789");
    cy.get("input#password").type("password123");
    cy.get("input#confirm-password").type("password123");
    cy.get("input#initial-deposit").type("1000");
    cy.get("input#customer-id").type("Invalid ID!");
    cy.get('button[type="submit"]').click();

    // Kiểm tra thông báo lỗi
    cy.get(".error-message", { timeout: 5000 }).should(
      "have.text",
      "Customer ID must be alphanumeric"
    );
  });

  it("should show error when Initial Deposit is invalid", () => {
    // Điền các trường khác đúng và nhập sai Initial Deposit
    cy.get("input#username").type("testuser");
    cy.get("input#email").type("test@example.com");
    cy.get("input#phone").type("0123456789");
    cy.get("input#password").type("password123");
    cy.get("input#confirm-password").type("password123");
    cy.get("input#customer-id").type("Customer123");
    cy.get("input#initial-deposit").type("InvalidDeposit");
    cy.get('button[type="submit"]').click();

    // Kiểm tra thông báo lỗi
    cy.get(".error-message", { timeout: 5000 }).should(
      "have.text",
      "Initial Deposit must be numeric"
    );
  });

  it("should show error when passwords do not match", () => {
    // Điền các trường khác đúng và nhập mật khẩu không khớp
    cy.get("input#username").type("testuser");
    cy.get("input#email").type("test@example.com");
    cy.get("input#phone").type("0123456789");
    cy.get("input#customer-id").type("Customer123");
    cy.get("input#initial-deposit").type("1000");
    cy.get("input#password").type("password123");
    cy.get("input#confirm-password").type("differentPassword");
    cy.get('button[type="submit"]').click();

    // Kiểm tra thông báo lỗi
    cy.get(".error-message", { timeout: 5000 }).should(
      "have.text",
      "Mật khẩu xác nhận không khớp!"
    );
  });

  it("should register successfully with valid inputs", () => {
    // Điền đầy đủ thông tin hợp lệ
    cy.get("input#username").type("testuser");
    cy.get("input#email").type("test@example.com");
    cy.get("input#phone").type("0123456789");
    cy.get("input#password").type("password123");
    cy.get("input#confirm-password").type("password123");
    cy.get("input#customer-id").type("Customer123");
    cy.get("input#initial-deposit").type("1000");

    // Nhấn nút đăng ký
    cy.get('button[type="submit"]').click();

    // Kiểm tra hiển thị thông báo thành công
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Đăng ký thành công!");
    });

    // Đảm bảo không có thông báo lỗi
    cy.get(".error-message").should("not.exist");
  });
});
