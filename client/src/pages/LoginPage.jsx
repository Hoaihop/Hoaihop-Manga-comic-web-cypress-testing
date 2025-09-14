import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Demo credentials for front-end simulation
  const demoEmail = "test@example.com";
  const demoPassword = "password123";

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true); // Show loading indicator

    // Simulating front-end validation for demo purposes
    if (email === demoEmail && password === demoPassword) {
      setLoading(false); // Stop loading when validation is successful
      localStorage.setItem("token", "dummy_token"); // Simulating token storage
      navigate("/"); // Redirect to homepage after login
    } else {
      setLoading(false); // Stop loading if login fails
      setError("Email hoặc mật khẩu không chính xác!"); // Display error message
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-page login-page">
        <h2>Đăng nhập</h2>
        <form onSubmit={handleLogin} className="auth-form">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Nhập email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              id="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
        <div className="auth-links">
          <button onClick={() => navigate("/register")} className="link-button">
            Đăng ký
          </button>
          <button
            onClick={() => navigate("/forgot-password")}
            className="link-button"
          >
            Quên mật khẩu
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
