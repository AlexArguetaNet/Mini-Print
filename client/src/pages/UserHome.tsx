import "../styles/UserControls.css";
import { useState, useEffect } from "react";
import { ArticleList } from "../components/ArticleList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export const UserHome = () => {

    // TODO: Implement search feature

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
    const [fullList, setFullList] = useState<Article[]>([]);

    function fetchArticles(): void {

        axios.get(`http://localhost:4002/get-user-articles/?userId=${window.localStorage.getItem("userId")}`)
        .then(res => {

            if (res.data.error) {
                return alert(res.data.msg);
            }

            setFullList(res.data.articles);

            return setArticles(res.data.articles);

        })
        .catch(err => {
            return alert(err);
        });

    }

    function searchArticles(searchKey: string) {
        
        const searchLower = searchKey.toLowerCase()

        setArticles(fullList.filter(elem => {
            return elem.description.toLowerCase().includes(searchLower) || elem.title.toLowerCase().includes(searchLower);
        }));

    }

    function refreshArticleList() {
        setArticles(fullList);
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




    useEffect(() => {
        fetchArticles();
    }, []);

    return (
        <div className="user-home">
            <UserControls search={searchArticles} refresh={refreshArticleList} />
            <ArticleList articles={articles} deleteArticle={deleteArticle} />
        </div>
    );
}


const UserControls = (props: { search: (searchKey: string) => void, refresh: () => void }) => {

    const [searchKey, setSearchKey] = useState<string>("");
    const { search, refresh } = props;

    function handleInputTextChange(event: React.ChangeEvent<HTMLInputElement>): void {

        let searchValue = event.target.value;

        // If the search bar is empty, refresh the article list
        setSearchKey(searchValue);
        if (searchValue.length == 0) {
            refresh();
        }
    }

    function handleRefreshClick() {
        setSearchKey("");
        refresh();
    }

    function handleKeyboardInput(event: React.KeyboardEvent<HTMLInputElement>): void {

        if (searchKey != "" && event.key === "Enter") {
            search(searchKey);
        }

    }
    
    return (
        <div className="user-controls">
            <div className="search-bar">
                <input type="text" value={searchKey} 
                    onKeyDown={(event) => handleKeyboardInput(event)}
                    onChange={(event) => handleInputTextChange(event) } 
                    placeholder="Search your articles..."
                />
                <button onClick={() => search(searchKey)}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
            <button id="button-refresh" onClick={() => handleRefreshClick()}><FontAwesomeIcon icon={faRotateRight} /></button>
        </div>
    );
}