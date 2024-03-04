import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";

export const Navbar = ({ showAuthForm }) => {

    const [cookies, removeCookie] = useCookies(["access_token"]);

    function logout() {
        removeCookie("access_token");
    }

    return (
        <div className="navbar">
            <h2>Mini Print <FontAwesomeIcon icon={faNewspaper} /></h2>
            {
                cookies.access_token ?
                    <button onClick={logout}>Logout</button>
                    :
                    <button onClick={showAuthForm}>Login</button>
            }

        </div>
    );
}

