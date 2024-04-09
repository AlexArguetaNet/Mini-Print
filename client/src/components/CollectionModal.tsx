import "../styles/CollectionModal.css";

export const CollectionModal = () => {

    function close(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        
        let elementId = (event.target as HTMLInputElement).id;
        
        let modalElem = window.document.getElementById(elementId);
        modalElem!!.style.display = "none";

    }

    return (
        <div className="collectionModal" id="collectionModal" onClick={(event) => close(event)}>
            <div className="container">
            
            </div>
        </div>
    );
}

const Form = () => {

    return (
        <div className="form">
            
            <input type="text" />

        </div>
    );
}