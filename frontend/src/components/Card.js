import {useContext} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card(props) {
    const {
        card,
        onCardClick,
        onCardLike,
        onCardDelete
    } = props

    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = `element__trash ${isOwn ? '' : 'element__trash_hidden'}`;

    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `element__like ${isLiked ? 'element__like-activ' : ''}`;

    const handleClick = () => onCardClick(props);
    const handleLikeClick = () => onCardLike(card);
    const handleDeleteClick = () => onCardDelete(card);

    return (
        <article className="element">
            <img src={card.link} alt={card.name} className="element__image" onClick={handleClick}/>
            <div className="element__header">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__count">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <span className="element__like-count">{card.likes.length}</span>
                </div>
            </div>
            <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
        </article>
    );
}

export default Card;
