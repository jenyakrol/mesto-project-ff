const deleteCard = (deleteButton) => deleteButton.closest(".card").remove();

const likeCard = (likeButton) =>
  likeButton.classList.toggle("card__like-button_is-active");

function createCard(item, cardTemplate) {
  const newCard = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = newCard.querySelector(".card__image");
  const cardTitle = newCard.querySelector(".card__title");

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;

  return newCard;
}

export { createCard, deleteCard, likeCard };
