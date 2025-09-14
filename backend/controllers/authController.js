// controllers/authController.js
import User from "../models/User.js"; // Đảm bảo bạn đã import đúng mô hình User

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Tài khoản không tồn tại" });
    }

    // Kiểm tra mật khẩu (sử dụng bcrypt hoặc phương thức hash)
    const isMatch = await user.comparePassword(password); // Hàm này phải có trong mô hình User

    if (!isMatch) {
      return res.status(400).json({ message: "Mật khẩu không đúng" });
    }

    // Tạo token và trả về
    const token = user.generateAuthToken(); // Hàm này cần phải có trong mô hình User
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server, vui lòng thử lại!" });
  }
};
