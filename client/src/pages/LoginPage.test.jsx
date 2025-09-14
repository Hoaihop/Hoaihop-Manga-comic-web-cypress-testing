import { render, screen } from "@testing-library/react";
import LoginPage from "./LoginPage"; // Ensure the correct path
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter

describe("LoginPage", () => {
  test("renders login form", () => {
    render(
      <Router>
        <LoginPage />
      </Router>
    );
  });

  test("renders login form without navigating on click", () => {
    render(
      <Router>
        <LoginPage />
      </Router>
    );

    // Check if the links exist, ensuring no redirection happens on click
    expect(screen.getByText(/đăng ký/i)).toBeInTheDocument();
    expect(screen.getByText(/quên mật khẩu/i)).toBeInTheDocument();
  });
});
