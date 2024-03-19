import { Request, Response } from "express"
import { ArticleModel } from "../models/article";

// POST: Add an article to the user's list
export const addArticle = async(req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {

    const { article } = req.body;

    try {

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
