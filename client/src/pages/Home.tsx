import { Controls } from "../components/Controls";
import { ArticleList } from "../components/ArticleList";
import { Loading } from "../components/Loading";
import { useEffect, useState } from "react";
import axios from "axios";

export const Home = () => {

    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);    

    // Fetches news data. 
    function fetchNews(searchBy: string, query: string): void {

        setIsLoading(true);

        let url = `http://localhost:4002/news/?${ searchBy }=${ query }&userId=${window.localStorage.getItem("userId")}`;

        axios.get(url)
        .then(res => {

            if (res.data.error) {
                return alert(res.data.msg);
            }

            // Filter articles that only come with an image
            const articlesWithImage = res.data.articles.filter((elem: { urlToImage: any; }) => elem.urlToImage);

            setArticles(articlesWithImage);

            setIsLoading(false);

        })
        .catch(err => {
            console.log(err);
             return alert("Error");
        });

    }


    // Fetch news on first render
    useEffect(() => {
        fetchNews("category", "general");
    }, []);



    return (
        <div className="home page">
            { isLoading && <Loading />}
            <Controls fetchNews={fetchNews} />
            { articles.length != 0 && <ArticleList articles={articles} />}
        </div>
    );
}