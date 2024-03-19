import "../styles/ArticleList.css";
import { useCookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

export const ArticleList = (props: { articles: object[] }) => {

    const { articles } = props;

    function selectArticle(index: number): void {
        console.log(articles[index]);
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
    const [cookies] = useCookies(["access_token"]);

    return (
        <div className="article">
            <img src={article.urlToImage} alt="image" />
            <div>
                <h4>{ article.title }</h4>
                <p>{ article.description }</p>
                <button id="read-more" onClick={() => window.open(article.url, "_blank")?.focus()}>Read More</button>
                { cookies.access_token && 
                    <FontAwesomeIcon onClick={() => selectArticle(index)} icon={faCirclePlus}/>
                }
            </div>
        </div>
    );

}
