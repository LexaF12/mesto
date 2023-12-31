export default class FormValidator { 

  constructor(config, formElement) { 
    this._config = config 
    this._formElement = formElement
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector))
    this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector)
  } 

  _showInputError(inputElement, errorMessage) { 
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`) 
    inputElement.classList.add(this._config.inputErrorClass) 
    errorElement.textContent = errorMessage 
    errorElement.classList.add(this._config.errorClass) 
  } 

  _hideInputError(inputElement) { 
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`) 
    inputElement.classList.remove(this._config.inputErrorClass) 
    errorElement.classList.remove(this._config.errorClass) 
    errorElement.textContent = '' 
  } 

  _checkInputValidity(inputElement) { 

    if (!inputElement.validity.valid) { 

      this._showInputError(inputElement, inputElement.validationMessage) 

    } else { 

      this._hideInputError(inputElement) 

    } 

  } 

  _disabledButton() { 

    this._buttonElement.setAttribute('disabled', true) 

    this._buttonElement.classList.add(this._config.inactiveButtonClass) 

  } 

  _enabledButton() { 

    this._buttonElement.removeAttribute('disabled') 

    this._buttonElement.classList.remove(this._config.inactiveButtonClass) 

  } 

  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disabledButton()
    } else {
      this._enabledButton()
    }

  }

  _hasInvalidInput() { 

    return this._inputList.some((inputElement) => { 

      return !inputElement.validity.valid 

    }) 

  } 

  _setEventListeners() { 
    this._formElement.addEventListener('sumbit', (evt) => {
      evt.preventDefault() 
    }) 

    this.toggleButtonState() 

    this._inputList.forEach((inputElement) => { 

      inputElement.addEventListener('input', () => { 

        this._checkInputValidity(inputElement) 

        this.toggleButtonState() 

      }) 
    }) 

  } 

  enableValidation() { 
    this._setEventListeners()
    }
  } 
