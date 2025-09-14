import React, { useState } from "react";
import "../styles/RegisterPage.css";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [initialDeposit, setInitialDeposit] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Validate customer ID
  const validateCustomerId = (id) => {
    if (!id) return "Customer ID is required";
    if (!/^[a-zA-Z0-9]+$/.test(id)) return "Customer ID must be alphanumeric";
    if (id.includes(" ")) return "Customer ID cannot have blank space";
    if (id.charAt(0) === " ") return "First character cannot have space";
    return "";
  };

  // Validate initial deposit
  const validateInitialDeposit = (deposit) => {
    if (!deposit) return "Initial Deposit must not be blank";
    if (!/^\d+$/.test(deposit)) return "Initial Deposit must be numeric";
    if (deposit.includes(" ")) return "Initial Deposit cannot have blank space";
    if (deposit.charAt(0) === " ") return "First character cannot have space";
    return "";
  };

  // Validate email
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // Validate customer ID
    const customerIdError = validateCustomerId(customerId);
    if (customerIdError) {
      setError(customerIdError);
      return;
    }

    // Validate initial deposit
    const depositError = validateInitialDeposit(initialDeposit);
    if (depositError) {
      setError(depositError);
      return;
    }

    if (!validateEmail(email)) {
      setError("Email không hợp lệ!");
      return;
    }

    // Validate password confirmation
    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp!");
      return;
    }

    setError(""); // Clear error before submission
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Đăng ký thành công!");
    }, 1000);
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-page register-page">
        <h2>Đăng ký</h2>
        <form onSubmit={handleRegister} className="auth-form">
          <div className="input-group">
            <label htmlFor="username">Tên đăng nhập</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {/* Display error message under email input */}
            {error && error.includes("Email") && (
              <p className="error-message">{error}</p>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="phone">Số điện thoại</label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Mật khẩu</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirm-password">Xác nhận mật khẩu</label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="customer-id">Customer ID</label>
            <input
              id="customer-id"
              type="text"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="initial-deposit">Initial Deposit</label>
            <input
              id="initial-deposit"
              type="text"
              value={initialDeposit}
              onChange={(e) => setInitialDeposit(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>
          {/* Display error message at the bottom of the form */}
          {error && !error.includes("Email") && (
            <p className="error-message">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
