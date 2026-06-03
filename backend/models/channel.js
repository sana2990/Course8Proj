import Channel from "../models/Channel.js";
import Video from "../models/Video.js";

// CREATE CHANNEL
export const createChannel = async (req, res) => {
  try {
    const channel = await Channel.create({
      channelName: req.body.channelName,
      description: req.body.description,
      owner: req.user.id,
    });

    res.status(201).json(channel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET CHANNEL
export const getChannel = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id)
      .populate("videos");

    res.json(channel);
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