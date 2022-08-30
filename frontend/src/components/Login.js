import React from 'react';

const Login = ({ onLogin }) => {

return (
  <main className="main login">
    <div className="login__container">
      <h2 className="login__title">Вход</h2>
      <form
        className="login__form"
        name="form"
        id="form-with-login"
        onSubmit={handleSubmit}>
        <input
          className={`login__input login__input_type_email
      ${isValidInputs.email
              ? 'login__input_state_valid'
              : ''
            }`}
          type="email"
          placeholder="Email"
          name="email"
          id="login-input-email"
          maxLength="100"
          value={values.email || ''}
          onChange={handleChange}
          required
        />
        <span
          id="login-input-email-error"
          className="login__error">
          {errors.email || ""}
        </span>

        <input
          className={`login__input login__input_type_password
      ${isValidInputs.password
              ? 'login__input_state_valid'
              : ''
            }`}
          type="password"
          placeholder="Пароль"
          name="password"
          id="login-input-password"
          maxLength="50"
          value={values.password || ""}
          onChange={handleChange}
          required
        />
        <span
          id="login-input-password-error"
          className="login__error">
          {errors.password || ""}
        </span>

        <button
          className={`button__submit  
          ${!isValid
              ? 'login__button-submit_invalid'
              : ''
            }`}
          type="submit">
          Войти
        </button>
      </form>
    </div>
  </main>
);
}

export default Login;