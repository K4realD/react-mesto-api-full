import accept from "../images/accept.svg";
import denied from "../images/denied.svg";

function InfoTooltip({ onClose, isOpen, isRegistrated }) {
  const image = isRegistrated ? accept : denied;
  const message = isRegistrated
    ? "Вы успешно зарегистрировались!"
    : "Что то пошло не так! Попробуйте еще раз.";

  return (
    <div className={`popup popup_tooltip ${isOpen && "popup_opened"} `}>
      <div className="popup__container">
        <button
          type="button"
          aria-label="Close"
          className="popup__close-btn"
          onClick={onClose}
        />
        <div className="tooltip">
          <img src={image} alt="Accepted!" className="tooltip__image" />
          <h3 className="tooltip__text">{message}</h3>
        </div>
      </div>
    </div>
  );
}
export default InfoTooltip;
