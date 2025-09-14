import React, { useState, useEffect } from "react";
import "../styles/Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Kiểm tra kích thước màn hình để xác định "Mobile" hay không
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Mobile nếu nhỏ hơn hoặc bằng 768px
    };

    // Gọi hàm khi component mount và thêm sự kiện resize
    handleResize();
    window.addEventListener("resize", handleResize);

    // Cleanup event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      {isMobile && ( // Hiển thị nút ba gạch ngang chỉ trên màn hình nhỏ
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
      )}
      <ul className={`navbar-menu ${isMobile && !menuOpen ? "hidden" : ""}`}>
        <li>
          <a href="#">HOT</a>
        </li>
        <li>
          <a href="#">THEO DÕI</a>
        </li>
        <li>
          <a href="#">LỊCH SỬ</a>
        </li>
        <li>
          <a href="#">THỂ LOẠI</a>
        </li>
        <li>
          <a href="#">MANHUA</a>
        </li>
        <li>
          <a href="#">NGÔN TÌNH</a>
        </li>
        <li>
          <a href="#">CON GÁI</a>
        </li>
        <li>
          <a href="#">CON TRAI</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
