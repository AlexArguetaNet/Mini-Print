import axios from "axios";

// GET: Get the top headlines
export const fetchNews = (req, res) => {

    const { category, searchKey } = req.query;
    var url = "";

    if (category) {
        url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}`;
    } else {
        url = `https://newsapi.org/v2/everything?q=${searchKey}`;
    }

    // Call news API
    axios.get(url + `&apiKey=${process.env.API_KEY}`)
        .then(response => {

            res.json(response.data.articles);

        })
        .catch(err => res.json({ error: "Fetching error", msg: err.message }));

}