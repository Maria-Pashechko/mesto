export default class Api {
    constructor({url, headers}) {
    this._url = url;
    this._headers = headers;
  }

  _then(response) {
    if(response.ok) {
      return response.json(); 
    }

    throw new Error (`Что-то пошло не туда... ${response.status}`)
  }

  //загрузка данных пользователя с сервера
  getUserInformation() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then((response) => this._then(response))
    .catch((error) => {
      throw(error)
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
    .then((response) => this._then(response))
    .catch((error) => {
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
    .then((response) => this._then(response))
    .catch((error) => {
      throw(error)
    })
  }

  //загрузка данных карточек с сервера
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then((response) => this._then(response))
    .catch((error) => {
      throw(error)
    })
  }

  //добавление данных новой карточки на сервер
  addCard(dataCard) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(dataCard)
    })
    .then((response) => this._then(response))
    .catch((error) => {
      throw(error)
    })
  }

  //удаление данных карточки с сервера
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((response) => this._then(response))
    .catch((error) => {
      throw(error)
    })
  }

  //добавить лайк
  addLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then((response) => this._then(response))
    .catch((error) => {
      throw(error)
    })
  }

  //отменить лайк
  disLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((response) => this._then(response))
    .catch((error) => {
      throw(error)
    })
  }
}