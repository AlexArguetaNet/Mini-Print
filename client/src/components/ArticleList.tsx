import "../styles/ArticleList.css";
import { useCookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faEllipsis, faTrash, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Tooltip, IconButton } from "@mui/material";


export const ArticleList = (props: { 
    articles: any[], 
    saveArticle?: (index: number) => void, 
    deleteArticle: (index: number) => void 
}) => {

    const { articles } = props;
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => { 
        const scrolled = document.documentElement.scrollTop; 
        if (scrolled > 800){ 
            setVisible(true) 
        }  
        else if (scrolled <= 300){ 
            setVisible(false) 
        } 
        }; 
      
    const scrollToTop = () =>{ 
        window.scrollTo({ 
            top: 0,  
            behavior: 'smooth'
            
        }); 
    }; 
      
    window.addEventListener('scroll', toggleVisible);


    return (
        <div className="article-list">
            <div className="button-scroll-top">
                <Tooltip className="mToolTip" title={"Back to Top"} 
                >
                    <IconButton>
                        <FontAwesomeIcon icon={faArrowUp} onClick={scrollToTop} style={{ display: visible ? "inline" : "none" }}/>
                    </IconButton>
                </Tooltip>
            </div>
            { articles.map((elem, index) => {
                return <Article key={index} article={elem} index={index} saveArticle={props.saveArticle} deleteArticle={props.deleteArticle} />
            }) }
        </div>
    );
}


const Article = (props: { 
    article: any, index: number, 
    saveArticle?: (index: number) => void,
    deleteArticle: (index: number) => void
}) => {

    const { article, index, saveArticle, deleteArticle } = props;
    const [cookies] = useCookies(["access_token"]);
    const [isDeleted, setIsDeleted] = useState(false);


    function handleDelete() {

        // Remove article from the UI
        if (window.location.pathname != "/") setIsDeleted(true);

        deleteArticle(index);
    }

    // Check if the article is saved in the user's list. Then render the correct controls
    function renderArticleButton(): JSX.Element {

        // Check if user is logged in
        if (cookies.access_token) {

            if (!article.isSaved && !article.userId) {

                return <div className="article-icon">
                        <FontAwesomeIcon id="icon-plus" icon={faCirclePlus} onClick={() => { saveArticle != undefined && saveArticle(index)} }/>
                       </div>
            } else {

                return <div className="article-icon">
                        <FontAwesomeIcon id="icon-ellipses" icon={faEllipsis} />
                        <div className="article-drop-down">
                            <div className="add-to-collection">
                                <p>+Collection</p>
                            </div>
                            <div className="remove-article" onClick={() => handleDelete()}>
                                <p>Remove <FontAwesomeIcon icon={faTrash} /></p>
                            </div>
                        </div>
                       </div>
            }

        } else {
            return <></>
        }

    }

    return (
        <>
            {!isDeleted && 
            <div className="article">
                <img src={article.urlToImage} alt="image" />
                <div>
                    <h4>{ article.title }</h4>
                    <p>{ article.description }</p>
                    <button id="read-more" onClick={() => window.open(article.url, "_blank")?.focus()}>Read More</button>
                    {renderArticleButton()}
                </div>
            </div>
            }
        </>
    );

}
