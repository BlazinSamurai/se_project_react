const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.Yourdigitalcloset.csproject.org"
    : "http://localhost:3001";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status} + ${res.message}`);
  }
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

function getItems() {
  return request(`${baseUrl}/items`);
}

// Id values are not mutable. Any id value in the body of your PUT or PATCH request
// will be ignored. Only a value set in a POST request will be respected, but only if not already taken
// A POST, PUT or PATCH request should include a Content-Type: application/json
// header to use the JSON in the request body
// POST http://localhost:3001/items
// POST creates a resource
function postItems(card, token) {
  // when we remove the 's' from items you get a "Router not found" error
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Specify an authorization header with an appropriately
      // formatted value.
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: card.name,
      weather: card.weather,
      imageUrl: card.link,
    }),
  });
}

// PUT http://localhost:3001/items/:itemId/likes
// PUT replaces a resource
// Like: need authorization, and doesn't need entire card information
function addCardLike(id, token) {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Specify an authorization header with an appropriately
      // formatted value.
      Authorization: `Bearer ${token}`,
    },
  });
}

// DELETE
function removeCardLike(id, token) {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Specify an authorization header with an appropriately
      // formatted value.
      Authorization: `Bearer ${token}`,
    },
  });
}

// DELETE http://localhost:3001/items/:id
// ':id' represents a variable and SHOULD NOT be included in the FINAL URL
function deleteItems(id, token) {
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Specify an authorization header with an appropriately
      // formatted value.
      Authorization: `Bearer ${token}`,
    },
  });
}

// PATCH
function patchProfile(info, token) {
  return request(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Specify an authorization header with an appropriately
      // formatted value.
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: info.name,
      avatar: info.avatar,
    }),
  });
}

export {
  baseUrl,
  checkResponse,
  request,
  getItems,
  postItems,
  addCardLike,
  removeCardLike,
  deleteItems,
  patchProfile,
};
