import './index.css';
import {validationConfig, initialCards,
        popupProfileInput, buttonProfileEdit,
        profileInputName, profileInputProfession, popupAddCard, buttonAddCard,
        popupImgOpen, imgPopup, captionImgPopup, popupConfirm} from '../scripts/utils/constants.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Section from '../scripts/components/Section.js'
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupConfirm from '../scripts/components/PopupConfirm';
//import Api from '../scripts/components/Api.js'

//вызов функции валидации форм для каждой формы
document.querySelectorAll(validationConfig.formSelector).forEach(form => {
  const validator = new FormValidator(validationConfig, form);
  validator.enableValidation();
});

const userProfile = new UserInfo (profileInputName, profileInputProfession);

//попап форма данных профиля
const popupFormProfileInput = new PopupWithForm(
  popupProfileInput,
  userProfile.setUserInfo.bind(userProfile) //колбэк сабмита формы 
);
popupFormProfileInput.setEventListeners();
buttonProfileEdit.addEventListener('click', () => {
  popupFormProfileInput.openWithData(userProfile.getUserInfo());
});

//функция создания карточки
function createCard(cardItem) {
  const card = new Card(cardItem, '.card-template_type_default',
                        popupWithImage.open.bind(popupWithImage),
                        popupFormConfirm.open.bind(popupFormConfirm));
  const cardElement = card.generateCard();
  return cardElement;
}

//попап подтверждения удаления карточки
const popupFormConfirm = new PopupConfirm (popupConfirm);
popupFormConfirm.setEventListeners();

//попап форма добавления новой карточки
const popupFormAddCard = new PopupWithForm(
  popupAddCard,
  (cardElement) => {
    cardList.addItem(createCard(cardElement));
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
  renderer: (cardElement) => {
    //инструкция по работе с Card 
    cardList.addItem(createCard(cardElement));
  }},
  '.cards__list'
);
cardList.renderItems();
/*
const optionsApi = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-75',
  headers: {
    'Authorization' : '585fc629-d9ef-4fc5-bd68-deb270813f1f',
    //'ContentType': "application/json"
  }
}

const api = new Api(optionsApi);
api.getInitialCards()
.then((cards) => {
  console.log(cards);
})*/