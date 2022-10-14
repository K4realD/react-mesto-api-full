import Api from'./Api.js'

const BASE_URL = 'https://backendk4d.nomoredomains.icu'

const api = new Api({
  url: BASE_URL,
  headers: {
    "Accept": "application/json",
    'Content-Type': 'application/json'
  }
})

const validationSelectors = {
  inputSelector: ".form__item",
  submitButtonSelector: ".form__submit-btn",
  inactiveButtonClass: "form__submit-btn_inactive",
  inputErrorClass: "form__item_type_error",
  errorClass: "form__item-error_active",
  fieldsetSelector: ".form__container",
};

export {
  validationSelectors,
  api,
  BASE_URL
};


