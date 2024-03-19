import { Controls } from "../components/Controls";
import { ArticleList } from "../components/ArticleList";
import { useEffect, useState } from "react";
import axios from "axios";

export const Home = () => {

    const [articles, setArticles] = useState([]);    

    // Fetches news data. 
    function fetchNews(searchBy: string, query: string): void {

        let url = `http://localhost:4002/news/?${ searchBy }=${ query }`;

        axios.get(url)
        .then(res => {

            if (res.data.error) {
                return alert(res.data.msg);
            }

            // Filter articles that only come with an image
            const articlesWithImage = res.data.articles.filter((elem: { urlToImage: any; }) => elem.urlToImage);

            setArticles(articlesWithImage);

        })
        .catch(err => {
            console.log(err);
             return alert("Error");
        })

    }


    // Fetch news on first render
    useEffect(() => {
        fetchNews("category", "general");
    }, []);



    return (
        <div className="home page">
            <Controls fetchNews={fetchNews} />
            { articles.length != 0 && <ArticleList articles={articles} />}
        </div>
    );
}