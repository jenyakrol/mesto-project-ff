function editFormSubmit(name, description, newName, newDescription) {
  name.textContent = newName;
  description.textContent = newDescription;
}

function addNewPlace(
  newName,
  newLink,
  container,
  cardTemplate,
  createCard
) {
  if (!newName || !newLink) {
    return;
  }
  const item = { name: newName, link: newLink };
  container.prepend(createCard(item, cardTemplate));
}

export { editFormSubmit, addNewPlace };
