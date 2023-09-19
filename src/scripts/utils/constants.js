import arkhyzImage from '../../images/cards-img/arkhyz.jpg';
import lenoblImage from '../../images/cards-img/lenobl.jpg';
import gamsutlImage from '../../images/cards-img/gamsutl.jpg';
import gorelyImage from '../../images/cards-img/gorely.jpg';

export const initialCards = [
  {
    name: 'Архыз',
    link: arkhyzImage
  },
  {
    name: 'Ленинградская область',
    link: lenoblImage
  },
  {
    name: 'Село Гамсутль (республика Дагестан)',
    link: gamsutlImage
  },
  {
    name: 'Вулкан Горелый',
    link: gorelyImage
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

//Попап подтверждения действия
export const popupConfirm = document.querySelector('.popup_type_confirm');

// попап редактирования аватара
export const popupUpdateAvatar = document.querySelector('.popup_type_avatar-update');
export const avatarBtn = document.querySelector('.profile__avatar-btn');