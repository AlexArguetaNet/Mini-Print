import axios from "axios";
import { useEffect, useState } from "react";


export const ArticleList = ({ articles }) => {


    return (
        <div className="article-list">
            {
                articles.map((elem, index) => {
                    return <p key={index}>{elem.title}</p>
                })
            }
        </div>
    );
}