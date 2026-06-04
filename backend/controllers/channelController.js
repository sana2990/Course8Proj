import Channel from "../models/Channel.js";
import Video from "../models/Video.js";
import mongoose from "mongoose";

// GET CHANNEL
export const getChannel = async (req, res) => {
  try {
    console.log(req.params.channelId);
    const videos = await Video.find({
      channelId: new mongoose.Types.ObjectId(req.params.channelId),
    });

    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET CHANNEL VIDEOS
export const getChannelVideos = async (req, res) => {
  try {
    const videos = await Video.find({
      channelId: req.params.channelId,
    });

    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE CHANNEL
export const createChannel = async (req, res) => {
  try {
    const {
      channelName,
      description,
      banner,
      owner,
    } = req.body;

    const existingChannel =
      await Channel.findOne({
        owner,
      });

    if (existingChannel) {
      return res.status(400).json({
        message:
          "User already has a channel",
      });
    }

    const channel = await Channel.create({
      channelName,
      description,
      banner,
      owner,
    });

    res.status(201).json({
      message:
        "Channel created successfully",
      channel,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//get channel by ownerid
export const getChannelByOwner = async (req, res) => {
  try {
    const channel = await Channel.findOne({
      owner: req.params.ownerId,
    });

    if (!channel) {
      return res.status(404).json({
        message: "Channel not found",
      });
    }

    res.status(200).json(channel);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getChannelByUser = async (req, res) => {
  try {
    const channel = await Channel.findOne({
      owner: req.params.userId,
    });

    if (!channel) {
      return res.status(404).json({
        message: "Channel not found",
      });
    }

    res.status(200).json(channel);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};