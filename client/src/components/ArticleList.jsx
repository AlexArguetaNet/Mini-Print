import { useCookies } from "react-cookie";
import addIcon from "../assets/addIcon.png";


export const ArticleList = ({ articles, handleArticleClick }) => {


    return (
        <div className="article-list">
            {
                articles.map((elem, index) => {

                    return <Article key={index} index={index} article={elem} handleArticleClick={handleArticleClick} />
                })
            }
        </div>
    );
}

const Article = ({ article, index, handleArticleClick }) => {

    const [cookies] = useCookies(["access_token"]);

    return (
        <div className="article">
            <img className="article-img" src={article.urlToImage} alt="img" />
            <div>
                <h4>{article.title}</h4>
                <p>{article.description}</p>
                <button onClick={() => window.open(article.url, "_blank", "noreferrer")}>Read More</button>
            </div>

            {/* If a user is logged in, allow them to add an article */}
            {
                cookies.access_token && (
                    <img className="add-icon" src={addIcon} alt="addIcon" onClick={() => handleArticleClick(index)} />
                )
            }


        </div>
    );
}