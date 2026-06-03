import express from "express";

import {
  createVideo,
  getAllVideos,
  getVideoById,
  likeVideo,
  dislikeVideo,
  updateVideo,
  deleteVideo,
} from "../controllers/videoController.js";

import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createVideo);

router.get("/", getAllVideos);

router.get("/:id", getVideoById);

router.put("/:id/like", verifyToken, likeVideo);

router.put("/:id/dislike", verifyToken, dislikeVideo);

router.put("/:id", verifyToken, updateVideo);

router.delete("/:id", verifyToken, deleteVideo);

export default router;