import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
  channelName: String,
  description: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
});

export default mongoose.model("Channel", channelSchema);