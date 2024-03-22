import { Controls } from "../components/Controls";
import { ArticleList } from "../components/ArticleList";
import { Loading } from "../components/Loading";
import { useEffect, useState } from "react";
import axios from "axios";

export const Home = () => {

    // Article object alias
    type Article = {
        _id?: string,
        author: string,
        title: string,
        description: string,
        urlToImage: string,
        url: string,
        userId?: string,
        isSaved?: boolean
        isDeleted?: boolean
    }

    const [articles, setArticles] = useState<Article[]>([]);
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

    function saveArticle(index: number): void {

        let newArticle = {
            author: articles[index].author || " ",
            title: articles[index].title,
            description: articles[index].description,
            urlToImage: articles[index].urlToImage,
            url: articles[index].url,
            userId: window.localStorage.getItem("userId"),
            isSaved: true
        }

        axios.post("http://localhost:4002/add-article", { article: newArticle })
        .then(res => {

            if (res.data.error) {
                return alert(res.data.msg);
            }

            // Update array in the UI
            setArticles((oldList) => {
                oldList[index].isSaved = true;
                return [...oldList];
            });

        })
        .catch(err => {
            return alert(err);
        })


    }


    function deleteArticle(index: number): void {

        let queryStr;
        articles[index]._id ? queryStr = `_id=${ articles[index]._id }` : queryStr = `url=${ articles[index].url }`;

        axios.delete(`http://localhost:4002/delete/?${ queryStr }`)
        .then(res => {

            if (res.data.error) return alert(res.data.msg);

            // Update array in the UI
            setArticles((oldList) => {
                oldList[index].isSaved = false;
                return [...oldList];
            });

        })
        .catch(err => {
            console.log(err);
            return alert(err);
        })

    }

    // Fetch news on first render
    useEffect(() => {
        fetchNews("category", "general");
    }, []);

    return (
        <div className="home page">
            { isLoading && <Loading />}
            <Controls fetchNews={fetchNews} />
            { articles.length != 0 && <ArticleList articles={articles} saveArticle={saveArticle} deleteArticle={deleteArticle} />}
        </div>
    );
}