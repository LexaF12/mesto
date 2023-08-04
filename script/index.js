import Card from "./Card.js"
import FormValidator from "./FormValidator.js"
import { config, initialCards } from "./constants.js"

// Константы попапов 
// решил не эксперементировать больше и вернуть старый код и работать над ним,  так как он лучше работал по вашему мнению

const popups = document.querySelectorAll('.popup')
const popupProfileElement = document.querySelector('.popup_edit')
const popupCardElement = document.querySelector('.popup_add_picture')
const popupImageElement = document.querySelector('.popup_view_full')

const closeEditButton = document.querySelector('.popup__close-button')
const buttonCardClose = document.querySelector('.popup__close-add')
const buttonViewFullClose = document.querySelector('.popup__close-img')

const buttonCardSubmit = document.querySelector('.popup__submit')

const buttonEdit = document.querySelector('.profile__edit-button')
const buttonAdd = document.querySelector('.profile__add-button')
const profileForm = document.querySelector('.popup__form')
const popupCard = document.querySelector('.popup_add_picture')
const elements = document.querySelector('.elements')
const cardForm = popupCard.querySelector('.popup__form_card')
const popupInputTitle = popupCard.querySelector('.popup__input_name')
const popupInputUrl = popupCard.querySelector('.popup__input_link')
const nameEdit = document.querySelector('.profile__name')
const infoEdit = document.querySelector('.profile__about')
const inputEditName = document.querySelector('.popup__input_type_name')
const inputEditInfo = document.querySelector('.popup__input_type_description')

export function openPopup(evt) {
  evt.classList.add('popup_opened')
  document.addEventListener('keydown', closePopupOnEsc)
}

function closePopup(evt) {
  evt.classList.remove('popup_opened')
  document.removeEventListener('keydown', closePopupOnEsc)
}

function closePopupOnEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};

buttonEdit.addEventListener('click', function () {
  inputEditName.value = nameEdit.textContent;
  inputEditInfo.value = infoEdit.textContent;
  openPopup(popupProfileElement);
});

for (let i = 0; i < popups.length; ++i) {
  popups[i].addEventListener('click', (evt) => {
    if (evt.currentTarget === evt.target) {
      closePopup(evt.target)
    }
  })
}

function submitProfileForm(evt) {
  evt.preventDefault()
  nameEdit.textContent = inputEditName.value
  infoEdit.textContent = inputEditInfo.value
  closePopup(popupProfileElement)
}

function createCard(item) {
  const card = new Card(item, openPopup, config.template)
  return card.generateCard()
}

const renderCard = (item) => {
  const card = createCard(item)
  elements.prepend(card)
}

function submitCardForm(evt) {
  evt.preventDefault()
  const newPopupCard = { name: popupInputTitle.value, link: popupInputUrl.value }
  cardForm.reset()
  validPopupCard.toggleButtonState()
  renderCard(newPopupCard)
  closePopup(popupCardElement)
}

initialCards.forEach((item) => {
  renderCard(item)
})

buttonEdit.addEventListener('click', () => {
  openPopup(popupProfileElement)
})

buttonAdd.addEventListener('click', () => {
  openPopup(popupCardElement)
})

buttonViewFullClose.addEventListener('click', () => closePopup(popupImageElement))
closeEditButton.addEventListener('click', () => closePopup(popupProfileElement))
buttonCardClose.addEventListener('click', () => closePopup(popupCardElement))
profileForm.addEventListener('submit', submitProfileForm)
cardForm.addEventListener('submit', submitCardForm)

const validPopupProfile = new FormValidator(config, popupProfileElement)

validPopupProfile.enableValidation()

const validPopupCard = new FormValidator(config, popupCardElement)
validPopupCard.enableValidation()