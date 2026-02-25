

import express from "express";
import { getPlans, seedPlans } from "../controllers/planController.js";
import { authMiddleware as protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getPlans);
router.post("/seed", seedPlans); // Usually restricted, but for this task we'll keep it simple

export default router;
