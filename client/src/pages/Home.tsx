import { Controls } from "../components/Controls";
import { ArticleList } from "../components/ArticleList";
import { useEffect, useState } from "react";
import axios from "axios";

export const Home = () => {

    const [articles, setArticles] = useState([]);
    const [searchQuery, setSearchQuery] = useState("general");
    

    // Fetches news data. 
    function fetchNews(searchBy: string): void {

        let url = `http://localhost:4002/news/?${ searchBy }=${ searchQuery }`;

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
        fetchNews("category");
    }, []);



    return (
        <div className="home page">
            <Controls/>
            { articles.length != 0 && <ArticleList articles={articles} />}
        </div>
    );
}