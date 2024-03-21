import "../styles/ArticleList.css";
import { useCookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faEllipsis, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect, useState } from "react";

export const ArticleList = (props: { articles: any[] }) => {

    const { articles } = props;

    function selectArticle(index: number): void {

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

        })
        .catch(err => {
            return alert(err);
        })

    }

    return (
        <div className="article-list">
            { articles.map((elem, index) => {
                return <Article key={index} article={elem} index={index} selectArticle={selectArticle}/>
            }) }
        </div>
    );
}


const Article = (props: { 
    article: any, index: number, 
    selectArticle: (index: number) => void 
}) => {

    const { article, index, selectArticle } = props;
    const [isSaved, setIsSaved] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [cookies] = useCookies(["access_token"]);

    // Handle UI and call function to add article to the user's list
    function handleAddArticle() {
        setIsSaved(true);
        selectArticle(index);
    }

    // Edit the article settings
    function handleDeleteArticle() {

        setIsSaved(false);

        // Will delete the article from the UI if the user is on their home page
        if (window.location.pathname != "/") {
            setIsDeleted(true);
        }

        let queryStr;
        article._id ? queryStr = `_id=${ article._id }` : queryStr = `url=${ article.url }`;
        
        axios.delete(`http://localhost:4002/delete/?${ queryStr }`)
        .then(res => {

            if (res.data.error) return alert(res.data.msg);

        })
        .catch(err => {
            console.log(err);
            return alert(err);
        })

    }


    // Check if the article is saved in the user's list. Then render the correct controls
    function renderArticleButton(): JSX.Element {

        if (cookies.access_token) {

            if (!isSaved) {

                return <div className="article-icon">
                        <FontAwesomeIcon id="icon-plus" icon={faCirclePlus} onClick={() => handleAddArticle()}/>
                       </div>
            } else {

                return <div className="article-icon">
                        <FontAwesomeIcon id="icon-ellipses" icon={faEllipsis} />
                        <div className="article-drop-down">
                            <div className="remove-article" onClick={() => handleDeleteArticle()}>
                                <p>Remove <FontAwesomeIcon icon={faTrash} /></p>
                            </div>
                        </div>
                       </div>
            }

        } else {
            return <></>
        }

    }

    // Determines the article control options
    useEffect(() => {
        if (!article.isSaved && !article.userId) {
            setIsSaved(false);
        } else {
            setIsSaved(true);
        }
    },[]);

    return (
        <>
            { ( !isDeleted ) && (
                <div className="article">
                <img src={article.urlToImage} alt="image" />
                <div>
                    <h4>{ article.title }</h4>
                    <p>{ article.description }</p>
                    <button id="read-more" onClick={() => window.open(article.url, "_blank")?.focus()}>Read More</button>
                    {renderArticleButton()}
                </div>
            </div>
            )}
        </>
    );

}
