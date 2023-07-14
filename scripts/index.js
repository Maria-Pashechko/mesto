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

function openPopupProfile() { //функция открытия окна редактирования(добавяем попапу класс popup_opened)
  popupProfileInput.classList.add('popup_opened');
  nameInput.value = profileInputName.textContent; // в поле для имени присваиваем атрибуту value значение существующего текста из профиля
  professionInput.value = profileInputProfession.textContent; // -"- то же для инпута о себе
}

function closePopupProfile() { //функция закрытия окна редактирования (крестик)
  popupProfileInput.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {  //редактирование профиля
  evt.preventDefault(); // метод отменяет стандартное событие перезагрузки страницы при отправке данных
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.
  profileInputName.textContent = nameInput.value; // в заголовке для имени профиля присваиваем значение вновь введенного текста из попапа
  profileInputProfession.textContent = professionInput.value; //то же для текста о себе
  closePopupProfile() //закрытие попапа по окончанию функции
}

// обработчик к форме: он будет следить за событием “submit” - «отправка» и запускать функцию редактиования профиля
formPopup.addEventListener('submit', formSubmitHandler)

//слушатель со значением клик на кнопки открытия и закрытия попапа редактирования
buttonProfileEdit.addEventListener('click', openPopupProfile)
buttonClosePopupProfile.addEventListener('click', closePopupProfile)


//Открытие и закрытие попапа добавления картинки
// находим кнопку + , попап +, кнопку закрытия попапа +, форму попапа
const buttonAddCard = document.querySelector('.profile__add-btn')
const popupAddCard = document.querySelector('.popup_type_card-add')
const buttonClosePopupAddCard = popupAddCard.querySelector('.popup__close-btn')
const formPopupAddCard = popupAddCard.querySelector('.popup__form');

const openPopupAddCard = () => { //функция открытия окна добавления картинки (добавяем попапу класс popup_opened)
  popupAddCard.classList.add('popup_opened');
}

const closePopupAddCard = () => { //функция закрытия окна добавления картинки (крестик)
  popupAddCard.classList.remove('popup_opened');
}

// функция создания шаблона новой карточки
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
    buttonTrashCard.closest('.card').remove(); //closest - "ближайший" элемент (родитель или сосед)
  });

  listCards.prepend(card); //добавление карточки в начало списка на странице
}

//функция добавления данных картинки
function formSubmitCard(evt) {
  evt.preventDefault(); // отмена стндартной перезагрузки
 
  // поля формы для названия картинки и ссылки на картинку
  const nameCard = formPopupAddCard.querySelector('.popup__input_card_name');
  const linkCard = formPopupAddCard.querySelector('.popup__input_card_link');
  if (nameCard.value === '' || linkCard.value === '')
    return  // выход из функции, если поля пустые (когда-нибудь я научусь "посвечивать" поля обязательные к заполнению :)

  //вызов функции создания шаблона
  createCard(nameCard.value, linkCard.value);

  nameCard.value = ''; //очистка полей
  linkCard.value = '';
  closePopupAddCard(); // закрытие попапа
}

// обработчик к форме - будет следить за событием “submit” - «отправка»
formPopupAddCard.addEventListener('submit', formSubmitCard)

//слушатель со значением клик на кнопки открытия и закрытия попапа +
buttonAddCard.addEventListener('click', openPopupAddCard)
buttonClosePopupAddCard.addEventListener('click', closePopupAddCard)











