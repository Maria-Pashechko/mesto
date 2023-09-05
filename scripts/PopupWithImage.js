import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector, image, caption) {
    super(selector);

    this._image = image;
    this._caption = caption;
  }

  open (name, link) {
    this._image.alt = name;
    this._image.src = link;
    this._caption.textContent = name;

    super.open();
  }
}
