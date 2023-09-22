export const optionsApi = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-75',
  headers: {
    'Authorization' : '585fc629-d9ef-4fc5-bd68-deb270813f1f',
    'Content-Type': "application/json"
  }
}

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