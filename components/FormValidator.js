const editForm = document.querySelector('form[name="profile-edit-form"]');
const addForm = document.querySelector('form[name="gallery-add-form"]');

const config = {
  formSelector: ".modal__form",
  inputSelector: ".form__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "form__input_error",
  errorClass: "form__error_visible",
};

class FormValidator {
  constructor(config, ...formElements) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;

    this._forms = formElements;
  }

  _showInputError(inputEl, errorMessageEl) {
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(inputEl, errorMessageEl) {
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableButton();
      return;
    }
    this.enableButton();
  }

  disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _checkInputValidity(inputEl, errorMessageEl, submitButton) {
    if (!inputEl.validity.valid) {
      return this._showInputError(inputEl, errorMessageEl);
    }
    this._hideInputError(inputEl, errorMessageEl);
    this._toggleButtonState(submitButton);
  }

  _hasInvalidInput() {
    return !this._inputEls.every((inputEl) => inputEl.validity.valid);
  }

  _setEventListeners() {
    this._forms.forEach((form) => {
      this._inputEls = [...form.querySelectorAll(this._inputSelector)];
      this._submitButton = form.querySelector(this._submitButtonSelector);

      this._inputEls.forEach((inputEl) => {
        const errorMessageEl = form.querySelector(`#${inputEl.id}-error`);
        inputEl.addEventListener("input", () => {
          this._checkInputValidity(inputEl, errorMessageEl, this._submitButton);
          this._toggleButtonState(this._submitButton);
        });
      });

      form.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}

const formValidator = new FormValidator(config, editForm, addForm);

formValidator.enableValidation();

export default FormValidator;

// min 37
