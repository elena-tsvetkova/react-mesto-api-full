import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const InfoTooltip = (props) => {
  // Диструктуризированная переменная с пропсами
  const {
    isOpen,
    onClose,
    isSuccess
  } = props;

  const path = useLocation().pathname

  const tooltip = () => {
    if (path === '/sign-in' || path === '/sign-up') {
      return isSuccess
        ? "Вы успешно зарегистрировались!"
        : "Что-то пошло не так! Попробуйте ещё раз.";
    }

    if (path === '/mesto') {
      return isSuccess
        ? "Вы успешно авторизовались!"
        : "Что-то пошло не так!";
    }

    return;
  }

  const image = isSuccess
    ? success
    : fail

  // Реализация закрытия нажатием на ESC
  useEffect(() => {
    if (!isOpen) return;
    const handleEscapeClose = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscapeClose);
    return () => {
      document.removeEventListener("keydown", handleEscapeClose);
    };
  }, [isOpen, onClose]);

  // Реализация закрытия по оверлею
  const handleOverlayClose = (e) => {
    if (e.target === e.currentTarget && isOpen) {
      onClose();
    }
    return;
  };


  return (
    <section
      onClick={handleOverlayClose}
      className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}>
          </button>
        <img className="popup__image" src={image} alt={"Картинка подсказки"}></img>
        <p className="popup__title popup__title-tooltip">{tooltip()}</p>
      </div>
    </section>
  )
}

export default InfoTooltip;