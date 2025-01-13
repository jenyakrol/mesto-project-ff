// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardsConatiner = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;
const deleteCard = (deleteButton) => deleteButton.closest(".card").remove();

function createCard(item, deleteButtonFunction) {
  const newCard = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = newCard.querySelector(".card__image");
  const cardTitle = newCard.querySelector(".card__title");
  const deleteButton = newCard.querySelector(".card__delete-button");

  cardImage.src = item.link;
  cardTitle.textContent = item.name;

  deleteButton.addEventListener("click", () => deleteButtonFunction(deleteButton));

  return newCard;
}

initialCards.forEach((item) => {
  cardsConatiner.append(createCard(item, deleteCard));
});
