import React from "react";
import { mount } from "@cypress/react";
import { BrowserRouter } from "react-router-dom"; // Vì bạn sử dụng `useNavigate` trong component
import LoginPage from "../../src/pages/LoginPage"; // Đảm bảo import đúng file component

describe("LoginPage.cy.jsx", () => {
  it("should render the login page and allow users to login with valid credentials", () => {
    mount(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    // Kiểm tra xem các thành phần chính có hiển thị không
    cy.get("h2").contains("Đăng nhập");
    cy.get("input#email").should("be.visible");
    cy.get("input#password").should("be.visible");
    cy.get("button").contains("Đăng nhập");

    // Điền thông tin và submit form
    cy.get("input#email").type("test@example.com");
    cy.get("input#password").type("password123");
    cy.get('button[type="submit"]').click();

    // Kiểm tra hành vi sau khi đăng nhập thành công
    cy.get("button").should("contain", "Đăng nhập").should("be.disabled"); // Nút Đăng nhập bị disabled trong khi loading
    cy.location("pathname").should("eq", "/"); // Kiểm tra điều hướng về trang chủ

    // Kiểm tra localStorage đã có token
    cy.window().then((window) => {
      expect(window.localStorage.getItem("token")).to.eq("dummy_token");
    });
  });

  it("should show error message for invalid login credentials", () => {
    mount(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    // Điền thông tin sai và submit form
    cy.get("input#email").type("wrong@example.com");
    cy.get("input#password").type("wrongpassword");
    cy.get('button[type="submit"]').click();

    // Kiểm tra thông báo lỗi
    cy.get(".error-message")
      .should("be.visible")
      .and("contain", "Email hoặc mật khẩu không chính xác!");
  });

  it("should navigate to register page when clicking register link", () => {
    mount(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    cy.get("button.link-button").contains("Đăng ký").click();
    cy.location("pathname").should("eq", "/register"); // Kiểm tra điều hướng đến trang đăng ký
  });

  it("should navigate to forgot password page when clicking forgot password link", () => {
    mount(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    cy.get("button.link-button").contains("Quên mật khẩu").click();
    cy.location("pathname").should("eq", "/forgot-password"); // Kiểm tra điều hướng đến trang quên mật khẩu
  });
});
