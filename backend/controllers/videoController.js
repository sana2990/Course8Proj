import Video from "../models/Video.js";
import Channel from "../models/Channel.js";

// CREATE VIDEO (IMPORTANT FIXED VERSION)
export const createVideo = async (req, res) => {
  try {
    const { title, description, videoUrl, thumbnailUrl, category, channelId } = req.body;

    const video = await Video.create({
      title,
      description,
      videoUrl,
      thumbnailUrl,
      category,
      channelId,
      uploader: req.user.id,
    });

    // 🔥 ADD VIDEO TO CHANNEL
    await Channel.findByIdAndUpdate(channelId, {
      $push: { videos: video._id },
    });

    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};