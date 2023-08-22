class Card {
  constructor(data, templateSelector, popupCallback) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._popupCallback = popupCallback;
  }

   //клонирование шаблона
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
    
    return cardElement;
  }
  
  //подготовка карточки к созданию
  _prepareCard() {
    this._card = this._getTemplate();
    this._cardImg = this._card.querySelector('.card__img');

    //заполняем клон шаблона содержимым
    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;
    this._card.querySelector('.card__text').textContent = this._name;

    //разметка кнопок
    this._buttonLike = this._card.querySelector('.card__like-btn');
    this._buttonTrash = this._card.querySelector('.card__trash-btn');
    this._buttonImg = this._card.querySelector('.card__img-btn');
  }

  // метод переключения лайка в активное и неактивное состояние
  _handleLikeBtn() {
    this._buttonLike.classList.toggle('card__like-btn_active');
  }

  //метод удаления карточки
  _handleTrashBtn() {
    this._card.remove();
  }

  //слушатели событий
  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => this._handleLikeBtn());
    this._buttonTrash.addEventListener('click', () => this._handleTrashBtn());
    this._buttonImg.addEventListener('click', () => this._popupCallback(this._name, this._link));
  }

  //метод (публичный) возвращает элемент карточки
  generateCard() {
    this._prepareCard();
    this._setEventListeners();
    
    return this._card;
  }
}

export default Card;