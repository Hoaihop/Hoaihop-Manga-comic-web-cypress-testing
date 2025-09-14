import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";

function Header() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    if (keyword.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(keyword.trim())}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>TruyenDex</h1>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Tìm truyện..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Tìm truyện"
          />
          <button onClick={handleSearch}>Tìm</button>
        </div>
        <div className="user-actions">
          <span onClick={() => navigate("/login")} className="login-button">
            Đăng nhập
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;
