import Video from "../models/Video.js";

//1. create vide
export const createVideo = async (req, res) => {
  try {
    const video = await Video.create({
      ...req.body,
      uploader: req.user.id,
    });

    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//get all videos
export const getAllVideos = async (
  req,
  res
) => {
  try {
    const {
      search = "",
      category,
    } = req.query;

    let query = {
      title: {
        $regex: search,
        $options: "i",
      },
    };

    if (category) {
      query.category = category;
    }

    const videos = await Video.find(query)
      .populate(
        "channelId",
        "channelName"
      );

    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//getvideobyid
export const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(
      req.params.id
    );

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    video.views += 1;
    await video.save();

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//3. like video
export const likeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    video.likes += 1;

    await video.save();

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//4. dislike video
export const dislikeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    video.dislikes += 1;

    await video.save();

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//5. update video
export const updateVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    if (
      video.uploader.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    const updatedVideo =
      await Video.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.status(200).json(updatedVideo);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//6. delete cideo
export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    if (
      video.uploader.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    await Video.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "Video deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};