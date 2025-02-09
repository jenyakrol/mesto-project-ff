function closePopupFunction(popup, closePopup) {
  const deleteListeners = () => {
    document.removeEventListener("keydown", escFunction);
    popup.removeEventListener("mousedown", closeButtons);
  };

  const closeButtons = (evt) => {
    if (evt.target === popup || evt.target.classList.contains("popup__close")) {
      closePopup(popup);
      deleteListeners();
    } else if (evt.target.classList.contains("popup__button")) {
      deleteListeners();
    }
  };

  const escFunction = (evt) => {
    if (evt.key === "Escape") {
      closePopup(popup);
      deleteListeners();
    }
  };

  popup.addEventListener("mousedown", closeButtons);
  document.addEventListener("keydown", escFunction);
}

function openPopup(popup) {
  popup.classList.add("popup_is-opened");
}

const closePopup = (popup) => popup.classList.remove("popup_is-opened");

function constructImagePopup(popup, image) {
  const popupImage = popup.querySelector(".popup__image");
  const popupDescription = popup.querySelector(".popup__caption");
  popupImage.src = image.src;
  popupDescription.textContent = image.alt;
}

function addAnimation(popup) {
  popup.classList.add("popup_is-animated");
}

export {
  constructImagePopup,
  closePopupFunction,
  closePopup,
  openPopup,
  addAnimation,
};
