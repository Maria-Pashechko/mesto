// константы

//все попапы
const popupOverlays = Array.from(document.querySelectorAll('.popup'));

// Попап редактирования профиля

// находим кнопку редактирования профиля, попап, кнопку закрытия попапа, форму и поля формы попапа (имя и о себе)
const buttonProfileEdit = document.querySelector('.profile__edit-btn')
const popupProfileInput = document.querySelector('.popup_type_profile-input')
const buttonClosePopupProfile = popupProfileInput.querySelector('.popup__close-btn')
const formPopupProfile = popupProfileInput.querySelector('.popup__form')
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
const buttonClosePopupAddCard = popupAddCard.querySelector('.popup__close-btn')
const formPopupAddCard = popupAddCard.querySelector('.popup__form');
const nameCard = formPopupAddCard.querySelector('.popup__input_card_name');
const linkCard = formPopupAddCard.querySelector('.popup__input_card_link');

//Попап просмотра картинки

// находим кнопку-картинку, попап просмотра картинки, контейнер с содержимым попапа, кнопку закрытия попапа картинки, картинку, подпись к картинке
const popupImgOpen = document.querySelector('.popup_type_open-img')
popupImgOpen.style = 'background-color: rgba(0, 0, 0, .9)'
const popupImgContainer = popupImgOpen.querySelector ('.popup__img-container')
const buttonClosePopupImgOpen = popupImgContainer.querySelector('.popup__close-btn')
const imgPopup = popupImgContainer.querySelector('.popup__img')
const captionImgPopup = popupImgContainer.querySelector('.popup__img-caption')

// все кнопки-крестики (Х) с универсальным селектором popup__close
const closeButtons = document.querySelectorAll('.popup__close-btn'); //`s` нужно обязательно, так как много кнопок

//константы для создания новой карточки

// место в разметке, куда будут добавляться карточки и шаблон новой карточки с содержимым
const listCards = document.querySelector('.cards__list');
const cardTemplate = document.querySelector ('#card-template').content

//константы для валидации форм
const validationConfig = {
  //селекторы - ключам задаются классы, по которым искать элементы в JS
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__disabled-btn',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

//функции и обработчики

//универсальная функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  //закрытие попап по клику на клавишу Esc
  window.addEventListener('keydown', (evt) => {
    if(evt.key === 'Escape') {
      closePopup(popup);
    }
  })
}

//универсальная функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//универсальный обработчик кнопок закрытия попапов (Х)
closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап 
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});

//закрытие попапов по клику на overlay
popupOverlays.forEach(popupOverlay => {
  popupOverlay.addEventListener('click', (evt) => {
    if(evt.target === popupOverlay) {
      closePopup(popupOverlay);
    }
  })
})

/*функция присваивания значений "имени" и "о себе" из текущего профиля в 
полях открывающегося окна редактирования*/
function assignValueProfile() {
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
buttonProfileEdit.addEventListener('click', () => openPopup(popupProfileInput), assignValueProfile())

//слушатель клика на кнопку (+) открытия попапа для добавления данных новых карточек
buttonAddCard.addEventListener('click', () => openPopup(popupAddCard))

// функция открытия попапа просмотра картинки 
function openImg(name, link) {
  openPopup(popupImgOpen);
  imgPopup.src = link;
  imgPopup.alt = name;
  captionImgPopup.textContent = name;
}

/* обработчик по клику на картинку - в теле функции создания новой карточки 
(нет карточки - нет попапа)*/

// функция создания новой карточки
function createCard(name, link) {  
  // Чтобы создать новую карточку, нужно клонировать шаблон
  const card = cardTemplate.querySelector('.card').cloneNode(true)
  //переменные кнопок
  const buttonLike = card.querySelector('.card__caption').querySelector('.card__like-btn')
  const buttonTrash = card.querySelector('.card__trash-btn')
  const buttonImg = card.querySelector('.card__img-btn')
  
  //заполняем клон шаблона содержимым
  card.querySelector('.card__img').src = link;
  card.querySelector('.card__img').alt = name;
  card.querySelector('.card__caption').querySelector('.card__text').textContent = name;
  
  // переключениe лайка в активное и неактивное состояние по клику на сердечко
  buttonLike.addEventListener('click', (evt) => evt.target.classList.toggle('card__like-btn_active'));

  // удаление карточки по клику на корзину  
  buttonTrash.addEventListener('click', () => card.remove());

  // просмотр картинки
  buttonImg.addEventListener('click', () => openImg(name, link));

  return card;
}

//функция добавления карточки в начало списка на странице
function addNewCard(name, link) {
  const newCard = createCard(name, link);
  listCards.prepend(newCard);
}

//функция "отправки"/присвоения данных карточки
function submitFormCard(evt) {
  // отмена стандартной перезагрузки
  evt.preventDefault();
  
  if (nameCard.value === '' || linkCard.value === '')
    return  // выход из функции, если поля пустые

  //вызов функции добавления новой карточки в начало списка на страице
  addNewCard(nameCard.value, linkCard.value);

  evt.target.reset(); //очистка полей
  closePopup(popupAddCard); // закрытие попапа
}

// обработчик к форме - будет следить за событием “submit” - «отправка»
formPopupAddCard.addEventListener('submit', submitFormCard)

// 6 карточек на первоначальной странице
for (let i = initialCards.length - 1; i >= 0; i--) {
  addNewCard(initialCards[i].name, initialCards[i].link);
}
/* другой способ 
initialCards.slice().reverse().forEach((element) => {
  addNewCard(element.name, element.link);
})*/

//вызов функции валидации форм
enableValidation(validationConfig);