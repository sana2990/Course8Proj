import express from "express";

import {
  createChannel,
  getChannel,
} from "../controllers/channelController.js";

import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post(
  "/",
  verifyToken,
  createChannel
);

router.get("/:id", getChannel);

export default router;