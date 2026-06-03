import express from "express";

import verifyToken from "../middleware/verifyToken.js";

import {
  addComment,
  getCommentsByVideo,
  updateComment,
  deleteComment,
} from "../controllers/commentController.js";

const router = express.Router();

router.post("/", verifyToken, addComment);

router.get("/:videoId", getCommentsByVideo);

router.put("/:id", verifyToken, updateComment);

router.delete(
  "/:id",
  verifyToken,
  deleteComment
);

export default router;