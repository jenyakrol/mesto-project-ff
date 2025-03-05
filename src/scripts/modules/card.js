function clearCards(container) {
  const cards = container.querySelectorAll(".card");
  cards.forEach((card) => card.remove());
}

function createCard(
  cardOnServer,
  cardTemplate,
  deleteFunction,
  likeFunction,
  openFunction,
  isYourCard,
  isYouLiked
) {
  const newCard = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = newCard.querySelector(".card__image");
  const cardTitle = newCard.querySelector(".card__title");
  const deleteButton = newCard.querySelector(".card__delete-button");
  const likeButton = newCard.querySelector(".card__like-button");
  const numberOfLikes = newCard.querySelector(".card__number-of-likes");

  cardImage.src = cardOnServer.link;
  cardImage.alt = cardOnServer.name;
  cardTitle.textContent = cardOnServer.name;
  numberOfLikes.textContent = cardOnServer.likes.length;

  newCard.dataset.cardId = cardOnServer['_id']

  if (isYourCard) {
    deleteButton.addEventListener("click", () =>
      deleteFunction(newCard.dataset.cardId)
    );
  } else {
    deleteButton.remove();
  }

  if (isYouLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener('click', () => {
    likeFunction(likeButton, newCard.dataset.cardId)
  })
  
  cardImage.addEventListener("click", () => openFunction(cardImage));

  return newCard;
}

export { createCard, clearCards };
