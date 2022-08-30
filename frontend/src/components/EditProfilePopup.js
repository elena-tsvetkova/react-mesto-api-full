import {useContext, useEffect, useState} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';


function EditProfilePopup(props) {
    const {
        isOpen,
        onClose,
        onUpdateUser
    } = props

    const [name, setName] = useState('Жак');
    const [description, setDescription] = useState('test');

    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleChangeName(evt) {
        setName(evt.target.value);
    }

    function handleChangeDescription(evt) {
        setDescription(evt.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm name='profile' title='Редактировать профиль' popupClass='popup__common'
                       formClass='popup__form-profile' buttonCloseClass='close-profile' buttonSubmitClass=''
                       buttonSubmitText='Сохранить' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input id="name-input" type="text" tabIndex="1" required minLength="2" maxLength="40"
                   className="popup__input popup__input_type_name form__input" placeholder="Имя"
                   name="name" value={name} onChange={handleChangeName}/>
            <span className="form__input-error name-input-error"></span>
            <input id="status-input" type="text" tabIndex="2" required minLength="2" maxLength="200"
                   className="popup__input popup__input_type_job form__input" placeholder="Профессия"
                   name="status" value={description} onChange={handleChangeDescription}/>
            <span className="form__input-error status-input-error"></span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;