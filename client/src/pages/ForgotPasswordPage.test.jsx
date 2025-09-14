import { render, screen, fireEvent } from "@testing-library/react";
import ForgotPasswordPage from "./ForgotPasswordPage"; // Đảm bảo đường dẫn đúng

test("displays correct error message when verification code is incorrect", async () => {
  render(<ForgotPasswordPage />);

  // Bước 1: Nhập thông tin không hợp lệ (username, email, account number)
  fireEvent.change(screen.getByLabelText("Tên đăng nhập"), {
    target: { value: "testuser" },
  });
  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByLabelText("Số tài khoản"), {
    target: { value: "123456" },
  });

  // Nhấn nút "Nhận mã" để chuyển sang bước 2
  fireEvent.click(screen.getByText("Nhận mã"));

  // Bước 2: Nhập mã xác minh không đúng
  fireEvent.change(screen.getByLabelText("Mã xác minh"), {
    target: { value: "000000" }, // Mã sai
  });
  fireEvent.click(screen.getByText("Xác nhận"));
});

test("proceeds to step 2 with correct username, email, and account number", () => {
  render(<ForgotPasswordPage />);
  fireEvent.change(screen.getByLabelText("Tên đăng nhập"), {
    target: { value: "testuser" },
  });
  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByLabelText("Số tài khoản"), {
    target: { value: "123456" },
  });
  fireEvent.click(screen.getByText("Nhận mã"));
  expect(screen.getByLabelText("Mã xác minh")).toBeInTheDocument();
});

test("shows error if account number is blank", () => {
  render(<ForgotPasswordPage />);
  fireEvent.change(screen.getByLabelText("Tên đăng nhập"), {
    target: { value: "testuser" },
  });
  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByLabelText("Số tài khoản"), {
    target: { value: "" },
  });
});

test("shows error if account number is not numeric", () => {
  render(<ForgotPasswordPage />);
  fireEvent.change(screen.getByLabelText("Tên đăng nhập"), {
    target: { value: "testuser" },
  });
  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByLabelText("Số tài khoản"), {
    target: { value: "Acc123" },
  });
  fireEvent.click(screen.getByText("Nhận mã"));
  expect(
    screen.getByText("Account Number must be numeric")
  ).toBeInTheDocument();
});

test("shows error if account number contains special characters", () => {
  render(<ForgotPasswordPage />);
  fireEvent.change(screen.getByLabelText("Tên đăng nhập"), {
    target: { value: "testuser" },
  });
  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByLabelText("Số tài khoản"), {
    target: { value: "123!@#" },
  });
});

test("shows error if account number contains blank space", () => {
  render(<ForgotPasswordPage />);
  fireEvent.change(screen.getByLabelText("Tên đăng nhập"), {
    target: { value: "testuser" },
  });
  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByLabelText("Số tài khoản"), {
    target: { value: "123 123" },
  });
});

test("shows error if account number starts with space", () => {
  render(<ForgotPasswordPage />);
  fireEvent.change(screen.getByLabelText("Tên đăng nhập"), {
    target: { value: "testuser" },
  });
  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByLabelText("Số tài khoản"), {
    target: { value: " 123456" },
  });
});

test("proceeds to step 2 with valid account number", () => {
  render(<ForgotPasswordPage />);
  fireEvent.change(screen.getByLabelText("Tên đăng nhập"), {
    target: { value: "testuser" },
  });
  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByLabelText("Số tài khoản"), {
    target: { value: "128" },
  });
  fireEvent.click(screen.getByText("Nhận mã"));
  expect(screen.getByLabelText("Mã xác minh")).toBeInTheDocument();
});
