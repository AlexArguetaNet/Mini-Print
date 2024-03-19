import "../styles/Controls.css"

export const Controls = () => {

    return (
        <div className="controls">
            <div className="category control-input">
                <label htmlFor="category">Category</label>
                <select name="category" id="">
                    <option value="general">General</option>
                    <option value="business">Business</option>
                    <option value="technology">Technology</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="health">Health</option>
                    <option value="science">Science</option>
                    <option value="sports">Sports</option>
                </select>
                <button>Fetch News</button>
            </div>
            <div className="search control-input">
                <label htmlFor="searchKey">Search</label>
                <input type="text" name="searchKey" placeholder="Search for news..."/>
                <button>Search</button>
            </div>
        </div>
    );
}