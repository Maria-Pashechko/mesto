export default class Popup {
    constructor(selector) {
      this._popupSelector = selector;
      this._closeWithEsc = this._handleEscClose.bind(this);
    }

    open() {
      this._popupSelector.classList.add('popup_opened');
      //обработчик закрытия попапа по клику на клавишу Esc
      window.addEventListener('keydown', this._closeWithEsc);
    }

    close() {
      this._popupSelector.classList.remove('popup_opened');
      //удалили обработчик
      window.removeEventListener('keydown', this._closeWithEsc);
    }

    // закрытие попапа клавишей Esc 
    _handleEscClose = (evt) => {
      if (evt.key === 'Escape') {
        this.close();
      }
    }

    //слушатель клика Х и оверлэй
    setEventListeners() {
      this._popupSelector.addEventListener('mousedown', (evt) => {
        if ( evt.target.classList.contains('popup_opened') ||
            evt.target.classList.contains('popup__close-btn')) {          
          this.close();
        }
      });
    }
}