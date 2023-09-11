import Popup from "./Popup.js";
import {validationConfig} from '../utils/constants.js';

export default class PopupWithForm extends Popup {
  constructor(selector, callbackSubmitForm) {
    super(selector);
    
    this._submitForm = callbackSubmitForm;
    this._formElement = this._popupSelector.querySelector(validationConfig.formSelector);
    this._inputs = Array.from(this._formElement.querySelectorAll(validationConfig.inputSelector));
  }

  _getInputValues() { //собирает данные всех полей формы.
    //создаём объект, который соберет данные полей
    const inputValues = {};
    //идём по массиву инпутов в форме и передаём их содержимое объекту
    this._inputs.forEach(input => {
      inputValues[input.name] = input.value;
    });
    //возвращаем объект с полученными данными
    return inputValues;
  }

  openWithData(obj){
    
    this._inputs.forEach(input => {

      const objValue = obj[input.name];
      if (objValue != null){
        input.value = objValue;
      }
    });

    super.open()
  }

  close() {
    super.close();

    this._formElement.reset();
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
      this.close();
    });
  }
}