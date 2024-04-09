import "../styles/CollectionModal.css";

export const CollectionModal = () => {

    function close(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        
        let elementId = (event.target as HTMLInputElement).id;
        
        let modalElem = window.document.getElementById(elementId);
        modalElem!!.style.display = "none";

    }

    return (
        <div className="modal" id="modal" onClick={(event) => close(event)}>
            <div className="container">
            
            </div>
        </div>
    );
}

const Collections = () => {

    return (
        <div className="collections">

        </div>
    );
}

const NewCollectionForm = () => {

    return (
        <div className="form">
            
            <input type="text" />

        </div>
    );
}