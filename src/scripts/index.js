import "../pages/index.css";
import {
  deleteFromServer,
  likeOnServer,
  loadData,
  patchProfile,
  postNewCard,
} from "./modules/api.js";
import { clearCards, createCard } from "./modules/card.js";
import {
  addAnimation,
  addCloseClicksFunctionality,
  closePopup,
  openPopup,
} from "./modules/modal.js";
import { clearValidaton, enableValidation } from "./modules/validation.js";

const cardTemplate = document.querySelector("#card-template").content;
const cardsConatiner = document.querySelector(".places__list");

const profileImage = document.querySelector(".profile__image");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const popups = document.querySelectorAll(".popup");

const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
const editForm = document.forms["edit-profile"];
const inputNameProfile = editForm.elements.name;
const inputDescriptionProfile = editForm.elements.description;

const editAvatarButton = document.querySelector(".profile__edit-avatar-button");
const editAvatarPopup = document.querySelector(".popup_type_edit-avatar");
const editAvatarForm = document.forms["edit-profile-avatar"];
const inputUrlEditAvatar = editAvatarForm.elements["link-avatar"];

const addButton = document.querySelector(".profile__add-button");
const addPopup = document.querySelector(".popup_type_new-card");
const addForm = document.forms["new-place"];
const inputNameAddNewCard = addForm.elements["place-name"];
const inputLinkAddNewCard = addForm.elements.link;

const imagePopup = document.querySelector(".popup_type_image");
const imageInPopup = imagePopup.querySelector(".popup__image");
const descriptionInPopup = imagePopup.querySelector(".popup__caption");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const updateProfile = () => {
  return loadData("users/me/").then((profile) => {
    profileImage.style.backgroundImage = `url('${profile.avatar}')`;
    profileName.textContent = profile.name;
    profileDescription.textContent = profile.about;
    return profile;
  });
};

const updateCards = (profile) => {
  loadData("cards/").then((cards) => {
    clearCards(cardsConatiner);
    cards.forEach((item) => {
      const isYourCard = profile["_id"] === item.owner["_id"];
      let isYouLiked = false;

      item.likes.forEach((like) => {
        if (like["_id"] === profile["_id"]) {
          isYouLiked = true;
        }
      });

      cardsConatiner.append(
        createCard(
          item,
          cardTemplate,
          deleteCard,
          likeCard,
          openImagePopup,
          isYourCard,
          isYouLiked
        )
      );
    });
  });
};

function updateSite() {
  updateProfile().then((profile) => updateCards(profile));
}

function openImagePopup(image) {
  imageInPopup.src = image.src;
  imageInPopup.alt = image.alt;
  descriptionInPopup.textContent = image.alt;
  openPopup(imagePopup);
}

const deleteCard = (cardId) => {
  deleteFromServer(cardId).then(() => updateSite);
};

const likeCard = (likeButton, cardId) => {
  likeButton.classList.toggle("card__like-button_is-active");
  let likeMethod = "";
  if (likeButton.classList.contains("card__like-button_is-active")) {
    likeMethod = "PUT";
  } else {
    likeMethod = "DELETE";
  }

  likeOnServer(cardId, likeMethod).then(() => updateSite());
};

popups.forEach((popup) => {
  addAnimation(popup);
  addCloseClicksFunctionality(popup);
});

editButton.addEventListener("click", () => {
  inputNameProfile.value = profileName.textContent;
  inputDescriptionProfile.value = profileDescription.textContent;
  clearValidaton(editForm, validationConfig);
  openPopup(editPopup);
});
editForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  changeButtonText(editForm, "Сохранение...");
  patchProfile({
    name: inputNameProfile.value,
    about: inputDescriptionProfile.value,
  })
    .then(() => updateSite())
    .then(() => {
      changeButtonText(editForm, "Сохранить");
      closePopup(editPopup);
    });
});

editAvatarButton.addEventListener("click", () => {
  clearValidaton(editForm, validationConfig);
  openPopup(editAvatarPopup);
});
editAvatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  changeButtonText(editAvatarForm, "Сохранение...");
  patchProfile(
    {
      avatar: inputUrlEditAvatar.value,
    },
    "avatar/"
  )
    .then(() => updateSite())
    .then(() => {
      changeButtonText(editAvatarForm, "Сохранить");
      editAvatarForm.reset();
      closePopup(editAvatarPopup);
    });
});

addButton.addEventListener("click", () => {
  clearValidaton(addForm, validationConfig);
  openPopup(addPopup);
});
addForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  changeButtonText(addForm, "Сохранение...");
  postNewCard(inputNameAddNewCard.value, inputLinkAddNewCard.value)
    .then(() => updateSite())
    .then(() => {
      changeButtonText(addForm, "Сохранить");
      addForm.reset();
      closePopup(addPopup);
    });
});

function changeButtonText(form, newText) {
  const button = form.querySelector(".button");
  button.textContent = newText;
}

updateSite();
enableValidation(validationConfig);
