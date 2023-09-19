export default class Api {
    constructor({url, headers}) {
    // тело конструктора
    this._url = url;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then((response) => {
      if(response.ok) {
        return response.json(); 
      }

      throw new Error ('Что-то пошло не туда...')
    })
    .catch((error) => {
      console.log(error)
    })
  }

  // другие методы работы с API
}