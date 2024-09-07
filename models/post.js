

import mongoose from "mongoose";
const { Schema, model } = mongoose;
const postSchema = new Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true},
    content: { type: String, required: true },
    author: {type:String},
    date: { type: Date, default: Date.now },
    image: String,
});
const Post=mongoose.models.Post ||model("Post", postSchema);
export default Post;