import { useEffect, useState } from "react";
import { ControlPanel } from "../components/ControlPanel";
import { ArticleList } from "../components/ArticleList";
import axios from "axios";

export const Home = ({ showAuthForm, setShowAuthForm }) => {

    const [category, setCategory] = useState("general");
    const [searchKey, setSearchKey] = useState("");
    const [articles, setArticles] = useState([]);

    function handleAuthForm(toggle) {
        toggle ? setShowAuthForm(true) : setShowAuthForm(false);
    }

    // Fetches news from the back-end server
    function fetchNews(searchByCategory) {

        let url;

        if (searchByCategory) {
            url = `http://localhost:4001/news/?category=${category}`;
            setSearchKey("");
        } else {
            url = `http://localhost:4001/news/?searchKey=${searchKey}`;
        }

        axios.get(url)
            .then(res => {

                // Filter out the articles with an image
                setArticles(res.data.filter(elem => elem.urlToImage));

            })
            .catch(err => alert(err));
    }


    // Handler for an article click event
    function handleArticleClick(index) {
        console.log(articles[index]);
    }

    // Fetch news on the first render
    useEffect(() => {
        fetchNews(true);
    }, []);


    return (
        <>
            <div className="home container">

                <ControlPanel
                    category={category}
                    setCategory={setCategory}
                    searchKey={searchKey}
                    setSearchKey={setSearchKey}
                    fetchNews={fetchNews}
                />
                <ArticleList articles={articles} handleArticleClick={handleArticleClick} />

            </div>
        </>
    )


}