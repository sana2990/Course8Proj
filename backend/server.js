import express from "express";
import mongoose from "mongoose";
import User from "./models/User.js";
import Channel from "./models/Channel.js";
import Video from "./models/Video.js";
import Comment from "./models/Comment.js";
import authRoutes from "./routes/authRoutes.js";
import channelRoutes from "./routes/channelRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import cors from "cors";


const app = new express();
app.use(cors());app.use(cors({
  origin: "http://localhost:5173"
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("api/channels", channelRoutes);
app.use("/videos", videoRoutes);
app.use("/comments", commentRoutes);
app.listen(5002, () => {
    console.log("server: 5002");
})

mongoose.connect("mongodb://localhost:27017/youtubeclone");

const db = mongoose.connection;
db.on("open", () => {
    console.log("database connection is successful");
})

db.on("error",() =>{
    console.log("database connection not successful");
})

app.get("/products", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching products",
            error: error.message
        });
    }
});