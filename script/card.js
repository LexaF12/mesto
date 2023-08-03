import { closePopupByEsc, openPopup } from './index.js';

export default class Card {
  constructor (data, selector) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._selector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;  
  }

  _setData() {
    this._newCard.querySelector('.element__caption').textContent = this._name;
    this._newCard.querySelector('.element__image').alt = this._name;
    this._newCard.querySelector('.element__image').src = this._link;
  }

  _handleClickLike() {
    this._newCard.querySelector('.element__like')
    .classList.toggle('element__like_active');
  }

  _handleClickDelete() {
    this._newCard.remove();
  }

  _handleClickOpen() {
    const popup = document.querySelector('.popup_view_full');
    openPopup(popup);

    document.querySelector('.popup__view-image').src = this._link;
    document.querySelector('.popup__view-image').alt = this._name;
    document.querySelector('.popup__caption').textContent = this._name;

    document.addEventListener('keydown', closePopupByEsc);
  }

  _setListeners() {
    const placeLikeButton = this._newCard.querySelector('.element__like');
    placeLikeButton.addEventListener('click', () => this._handleClickLike());

    const placeDeleteButton = this._newCard.querySelector('.element__delete');
    placeDeleteButton.addEventListener('click', () => this._handleClickDelete());

    const placeImage = this._newCard.querySelector('.element__image');
    placeImage.addEventListener('click', () => this._handleClickOpen());
  }

  createCard() {
    this._newCard = this._getTemplate();
    this._setData();
    this._setListeners();

    return this._newCard;
  }
}