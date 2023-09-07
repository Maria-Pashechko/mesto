import {popupInputName, popupInputProfession} from '../utils/constants.js';

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

  // объект с данными полей страницы
  getUserInfo() {
    const dataPopupUserInfo = {};
    dataPopupUserInfo.name = this._nameFromPage.textContent;
    dataPopupUserInfo.profession = this._professionFromPage.textContent;

    return dataPopupUserInfo;
  }

  setUserInfoFromPageToPopup() {
    //приняли данные полей страницы
    const obj = this.getUserInfo();
    //присвоили инпутам данные со страницы
    popupInputName.value = obj.name;
    popupInputProfession.value = obj.profession;
  }
}