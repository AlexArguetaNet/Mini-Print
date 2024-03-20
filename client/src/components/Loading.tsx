import "../styles/Loading.css";
import { useLockBodyScroll } from "@uidotdev/usehooks";

export const Loading = () => {

    useLockBodyScroll();

    return (
        <div className="loading">
            <div className="content">
                <div className="lds-roller">
                <div>

                </div>
                <div>
                </div>
                <div>

                </div>
                <div>

                </div>
                <div>

                </div>
                <div>

                </div>
                <div>

                </div>
                <div>

                </div>
                </div>
            </div>
            <div>
                <h2>Loading</h2>
            </div>
        </div>
    );
}