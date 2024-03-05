import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { ControlPanel } from "./components/ControlPanel";
import { AuthForm } from "./components/AuthForm";
import { ArticleList } from "./components/ArticleList";
import axios from "axios";

function App() {

  const [showAuthForm, setShowAuthForm] = useState(false);
  const [category, setCategory] = useState("general");
  const [searchKey, setSearchKey] = useState(undefined);
  const [articles, setArticles] = useState([]);

  function handleAuthForm(toggle) {

    toggle ? setShowAuthForm(true) : setShowAuthForm(false);

  }

  // Fetches news from the back-end server
  function fetchNews() {

    let url;

    if (searchKey) {
      url = `http://localhost:4001/news/?searchKey=${searchKey}`;
    } else {
      url = `http://localhost:4001/news/?category=${category}`;
    }

    axios.get(url)
      .then(res => {

        setArticles(res.data);

      })
      .catch(err => alert(err));

  }

  // Fetch news on the first render
  useEffect(() => {
    fetchNews();
  }, []);


  return (
    <>
      <div className="app">

        {
          showAuthForm && <AuthForm showAuthForm={() => handleAuthForm(false)} />
        }
        <Navbar showAuthForm={() => handleAuthForm(true)} />
        <ControlPanel
          category={category}
          setCategory={setCategory}
          searchKey={searchKey}
          setSearchKey={setSearchKey}
          fetchNews={fetchNews}
        />
        <ArticleList articles={articles} />

      </div>
    </>
  )
}

export default App
