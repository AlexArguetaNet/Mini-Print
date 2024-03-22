import "../styles/Controls.css"
import { useState } from "react";

export const Controls = (props: { fetchNews: (searchBy: string, query: string) => void }) => {

    const [category, setCategory] = useState("null");
    const [searchQuery, setSearchQuery] = useState("");
    const { fetchNews } = props;

    // Fetch news by category
    function fetchByCategory() {

        if (category === "null" ) {
            return alert("Please select a category");
        }

        // Clear search bar
        setSearchQuery("");

        fetchNews("category", category)
    }

    // Fetch news by search query
    function fetchBySearchQuery() {

        if (searchQuery === "") {
            return alert("Please enter a search key or choose a category");
        }

        // Reset category selector
        setCategory("null");

        fetchNews("searchKey", searchQuery);
    }

    function handleKeyboardInput(event: React.KeyboardEvent<HTMLInputElement>) {

        if (searchQuery != "" && event.key === "Enter") {
            setCategory("null");
            fetchNews("searchKey", searchQuery);
        }

    }

    return (
        <div className="controls">
            <div className="category control-input">
                <label htmlFor="category">Category</label>
                <select name="category" value={category} onChange={(event) => setCategory(event.target.value)}>
                    <option value="null">Select a category</option>
                    <option value="general">General</option>
                    <option value="business">Business</option>
                    <option value="technology">Technology</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="health">Health</option>
                    <option value="science">Science</option>
                    <option value="sports">Sports</option>
                </select>
                <button onClick={fetchByCategory}>Fetch News</button>
            </div>
            <div className="search control-input">
                <label htmlFor="searchKey">Search</label>
                <input type="text" name="searchKey" 
                    onChange={(event) => setSearchQuery(event.target.value)} 
                    onKeyDown={(event) => handleKeyboardInput(event)}
                    value={searchQuery} 
                    placeholder="Search for news..."
                />
                <button onClick={fetchBySearchQuery}>Search</button>
            </div>
        </div>
    );
}