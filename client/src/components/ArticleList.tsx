import "../styles/ArticleList.css";

export const ArticleList = (props: { articles: object[] }) => {

    const { articles } = props;

    return (
        <div className="article-list">
            { articles.map((elem, index) => {
                return <Article key={index} article={elem} index={index} />
            }) }
        </div>
    );
}

const Article = (props: { article: any, index: number }) => {

    const { article, index } = props;


    return (
        <div className="article">
            <img src={article.urlToImage} alt="image" />
            <div>
                <h4>{ article.title }</h4>
                <p>{ article.description }</p>
                <button onClick={() => window.open(article.url, "_blank")?.focus()}>Read More</button>
            </div>
        </div>
    );

}
