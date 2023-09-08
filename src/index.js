import {initialCards, validationConfig,
        popupProfileInput, buttonProfileEdit,
        profileInputName, profileInputProfession, popupAddCard, buttonAddCard,
        popupImgOpen, imgPopup, captionImgPopup} from '../scripts/utils/constants.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Section from '../scripts/components/Section.js'
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';

//вызов функции валидации форм для каждой формы
document.querySelectorAll(validationConfig.formSelector).forEach(form => {
  const validator = new FormValidator(validationConfig, form);
  validator.enableValidation();
});

const userProfile = new UserInfo (profileInputName, profileInputProfession);

//попап форма данных профиля
const popupFormProfileInput = new PopupWithForm(
  popupProfileInput,
  userProfile.setUserInfo.bind(userProfile) //колбэк сабмита формы - функция SetUserInfo из UserInfo 
);
popupFormProfileInput.setEventListeners();
buttonProfileEdit.addEventListener('click', () => {
  popupFormProfileInput.openWithData(userProfile.getUserInfo());
});

//попап форма добавления новой карточки
const popupFormAddCard = new PopupWithForm(
  popupAddCard,
  (cardItem) => {
    const card = new Card(cardItem, '.card-template_type_default', popupWithImage.open.bind(popupWithImage)); //(name, link) => popupWithImage.openPopupImg(name, link));
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
);
//обработчики формы новой карточки
popupFormAddCard.setEventListeners();
buttonAddCard.addEventListener('click', () => {
    popupFormAddCard.open();
  }
);

// попап с картинкой
const popupWithImage = new PopupWithImage(popupImgOpen, imgPopup, captionImgPopup);
popupWithImage.setEventListeners();

const cardList = new Section({
  items: initialCards, // 6 карточек на первоначальной странице
  renderer: (cardItem) => {
    //инструкция по работе с Card 
    const card = new Card(cardItem, '.card-template_type_default', popupWithImage.open.bind(popupWithImage)); //(name, link) => popupWithImage.openPopupImg(name, link));
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }},
  '.cards__list'
);
cardList.renderItems();
