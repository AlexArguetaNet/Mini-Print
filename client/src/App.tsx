import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { Home } from './pages/Home'
import { UserHome } from './pages/UserHome'
import { Navbar } from './components/Navbar'
import { Auth } from './components/AuthForm'
import './App.css'

function App() {

  const [showAuthForm, setShowAuthForm] = useState(false);

  return (
    <div className="app">
      <BrowserRouter>

      {showAuthForm && <Auth closeAuthForm={() => setShowAuthForm(false)}/>}
      <Navbar openAuthForm={() => setShowAuthForm(true)} />
      
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/user/:id" element={<UserHome/>} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
