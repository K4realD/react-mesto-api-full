import { Routes, Route, NavLink } from "react-router-dom";

function Header({ email, signOut }) {
  return (
    <header className="header">
      <a href="/" className="header__logo"></a>
      <Routes>
        <Route
          path="/sign-in"
          element={
            <div className="header__container">
              <nav>
                <NavLink to="/sign-up" className="header__link link">
                  Регистрация
                </NavLink>
              </nav>
            </div>
          }
        />
        <Route
          path="/sign-up"
          element={
            <div className="header__container">
              <nav>
                <NavLink to="/sign-in" className="header__link  link">
                  Войти
                </NavLink>
              </nav>
            </div>
          }
        />
        <Route
          path="/"
          element={
            <div className="header__container">
              <p className="header__email">{email}</p>
              <nav>
                <NavLink
                  to="sign-in"
                  className="header__link  link"
                  onClick={signOut}
                >
                  Выйти
                </NavLink>
              </nav>
            </div>
          }
        />
      </Routes>
    </header>
  );
}
export default Header;
