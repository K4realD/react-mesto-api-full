import { useState } from "react";

function Login({ handleLoginSubmit }) {
  const [values, setValues] = useState({});

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleLoginSubmit(values.email, values.password);
  };

  return (
    <div className="auth">
      <form
        className="auth__form"
        name="login"
        noValidate
        onSubmit={handleSubmit}
      >
        <h2 className="auth__heading">Вход</h2>
        <fieldset className="auth__container">
          <input
            type="email"
            name="email"
            className="auth__item"
            required
            id="login-input"
            placeholder="Email"
            value={values.email || ""}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            className="auth__item"
            required
            id="login-password"
            placeholder="Пароль"
            value={values.password || ""}
            onChange={handleChange}
          />
        </fieldset>
        <button type="submit" aria-label="Save" className="auth__submit-btn">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
