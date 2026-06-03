import express from "express";

import {
  createVideo,
  getAllVideos,
  getVideoById,
} from "../controllers/videoController.js";

import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createVideo);

router.get("/", getAllVideos);

router.get("/:id", getVideoById);

export default router;