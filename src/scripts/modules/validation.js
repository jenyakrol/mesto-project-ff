function enableValidation(selectors) {
  const forms = document.querySelectorAll(selectors.formSelector);

  forms.forEach((form) => {
    const inputs = form.querySelectorAll(selectors.inputSelector);
    const submitButton = form.querySelector(selectors.submitButtonSelector);
    inputs.forEach((input) => {
      setEventListeners(form, input, submitButton, selectors);
    });
  });
}

function setEventListeners(form, input, submitButton, selectors) {
  input.addEventListener("input", (evt) => {
    checkValidity(form, input, submitButton, selectors);
  });
}

function checkValidity(form, input, submitButton, selectors) {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity("");
  }

  if (!input.validity.valid) {
    showInputError(form, input, submitButton, selectors);
  } else {
    hideInputError(form, input, submitButton, selectors);
  }
}

function showInputError(form, input, submitButton, selectors) {
  const errorElement = form.querySelector(`.${input.name}-error`);

  errorElement.textContent = input.validationMessage;

  submitButton.setAttribute("disabled", "");

  input.classList.add(selectors.inputErrorClass);
  submitButton.classList.add(selectors.inactiveButtonClass);
  errorElement.classList.add(selectors.errorClass);
}

function hideInputError(form, input, submitButton, selectors) {
  const errorElement = form.querySelector(`.${input.name}-error`);

  errorElement.textContent = "";

  submitButton.removeAttribute("disabled", "");

  input.classList.remove(selectors.inputErrorClass);
  submitButton.classList.remove(selectors.inactiveButtonClass);
  errorElement.classList.remove(selectors.errorClass);
}

function clearValidaton(form, validationConfig) {
  const inputs = form.querySelectorAll(validationConfig.inputSelector);
  const submitButton = form.querySelector(
    validationConfig.submitButtonSelector
  );

  inputs.forEach((input) => {
    if (!input.validity.valid) {
      input.value = "";
    }
    checkValidity(form, input, submitButton, validationConfig);
  });
}

export { enableValidation, clearValidaton };
