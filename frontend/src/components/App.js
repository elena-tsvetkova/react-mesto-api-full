import React, {useState, useEffect, useCallback} from 'react';
import {Route, Routes, Navigate, useNavigate} from 'react-router-dom';
import Header from './Header.js';
import Footer from './Footer.js';
import Main from './Main.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import * as auth from '../utils/auth';
import api from "../utils/api";
import {CurrentUserContext} from '../contexts/CurrentUserContext'
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";


function App() {
    const history = useNavigate();
    const initialData = {
        email: ''
    }
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({isOpen: false});
    const [currentUser, setCurrentUser] = useState({'name': 'Жак', 'about': 'test', 'avatar': 'http://ya.ru'});
    const [cards, setCards] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [isAuthChecking, setIsAuthChecking] = useState(true);
    const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [data, setData] = useState(initialData);


    const closePopup = () => {
        setIsInfoTooltipPopupOpen(false)
    }

    useEffect(() => {
        api.getAllNeededData()
            .then(([cards, userData]) => {
                setCurrentUser(userData)
                setCards(cards)
            })
            .catch((err) => console.log(err))
    }, []);

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    }

    function handleCardClick(data) {
        setSelectedCard({isOpen: true, ...data})
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setSelectedCard({isOpen: false})
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        if (isLiked) {
            api.dislike(card._id).then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            });
        } else {
            api.like(card._id).then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            });
        }
    }

    const handleUpdateUser = (data) => {
        return api.setUserInfoApi(data)
            .then(res => {
                setCurrentUser(res);
                closeAllPopups()
                return res;
            })
            .catch((err) => console.log(err))
    }

    const handleUpdateAvatar = (data) => {
        return api.updateAvatar(data)
            .then(res => {
                setCurrentUser(res);
                closeAllPopups()
                return res;
            })
            .catch((err) => console.log(err))
    }

    const handleAddPlaceSubmit = ({name, link}) => {
        return api.addCard({name, link})
            .then(res => {
                setCards([res, ...cards]);
                closeAllPopups()
                return res;
            })
            .catch((err) => console.log(err))
    }

    const handleCardDelete = (useCardId) => {
        return api.deleteCard(useCardId)
            .then(res => {
                setCards(state => state.filter(item => item._id === useCardId ? null : item));
                return res;
            })
            .catch((err) => console.log(err))
    }

    const handleRegister = ({password, email}) => {
        return auth.register({password, email})
            .then(res => {
                if (!res || res.statusCode === 400) throw new Error(`Ошибка: ${res.message}`);
                setIsInfoTooltipPopupOpen(true);
                setIsSuccess(true);
                history.push('/sign-in')
                return res;
            })
            .catch(err => {
                setIsInfoTooltipPopupOpen(true);
                setIsSuccess(false);
                return err;
            })
    }

    const tokenCheck = useCallback(() => {
        const jwt = localStorage.getItem('jwt');

        if (jwt) {
            setIsAuthChecking(true);
            auth.getContent(jwt)
                .then((res) => {
                    if (res) {
                        setLoggedIn(true);
                        setData({
                            email: res.data.email
                        })
                        history.push('/mesto');
                    }
                })
                .catch(() => history.push('/sign-in'))
                .finally(() => setIsAuthChecking(false))
        } else {
            setIsAuthChecking(false)
        }
    }, [history])

    useEffect(() => {
        tokenCheck();
    }, [tokenCheck])

    const handleLogin = ({password, email}) => {
        return auth.authorize({password, email})
            .then(res => {
                if (!res || res.statusCode === 400 || res.statusCode === 401) throw new Error(`Ошибка: ${res.message}`);
                if (res.token) {
                    setIsInfoTooltipPopupOpen(true);
                    setIsSuccess(true);
                    setLoggedIn(true);
                    localStorage.setItem('jwt', res.token);
                }
            })
            .then(tokenCheck)
            .catch(err => {
                setIsInfoTooltipPopupOpen(true);
                setIsSuccess(false);
                return err;
            })
    }

    const handleSignOut = () => {
        localStorage.removeItem('jwt');
        setData(initialData);
        setLoggedIn(false);
        history.push('/sign-in');
    }

    return (
        <div className="page">
            <CurrentUserContext.Provider value={currentUser}>
                {/*<Header/>*/}
                <Routes>
                    <Route path='/mesto' element={<ProtectedRoute/>} exact loggedIn={loggedIn} isChecking={isAuthChecking}>
                        <Route exact path='/mesto' element={<Main/>}                             onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick}
                            onEditAvatar={handleEditAvatarClick}
                            onCardClick={handleCardClick}
                            cards={cards}
                            onCardDelete={handleCardDelete}
                            onCardLike={handleCardLike}/>
                        </Route>
                    {/*<Route path='/sign-in' exact>*/}
                    {/*    <Login onLogin={handleLogin}/>*/}
                    {/*</Route>*/}

                    {/*<Route path='/sign-up' exact>*/}
                    {/*    <Register onRegister={handleRegister}/>*/}
                    {/*</Route>*/}

                    {/*<Route path="*">*/}
                    {/*    {loggedIn*/}
                    {/*        ? <Navigate to="/mesto"/>*/}
                    {/*        : <Navigate to="/sign-in"/>}*/}
                    {/*</Route>*/}
                </Routes>
                <Footer/>

                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
                                  onUpdateUser={handleUpdateUser}/>
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
                <PopupWithForm name='delete' title='Вы уверены?' popupClass='popup-delete__card'
                               buttonCloseClass='close-delete'
                               buttonSubmitClass='popup-delete__button' buttonSubmitText='Да' isOpen={false}>
                </PopupWithForm>
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
                                 onUpdateAvatar={handleUpdateAvatar}/>
                <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

                {/*<InfoTooltip*/}
                {/*    isOpen={isInfoTooltipPopupOpen}*/}
                {/*    onClose={closePopup}*/}
                {/*    isSuccess={isSuccess}*/}
                {/*/>*/}

            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;
