import "../pages/index.css";
import {
  deleteFromServer,
  likeOnServer,
  loadData,
  patchProfile,
  postNewCard,
} from "./modules/api.js";
import { createCard, deleteCard, likeCard } from "./modules/card.js";
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

let profileOnServer;

const updateProfile = (profile) => {
  profileImage.style.backgroundImage = `url('${profile.avatar}')`;
  profileName.textContent = profile.name;
  profileDescription.textContent = profile.about;
};

const updateCards = (profile, cards) => {
  cards.forEach((item) => {
    cardsConatiner.append(
      createCard(
        item,
        cardTemplate,
        deleteCard(deleteFromServer),
        likeCard(likeOnServer),
        openImagePopup,
        profile["_id"]
      )
    );
  });
};

function loadContent() {
  Promise.all([loadData("users/me/"), loadData("cards/")]).then(
    ([profile, cards]) => {
      profileOnServer = profile;
      updateProfile(profileOnServer);
      updateCards(profileOnServer, cards);
    }
  );
}

function openImagePopup(image) {
  imageInPopup.src = image.src;
  imageInPopup.alt = image.alt;
  descriptionInPopup.textContent = image.alt;
  openPopup(imagePopup);
}

editButton.addEventListener("click", () => {
  inputNameProfile.value = profileOnServer.name;
  inputDescriptionProfile.value = profileOnServer.about;
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
    .then((profile) => {
      profileOnServer = profile;
      updateProfile(profileOnServer);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      changeButtonText(editForm, "Сохранить");
      editForm.reset();
      closePopup(editPopup);
    });
});

editAvatarButton.addEventListener("click", () => {
  clearValidaton(editAvatarForm, validationConfig);
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
    .then((profile) => {
      profileOnServer = profile;
      updateProfile(profileOnServer);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      changeButtonText(editAvatarForm, "Сохранить");
      editAvatarForm.reset();
      closePopup(editAvatarPopup);
    });
});

addButton.addEventListener("click", () => {
  openPopup(addPopup);
  clearValidaton(addForm, validationConfig);
});
addForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  changeButtonText(addForm, "Сохранение...");
  postNewCard(inputNameAddNewCard.value, inputLinkAddNewCard.value)
    .then((card) => {
      cardsConatiner.prepend(
        createCard(
          card,
          cardTemplate,
          deleteCard(deleteFromServer),
          likeCard(likeOnServer),
          openImagePopup,
          profileOnServer["_id"]
        )
      );
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      changeButtonText(addForm, "Сохранить");
      addForm.reset();
      closePopup(addPopup);
    });
});

function changeButtonText(form, newText) {
  const button = form.querySelector(".button");
  button.textContent = newText;
}

popups.forEach((popup) => {
  addAnimation(popup);
  addCloseClicksFunctionality(popup);
});
enableValidation(validationConfig);
loadContent();
