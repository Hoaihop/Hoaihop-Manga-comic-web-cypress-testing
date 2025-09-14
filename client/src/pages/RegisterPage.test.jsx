import { render, screen, fireEvent } from "@testing-library/react";
import RegisterPage from "./RegisterPage";

test("shows error if initial deposit is blank", () => {
  render(<RegisterPage />);
  fireEvent.change(screen.getByLabelText("Tên đăng nhập"), {
    target: { value: "testuser" },
  });
  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByLabelText("Số điện thoại"), {
    target: { value: "123456789" },
  });
  fireEvent.change(screen.getByLabelText("Mật khẩu"), {
    target: { value: "password123" },
  });
  fireEvent.change(screen.getByLabelText("Xác nhận mật khẩu"), {
    target: { value: "password123" },
  });
  fireEvent.change(screen.getByLabelText("Customer ID"), {
    target: { value: "customer123" },
  });
  fireEvent.change(screen.getByLabelText("Initial Deposit"), {
    target: { value: "" },
  });
});

test("shows error if initial deposit starts with space", () => {
  render(<RegisterPage />);
  fireEvent.change(screen.getByLabelText("Tên đăng nhập"), {
    target: { value: "testuser" },
  });
  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByLabelText("Số điện thoại"), {
    target: { value: "123456789" },
  });
  fireEvent.change(screen.getByLabelText("Mật khẩu"), {
    target: { value: "password123" },
  });
  fireEvent.change(screen.getByLabelText("Xác nhận mật khẩu"), {
    target: { value: "password123" },
  });
  fireEvent.change(screen.getByLabelText("Customer ID"), {
    target: { value: "customer123" },
  });
  fireEvent.change(screen.getByLabelText("Initial Deposit"), {
    target: { value: " 100" },
  });
});

test("shows success when all fields are valid", async () => {
  render(<RegisterPage />);
  fireEvent.change(screen.getByLabelText("Tên đăng nhập"), {
    target: { value: "testuser" },
  });
  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByLabelText("Số điện thoại"), {
    target: { value: "123456789" },
  });
  fireEvent.change(screen.getByLabelText("Mật khẩu"), {
    target: { value: "password123" },
  });
  fireEvent.change(screen.getByLabelText("Xác nhận mật khẩu"), {
    target: { value: "password123" },
  });
  fireEvent.change(screen.getByLabelText("Customer ID"), {
    target: { value: "customer123" },
  });
});
test("shows success when all fields are valid", async () => {
  render(<RegisterPage />);
  fireEvent.change(screen.getByLabelText("Tên đăng nhập"), {
    target: { value: "testuser" },
  });
  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByLabelText("Số điện thoại"), {
    target: { value: "123456789" },
  });
  fireEvent.change(screen.getByLabelText("Mật khẩu"), {
    target: { value: "password123" },
  });
  fireEvent.change(screen.getByLabelText("Xác nhận mật khẩu"), {
    target: { value: "password123" },
  });
  fireEvent.change(screen.getByLabelText("Customer ID"), {
    target: { value: "customer123" },
  });
});
test("shows success when all fields are valid", async () => {
  render(<RegisterPage />);
  fireEvent.change(screen.getByLabelText("Tên đăng nhập"), {
    target: { value: "testuser" },
  });
  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByLabelText("Số điện thoại"), {
    target: { value: "123456789" },
  });
  fireEvent.change(screen.getByLabelText("Mật khẩu"), {
    target: { value: "password123" },
  });
  fireEvent.change(screen.getByLabelText("Xác nhận mật khẩu"), {
    target: { value: "password123" },
  });
  fireEvent.change(screen.getByLabelText("Customer ID"), {
    target: { value: "customer123" },
  });
});
test("shows success when all fields are valid", async () => {
  render(<RegisterPage />);
  fireEvent.change(screen.getByLabelText("Tên đăng nhập"), {
    target: { value: "testuser" },
  });
  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByLabelText("Số điện thoại"), {
    target: { value: "123456789" },
  });
  fireEvent.change(screen.getByLabelText("Mật khẩu"), {
    target: { value: "password123" },
  });
  fireEvent.change(screen.getByLabelText("Xác nhận mật khẩu"), {
    target: { value: "password123" },
  });
  fireEvent.change(screen.getByLabelText("Customer ID"), {
    target: { value: "customer123" },
  });
});
test("shows success when all fields are valid", async () => {
  render(<RegisterPage />);
  fireEvent.change(screen.getByLabelText("Tên đăng nhập"), {
    target: { value: "testuser" },
  });
  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByLabelText("Số điện thoại"), {
    target: { value: "123456789" },
  });
  fireEvent.change(screen.getByLabelText("Mật khẩu"), {
    target: { value: "password123" },
  });
  fireEvent.change(screen.getByLabelText("Xác nhận mật khẩu"), {
    target: { value: "password123" },
  });
  fireEvent.change(screen.getByLabelText("Customer ID"), {
    target: { value: "customer123" },
  });
});
test("shows success when all fields are valid", async () => {
  render(<RegisterPage />);
  fireEvent.change(screen.getByLabelText("Tên đăng nhập"), {
    target: { value: "testuser" },
  });
  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByLabelText("Số điện thoại"), {
    target: { value: "123456789" },
  });
  fireEvent.change(screen.getByLabelText("Mật khẩu"), {
    target: { value: "password123" },
  });
  fireEvent.change(screen.getByLabelText("Xác nhận mật khẩu"), {
    target: { value: "password123" },
  });
  fireEvent.change(screen.getByLabelText("Customer ID"), {
    target: { value: "customer123" },
  });
});
test("shows success when all fields are valid", async () => {
  render(<RegisterPage />);
  fireEvent.change(screen.getByLabelText("Tên đăng nhập"), {
    target: { value: "testuser" },
  });
  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByLabelText("Số điện thoại"), {
    target: { value: "123456789" },
  });
  fireEvent.change(screen.getByLabelText("Mật khẩu"), {
    target: { value: "password123" },
  });
  fireEvent.change(screen.getByLabelText("Xác nhận mật khẩu"), {
    target: { value: "password123" },
  });
  fireEvent.change(screen.getByLabelText("Customer ID"), {
    target: { value: "customer123" },
  });
});
test("shows success when all fields are valid", async () => {
  render(<RegisterPage />);
  fireEvent.change(screen.getByLabelText("Tên đăng nhập"), {
    target: { value: "testuser" },
  });
  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByLabelText("Số điện thoại"), {
    target: { value: "123456789" },
  });
  fireEvent.change(screen.getByLabelText("Mật khẩu"), {
    target: { value: "password123" },
  });
  fireEvent.change(screen.getByLabelText("Xác nhận mật khẩu"), {
    target: { value: "password123" },
  });
  fireEvent.change(screen.getByLabelText("Customer ID"), {
    target: { value: "customer123" },
  });
});
