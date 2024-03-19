import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
    author: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    urlToImage: { type: String, required: true },
    url: { type: String, required: true },
    userId: { type: String, required: true }
}, { timestamps: true });

export const ArticleModel = mongoose.model("articles", articleSchema);