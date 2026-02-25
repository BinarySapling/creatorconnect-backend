import express from "express";
import { createOrder, verifyPayment, handleRazorpayWebhook } from "../controllers/paymentController.js";
import { authMiddleware as protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createOrder);
router.post("/verify", protect, verifyPayment);
router.post("/webhook", handleRazorpayWebhook);

export default router;
