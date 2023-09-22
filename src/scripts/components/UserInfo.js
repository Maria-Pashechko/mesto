export default class UserInfo {
  constructor(selectorUserName, selectorUserProfession, selectorUserAvatar) {
    this._nameFromServer = selectorUserName;
    this._professionFromServer = selectorUserProfession;
    this._avatarFromServer = selectorUserAvatar;
  }

  //метод принимат данные объекта и присваивает полям сраницы
  setUserInfo(dataUserInfo) {
    this._nameFromServer.textContent = dataUserInfo.name;
    this._professionFromServer.textContent = dataUserInfo.about;
    this._avatarFromServer.style.backgroundImage = `url(${dataUserInfo.avatar})`;
    this._id = dataUserInfo._id;
  }

  // получение объекта с данными c полей страницы
  getUserInfo() {
    const dataPopupUserInfo = {};
    dataPopupUserInfo.name = this._nameFromServer.textContent;
    dataPopupUserInfo.about = this._professionFromServer.textContent;

    return dataPopupUserInfo;
  }

  //получение id пользователя
  getId() {
    return this._id;
  }
}