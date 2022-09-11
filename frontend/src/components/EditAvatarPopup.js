import {useEffect, useState} from 'react';
import PopupWithForm from './PopupWithForm';


function EditAvatarPopup(props) {
    const {
        isOpen,
        onClose,
        onUpdateAvatar
    } = props

    const [avatar, setAvatar] = useState('http://ya.ru');

    useEffect(() => {
        setAvatar('');
    }, [isOpen]);

    function handleChange(evt) {
        setAvatar(evt.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatar,
        });
        e.target.reset()
    }

    return (
        <PopupWithForm name='editAvatar' title='Обновить аватар' popupClass='popup-editAvatar__nev'
                       buttonCloseClass='close-add' buttonSubmitClass='popup-editAvatar__button'
                       buttonSubmitText='Сохранить' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input id="avatar-input" type="url" tabIndex="1" required
                   className="popup__input popup__input_type_link form__input"
                   placeholder="Ссылка на картинку" name="link" value={avatar} onChange={handleChange}/>
            <span className="form__input-error avatar-input-error"></span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
