import { Request, Response } from "express"
import { ArticleModel } from "../models/article";

// POST: Add an article to the user's list
export const addArticle = async(req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {

    const { article } = req.body;

    try {

        // Check if article is already saved
        const articleSaved = await ArticleModel.findOne({ userId: article.userId, url: article.url });
        if (articleSaved) {
            return res.json({ error: "Duplicate document", msg: "Article already saved" });
        }

        const newArticle = new ArticleModel(article);
        
        await newArticle.save();

        return res.json({ msg: "Ok" });

    } catch(err) {
        console.log(err);
        res.json({ error: err, msg: "Server error" });
    }

    return res.json();

}

// GET: Get saved articles
export const getUserArticles = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {

    const { userId } = req.query;

    try {

        const userArticles = await ArticleModel.find({ userId }).sort('-date');
        let articles = userArticles.reverse();

        return res.json({ articles });

    } catch(err) {
        console.log(err);
        return res.json({ error: "Error" });
    }

}

// DELETE: Delete article
export const deleteArticle = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {

    const { _id, url } = req.query;

    try {

        let result;

        if (_id) {
            result = await ArticleModel.deleteOne({ _id });
        } else {
            result = await ArticleModel.deleteOne({ url });
        }

        if (!result) return res.json({ error: "Delete error", msg: "Delete error" });

        return res.json({ msg: "Article deleted" });

    } catch(err) {
        console.log(err);
        return res.json({ error: "Delete error", msg: "There was an error while trying to delete the article"});
    }

}