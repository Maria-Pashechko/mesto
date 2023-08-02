//Валидация форм

function enableValidation(config) {

  const showInputError = (form, input) => {
    input.classList.add(config.inputErrorClass);
    const spanError = form.querySelector(`.${input.id}-error`);
    spanError.textContent = input.validationMessage;
    spanError.classList.add(config.errorClass);
  }
  
  const hideInputError = (form, input) => {
    input.classList.remove(config.inputErrorClass);
    const spanError = form.querySelector(`.${input.id}-error`);
    spanError.textContent = '';
    spanError.classList.remove(config.errorClass);
  }
  
  const isValid = (form, input) => {
    if(!input.validity.valid) {
      showInputError(form, input);
    } else {
      hideInputError(form, input);
    }
  }

  //проверка на валидность всех инпутов в форме одномоментно
  const hasInvalidInput = (inputs) => {
    return inputs.some(input => !input.validity.valid);
  }

  //состояние disable кнопки submit
  const disableButton = (btnSubmit) => {
    btnSubmit.classList.add(config.inactiveButtonClass);
      btnSubmit.disabled = true;
  }

  //переключатель стилей активной и неактивной кнопки submit
  const toggleButtonState = (inputs, btnSubmit) => {
    if (hasInvalidInput(inputs)) {
      disableButton(btnSubmit);
    } else {
      btnSubmit.classList.remove(config.inactiveButtonClass);
      btnSubmit.disabled = false;
    }
  }

  const setEventListeners = (form) => {
    //массив всех инпутов в каждой форме
    const inputs = Array.from(form.querySelectorAll(config.inputSelector));
    //Кнопка submit
    const btnSubmit = form.querySelector(config.submitButtonSelector);
    //disabled в начале при открытии попапа с пустыми полями
    toggleButtonState(inputs, btnSubmit);
    form.addEventListener('reset', () => {
      disableButton(btnSubmit);
    })
    
    //обработчик события изменения текста инпутов
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        isValid(form, input);
        //переключатель стилей кнопки submit в зависимости от валидности/инвалидности импутов
        toggleButtonState(inputs, btnSubmit);
      })
    })
  }

   //массив всех форм
  const forms = Array.from(document.querySelectorAll(config.formSelector));

  forms.forEach(form => {
    setEventListeners(form);
  })
}