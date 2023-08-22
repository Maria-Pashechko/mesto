class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

   //клонирование шаблона
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
    
    return cardElement;
  }
  
  //подготовка карточки к созданию
  _prepareCard() {
    this._card = this._getTemplate();

    //заполняем клон шаблона содержимым
    this._card.querySelector('.card__img').src = this._link;
    this._card.querySelector('.card__img').alt = this._name;
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

  //разметка попапа просмотра картинки
  _getPopup() {
    this._popupImgOpen = document.querySelector('.popup_type_open-img');
    this._popupImgOpen.style = 'background-color: rgba(0, 0, 0, .9)';
    this._popupImgContainer = this._popupImgOpen.querySelector ('.popup__img-container');
    this._buttonClose = this._popupImgContainer.querySelector ('.popup__close-btn');
    this._imgPopup = this._popupImgContainer.querySelector('.popup__img');
    this._captionImgPopup = this._popupImgContainer.querySelector('.popup__img-caption');
  }

  //метод открытия окна с картинкой
  _openImg() {
    this._getPopup();
    this._popupImgOpen.classList.add('popup_opened');
    this._imgPopup.src = this._link;
    this._imgPopup.alt = this._name;
    this._captionImgPopup.textContent = this._name;
  }

  //слушатели событий
  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => this._handleLikeBtn());
    this._buttonTrash.addEventListener('click', () => this._handleTrashBtn());
    this._buttonImg.addEventListener('click', () => this. _openImg());
  }

  //метод (публичный) возвращает элемент карточки
  generateCard() {
    this._prepareCard();
    this._setEventListeners();
    
    return this._card;
  }
}

export default Card;