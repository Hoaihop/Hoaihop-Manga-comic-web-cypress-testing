// index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js"; // Đảm bảo rằng bạn đã kết nối DB đúng cách
import authRoutes from "./routes/authRoutes.js"; // Đảm bảo đường dẫn đúng

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Kết nối đến MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Sử dụng routes auth
app.use("/api/auth", authRoutes);

// Chạy server
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
