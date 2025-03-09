const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-33/",
  headers: {
    authorization: "d2cfe252-28ad-4ef0-9516-28ffa42d504b",
    "Content-Type": "application/json",
  },
};

function checkFetchStatus(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
}

const loadData = (additionalUrl) => {
  return fetch(`${config.baseUrl + additionalUrl}`, {
    headers: config.headers,
  }).then((res) => {
    return checkFetchStatus(res);
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
  }).then((res) => {
    return checkFetchStatus(res);
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
  }).then((res) => {
    return checkFetchStatus(res);
  });
};

const deleteFromServer = (cardId) => {
  return fetch(`${config.baseUrl}cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    return checkFetchStatus(res);
  });
};

const likeOnServer = (cardId, fetchMethod) => {
  return fetch(`${config.baseUrl}cards/likes/${cardId}`, {
    method: fetchMethod,
    headers: config.headers,
  }).then((res) => {
    return checkFetchStatus(res);
  });
};

export { loadData, patchProfile, postNewCard, deleteFromServer, likeOnServer };
