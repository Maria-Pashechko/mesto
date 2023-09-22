import Popup from "./Popup.js";
import {validationConfig} from '../utils/constants.js';

export default class PopupConfirm extends Popup {
  constructor(selector, callbackApiDeleteCard) {
    super(selector);
    this._callbackApiDeleteCard = callbackApiDeleteCard;
    this._formElement = this._popupSelector.querySelector(validationConfig.formSelector);
  }

  open(cardElement) { //передаем при открытии попапа подтверждения объект (текущая карточка)
    this._currentCard = cardElement;

    super.open();
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callbackApiDeleteCard(this._currentCard._data._id);
      this._currentCard.handleTrashBtn(); //удаление текущей карточки со страницы (метод Card)
      this.close();
    });
  }  
}