import Card from "./Card.js"
import FormValidator from "./FormValidator.js"
import { VALIDATION_CONFIG, initialCards } from "./constants.js"

// Константы попапов

const editProfileButton = document.querySelector('.profile__edit-button');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const popupEditProfile = document.querySelector('.popup_edit');

const editProfileForm = popupEditProfile.querySelector('.popup__form');
const inputName = popupEditProfile.querySelector('.popup__input_type_name');
const inputDescription = popupEditProfile.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__about');

const placesContainer = document.querySelector('.elements');

const addPlaceButton = document.querySelector('.profile__add-button');
const popupAddPlace = document.querySelector('.popup_add_picture');
const addPlaceForm = document.querySelector('.popup__form_card');
const inputTitle = popupAddPlace.querySelector('.popup__input_name');
const inputLink = popupAddPlace.querySelector('.popup__input_link');

const formList = Array.from(document.querySelectorAll('.popup__form'));

export function openPopup (popupElement) {
    popupElement.classList.toggle('popup_opened');
    document.addEventListener('keydown', closePopupByEsc);
  };
  
  function openPopupForm (popupElement, config) {
  
    const buttonElement = popupElement.querySelector(config.formButtonSubmit);
    disableSubmitButton (buttonElement, config);
  
    const inputElements = popupElement.querySelectorAll(config.inputSelector);
    inputElements.forEach((inputElement) => {
      hideError(popupElement, inputElement, config);
    });
  
    openPopup(popupElement);
  }
  
  function disableSubmitButton (buttonElement, config) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  }
  
  function hideError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(config.errorClass);
    inputElement.classList.remove(config.inputErrorClass);
  }
  
  export function closePopupByEsc (event) {
    if (event.key === 'Escape') {
      const popup = document.querySelector('.popup_opened');
      closePopup(popup);
    }
  };
  
  function closePopup (popupElement) {
    popupElement.classList.toggle('popup_opened');
    document.removeEventListener('keydown', closePopupByEsc);
  };
  
  function editProfileFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    closePopup(popupEditProfile);
  }
  
  function addPlaceFormSubmit (evt) {
    evt.preventDefault();
    const name = inputTitle.value;
    const link = inputLink.value;
  
    const placeCard = new Card({name, link}, '.picture-template');
    placesContainer.prepend(placeCard.createCard());
    closePopup(popupAddPlace);
  };
  
  const renderPlaceCard = (data, selector) => {
    const placeCard = new Card(data, selector);
    placesContainer.append(placeCard.createCard());
  }
  
  initialCards.forEach((item) => {
    renderPlaceCard(item, '.picture-template');
  });
  
  //Валидация форм
  
  formList.forEach((formElement) => {
    const newValidator = new FormValidator( VALIDATION_CONFIG, formElement);
    newValidator.enableValidation();
  })
  
  popupCloseButtons.forEach((button) => {
    const buttonsPopup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(buttonsPopup));
  
    buttonsPopup.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget) {
        closePopup(buttonsPopup);
      }    
    });
  });
  
  editProfileButton.addEventListener('click', () => {
    openPopupForm(popupEditProfile, VALIDATION_CONFIG); 
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;
  });
  
  editProfileForm.addEventListener('submit', editProfileFormSubmit);
  
  addPlaceButton.addEventListener('click', () => {
    openPopupForm(popupAddPlace, VALIDATION_CONFIG)
    inputTitle.value = null;
    inputLink.value = null;
  });
  
  addPlaceForm.addEventListener('submit', addPlaceFormSubmit);