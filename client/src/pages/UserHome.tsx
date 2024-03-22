import "../styles/UserControls.css";
import { useState, useEffect } from "react";
import { ArticleList } from "../components/ArticleList";
import axios from "axios";

export const UserHome = () => {

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

    function fetchArticles(): void {

        axios.get(`http://localhost:4002/get-user-articles/?userId=${window.localStorage.getItem("userId")}`)
        .then(res => {

            if (res.data.error) {
                return alert(res.data.msg);
            }

            return setArticles(res.data.articles);

        })
        .catch(err => {
            return alert(err);
        });

    }

    function deleteArticle(index: number): void {

        console.log(window.location.pathname);

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




    useEffect(() => {
        fetchArticles();
    }, []);

    return (
        <div className="user-home">
            <UserControls />
            <ArticleList articles={articles} deleteArticle={deleteArticle} />
        </div>
    );
}


const UserControls = () => {
    
    return (
        <div className="user-search">
            <label htmlFor="search">Search Your Articles</label>
            <input type="text" />
            <button>Search</button>
        </div>
    );
}