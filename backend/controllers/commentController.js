import Comment from "../models/Comment.js";

export const addComment = async (req, res) => {
  try {
    const { text, videoId } = req.body;

    const comment = await Comment.create({
      text,
      videoId,
      userId: req.user.id,
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getCommentsByVideo = async (
  req,
  res
) => {
  try {
    const comments = await Comment.find({
      videoId: req.params.videoId,
    }).populate("userId", "username");

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateComment = async (
  req,
  res
) => {
  try {
    const comment = await Comment.findById(
      req.params.id
    );

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    if (
      comment.userId.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    comment.text = req.body.text;

    await comment.save();

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteComment = async (
  req,
  res
) => {
  try {
    const comment = await Comment.findById(
      req.params.id
    );

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    if (
      comment.userId.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    await Comment.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "Comment deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};