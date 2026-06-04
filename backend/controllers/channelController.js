import Channel from "../models/Channel.js";
import Video from "../models/Video.js";

// GET CHANNEL
export const getChannel = async (req, res) => {
  try {
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