import Popup from "./Popup.js";
import {validationConfig} from '../utils/constants.js';

export default class PopupWithForm extends Popup {
  constructor(selector, callbackSubmitForm, callbackDOM) {
    super(selector);
    
    this._submitForm = callbackSubmitForm;
    this._formElement = this._popupSelector.querySelector(validationConfig.formSelector);
    this._inputs = Array.from(this._formElement.querySelectorAll(validationConfig.inputSelector));
    this._submitBtn = this._popupSelector.querySelector(validationConfig.submitButtonSelector);
   
    this._callbackDOM = callbackDOM;

    this._btnOriginContent = this._submitBtn.textContent;
  }

  //собирает данные всех полей формы
  _getInputValues() {
    const inputValues = {}; //объект, который соберет данные полей

    //перебираем каждый из инпутов в форме и передаём его содержимое объекту
    this._inputs.forEach(input => {
      inputValues[input.name] = input.value;
    });
    //возвращаем объект с полученными данными
    return inputValues;
  }

  //метод добавления данных со страницы в поля попапа при открытии
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

  // устанавливает текст (входной параметр) кнопки, сбрасывает до исходного, если текст не задан
  _setButtonText(text) {
    if(text == undefined) {
      text = this._btnOriginContent;
    }

    this._submitBtn.textContent = text;
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();

      //вкл UX отображения процесса обмена данными с сервером (loading)
      this._setButtonText("Сохранение...");

      this._submitForm(this._getInputValues())
      .then((response) => {

        this._callbackDOM(response);
        //откл loading
        this._setButtonText();
        this.close();
      })
      .catch((error) => {
        console.log(error)
        //откл loading
        this._setButtonText();
      }) 
    });
  }
}