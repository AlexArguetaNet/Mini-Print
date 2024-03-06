import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Home } from "./pages/Home";
import { UserHome } from "./pages/UserHome";
import { Navbar } from "./components/Navbar";
import { AuthForm } from "./components/AuthForm";
import { useCookies } from "react-cookie";

function App() {

  const [showAuthForm, setShowAuthForm] = useState(false);
  const [cookies] = useCookies(["access_token"]);
  const userId = window.localStorage.getItem("userId");

  function handleAuthForm(toggle) {
    toggle ? setShowAuthForm(true) : setShowAuthForm(false);
  }


  return (
    <>
      <div className="app">
        <BrowserRouter>

          {
            showAuthForm && <AuthForm showAuthForm={() => handleAuthForm(false)} />
          }
          <Navbar showAuthForm={() => handleAuthForm(true)} />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user/:id" element={<UserHome />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
