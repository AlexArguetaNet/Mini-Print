import { useState } from "react";


export const ControlPanel = ({ category, setCategory, searchKey, setSearchKey, fetchNews }) => {

    return (
        <div className="controls">
            <div className="category input-container">
                <label htmlFor="category">Category: </label>
                <select name="category" id="" value={category} onChange={(event) => setCategory(event.target.value)}>
                    <option value="business">Business</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="general">General</option>
                    <option value="health">Health</option>
                    <option value="science">Science</option>
                    <option value="sports">Sports</option>
                    <option value="technology">Technology</option>
                </select>
                <button onClick={() => fetchNews(true)}>Fetch News</button>
            </div>
            <div className="search input-container">
                <input type="text" value={searchKey} placeholder="Search for news..." onChange={(event) => setSearchKey(event.target.value)} />
                <button onClick={() => fetchNews(false)}>Search</button>
            </div>
        </div>
    );
}
