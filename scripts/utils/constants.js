export const initialCards = [
  {
    name: 'Архыз',
    link: './images/cards-img/arkhyz.jpg'
    // name: 'Архыз',
    // link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Село Гамсутль (республика Дагестан)',
    link: './images/cards-img/gamsutl.jpg'
    // name: 'Иваново',
    // link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Вулкан Горелый',
    link: './images/cards-img/gorely.jpg'
    // name: 'Камчатка',
    // link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//константы для валидации форм
export const validationConfig = {
  //селекторы - ключам задаются классы, по которым искать элементы в JS
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__disabled-btn',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

//константы для попапов

// Попап редактирования профиля
export const popupProfileInput = document.querySelector('.popup_type_profile-input') 
export const buttonProfileEdit = document.querySelector('.profile__edit-btn')
// данные профиля на странице
export const profileInputName = document.querySelector('.profile__name')
export const profileInputProfession = document.querySelector('.profile__profession')

// Попап добавления картинки
export const popupAddCard = document.querySelector('.popup_type_card-add')
export const buttonAddCard = document.querySelector('.profile__add-btn')

//Попап просмотра картинки
export const popupImgOpen = document.querySelector('.popup_type_open-img');
export const imgPopup = document.querySelector('.popup__img');
export const captionImgPopup = document.querySelector('.popup__img-caption');