function editFormSubmit(name, description, newName, newDescription) {
  name.textContent = newName;
  description.textContent = newDescription;
}

function addNewPlace(
  newName,
  newLink,
  container,
  cardTemplate,
  createCard,
  deleteCard,
  likeCard,
  openImagePopup
) {
  if (!newName || !newLink) {
    return;
  }
  const item = { name: newName, link: newLink };
  container.prepend(
    createCard(item, cardTemplate, deleteCard, likeCard, openImagePopup)
  );
}

export { editFormSubmit, addNewPlace };
