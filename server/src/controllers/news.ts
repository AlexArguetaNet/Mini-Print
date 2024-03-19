import { Request, Response } from "express";
import axios from "axios";

export const fetchNews = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {

    const { category, searchKey } = req.query;

    try {

        let url;

        if (category) {
            url = `https://newsapi.org/v2/top-headlines?country=de&category=${ category }&apiKey=${process.env.API_KEY}`;
        } else {
            url = `https://newsapi.org/v2/everything?q=${ searchKey }&apiKey=${ process.env.API_KEY }`;
        }

        const newsResponse = await axios.get(url);
        
        return res.json(newsResponse.data.articles);

    } catch(err) {
        console.log(err);
        return res.json({ error: err });
    }

}