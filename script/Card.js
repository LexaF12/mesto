import { popupElement, popupImage, popupImageTitle } from './constants.js'

export default class Card { 
    constructor(data, openPopup, template) { 
        this._name = data.name 
        this._link = data.link 
        this._alt = data.name 
        this._template = template
        this._openPopup = openPopup
    } 

    _getTemplate() { 
        const newTemplate = document.querySelector(this._template).content.querySelector('.element').cloneNode(true) 
        return newTemplate 
    } 

    _setData() { 
        const cardTitle = this._newCard.querySelector('.element__caption') 
        const cardImage = this._newCard.querySelector('.element__image') 

        cardTitle.textContent = this._name 
        cardImage.src = this._link 
        cardImage.alt = this._alt 
    } 

    _handleClickDelete() { 
        this._newCard.remove() 
    } 

    _handleOpenPopupImage() { 
        popupImage.src = this._link 
        popupImage.alt = this._alt
        popupImageTitle.textContent = this._alt 
        this._openPopup(popupElement) 
    } 

    _setListeners() { 
        const likeButton = this._newCard.querySelector('.element__like') 

        likeButton.addEventListener('click', () => likeButton.classList.toggle('element__like_active')) 
        const deleteButton = this._newCard.querySelector('.element__delete') 

        deleteButton.addEventListener('click', () => this._handleClickDelete()) 
        const cardImage = this._newCard.querySelector('.element__image') 

        cardImage.addEventListener('click', () => { 
            this._handleOpenPopupImage() 
        }) 
    } 

    generateCard() { 

        this._newCard = this._getTemplate()
        this._setData() 
        this._setListeners() 
        return this._newCard 
    } 
} 