const deleteCard = (deleteButton) => deleteButton.closest(".card").remove();

const likeCard = (likeButton) =>
  likeButton.classList.toggle("card__like-button_is-active");

function createCard(
  item,
  cardTemplate,
  deleteFunction,
  likeFunction,
  openFunction
) {
  const newCard = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = newCard.querySelector(".card__image");
  const cardTitle = newCard.querySelector(".card__title");
  const deleteButton = newCard.querySelector(".card__delete-button");
  const likeButton = newCard.querySelector(".card__like-button");

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;

  deleteButton.addEventListener("click", () => deleteFunction(deleteButton));
  likeButton.addEventListener("click", () => likeFunction(likeButton));
  cardImage.addEventListener("click", () => openFunction(cardImage));

  return newCard;
}

export { createCard, deleteCard, likeCard };
