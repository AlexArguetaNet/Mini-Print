import { Request, Response } from "express";
import axios from "axios";
import { ArticleModel } from "../models/article";

export const fetchNews = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {

    const { category, searchKey, userId } = req.query;

    try {

        let url;

        if (category) {
            url = `https://newsapi.org/v2/top-headlines?country=us&category=${ category }&apiKey=${process.env.API_KEY}`;
        } else {
            url = `https://newsapi.org/v2/everything?q=${ searchKey }&apiKey=${ process.env.API_KEY }`;
        }

        const newsResponse = await axios.get(url);
        const articles = newsResponse.data.articles;

        // Check each article to determine if it was saved by the user
        if (userId != "null") {
            
            for (const elem of articles) {
                let isSaved = await ArticleModel.findOne({ userId, url: elem.url });
                if (isSaved) {
                    elem.isSaved = true;
                }
            }
            
        }
    
        return res.json({ articles });

    } catch(err) {
        console.log(err);
        return res.json({ error: err });
    }

}