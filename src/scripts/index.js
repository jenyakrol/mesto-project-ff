import "../pages/index.css";
import { createCard, deleteCard, likeCard } from "./modules/card.js";
import initialCards from "./modules/cards.js";
import { addNewPlace, editFormSubmit } from "./modules/forms.js";
import {
  addAnimation,
  addCloseClicksFunctionality,
  closePopup,
  openPopup,
} from "./modules/modal.js";
import { clearValidaton, enableValidation } from "./modules/validation.js";

const cardTemplate = document.querySelector("#card-template").content;
const cardsConatiner = document.querySelector(".places__list");

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const popups = document.querySelectorAll(".popup");

const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
const editForm = document.forms["edit-profile"];
const inputNameProfile = editForm.elements.name;
const inputDescriptionProfile = editForm.elements.description;

const addButton = document.querySelector(".profile__add-button");
const addPopup = document.querySelector(".popup_type_new-card");
const addForm = document.forms["new-place"];
const inputNameAddNewCard = addForm.elements["place-name"];
const inputLinkAddNewCard = addForm.elements.link;

const imagePopup = document.querySelector(".popup_type_image");
const imageInPopup = imagePopup.querySelector(".popup__image");
const descriptionInPopup = imagePopup.querySelector(".popup__caption");

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

function openImagePopup(image) {
  imageInPopup.src = image.src;
  imageInPopup.alt = image.alt;
  descriptionInPopup.textContent = image.alt;
  openPopup(imagePopup);
}

initialCards.forEach((item) => {
  cardsConatiner.append(
    createCard(item, cardTemplate, deleteCard, likeCard, openImagePopup)
  );
});

popups.forEach((popup) => {
  addAnimation(popup);
  addCloseClicksFunctionality(popup);
});

editButton.addEventListener("click", (evt) => {
  inputNameProfile.value = profileName.textContent;
  inputDescriptionProfile.value = profileDescription.textContent;
  clearValidaton(editForm, validationConfig)
  openPopup(editPopup);
});
editForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  editFormSubmit(
    profileName,
    profileDescription,
    inputNameProfile.value,
    inputDescriptionProfile.value
  );
  closePopup(editPopup);
});

addButton.addEventListener("click", (evt) => {
  clearValidaton(addForm, validationConfig)
  openPopup(addPopup);
});
addForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  addNewPlace(
    inputNameAddNewCard.value,
    inputLinkAddNewCard.value,
    cardsConatiner,
    cardTemplate,
    createCard,
    deleteCard,
    likeCard,
    openImagePopup
  );
  addForm.reset();
  closePopup(addPopup);
});

enableValidation(validationConfig)