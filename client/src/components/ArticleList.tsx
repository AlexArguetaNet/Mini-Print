import "../styles/ArticleList.css";
import { useCookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export const ArticleList = (props: { articles: any[] }) => {

    const { articles } = props;

    function selectArticle(index: number): void {

        let newArticle = {
            author: articles[index].author,
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
    const [cookies] = useCookies(["access_token"]);

    return (
        <div className="article">
            <img src={article.urlToImage} alt="image" />
            <div>
                <h4>{ article.title }</h4>
                <p>{ article.description }</p>
                <button id="read-more" onClick={() => window.open(article.url, "_blank")?.focus()}>Read More</button>
                { ((cookies.access_token && !article.isSaved) && !article.userId) ? 
                    <FontAwesomeIcon onClick={() => selectArticle(index)} icon={faCirclePlus}/>
                    : cookies.access_token || article.userId ? <FontAwesomeIcon icon={faEllipsisVertical} />
                    : <></>
                    
                }
            </div>
        </div>
    );

}
