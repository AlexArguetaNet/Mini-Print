import { useState } from "react";
import "../styles/AuthForm.css";

export const Auth = () => {

    return (
        <div className="auth">
            <SignUp/>
        </div>
    );
}


const SignUp = () => {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function onSubmit(event: React.FormEvent<HTMLFormElement>) {

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
        />
    )
}

const Login = () => {

}

const Form = (props: { 
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
    username: string,
    setUsername: React.Dispatch<React.SetStateAction<string>>,
    email: string,
    setEmail: React.Dispatch<React.SetStateAction<string>>,
    password: string,
    setPassword: React.Dispatch<React.SetStateAction<string>>, 
    label: string,
}) => {

    const { 
        onSubmit,
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        label 
    
        } = props;

    return (
        <div className="auth-form">
            <form action="" onSubmit={event => onSubmit(event)}>
                <div className="username auth-input">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" value={username} required/>
                </div>
                <div className="email auth-input">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" value={email} required/>
                </div>
                <div className="password auth-input">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} required/>
                </div>
                <button>Submit</button>
            </form>
        </div>
    );
}