export default class UserInfo {
  constructor(selectorUserName, selectorUserProfession) {
    this._nameFromPage = selectorUserName;
    this._professionFromPage = selectorUserProfession;
  }

  //метод принимат данные объекта и присваивает полям сраницы
  setUserInfo(dataUserInfo) {
    this._nameFromPage.textContent = dataUserInfo.name;
    this._professionFromPage.textContent = dataUserInfo.profession;
  }

  // получение объекта с данными полей страницы
  getUserInfo() {
    const dataPopupUserInfo = {};
    dataPopupUserInfo.name = this._nameFromPage.textContent;
    dataPopupUserInfo.profession = this._professionFromPage.textContent;

    return dataPopupUserInfo;
  }
}