import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import { getCurrentUser } from "../controllers/authController.js";
import {
  registerUser,
  loginUser,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/me", verifyToken,getCurrentUser);

export default router;