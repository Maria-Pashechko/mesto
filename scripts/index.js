import {initialCards, validationConfig, 
        popupProfileInput, formPopupProfile, buttonProfileEdit, nameInput, professionInput,
        profileInputName, profileInputProfession } from './constants.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js'
import Popup from './Popup.js'
import PopupWithImage from './PopupWithImage.js';


//все попапы
const popups = document.querySelectorAll('.popup')

// Попап добавления картинки

// находим кнопку + , попап +, кнопку закрытия попапа +, форму попапа, поля формы для названия картинки и ссылки
const buttonAddCard = document.querySelector('.profile__add-btn')
const popupAddCard = document.querySelector('.popup_type_card-add')
const formPopupAddCard = document.forms['card-form']; //по атрибуту name или .querySelector('.popup__form');
const nameCard = formPopupAddCard.querySelector('.popup__input_card_name')
const linkCard = formPopupAddCard.querySelector('.popup__input_card_link')

//Попап просмотра картинки

//разметка попапа просмотра картинки
const popupImgOpen = document.querySelector('.popup_type_open-img');    
const popupImgContainer = popupImgOpen.querySelector ('.popup__img-container');
const imgPopup = popupImgContainer.querySelector('.popup__img');
const captionImgPopup = popupImgContainer.querySelector('.popup__img-caption');

//константы для создания новой карточки

//функции и обработчики

/*функция присваивания значений "имени" и "о себе" из текущего профиля в 
полях открывающегося окна редактирования*/
function setPopupValuesFromProfile() {
  nameInput.value = profileInputName.textContent; // в поле для имени присваиваем атрибуту value значение существующего текста из профиля
  professionInput.value = profileInputProfession.textContent; // -"- то же для инпута о себе
}

// функция присвоения новых введённых данных профиля странице
function submitFormProfile(evt) {
  // метод evt.preventDefault() отменяет стандартное событие перезагрузки страницы при отправке данных
  evt.preventDefault();
  profileInputName.textContent = nameInput.value; // в заголовке имени профиля присваиваем значение вновь введенного текста из попапа
  profileInputProfession.textContent = professionInput.value; //то же для текста о себе
  closePopup(popupProfileInput) //закрытие попапа по окончанию функции
}

// обработчик "отправки" новых введённых данных профиля
formPopupProfile.addEventListener('submit', submitFormProfile)

//слушатель клика на кнопку открытия попапа редактирования
//buttonProfileEdit.addEventListener('click', () => openPopup(popupProfileInput), setPopupValuesFromProfile())

//слушатель клика на кнопку (+) открытия попапа для добавления данных новых карточек
//buttonAddCard.addEventListener('click', () => openPopup(popupAddCard))

// функция открытия окна с картинкой
/*const openPopupImg = (name, link) => { 
  imgPopup.src = link;
  imgPopup.alt = name;
  captionImgPopup.textContent = name; 
  openPopup(popupImgOpen);  
}*/

//функция добавления карточки в начало списка на странице
/*function addNewCard(item) {
  const card = new Card(item, '.card-template_type_default', popupWithImage.open.bind(popupWithImage));
  const cardElement = card.generateCard();
  cardsListSelector.prepend(cardElement);
}*/



/*событие отправки формы addEventListener('submit', () => {
  cardList.renderItems();
});*/


//функция "отправки"/присвоения данных карточки
function submitFormCard(evt) {
  // отмена стандартной перезагрузки
  evt.preventDefault();

  //вызов функции добавления новой карточки в начало списка на странице
  addNewCard(
    {
      name: nameCard.value,
      link: linkCard.value
    }
  ); 
 
  evt.target.reset(); //очистка полей
  closePopup(popupAddCard); // закрытие попапа
}

// обработчик к форме - будет следить за событием “submit” - «отправка»
formPopupAddCard.addEventListener('submit', submitFormCard)

// 6 карточек на первоначальной странице
//initialCards.forEach((item) => addNewCard(item));

//вызов функции валидации форм

//массив всех форм
document.querySelectorAll(validationConfig.formSelector).forEach(form => {
  const validator = new FormValidator(validationConfig, form);
  validator.enableValidation();
});


const popupProfile = new Popup(popupProfileInput);
popupProfile.setEventListeners();
buttonProfileEdit.addEventListener('click', () => {
  popupProfile.open();
});

const popupCard = new Popup(popupAddCard);
popupCard.setEventListeners();
buttonAddCard.addEventListener('click', () => {
  popupCard.open();
});

// попап с картинкой
const popupWithImage = new PopupWithImage(popupImgOpen, imgPopup, captionImgPopup);
popupWithImage.setEventListeners();

//
const cardList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    //инструкция по работе с Card (или другая инструкция для другого массива)
    const card = new Card(cardItem, '.card-template_type_default', popupWithImage.open.bind(popupWithImage)); //(name, link) => popupWithImage.openPopupImg(name, link));
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }},
  '.cards__list'
);
cardList.renderItems();
