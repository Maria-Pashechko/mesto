// 6 карточек на первоначальной странице

for (let i = initialCards.length - 1; i >= 0; i--){
  createCard(initialCards[i].name, initialCards[i].link);
  console.log(createCard);
}
/* другой способ 
initialCards.slice().reverse().forEach((element) => {
  createCard(element.name, element.link);
})*/


//Редактирование профиля

// находим кнопку редактирования профиля, попап, кнопку закрытия попапа, форму и поля формы попапа (имя и о себе)
const buttonProfileEdit = document.querySelector('.profile__edit-btn')
const popupProfileInput = document.querySelector('.popup_type_profile-input')
const buttonClosePopupProfile = popupProfileInput.querySelector('.popup__close-btn')
const formPopup = popupProfileInput.querySelector('.popup__form')
const nameInput = popupProfileInput.querySelector('.popup__input_field_name')
const professionInput = popupProfileInput.querySelector('.popup__input_field_profession')

// находим форму для данных профиля, значения содержимого текста textContent для имени и о себе
const profileInput = document.querySelector('.profile__data')
const profileInputName = profileInput.querySelector('.profile__name')
const profileInputProfession = profileInput.querySelector('.profile__profession')

//функция открытия окна редактирования(добавяем попапу класс popup_opened)
function openPopupProfile() {
  popupProfileInput.classList.add('popup_opened');
  nameInput.value = profileInputName.textContent; // в поле для имени присваиваем атрибуту value значение существующего текста из профиля
  professionInput.value = profileInputProfession.textContent; // -"- то же для инпута о себе
}

//функция закрытия окна редактирования (крестик)
function closePopupProfile() {
  popupProfileInput.classList.remove('popup_opened');
}

//присваивание новых данных профиля
function formSubmitHandler(evt) {
  // метод evt.preventDefault() отменяет стандартное событие перезагрузки страницы при отправке данных
  evt.preventDefault();
  profileInputName.textContent = nameInput.value; // в заголовке имени профиля присваиваем значение вновь введенного текста из попапа
  profileInputProfession.textContent = professionInput.value; //то же для текста о себе
  closePopupProfile() //закрытие попапа по окончанию функции
}

// обработчик к форме: он будет следить за событием “submit” - «отправка» и запускать функцию редактиования профиля
formPopup.addEventListener('submit', formSubmitHandler)

//слушатель со значением клик на кнопки открытия и закрытия попапа редактирования
buttonProfileEdit.addEventListener('click', openPopupProfile)
buttonClosePopupProfile.addEventListener('click', closePopupProfile)


// Попап добавления картинки

// находим кнопку + , попап +, кнопку закрытия попапа +, форму попапа
const buttonAddCard = document.querySelector('.profile__add-btn')
const popupAddCard = document.querySelector('.popup_type_card-add')
const buttonClosePopupAddCard = popupAddCard.querySelector('.popup__close-btn')
const formPopupAddCard = popupAddCard.querySelector('.popup__form');

//функция открытия и закрытия окна (добавяем и удаляем попапу класс popup_opened)
const openPopupAddCard = () => {
  popupAddCard.classList.add('popup_opened');
}
const closePopupAddCard = () => {
  popupAddCard.classList.remove('popup_opened');
}

//слушатель со значением клик на кнопки (+) открытия и (Х) закрытия попапа
buttonAddCard.addEventListener('click', openPopupAddCard)
buttonClosePopupAddCard.addEventListener('click', closePopupAddCard)


//Попап просмотра картинки

// находим кнопку-картинку, попап просмотра картинки, контейнер с содержимым попапа, кнопку закрытия попапа картинки, картинку, подпись к картинке
const popupImgOpen = document.querySelector('.popup_type_open-img')
popupImgOpen.style = 'background-color: rgba(0, 0, 0, .9)'
const popupImgContainer = popupImgOpen.querySelector ('.popup__img-container')
const buttonClosePopupImgOpen = popupImgContainer.querySelector('.popup__close-btn')
const imgPopup = popupImgContainer.querySelector('.popup__img')
const captionImgPopup = popupImgContainer.querySelector('.popup__img-caption')

/* функция открытия окна и слушатель - в теле функции создания новой карточки
(нет карточки - нет попапа)*/

//функция закрытия окна просмотра картинки
const closePopupImgOpen = () => {
  popupImgOpen.classList.remove('popup_opened');
}
//слушатель - клик на кнопку (Х) попапа просмотра картинки
buttonClosePopupImgOpen.addEventListener('click', closePopupImgOpen)


// функция создания новой карточки

function createCard(name, link) {
  //находим место в разметке, куда будут добавляться карточки
  const listCards = document.querySelector('.cards__list');
  // выбрали шаблон карточки и его содержимое content
  const cardTemplate = document.querySelector ('#card-template').content
  // Чтобы создать новую карточку, содержимое шаблона нужно клонировать
  const card = cardTemplate.querySelector('.card').cloneNode(true)
  //заполнить содержимым
  card.querySelector('.card__img').src = link;
  card.querySelector('.card__img').alt = name;
  card.querySelector('.card__caption').querySelector('.card__text').textContent = name;

  // функция переключения кнопки лайка в активное и неактивное состояние
  card.querySelector('.card__caption').querySelector('.card__like-btn').addEventListener('click', function(evt) {
    evt.target.classList.toggle('card__like-btn_active');
  });

  // функция удаления карточки
  const buttonTrashCard = card.querySelector('.card__trash-btn');
  buttonTrashCard.addEventListener('click', function() {
    card.remove();
  });

  //функция открытия просмотра картинки
  const buttonImg = card.querySelector('.card__img-btn');
  buttonImg.addEventListener('click', function() {
    popupImgOpen.classList.add('popup_opened');
    imgPopup.src = link;
    imgPopup.alt = name;
    captionImgPopup.textContent = name;
  });

  listCards.prepend(card); //добавление карточки в начало списка на странице
}

//функция добавления данных картинки

function formSubmitCard(evt) {
  // отмена стндартной перезагрузки
  evt.preventDefault();
  // поля формы для названия картинки и ссылки на картинку
  const nameCard = formPopupAddCard.querySelector('.popup__input_card_name');
  const linkCard = formPopupAddCard.querySelector('.popup__input_card_link');
  if (nameCard.value === '' || linkCard.value === '')
    return  // выход из функции, если поля пустые (когда-нибудь я научусь "подсвечивать" поля обязательные к заполнению :)

  //вызов функции создания новой карточки
  createCard(nameCard.value, linkCard.value);

  nameCard.value = ''; //очистка полей
  linkCard.value = '';
  closePopupAddCard(); // закрытие попапа
}

// обработчик к форме - будет следить за событием “submit” - «отправка»
formPopupAddCard.addEventListener('submit', formSubmitCard)