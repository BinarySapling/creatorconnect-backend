import express from "express";
import {
  initiateSignup,
  verifySignupOtp,
  login,
  searchUsers,
  getMe,
} from "../controllers/authController.js";
import { authMiddleware as protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup/initiate", initiateSignup);
router.post("/signup/verify", verifySignupOtp);
router.post("/login", login);
router.get("/me", protect, getMe);
router.get("/users", protect, searchUsers);

export default router;
