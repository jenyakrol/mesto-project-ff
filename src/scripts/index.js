import "../pages/index.css";
import { createCard, deleteCard, likeCard } from "./card.js";
import initialCards from "./cards.js";
import { addNewPlace, editFormSubmit } from "./forms.js";
import {
  addAnimation,
  closePopup,
  closePopupFunction,
  constructImagePopup,
  openPopup,
} from "./modal.js";

const cardTemplate = document.querySelector("#card-template").content;
const cardsConatiner = document.querySelector(".places__list");

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const popups = document.querySelectorAll(".popup");

const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
const editForm = document.forms["edit-profile"];
const editName = editForm.elements.name;
editName.value = profileName.textContent;
const editDescription = editForm.elements.description;
editDescription.value = profileDescription.textContent;
const editSubmit = editForm.querySelector(".popup__button");

const addButton = document.querySelector(".profile__add-button");
const addPopup = document.querySelector(".popup_type_new-card");
const addForm = document.forms["new-place"];
const newPlace = addForm.elements["place-name"];
const newImage = addForm.elements.link;
const addSubmit = addForm.querySelector(".popup__button");

const imagePopup = document.querySelector(".popup_type_image");

initialCards.forEach((item) => {
  cardsConatiner.append(createCard(item, cardTemplate));
});

cardsConatiner.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("card__delete-button")) {
    deleteCard(evt.target);
  } else if (evt.target.classList.contains("card__like-button")) {
    likeCard(evt.target);
  } else if (evt.target.classList.contains("card__image")) {
    constructImagePopup(imagePopup, evt.target);
    openPopup(imagePopup);
    closePopupFunction(imagePopup, closePopup);
  }
});

editButton.addEventListener("click", (evt) => {
  openPopup(editPopup);
  closePopupFunction(editPopup, closePopup);
});
editSubmit.addEventListener("click", (evt) => {
  evt.preventDefault();
  editFormSubmit(profileName, profileDescription, editName.value, editDescription.value);
  closePopup(editPopup)
});

addButton.addEventListener("click", (evt) => {
  openPopup(addPopup);
  closePopupFunction(addPopup, closePopup);
});
addSubmit.addEventListener("click", (evt) => {
  evt.preventDefault();
  addNewPlace(
    addForm,
    newPlace.value,
    newImage.value,
    cardsConatiner,
    cardTemplate,
    createCard
  );
  closePopup(addPopup)
});

popups.forEach((popup) => {
  addAnimation(popup);
});
