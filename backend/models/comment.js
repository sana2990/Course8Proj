import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    video:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Video"
    },

    text:{
        type:String,
        required:true
    }
},
{
    timestamps:true
}
);

export default mongoose.model("Comment",commentSchema);