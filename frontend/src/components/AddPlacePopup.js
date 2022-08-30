import {useState, useEffect} from 'react';
import PopupWithForm from './PopupWithForm';


function AddPlacePopup(props) {
    const {
        isOpen,
        onClose,
        onAddPlace
    } = props

    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    function handleChangeName(evt) {
        setName(evt.target.value);
    }

    function handleChangeLink(evt) {
        setLink(evt.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name,
            link
        });
    }

    useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);

    return (
        <PopupWithForm name='new-image' title='Новое место' formClass='popup__form-new-image'
                       buttonCloseClass='close-add' buttonSubmitClass='' buttonSubmitText='Создать'
                       isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input id="title-input" type="text" tabIndex="1" required minLength="2" maxLength="20"
                   className="popup__input popup__input_type_title form__input"
                   placeholder="Название" name="name" value={name} onChange={handleChangeName}/>
            <span className="form__input-error title-input-error"></span>
            <input id="link-input" type="url" tabIndex="2" required
                   className="popup__input popup__input_type_link form__input"
                   placeholder="Ссылка на картинку" name="link" value={link} onChange={handleChangeLink}/>
            <span className="form__input-error link-input-error"></span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;