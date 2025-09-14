import React, { useState } from "react";
import "../styles/ForgotPasswordPage.css";

function ForgotPasswordPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountNumber, setAccountNumber] = useState(""); // New state for Account Number
  const [step, setStep] = useState(1); // Step 1: User submits info, Step 2: User verifies code, Step 3: User sets new password
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState(""); // Store the generated verification code

  // Validate Account Number
  const validateAccountNumber = (number) => {
    if (!number) return "Account Number must not be blank";
    if (!/^\d+$/.test(number)) return "Account Number must be numeric";
    if (number.includes(" ")) return "Account Number cannot have blank space";
    if (number.charAt(0) === " ") return "First character cannot have space";
    return "";
  };

  // Handle form submission for Step 1 (Account and email verification)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear any previous errors

    // Validate Account Number before proceeding
    const accountNumberError = validateAccountNumber(accountNumber);
    if (accountNumberError) {
      setError(accountNumberError);
      setLoading(false);
      return;
    }

    // Step 1: Check if username, email, and account number match
    if (step === 1) {
      // Simulate checking username and email (this should be replaced with actual backend verification)
      if (username && email && accountNumber) {
        // Generate and send a verification code (this would normally be done via backend)
        const generatedCode = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit code
        setVerificationCode(generatedCode); // Store the generated code in state
        alert(`Mã xác minh của bạn là: ${generatedCode}`); // Show code (for simulation, replace with actual code sending)
        setStep(2);
        setLoading(false); // Done loading after step change
      } else {
        setError("Tên đăng nhập, email hoặc số tài khoản không đúng!");
        setLoading(false);
      }
    }

    // Step 2: Check if the entered verification code matches
    else if (step === 2) {
      if (code !== verificationCode.toString()) {
        setError("Mã xác minh không đúng!");
        setLoading(false);
        console.log("Lỗi mã xác minh:", error); // Kiểm tra giá trị lỗi
        return;
      }

      if (newPassword !== confirmPassword) {
        setError("Mật khẩu xác nhận không khớp!");
        setLoading(false);
        return;
      }

      // Simulate a delay for password change (this should be done via backend)
      setTimeout(() => {
        setLoading(false); // Done loading after password change
        alert("Đổi mật khẩu thành công!");
      }, 1000); // Simulate an async operation like an API call
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-page forgot-password-page">
        <h2>Quên mật khẩu</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          {step === 1 && (
            <>
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
              </div>
              <div className="input-group">
                <label htmlFor="account-number">Số tài khoản</label>
                <input
                  id="account-number"
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="auth-button" disabled={loading}>
                {loading ? "Đang gửi mã..." : "Nhận mã"}
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div className="input-group">
                <label htmlFor="code">Mã xác minh</label>
                <input
                  id="code"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="new-password">Mật khẩu mới</label>
                <input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="confirm-password">Xác nhận mật khẩu mới</label>
                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="auth-button" disabled={loading}>
                {loading ? "Đang đổi mật khẩu..." : "Xác nhận"}
              </button>
            </>
          )}

          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
