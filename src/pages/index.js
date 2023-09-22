import './index.css';
import {validationConfig,
        popupProfileInput, buttonProfileEdit,
        profileInputName, profileInputProfession, popupAddCard, buttonAddCard,
        popupImgOpen, imgPopup, captionImgPopup, popupConfirm,
        popupUpdateAvatar, avatarBtn,
        optionsApi} from '../scripts/utils/constants.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Section from '../scripts/components/Section.js'
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupConfirm from '../scripts/components/PopupConfirm';
import Api from '../scripts/components/Api.js'


// API
const api = new Api(optionsApi);

//получение объекта с данными
const userProfile = new UserInfo (profileInputName, profileInputProfession, avatarBtn);
await api.getUserInformation() //await заставит интерпретатор дождаться выполнения promise
  .then((userInfo) => {
    userProfile.setUserInfo(userInfo);
    console.log(userInfo);
  })

//функция создания карточки
function createCard(cardItem) {
  const card = new Card(cardItem, '.card-template_type_default',
                        popupWithImage.open.bind(popupWithImage),
                        popupConfirmDeleteCard.open.bind(popupConfirmDeleteCard),
                        api.addLike.bind(api),
                        api.disLike.bind(api));
  const cardElement = card.generateCard(userProfile.getId());
  return cardElement;
}

//добавление карточек с сервера на страницу
const cardList = new Section(
  (item) => {
    //инструкция по работе с Card 
    cardList.addItem(createCard(item));
  },
  '.cards__list'
);
api.getInitialCards()
  .then((arrayItems) => {
    cardList.renderItems(arrayItems)
  });

//попап форма добавления нового аватара
const popupFormUpdateAvatar = new PopupWithForm(
  popupUpdateAvatar,
  api.updateUserAvatar.bind(api), //колбэк сабмита формы - обновляет данные аватара на сервере
  userProfile.setUserInfo.bind(userProfile) //колбэк сабмита формы- передает данные из попапа на страницу
);
//обработчики формы новой карточки
popupFormUpdateAvatar.setEventListeners();
avatarBtn.addEventListener('click', () => {
    popupFormUpdateAvatar.open();
  }
);

//попап форма данных профиля
const popupFormUpdateProfile = new PopupWithForm(
  popupProfileInput,
  api.updateUserInformation.bind(api), //колбэк сабмита формы - обновляет данные пользователя на сервере
  userProfile.setUserInfo.bind(userProfile) //колбэк сабмита формы- передает данные из попапа на страницу
);
popupFormUpdateProfile.setEventListeners();
buttonProfileEdit.addEventListener('click', () => {
  popupFormUpdateProfile.openWithData(userProfile.getUserInfo());
});

// попап добавления новой карточки
const popupFormAddCard = new PopupWithForm(
  popupAddCard,
  api.addCard.bind(api), //колбэк сабмита формы - добавляет данные нов карточки на сервер
  (item) => { 
    cardList.addItem(createCard(item));
  }
);
popupFormAddCard.setEventListeners();
buttonAddCard.addEventListener('click', () => {
    popupFormAddCard.open();
  }
);

// попап с картинкой
const popupWithImage = new PopupWithImage(popupImgOpen, imgPopup, captionImgPopup);
popupWithImage.setEventListeners();

//попап подтверждения удаления карточки
const popupConfirmDeleteCard = new PopupConfirm (
  popupConfirm,
  api.deleteCard.bind(api)
);
popupConfirmDeleteCard.setEventListeners();

//вызов функции валидации форм для каждой формы
document.querySelectorAll(validationConfig.formSelector).forEach(form => {
  const validator = new FormValidator(validationConfig, form);
  validator.enableValidation();
});
