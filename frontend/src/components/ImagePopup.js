import {useEffect} from 'react';

function ImagePopup(props) {
    const {
        card,
        onClose
    } = props

    useEffect(() => {
        const handleEscapeClose = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };
        document.addEventListener("keydown", handleEscapeClose);
        return () => {
            document.removeEventListener("keydown", handleEscapeClose);
        };
    }, [onClose]);

    const handleOverlayClose = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };
    const name = card.card ? card.card.name : ''
    const link = card.card ? card.card.link : ''
    return (
        <div onClick={handleOverlayClose} className={`popup ${card.isOpen ? 'popup_opened' : ''} popup-big-image`}>
            <div className='popup-big-image__container'>
                <img src={link} className="popup-big-image__opened" alt={name}/>
                <h2 className="popup-big-image__title">{name}</h2>
                <button type="button" className="popup__close popup-big-image__close" onClick={onClose}></button>
            </div>
        </div>
    );
}

export default ImagePopup;

