import "../styles/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Navbar = (props: { openAuthForm: () => void}) => {

    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    function logout(): void {
        window.localStorage.removeItem("userId");
        setCookies("access_token", "");
        navigate("/");
    }

    console.log(cookies.access_token);

    return (
        <div className="navbar">
            <div className="links">
                <h2>Mini Print <FontAwesomeIcon icon={faNewspaper}/></h2>
                <div>
                    { cookies.access_token != "" && cookies.access_token != undefined ? 
                        <>
                            <Link to="/">Home</Link>
                            <Link to={`/user/${ window.localStorage.getItem("userId")}`}>My News</Link>
                            <button id="button-logout" onClick={() => logout()}>Logout</button>
                        </> 
                        :
                        <button id="button-login" onClick={() => props.openAuthForm()}>Login</button>
                    }
                </div>
            </div>
        </div>
    );
}