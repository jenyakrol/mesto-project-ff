import "../pages/index.css";
import {
  checkResponseContentType,
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
  return loadData("cards/").then((cards) => {
    clearCards(cardsConatiner);
    cards.forEach((item) => {
      cardsConatiner.append(
        createCard(
          item,
          cardTemplate,
          deleteCard,
          likeCard,
          openImagePopup,
          profile["_id"]
        )
      );
    });
  });
};

function updateContent() {
  return updateProfile()
    .then((profile) => {
      return updateCards(profile);
    })
    .catch((err) => {
      console.log(err);
    });
}

function openImagePopup(image) {
  imageInPopup.src = image.src;
  imageInPopup.alt = image.alt;
  descriptionInPopup.textContent = image.alt;
  openPopup(imagePopup);
}

const deleteCard = (cardId) => {
  deleteFromServer(cardId)
    .then(() => {
      return updateContent();
    })
    .catch((err) => {
      console.log(err);
    });
};

const likeCard = (likeButton, cardId, isLiked) => {
  likeButton.classList.toggle("card__like-button_is-active");
  let likeMethod = "";
  if (!isLiked) {
    likeMethod = "PUT";
  } else {
    likeMethod = "DELETE";
  }

  likeOnServer(cardId, likeMethod)
    .then(() => {
      return updateContent();
    })
    .catch((err) => {
      console.log(err);
    });
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
  submitFunction(
    patchProfile({
      name: inputNameProfile.value,
      about: inputDescriptionProfile.value,
    }),
    editForm,
    editPopup,
    evt
  );
});

editAvatarButton.addEventListener("click", () => {
  clearValidaton(editForm, validationConfig);
  openPopup(editAvatarPopup);
});
editAvatarForm.addEventListener("submit", (evt) => {
  submitFunction(
    patchProfile(
      {
        avatar: inputUrlEditAvatar.value,
      },
      "avatar/"
    ),
    editAvatarForm,
    editAvatarPopup,
    evt
  );
});

addButton.addEventListener("click", () => {
  clearValidaton(addForm, validationConfig);
  openPopup(addPopup);
});
addForm.addEventListener("submit", (evt) => {
  submitFunction(
    postNewCard(inputNameAddNewCard.value, inputLinkAddNewCard.value),
    addForm,
    addPopup,
    evt
  );
});

function submitFunction(mainFunction, form, popup, evt) {
  evt.preventDefault();
  changeButtonText(form, "Сохранение...");
  mainFunction
    .then(() => {
      return updateContent();
    })
    .then(() => {
      changeButtonText(form, "Сохранить");
      form.reset();
      closePopup(popup);
    })
    .catch((err) => {
      console.log(err);
    });
}

function changeButtonText(form, newText) {
  const button = form.querySelector(".button");
  button.textContent = newText;
}

updateContent();
enableValidation(validationConfig);
