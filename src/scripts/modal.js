const closeByEsc = (evt) => {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closePopup(popup);
  }
};

function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeByEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeByEsc);
}

function addCloseClicksFunctionality(popup) {
  popup.addEventListener("click", (evt) => {
    if (evt.target === popup || evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
}

function addAnimation(popup) {
  popup.classList.add("popup_is-animated");
}

export { closePopup, openPopup, addAnimation, addCloseClicksFunctionality };
