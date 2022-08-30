import {useEffect, useRef} from 'react';
import PopupWithForm from './PopupWithForm';


function EditAvatarPopup(props) {
    const {
        isOpen,
        onClose,
        onUpdateAvatar
    } = props

    const avatarRef = useRef('');

    useEffect(() => {
        avatarRef.current = ''
    }, [isOpen]);

    function handleChange(evt) {
        avatarRef.current = evt.target.value;
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current,
        });
        e.target.reset()
    }

    return (
        <PopupWithForm name='editAvatar' title='Обновить аватар' popupClass='popup-editAvatar__nev'
                       buttonCloseClass='close-add' buttonSubmitClass='popup-editAvatar__button'
                       buttonSubmitText='Сохранить' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input id="avatar-input" type="url" tabIndex="1" required
                   className="popup__input popup__input_type_link form__input"
                   placeholder="Ссылка на картинку" name="link" ref={avatarRef} onChange={handleChange}/>
            <span className="form__input-error avatar-input-error"></span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
