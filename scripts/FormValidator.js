class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

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

  //"поиск" элементов валидации каждой формы (всех инпутов и кнопки submit)
  _findFormElemnts() {
    this._inputs = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._btnSubmit = this._formElement.querySelector(this._config.submitButtonSelector);
  }

  //состояние disable (скрыта) кнопки submit
  _disableButton() {
    this._btnSubmit.classList.add(this._config.inactiveButtonClass);
    this._btnSubmit.disabled = true;
  }

  //состояние enable (видимости) кнопки submit
  _enableButton() {
    this._btnSubmit.classList.remove(this._config.inactiveButtonClass);
    this._btnSubmit.disabled = false;
  }
 
  //переключатель стилей активной/неактивной кнопки submit в зависимости от валидности/инвалидности импутов
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  //обработчик перезагрузки формы
  _initResetForm() {
    this._formElement.addEventListener('reset', () => {
      this._disableButton();  
    });
  }

  //обработчик изменения текста инпута
  _initCheckInput(input) {
    input.addEventListener('input', () => {
      this._isValid(input);
      this._toggleButtonState();
    });
  }

  enableValidation() {
    // "поиск" всех инпутов и кнопки submit каждой формы
    this._findFormElemnts();
    
    // disabled кнопки submit при первом открытии попапа с пустыми полями    
    this._toggleButtonState();
    
    // обработчик события перезагрузки формы (disable кнопки submit)
    this._initResetForm();

    // на каждый инпут вешаем обработчик изменения текста инпута
    this._inputs.forEach(input => this._initCheckInput(input));
  }
}

export default FormValidator;