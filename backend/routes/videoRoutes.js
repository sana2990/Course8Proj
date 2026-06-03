import express from "express";

import {
  createVideo,
  getAllVideos,
  getVideoById,
  likeVideo,
  dislikeVideo,
} from "../controllers/videoController.js";

import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createVideo);

router.get("/", getAllVideos);

router.get("/:id", getVideoById);

router.put("/:id/like", verifyToken, likeVideo);

router.put("/:id/dislike", verifyToken, dislikeVideo);

export default router;