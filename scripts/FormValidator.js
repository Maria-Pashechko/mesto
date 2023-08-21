class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  };

  _showInputError(input) {
    input.classList.add(this._config.inputErrorClass);
    const spanError = this._formElement.querySelector(`.${input.id}-error`);
    spanError.textContent = input.validationMessage;
    spanError.classList.add(this._config.errorClass);
  }
  
  _hideInputError(input) {
    input.classList.remove(this._config.inputErrorClass);
    const spanError = this._formElement.querySelector(`.${input.id}-error`);
    spanError.textContent = '';
    spanError.classList.remove(this._config.errorClass);
  }

  _isValid (input) {
    if(!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  //проверка на валидность всех инпутов в форме одномоментно
  _hasInvalidInput() {
    return this._inputs.some(input => !input.validity.valid);
  }

  //состояние disable кнопки submit
  _disableButton() {
    this._btnSubmit.classList.add(this._config.inactiveButtonClass);
    this._btnSubmit.disabled = true;
  }
 
  //переключатель стилей активной и неактивной кнопки submit
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._btnSubmit.classList.remove(this._config.inactiveButtonClass);
      this._btnSubmit.disabled = false;
    }
  }

  enableValidation() {
    this._inputs = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._btnSubmit = this._formElement.querySelector(this._config.submitButtonSelector);
    
    //disabled в начале при открытии попапа с пустыми полями    
    this._toggleButtonState();
    
    this._formElement.addEventListener('reset', () => {
      this._disableButton();  
    })

    //обработчик события изменения текста инпутов
    this._inputs.forEach(input => {
      input.addEventListener('input', () => {
        this._isValid(input);
        //переключатель стилей кнопки submit в зависимости от валидности/инвалидности импутов
        this._toggleButtonState();
      })
    })
  }
}


export default FormValidator;