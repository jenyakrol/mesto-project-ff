import "../pages/index.css";
import { createCard, deleteCard, likeCard } from "./card.js";
import initialCards from "./cards.js";
import { addNewPlace, editFormSubmit } from "./forms.js";
import {
  addAnimation,
  addCloseClicksFunctionality,
  closePopup,
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
const editDescription = editForm.elements.description;

const addButton = document.querySelector(".profile__add-button");
const addPopup = document.querySelector(".popup_type_new-card");
const addForm = document.forms["new-place"];
const newPlace = addForm.elements["place-name"];
const newImage = addForm.elements.link;

const imagePopup = document.querySelector(".popup_type_image");
const imageInPopup = imagePopup.querySelector(".popup__image");
const descriptionInPopup = imagePopup.querySelector(".popup__caption");

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
  editName.value = profileName.textContent;
  editDescription.value = profileDescription.textContent;
  openPopup(editPopup);
});
editForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  editFormSubmit(
    profileName,
    profileDescription,
    editName.value,
    editDescription.value
  );
  closePopup(editPopup);
});

addButton.addEventListener("click", (evt) => {
  openPopup(addPopup);
});
addForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  addNewPlace(
    newPlace.value,
    newImage.value,
    cardsConatiner,
    cardTemplate,
    createCard
  );
  addForm.reset();
  closePopup(addPopup);
});
