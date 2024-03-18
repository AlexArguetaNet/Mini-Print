import "../styles/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";

export const Navbar = (props: { openAuthForm: () => void}) => {

    return (
        <div className="navbar">
            <div className="links">
                <h2>Mini Print <FontAwesomeIcon icon={faNewspaper}/></h2>
                <div>
                    <button id="button-login" onClick={() => props.openAuthForm()}>Login</button>
                </div>
            </div>
        </div>
    );
}