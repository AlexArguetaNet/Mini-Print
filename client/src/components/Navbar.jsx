import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";

export const Navbar = ({ showAuthForm }) => {

    const [cookies, setCookies] = useCookies(["access_token"]);

    function logout() {
        setCookies("access_token", "");
        window.localStorage.removeItem("userId");
    }

    return (
        <div className="navbar">
            <h2>Mini Print <FontAwesomeIcon icon={faNewspaper} /></h2>
            {
                !cookies.access_token ?
                    <button onClick={showAuthForm}>Login</button>
                    :
                    <button onClick={logout}>Logout</button>        
            }

        </div>
    );
}

