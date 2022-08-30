import React from 'react';
import logo from '../images/Vector.svg';

// const Header = (props) => {
//   const {
//     onSignOut,
//     userEmail,
//     loggedIn
//   } = props
//
//   const path = useLocation().pathname
//
//   // Стейт бургер-меню
//   const [isActive, setIsActive] = useState(false);
//
//   // Функция переключения состояния бургер-меню
//   const handleButton = () => {
//     setIsActive(!isActive)
//   }

function Header () {
    return (
      <header className="header">
      <img className="header__logo" src={logo} alt="Место Россия"/>
          {loggedIn
        ? (<>
          <button
            type="button"
            className={`header__burger header__button 
        ${isActive
                ? "active"
                : ""}`}
            onClick={handleButton}>
            <span></span>
          </button>
          <nav
            className={`header__menu 
      ${isActive
                ? "active"
                : ""}`}>
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
      {/*    <button type="button"  className="header__button">*/}
      {/*        <span></span>*/}
      {/*    </button>*/}
    </header>             
    );
}

export default Header;
