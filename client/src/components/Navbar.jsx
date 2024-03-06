import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = ({ showAuthForm }) => {

    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    function logout() {
        setCookies("access_token", "");
        window.localStorage.removeItem("userId");
        navigate("/");
    }

    return (
        <div className="navbar">
            <h2>Mini Print <FontAwesomeIcon icon={faNewspaper} /></h2>
            {
                !cookies.access_token ?
                    <button onClick={showAuthForm} id="button-login">Login</button>
                    :
                    (
                        <div>
                            <Link to={"/"}>Home</Link>
                            <Link to={`/users/${window.localStorage.getItem("userId")}`}>Saved</Link>
                            <button onClick={logout} id="button-logout">Logout</button>
                        </div>
                    )
            }

        </div>
    );
}

