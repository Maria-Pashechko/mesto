export default class Api {
    constructor({url, headers}) {
    this._url = url;
    this._headers = headers;
  }

  //загрузка данных пользователя с сервера
  getUserInformation() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then((response) => {
      if(response.ok) {
        return response.json(); 
      }

      throw new Error ('Что-то не работает...')
    })
    .catch((error) => {
      console.log(error)
    })
  }

  // обновление данных пользователя на сервере (отправка данных)
  updateUserInformation(updateDataUser) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: updateDataUser.name,
        about: updateDataUser.about
      })    
    })
    .then((response) => {
      if(response.ok) {
        return response.json(); 
      }

      throw new Error ('Что-то пошло не туда...')
    })
    .catch((error) => {
      //можно провести логирование 
      throw(error)
    })
  }

  // обновление данных аватара на сервере (отправка данных)
  updateUserAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar.link
      })    
    })
    .then((response) => {
      if(response.ok) {
        return response.json(); 
      }

      throw new Error ('Что-то не то происходит...')
    })
    .catch((error) => {
      //можно провести логирование 
      throw(error)
    })
  }

  //загрузка данных карточек с сервера
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then((response) => {
      if(response.ok) {
        return response.json(); 
      }

      throw new Error (`Произошла ошибка: ${response.status}`)//класс Error существует в браузере по уолчанию
    })
    .catch((error) => {
      console.log(error)
    })
  }

  //добавление данных новой карточки на сервер
  addCard(dataCard) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(dataCard)
    })
    .then((response) => {
      if(response.ok) {
        return response.json(); 
      }

      throw new Error (`Что-то бывает и не получается, сейчас это проблемка ${response.status}`)//класс Error существует в браузере по уолчанию
    })
    .catch((error) => {
      console.log(error)
    })
  }

  //удаление данных карточки с сервера
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((response) => {
      if(response.ok) {
        return response.json(); 
      }

      throw new Error (`Хм.. не удаляется.. ошибка ${response.status}`)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  //добавить лайк
  addLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then((response) => {
      if(response.ok) {
        return response.json(); 
      }

      throw new Error (`Лайк не случился. Ошибка ${response.status}`)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  //отменить лайк
  disLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((response) => {
      if(response.ok) {
        return response.json(); 
      }

      throw new Error (`не удаляется лайк, "потому что есть 'ошибка' у тебя:" ${response.status}`)
    })
    .catch((error) => {
      console.log(error)
    })
  }
}