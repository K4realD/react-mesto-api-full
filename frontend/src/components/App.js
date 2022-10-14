import { useEffect, useState } from "react";
import { api } from "../utils/constants.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import Login from "./Login.js";
import Register from "./Register.js";
import ProtectedRoute from "./ProtectedRoute.js";
import InfoTooltip from "./InfoTooltip.js";
import * as auth from "../utils/auth.js";

function App() {
  const [isEditProfileOpen, setEditProfileOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeletePlacePopupOpen, setDeletePlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ isOpen: false });
  const [isInfoTooltipOpen, setInfotooltipOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [cards, setCards] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isRegistrated, setIsRegistrated] = useState(false);
  const navigate = useNavigate();

  const handleEditAvatarClick = () => setEditAvatarPopupOpen(true);
  const handleEditProfileClick = () => setEditProfileOpen(true);
  const handleAddPlaceClick = () => setAddPlacePopupOpen(true);
  const handleCardClick = (data) => setSelectedCard({ isOpen: true, ...data });

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfileOpen(false);
    setAddPlacePopupOpen(false);
    setDeletePlacePopupOpen(false);
    setSelectedCard({ isOpen: false });
    setInfotooltipOpen(false);
  };

  const handleUpdateUser = (data) => {
    api
      .patchProfile(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) =>
        console.log(`Не удалось обновить данные пользователя: ${err}`)
      );
  };

  const handleUpdateAvatar = (data) => {
    api
      .patchAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(`Не удалось обновить аватар: ${err}`));
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(`Не удалось поставить лайк: ${err}`));
  };
  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() =>
        setCards((element) => element.filter((item) => item._id !== card._id))
      )
      .catch((err) => console.log(`Не удалось удалить карточку: ${err}`));
  };

  const handleAddPlaceSubmit = (card) => {
    api
      .postNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Не удалось добавить карточку: ${err}`));
  };

  const handleRegistrationSubmit = (email, password) => {
    auth
      .register(email, password)
      .then(() => {
        setIsRegistrated(true);
        setInfotooltipOpen(true);
        navigate("/sign-in");
      })
      .catch((err) => {
        setIsRegistrated(false);
        setInfotooltipOpen(true);
        console.log(`Некорректные данные ${err}`);
      });
  };

  const handleLoginSubmit = (email, password) => {
    auth
      .login(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        setUserEmail(email);
        navigate("/");
      })
      .catch((err) => {
        setIsRegistrated(false);
        setInfotooltipOpen(true);
        console.log(`Пользователь не найден ${err}`);
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    navigate("/sign-in");
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          setUserEmail(res.email);
          navigate("/");
        })
        .catch((err) => {
          console.log(`Токен не соответствует ${err}`);
        });
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, initialCards]) => {
        setCurrentUser(user);
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(`Ошибка загрузки первоначальных данных, ${err}`);
      });
  }, [isLoggedIn]);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header signOut={handleSignOut} email={userEmail} />
        <Routes>
          <Route
            path="/sign-up"
            element={
              <Register handleRegistrationSubmit={handleRegistrationSubmit} />
            }
          />

          <Route
            path="/sign-in"
            element={<Login handleLoginSubmit={handleLoginSubmit} />}
          />

          <Route
            path="/"
            element={
              <ProtectedRoute
                loggedIn={isLoggedIn}
                component={Main}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            }
          />
          <Route path="*" element={<Navigate to="/sign-in" />} />
        </Routes>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfileOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
        <PopupWithForm
          name="confirm"
          title="Вы уверены?"
          buttonText="Да"
          isOpen={isDeletePlacePopupOpen}
          onClose={closeAllPopups}
        >
          <fieldset className="form__container"></fieldset>
        </PopupWithForm>
        <InfoTooltip
          onClose={closeAllPopups}
          isOpen={isInfoTooltipOpen}
          isRegistrated={isRegistrated}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
