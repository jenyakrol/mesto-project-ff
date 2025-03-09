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
  input.addEventListener("input", () => {
    checkInputValidity(form, input, submitButton, selectors);
  });
}

function checkInputValidity(form, input, submitButton, selectors) {
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
  errorElement.classList.remove(selectors.errorClass);

  input.classList.remove(selectors.inputErrorClass);
  input.setCustomValidity("");

  if (form.checkValidity()) {
    submitButton.classList.remove(selectors.inactiveButtonClass);
    submitButton.removeAttribute("disabled", "");
  }
}

function clearValidaton(form, validationConfig) {
  const inputs = form.querySelectorAll(validationConfig.inputSelector);
  const submitButton = form.querySelector(
    validationConfig.submitButtonSelector
  );

  inputs.forEach((input) => {
    hideInputError(form, input, submitButton, validationConfig);
    if (!input.validity.valid) {
      input.value = "";
      submitButton.classList.add(validationConfig.inactiveButtonClass);
      submitButton.setAttribute("disabled", "");
    }
  });
}

export { enableValidation, clearValidaton };
