import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { ControlPanel } from "./components/ControlPanel";
import { AuthForm } from "./components/AuthForm";

function App() {

  const [showAuthForm, setShowAuthForm] = useState(false);


  return (
    <>
      <div className="app">

        {
          showAuthForm && <AuthForm showAuthForm={() => setShowAuthForm(false)} />
        }
        <Navbar showAuthForm={() => setShowAuthForm(true)} />
        <ControlPanel />

      </div>
    </>
  )
}

export default App
