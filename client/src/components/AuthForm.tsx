import { useState } from "react";
import "../styles/AuthForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock, faX } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import { useNavigate } from "react-router-dom";

export const Auth = (props: { closeAuthForm: () => void }) => {

    useLockBodyScroll();
    const [switchForm, setSwitchForm] = useState(true);

    function closeForm(event: React.MouseEvent<HTMLDivElement>) {

        // Cast event object to instance of HTMLInputElement to access id field
        let elementId = (event.target as HTMLInputElement).id;

        if (elementId === "auth") {
            props.closeAuthForm();
        }
    }

    return (
        <div className="auth" id="auth" onClick={event => closeForm(event)}>
            {switchForm ? <Login switchForm={() => setSwitchForm(false)} close={() => props.closeAuthForm()}/> 
            : 
            <SignUp switchForm={() => setSwitchForm(true)} close={() => props.closeAuthForm()}/>}
        </div>
    );
}


const SignUp = (props: { switchForm: () => void, close: () => void }) => {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function onSubmit(event: React.FormEvent<HTMLFormElement>) {

        // Prevent default submit action
        event.preventDefault();

        axios.post("http://localhost:4002/auth/sign-up", { username, email, password })
        .then(res => {

            if (res.data.error) {
                setUsername("");
                setEmail("");
                setPassword("");
                return alert(res.data.msg);
            }

            props.switchForm();
            return alert("New account created!");

        })
        .catch(err => {
            alert("Error");
            console.log(err);
        });



    }

    return (
        <Form 
            onSubmit={onSubmit} 
            username={username} 
            email={email} 
            password={password}
            setUsername={setUsername}
            setEmail={setEmail}
            setPassword={setPassword}
            label="Sign Up"
            buttonLabel="Already have an account? Login!"
            switchForm={props.switchForm}
            close={props.close}
        />
    )
}

const Login = (props: { switchForm: () => void, close: () => void }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [_, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    function onSubmit(event: React.FormEvent<HTMLFormElement>) {

        axios.post("http://localhost:4002/auth/login", { email, password })
        .then(res => {

            if (res.data.error) {
                setEmail("");
                setPassword("");
                return alert(res.data.msg);
            }

            // Store user id in browser's local storage
            window.localStorage.setItem("userId", res.data.userId);
            setCookies("access_token", res.data.token);
            props.close();
            navigate(`/user/${ res.data.userId }`);

        })
        .catch(err => {
            alert("Error");
            console.log(err);
        });


        // Prevent default submit action
        event.preventDefault();

    }

    return (
        <Form 
            onSubmit={onSubmit} 
            email={email} 
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            label="Login"
            buttonLabel="Don't have an account? Sign up!"
            switchForm={props.switchForm}
            close={props.close}
        />
    )
}

const Form = (props: { 
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
    username?: string,
    setUsername?: React.Dispatch<React.SetStateAction<string>>,
    email: string,
    setEmail: React.Dispatch<React.SetStateAction<string>>,
    password: string,
    setPassword: React.Dispatch<React.SetStateAction<string>>, 
    label: string,
    buttonLabel: string,
    switchForm: () => void,
    close: () => void
}) => {

    const { 
        onSubmit,
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        label,
        buttonLabel,
        switchForm,
        close
    
        } = props;

    return (
        <div className="auth-form">
            <FontAwesomeIcon icon={faX} id="auth-x" onClick={close}/>
            <h2>{label}</h2>
            <form action="" onSubmit={event => onSubmit(event)}>
                
                {/* Show username text field if the form is to sign up */}
                { setUsername != undefined && (
                    <div className="username auth-input">
                        <label htmlFor="username">Username</label>
                        <div>
                            <FontAwesomeIcon icon={faUser}/>
                            <input type="text" name="username" value={username} onChange={event => setUsername(event.target.value)} required/>
                        </div>
                    </div>
                )}

                <div className="email auth-input">
                    <label htmlFor="email">Email</label>
                    <div>
                        <FontAwesomeIcon icon={faEnvelope}/>
                        <input type="email" name="email" value={email} onChange={event => setEmail(event.target.value)} required/>
                    </div>
                </div>
                <div className="password auth-input">
                    <label htmlFor="password">Password</label>
                    <div>
                        <FontAwesomeIcon icon={faLock}/>
                        <input type="password" name="password" value={password} onChange={event => setPassword(event.target.value)} required/>
                    </div>
                </div>
                <div className="form-buttons">
                    <button id="submit">Submit</button>
                </div>
            </form>
            <button id="switch" onClick={switchForm}>{buttonLabel}</button>
        </div>
    );
}