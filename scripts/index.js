import {initialCards, validationConfig} from './constants.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

// константы

//все попапы
const popups = document.querySelectorAll('.popup')

// Попап редактирования профиля

// находим кнопку редактирования профиля, попап, кнопку закрытия попапа, форму и поля формы попапа (имя и о себе)
const buttonProfileEdit = document.querySelector('.profile__edit-btn')
const popupProfileInput = document.querySelector('.popup_type_profile-input')
const formPopupProfile = document.forms['profile-form']; //по атрибуту name или .querySelector('.popup__form')
const nameInput = popupProfileInput.querySelector('.popup__input_field_name')
const professionInput = popupProfileInput.querySelector('.popup__input_field_profession')

// находим форму для данных профиля, значения содержимого текста textContent для имени и о себе
const profileInput = document.querySelector('.profile__data')
const profileInputName = profileInput.querySelector('.profile__name')
const profileInputProfession = profileInput.querySelector('.profile__profession')

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

// место в разметке, куда будут добавляться карточки
const listCards = document.querySelector('.cards__list')

//функции и обработчики

//универсальная функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  //добавили обработчик закрытия попапа по клику на клавишу Esc
  window.addEventListener('keydown', closeByEscape);
}

//универсальная функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  //удалили обработчик закрытия попапа по клику на клавишу Esc
  window.removeEventListener('keydown', closeByEscape);
}

//функция закрытия попапа по клику на Esc
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened'); //нашли открытый попап
    closePopup(openedPopup); //закрыли открытый попап
  }
}

//универсальный обработчик закрытия попапов на кнопки X и overlay
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened') || 
        evt.target.classList.contains('popup__close-btn')) {
      closePopup(popup);
    }
  })
})

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
buttonProfileEdit.addEventListener('click', () => openPopup(popupProfileInput), setPopupValuesFromProfile())

//слушатель клика на кнопку (+) открытия попапа для добавления данных новых карточек
buttonAddCard.addEventListener('click', () => openPopup(popupAddCard))

// функция открытия окна с картинкой
const openPopupImg = (name, link) => { 
  imgPopup.src = link;
  imgPopup.alt = name;
  captionImgPopup.textContent = name; 
  openPopup(popupImgOpen);  
}

//функция добавления карточки в начало списка на странице
function addNewCard(item) {
  const newCard = new Card(item, '.card-template_type_default', openPopupImg);
  const card = newCard.generateCard();
  listCards.prepend(card);
}

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
initialCards.reverse().forEach((item) => addNewCard(item));

//вызов функции валидации форм

//массив всех форм
document.querySelectorAll(validationConfig.formSelector).forEach(form => {
  const validator = new FormValidator(validationConfig, form);
  validator.enableValidation();
});
