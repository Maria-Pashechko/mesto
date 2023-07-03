// находим кнопку редактирования профиля
const buttonProfileEdit = document.querySelector('.profile__edit-btn')
// находим попап редактиования профиля
const popupProfileInput = document.querySelector('.popup_type_profile-input')
// кнопка закрытия попапа редактора профиля
const buttonClosePopupProfile = document.querySelector('.popup_type_profile-close')
// находим форму для ввода данных попапа
const formPopup = document.querySelector('.popup__form')
// поле формы для имени попап
let nameInput = document.querySelector('.popap__name')
// поле формы для информации о себе попап
let professionInput = document.querySelector('.popap__profession')
console.log(nameInput.value)
console.log(professionInput.value)

// находим форму для данных профиля, значения содержимого текста textContent для имени и о себе
let profileInput = document.querySelector('.profile__data')
let profileInputName = profileInput.querySelector('.pofile__name')
let profileInputProfession = profileInput.querySelector('.pofile__profession')
console.log(profileInputName.textContent)
console.log(profileInputProfession.textContent)

function openPopupProfile() { //функция открытия окна редактирования(добавяем попапу класс popup_opened)
  popupProfileInput.classList.add('popup_opened');
  nameInput.value = profileInputName.textContent; // присваиваем атрибуту инпута имени value значение существующего текста из профиля
  professionInput.value = profileInputProfession.textContent; // -"- то же для инпута о себе
}

function closePopupProfile() { //функция закрытия окна редактирования
  popupProfileInput.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {  //редактирование профиля
  evt.preventDefault(); // метод отменяет стандартное событие перезагрузки страницы при отправке данных
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.
  profileInputName.textContent = nameInput.value;
  profileInputProfession.textContent = professionInput.value;
  closePopupProfile()
}

// обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formPopup.addEventListener('submit', formSubmitHandler)

//слушатель со значением клик на кнопки открытия попапа редактирования и закрытия попапа
buttonProfileEdit.addEventListener('click', openPopupProfile)
buttonClosePopupProfile.addEventListener('click', closePopupProfile)








