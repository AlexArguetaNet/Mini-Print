import "../styles/UserControls.css";
import { useState, useEffect } from "react";
import { ArticleList } from "../components/ArticleList";
import axios from "axios";

export const UserHome = () => {

    const [articles, setArticles] = useState([]);

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

    useEffect(() => {
        fetchArticles();
    }, []);

    return (
        <div className="user-home">
            <UserControls />
            <ArticleList articles={articles} />
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