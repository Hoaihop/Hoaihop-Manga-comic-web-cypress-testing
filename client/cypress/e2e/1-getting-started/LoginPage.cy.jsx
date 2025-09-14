/// <reference types="cypress" />

describe("Login Page", () => {
  beforeEach(() => {
    cy.viewport("macbook-16");
    // Truy cập vào trang đăng nhập trước mỗi bài kiểm tra
    cy.visit("http://localhost:5173/login");
  });

  it("should display the login form", () => {
    // Kiểm tra xem tiêu đề của trang đăng nhập có đúng không
    cy.get("h2").should("have.text", "Đăng nhập");

    // Kiểm tra sự hiện diện của các trường email, mật khẩu và nút đăng nhập
    cy.get("input#email").should("exist");
    cy.get("input#password").should("exist");
    cy.get('button[type="submit"]').should("exist");
  });

  it("should login successfully with correct credentials", () => {
    // Nhập thông tin đăng nhập demo
    cy.get("input#email").type("test@example.com");
    cy.get("input#password").type("password123");

    // Nhấn nút đăng nhập
    cy.get('button[type="submit"]').click();

    // Kiểm tra xem có chuyển hướng về trang chủ không (hoặc trang bạn muốn sau khi đăng nhập thành công)
    cy.url().should("eq", "http://localhost:5173/");

    // Kiểm tra xem token đã được lưu trong localStorage chưa (tùy thuộc vào logic bạn đã implement)
    cy.window().then((window) => {
      expect(window.localStorage.getItem("token")).to.equal("dummy_token");
    });
  });

  it("should show an error message with incorrect credentials", () => {
    // Nhập thông tin đăng nhập sai
    cy.get("input#email").type("wrong@example.com");
    cy.get("input#password").type("wrongpassword");

    // Nhấn nút đăng nhập
    cy.get('button[type="submit"]').click();

    // Kiểm tra thông báo lỗi
    cy.get(".error-message").should(
      "have.text",
      "Email hoặc mật khẩu không chính xác!"
    );
  });

  it("should navigate to register page when click on register button", () => {
    // Nhấn nút đăng ký
    cy.get("button.link-button").contains("Đăng ký").click();

    // Kiểm tra xem URL có đúng không
    cy.url().should("include", "/register");
  });

  it("should navigate to forgot password page when click on forgot password button", () => {
    // Nhấn nút quên mật khẩu
    cy.get("button.link-button").contains("Quên mật khẩu").click();

    // Kiểm tra xem URL có đúng không
    cy.url().should("include", "/forgot-password");
  });
});
