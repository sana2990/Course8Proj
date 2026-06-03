import Channel from "../models/Channel.js";

export const createChannel = async (
  req,
  res
) => {
  try {
    const { channelName, description } =
      req.body;

    const channel = await Channel.create({
      channelName,
      description,
      owner: req.user.id,
    });

    res.status(201).json(channel);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getChannel = async (
  req,
  res
) => {
  try {
    const channel =
      await Channel.findById(
        req.params.id
      );

    res.status(200).json(channel);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

import Video from "../models/Video.js";

export const getChannelVideos = async (
  req,
  res
) => {
  try {
    const videos = await Video.find({
      channelId: req.params.channelId,
    });

    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};