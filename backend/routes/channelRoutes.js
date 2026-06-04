import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import {
  createChannel,
  getChannel,
  getChannelVideos,
  getChannelByOwner,
} from "../controllers/channelController.js";

const router = express.Router();

router.post("/", verifyToken, createChannel);

router.get("/user/:userId", getChannelByUser);

router.get("/:channelId/videos", getChannelVideos);

router.get("/:id", getChannel);


export default router;