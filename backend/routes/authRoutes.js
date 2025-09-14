// routes/authRoutes.js
import express from "express";
import { loginUser } from "../controllers/authController.js";

const router = express.Router();

// Đảm bảo phương thức POST được định nghĩa chính xác
router.post("/login", loginUser);

export default router;
