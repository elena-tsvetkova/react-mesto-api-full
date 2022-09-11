import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import logo from '../images/Vector.svg';

const Header = (props) => {
  const {
    onSignOut,
    userEmail,
    loggedIn
  } = props

  const path = useLocation().pathname

  const [isActive, setIsActive] = useState(false);

    return (
      <header className="header">
      <img className="header__logo" src={logo} alt="Место Россия"/>
        {loggedIn ? (<> <nav className={`header__menu ${isActive ? "active" : ""}`}>
            <ul className="header__list">
              <li>
                <p className="header__email">{userEmail}</p>
              </li>
              <li>
                {path === "/mesto"}
                <button
                  className="header__button header__button_type_exit"
                  onClick={onSignOut}>
                  Выйти
              </button>
              </li>
            </ul>
          </nav></>)
        : (<Link
          className="header__button"
          to={path === "/sign-in" ? "/sign-up" : "/sign-in"}>
          {path === "/sign-in" ? "Регистрация" : "Вход"}
        </Link>)}
      </header>
    );
}

export default Header;
