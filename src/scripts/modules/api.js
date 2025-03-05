const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-33/",
  headers: {
    authorization: "d2cfe252-28ad-4ef0-9516-28ffa42d504b",
    "Content-Type": "application/json",
  },
};

const loadData = (additionalUrl) => {
  return fetch(`${config.baseUrl + additionalUrl}`, {
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

const patchProfile = (changes, additionalUrl) => {
  if (!additionalUrl) {
    additionalUrl = "";
  }
  return fetch(`${config.baseUrl}users/me/${additionalUrl}`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(changes),
  })
    .then((res) => {
      if (res.ok) {
        return;
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

const postNewCard = (placeName, placeLink) => {
  return fetch(`${config.baseUrl}cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: placeName,
      link: placeLink,
    }),
  })
    .then((res) => {
      if (res.ok) {
        res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteFromServer = (cardId) => {
  fetch(`${config.baseUrl}cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return;
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

const likeOnServer = (cardId, fetchMethod) => {
  return fetch(`${config.baseUrl}cards/likes/${cardId}`, {
    method: fetchMethod,
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return;
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

export { loadData, patchProfile, postNewCard, deleteFromServer, likeOnServer };
