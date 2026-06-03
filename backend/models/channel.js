import mongoose from "mongoose";

const channelSchema = new mongoose.Schema(
{
    channelName:{
        type:String,
        required:true
    },

    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    description:String,

    banner:String,

    subscribers:{
        type:Number,
        default:0
    }
}
);

export default mongoose.model("Channel",channelSchema);