describe("Forgot Password Page", () => {
  beforeEach(() => {
    cy.viewport("macbook-16");
    // Mở trang ForgotPasswordPage trước mỗi bài kiểm tra
    cy.visit("http://localhost:5173/forgot-password");
  });

  it("should display the forgot password form", () => {
    // Kiểm tra xem các trường nhập liệu và nút bấm có hiển thị đúng không
    cy.get("h2").contains("Quên mật khẩu");
    cy.get("input#username").should("be.visible");
    cy.get("input#email").should("be.visible");
    cy.get("input#account-number").should("be.visible");
    cy.get("button").contains("Nhận mã").should("be.visible");
  });

  it("should submit the form and show the verification step", () => {
    // Kiểm tra form bước 1
    cy.get("input#username").type("user123");
    cy.get("input#email").type("user@example.com");
    cy.get("input#account-number").type("123456789");

    // Nhấn nút 'Nhận mã'
    cy.get("button").contains("Nhận mã").click();

    // Kiểm tra rằng chúng ta đã chuyển sang bước 2 (bước nhập mã xác minh)
    cy.get("input#code").should("be.visible");
    cy.get("input#new-password").should("be.visible");
    cy.get("input#confirm-password").should("be.visible");
    cy.get("button").contains("Xác nhận").should("be.visible");
  });

  it("should validate the verification code", () => {
    // Kiểm tra form bước 1
    cy.get("input#username").type("user123");
    cy.get("input#email").type("user@example.com");
    cy.get("input#account-number").type("123456789");
    cy.get("button").contains("Nhận mã").click();

    // Giả lập mã xác minh (theo giá trị mà bạn muốn kiểm tra)
    const verificationCode = 123456; // Giả lập mã bạn nhận được
    cy.get("input#code").type(verificationCode);

    cy.get("input#new-password").type("NewPassword123");
    cy.get("input#confirm-password").type("NewPassword321");
    // Nhấn nút Xác nhận

    cy.get("button").contains("Xác nhận").click();

    // Kiểm tra nếu lỗi xảy ra khi mã không đúng
    cy.get(".error-message").contains("Mã xác minh không đúng!");

    // Sửa mã xác minh và nhập lại đúng mã
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

    // Kiểm tra nếu nó chuyển sang bước đổi mật khẩu
    cy.get("input#new-password").should("be.visible");
    cy.get("input#confirm-password").should("be.visible");
    cy.get("button").contains("Xác nhận").click();
  });

  it("should validate new password and confirm password", () => {
    // Kiểm tra bước nhập mật khẩu mới
    cy.get("input#username").type("user123");
    cy.get("input#email").type("user@example.com");
    cy.get("input#account-number").type("123456789");
    cy.get("button").contains("Nhận mã").click();

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

    // Nhập mật khẩu mới và mật khẩu xác nhận không khớp
    cy.get("input#new-password").type("NewPassword123");
    cy.get("input#confirm-password").type("NewPassword321");
    cy.get("button").contains("Xác nhận").click();

    // Kiểm tra thông báo lỗi khi mật khẩu không khớp
    cy.get(".error-message").contains("Mật khẩu xác nhận không khớp!");

    // Nhập lại mật khẩu đúng
    cy.get("input#confirm-password").clear().type("NewPassword123");
    cy.get("button").contains("Xác nhận").click();

    cy.get(".error-message").should("not.exist");
  });

  it("should navigate to login after successful password change", () => {
    // Kiểm tra bước đổi mật khẩu thành công và điều hướng đến trang đăng nhập
    cy.get("input#username").type("user123");
    cy.get("input#email").type("user@example.com");
    cy.get("input#account-number").type("123456789");
    cy.get("button").contains("Nhận mã").click();

    // Giả lập mã xác minh chính xác
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
    cy.get("button").contains("Xác nhận").click();

    // Nhập mật khẩu mới và xác nhận đúng
    cy.get("input#new-password").type("NewPassword123");
    cy.get("input#confirm-password").type("NewPassword123");
    cy.get("button").contains("Xác nhận").click();
  });
});
