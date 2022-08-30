import {useContext} from 'react';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';


function Main(props) {
    const {
        onEditProfile,
        onAddPlace,
        onEditAvatar,
        onCardClick,
        cards,
        onCardDelete,
        onCardLike
    } = props

    const currentUser = useContext(CurrentUserContext);

    const openEditProfilePopup = () => onEditProfile()
    const openAddPlacePopup = () => onAddPlace()
    const openEditAvatarPopup = () => onEditAvatar()
    const handleCardDelete = (card) => onCardDelete(card._id)
    const handleCardLike = (card) => onCardLike(card)

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__grid">
                    <div className="profile__avatarNew">
                        <img className="profile__avatar" alt="фото профиля" src={`${currentUser.avatar}`}/>
                        <button className="profile__avatar-button" type="button" onClick={openEditAvatarPopup}
                                aria-label="Изменить_аватар"></button>
                    </div>
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button type="button" className="profile__button-edit" onClick={openEditProfilePopup}></button>
                    <p className="profile__status">{currentUser.about}</p>
                </div>
                <button type="button" className="profile__add-button" onClick={openAddPlacePopup}></button>
            </section>
            <section className="elements">
                {
                    cards.map((card) => (
                        <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={handleCardLike}
                              onCardDelete={handleCardDelete}/>
                    ))
                }
            </section>
        </main>
    );
}

export default Main;