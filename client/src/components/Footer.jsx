import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h1 className="footer-logo">TruyenDex</h1>

        <div className="footer-links">
          <p>
            <a href="/introduce">Giới thiệu</a> | <a href="/contact">Liên hệ</a>
          </p>
          <p>
            <a href="/terms">Điều Khoản</a> |{" "}
            <a href="/privacy">Chính Sách Bảo Mật</a>
          </p>
        </div>

        <div className="footer-section">
          <p>
            Trang web này cung cấp nội dung truyện tranh chỉ với mục đích giải
            trí và
            <strong> không chịu trách nhiệm </strong> về bất kỳ nội dung quảng
            cáo, liên kết của bên thứ ba hiển thị trên trang web của chúng tôi.
          </p>
          <p>
            Tất cả thông tin và hình ảnh trên website đều được thu thập từ
            internet. Chúng tôi không chịu trách nhiệm về bất kỳ nội dung nào.
            Nếu bạn hoặc tổ chức của bạn có vấn đề gì liên quan đến nội dung
            hiển thị trên website, vui lòng liên hệ với chúng tôi để được giải
            quyết.
          </p>
        </div>

        <div className="footer-bottom">
          <p>Copyright © 2024 TruyenDex. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
