import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser, faEye } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import { useNavigate } from "react-router-dom";



export const AuthForm = ({ showAuthForm }) => {

    useLockBodyScroll(); // Disables scrolling
    const [switchForm, setSwitchForm] = useState(false);

    // Switches between the login and sign up forms
    function handleForm(event) {

        event.preventDefault();
        switchForm ? setSwitchForm(false) : setSwitchForm(true);

    }

    // Handles the visibility of the form
    function handleDisplay(event) {

        event.target.id === "auth-container" && showAuthForm();

    }

    return (
        <div className="auth-container" id="auth-container" onClick={(event) => handleDisplay(event)}>
            {
                !switchForm ?
                    <Login handleForm={handleForm} showAuthForm={showAuthForm} />
                    :
                    <SignUp handleForm={handleForm} setSwitchForm={setSwitchForm} />
            }
        </div>
    );
}




const SignUp = ({ handleForm, setSwitchForm }) => {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const buttonStr = "Have an account? Login!"

    function signUpHandler(event) {

        event.preventDefault();

        axios.post("http://localhost:4001/auth/sign-up", { email, username, password })
            .then(res => {

                if (res.data.error) {
                    alert(res.data.msg);
                } else {
                    alert("New account created!");
                    setSwitchForm(false);
                }

            })
            .catch(err => {
                console.log(err);
                alert(err);
            });


    }

    return (
        <Form
            label="Sign Up"
            onSubmit={signUpHandler}
            buttonStr={buttonStr}
            handleForm={handleForm}
            email={email}
            setEmail={setEmail}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
        />
    )

}

const Login = ({ handleForm, showAuthForm }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [_, setCookies] = useCookies(["access_token"]);
    const buttonStr = "Don't have an account? Sign up!"
    const navigate = useNavigate();

    function loginHandler(event) {

        event.preventDefault();

        // Send API call to the Express server to process the login request
        axios.post("http://localhost:4001/auth/login", { email, password })
            .then(res => {

                if (res.data.error) {

                    alert(res.data.msg);

                } else {

                    setCookies("access_token", res.data.token);
                    window.localStorage.setItem("userId", res.data.userId);
                    showAuthForm();
                    navigate(`/users/${res.data.userId}`);

                }

            })
            .catch(err => alert(err));

    }

    return (
        <Form
            label="Login"
            onSubmit={loginHandler}
            buttonStr={buttonStr}
            handleForm={handleForm}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
        />
    );

}

const Form = ({ label,
    buttonStr,
    onSubmit,
    handleForm,
    email,
    setEmail,
    username,
    setUsername,
    password,
    setPassword }) => {

    const [inputType, setInputType] = useState("password");

    function handleInputType() {
        inputType === "password" ? setInputType("text") : setInputType("password");
    }

    return (
        <div className="form-container">
            <form action="" onSubmit={() => { }}>
                <h2>{label}</h2>
                <div className="input-container">
                    <label htmlFor="email">Email</label>
                    <div>
                        <FontAwesomeIcon icon={faEnvelope} />
                        <input name="email" type="email" value={email} onChange={(event => setEmail(event.target.value))} required />
                    </div>
                </div>

                {/* Check if the form is a sign up form */}
                {
                    label === "Sign Up" && (
                        <div className="input-container">
                            <label htmlFor="username">Username</label>
                            <div>
                                <FontAwesomeIcon icon={faUser} />
                                <input name="username" type="text" value={username} onChange={event => setUsername(event.target.value)} required />
                            </div>
                        </div>
                    )
                }

                <div className="input-container">
                    <label htmlFor="password">Password</label>
                    <div>
                        <FontAwesomeIcon icon={faLock} />
                        <input id="input-password" name="password" type={inputType} value={password} onChange={event => setPassword(event.target.value)} required />
                        <FontAwesomeIcon icon={faEye} onClick={handleInputType} />
                    </div>
                </div>

                <button id="submit" onClick={(event) => onSubmit(event)}>Submit</button>

                <button id="button-change-form" onClick={(event) => handleForm(event)}>{buttonStr}</button>
            </form>
        </div>
    );
}