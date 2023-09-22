export default class Card {
  constructor(data, templateSelector, handleCardClick, callbackPopupConfirm, callbackLike, callbackDisLike) { //popupCallback
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._callbackLike = callbackLike;
    this._callbackDisLike = callbackDisLike;
    
    this._callbackPopupConfirm = callbackPopupConfirm;
  }

   //клонирование шаблона
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
    
    return cardElement;
  }
  
  //подготовка карточки к созданию
  _prepareCard(my_id) {
    this._card = this._getTemplate();
    const cardImg = this._card.querySelector('.card__img');

    //заполняем клон шаблона содержимым
    cardImg.src = this._data.link;
    cardImg.alt = this._data.name;
    this._card.querySelector('.card__text').textContent = this._data.name;

    //разметка кнопок и счётчика
    this._buttonLike = this._card.querySelector('.card__like-btn');
    this._counter = this._card.querySelector('.card__like-counter');
    this._counter.textContent = this._data.likes.length;
    //проверка что я уже ставила лайк этой карточке ранее:
    //среди лайков карточки ищу лайк с моим _id
    const findMyId = this._data.likes.find((element) => element._id === my_id); //находит объект с моим id {..,_id,..} или возвращает undefined
    if (findMyId != undefined) { // если есть лайк
      this._buttonLike.classList.add('card__like-btn_active'); //сердечко закрасим
    }

    //Если карточка не моя - прячем корзину
    this._buttonTrash = this._card.querySelector('.card__trash-btn');
    if (this._data.owner._id != my_id) {
      this._buttonTrash.style.display = 'none';
    }

    this._buttonImg = this._card.querySelector('.card__img-btn');
  }

  // метод переключения лайка в активное и неактивное состояние
  _toggleLikeBtn() {
    this._buttonLike.classList.toggle('card__like-btn_active');
  }

  //клик по лайку
  _clickLike() {
    if (this._buttonLike.classList.contains('card__like-btn_active')) { //если лайкнут
      //колбэк апи дизлайк
      this._callbackDisLike(this._data._id)
        .then((response) => {
          this._toggleLikeBtn();
          this._data = response;
          this._counter.textContent = this._data.likes.length;
        })
    } else {
      //колбэк апи лайк
      this._callbackLike(this._data._id)
        .then((response) => {
          this._toggleLikeBtn();
          this._data = response;
          this._counter.textContent = this._data.likes.length;
        })
    }
  }

   //метод удаления карточки со страницы
   handleTrashBtn() {
    this._card.remove();
  }

  //слушатели событий
  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => this._clickLike());
    this._buttonTrash.addEventListener('click', () => this._callbackPopupConfirm(this)); //open popup confirm for THIS card
    this._buttonImg.addEventListener('click', () => this._handleCardClick(this._data.name, this._data.link));
  }

  //метод (публичный) возвращает элемент карточки
  generateCard(my_id) {
    this._prepareCard(my_id);
    this._setEventListeners();
    
    return this._card;
  }
}