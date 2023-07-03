// находим кнопку редактирования профиля
const buttonProfileEdit = document.querySelector('.profile__edit-btn')
// находим попап редактиования профиля
const popupProfileInput = document.querySelector('.popup')
// кнопка закрытия попапа редактора профиля
const buttonClosePopupProfile = document.querySelector('.popup__close-btn')
// находим форму для ввода данных попапа
const formPopup = document.querySelector('.popup__form')
// поле формы для имени попап
let nameInput = document.querySelector('.popup__field-name')
// поле формы для информации о себе попап
let professionInput = document.querySelector('.popup__field-profession')

// находим форму для данных профиля, значения содержимого текста textContent для имени и о себе
let profileInput = document.querySelector('.profile__data')
let profileInputName = profileInput.querySelector('.profile__name')
let profileInputProfession = profileInput.querySelector('.profile__profession')

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

// обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formPopup.addEventListener('submit', formSubmitHandler)

//слушатель со значением клик на кнопки открытия попапа редактирования и закрытия попапа
buttonProfileEdit.addEventListener('click', openPopupProfile)
buttonClosePopupProfile.addEventListener('click', closePopupProfile)








