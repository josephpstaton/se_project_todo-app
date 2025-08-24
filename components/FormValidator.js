class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._formEl = formEl;
  }
  _showInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = "error message";
    errorElement.classList.add(this._errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formEl,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(this._formEl, inputElement);
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );

    const buttonElement = this._formEl.querySelector(
      this._submitButtonSelector
    );

    this._toggleButtonState(buttonElement);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(buttonElement);
      });
    });
  }

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(this._formEl, inputElement);
    });
    const buttonElement = this._formEl.querySelector(
      this._submitButtonSelector
    );
    this._toggleButtonState(buttonElement);
  }

  _hideInputError(formElement, inputElement) {
    console.log(inputElement.id, formElement);
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    console.log("Error Element >>", errorElement);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "error message";
    errorElement.classList.remove(this._errorClass);
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _toggleButtonState(buttonElement) {
    if (this._hasInvalidInput()) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

export default FormValidator;

