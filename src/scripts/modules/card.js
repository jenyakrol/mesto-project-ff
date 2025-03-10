const deleteCard = (deleteFromServer) => (cardId, card) => {
  deleteFromServer(cardId)
    .then(() => {
      card.remove();
    })
    .catch((err) => {
      console.log(err);
    });
};

const likeCard = (likeOnServer) => (likeButton, cardId, likesCounter) => {
  let likeMethod = "";
  if (!likeButton.classList.contains("card__like-button_is-active")) {
    likeMethod = "PUT";
  } else {
    likeMethod = "DELETE";
  }

  likeOnServer(cardId, likeMethod)
    .then((likesObject) => {
      likesCounter.textContent = likesObject.likes.length;
      likeButton.classList.toggle("card__like-button_is-active");
    })
    .catch((err) => {
      console.log(err);
    });
};

function createCard(
  cardOnServer,
  cardTemplate,
  deleteFunction,
  likeFunction,
  openFunction,
  profileId
) {
  const newCard = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = newCard.querySelector(".card__image");
  const cardTitle = newCard.querySelector(".card__title");
  const deleteButton = newCard.querySelector(".card__delete-button");
  const likeButton = newCard.querySelector(".card__like-button");
  const likesCounter = newCard.querySelector(".card__number-of-likes");

  const isYourCard = profileId === cardOnServer.owner["_id"];
  let isYouLiked = false;

  cardOnServer.likes.forEach((like) => {
    if (like["_id"] === profileId) {
      isYouLiked = true;
    }
  });

  cardImage.src = cardOnServer.link;
  cardImage.alt = cardOnServer.name;
  cardTitle.textContent = cardOnServer.name;
  likesCounter.textContent = cardOnServer.likes.length;

  if (isYourCard) {
    deleteButton.addEventListener("click", () =>
      deleteFunction(cardOnServer["_id"], newCard)
    );
  } else {
    deleteButton.remove();
  }

  if (isYouLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", () => {
    likeFunction(likeButton, cardOnServer["_id"], likesCounter);
  });

  cardImage.addEventListener("click", () => openFunction(cardImage));

  return newCard;
}

export { createCard, deleteCard, likeCard };
