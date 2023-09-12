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
    const inputValues = {}; //объект, который соберет данные полей

    //перебираем каждый из инпутов в форме и передаём его содержимое объекту
    this._inputs.forEach(input => {
      inputValues[input.name] = input.value;
    });
    //возвращаем объект с полученными данными
    return inputValues;
  }

  openWithData(obj){ // принимает на вход объект с данными со страницы при открытии формы
    
    this._inputs.forEach(input => { //проверяем каждый инпут
      const objValue = obj[input.name]; // определяем совпадающие значения атрибутов name инпута и объекта
      if (objValue != null){ // при условии, что такие данные имеются,        
        input.value = objValue; //передаёт их в поля формы
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