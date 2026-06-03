import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import {
  createChannel,
  getChannel,
  getChannelVideos,
} from "../controllers/channelController.js";

const router = express.Router();

router.post("/", verifyToken, createChannel);
router.get("/:id", getChannel);
router.get("/:channelId/videos", getChannelVideos);

export default router;