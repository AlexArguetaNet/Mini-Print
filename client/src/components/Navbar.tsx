import "../styles/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Navbar = (props: { openAuthForm: () => void}) => {

    const [cookies, setCookies, removeCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    function logout() {
        window.localStorage.removeItem("userId");
        removeCookies("access_token");
        navigate("/");
    }

    return (
        <div className="navbar">
            <div className="links">
                <h2>Mini Print <FontAwesomeIcon icon={faNewspaper}/></h2>
                <div>
                    { !cookies.access_token ? 
                        <button id="button-login" onClick={() => props.openAuthForm()}>Login</button>
                        :
                        <button id="button-logout" onClick={logout}>Logout</button>
                    }
                </div>
            </div>
        </div>
    );
}