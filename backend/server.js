import express from "express";
import mongoose from "mongoose";
import User from "./models/User.js";
import Channel from "./models/Channel.js";
import Video from "./models/Video.js";
import Comment from "./models/Comment.js";

const app = new express();
app.listen(5002, () => {
    console.log("server: 5002");
})

mongoose.connect("mongodb://localhost:27017");

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