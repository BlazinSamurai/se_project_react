const baseUrl = "http://localhost:3001/";

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
  return request(`${baseUrl}items`);
}

// Id values are not mutable. Any id value in the body of your PUT or PATCH request
// will be ignored. Only a value set in a POST request will be respected, but only if not already taken
// A POST, PUT or PATCH request should include a Content-Type: application/json
// header to use the JSON in the request body
// POST http://localhost:3001/items
// POST creates a resource
function postItems(card) {
  // when we remove the 's' from items you get a "Router not found" error
  return request(`${baseUrl}items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: card.name,
      weather: card.weather,
      imageUrl: card.link,
    }),
  });
}

// PATCH http://localhost:3001/items/:id
// PATCH updates a resource
function patchItems(card, id) {
  return request(`${baseUrl}items/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: card.name,
      weather: card.weather,
      imageUrl: card.link,
      // _id: card.id,
    }),
  });
}

// PUT http://localhost:3001/items/:id
// PUT replaces a resource
function putItems(card, id) {
  return request(`${baseUrl}items/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: card.name,
      weather: card.weather,
      imageUrl: card.link,
      // _id: card.id,
    }),
  });
}

// DELETE http://localhost:3001/items/:id
// ':id' represents a variable and SHOULD NOT be included in the FINAL URL
function deleteItems(id) {
  return request(`${baseUrl}items/${id}`, {
    method: "DELETE",
  });
}

// GET   http://localhost:3001/profile
function getProfile() {
  return request(`${baseUrl}profile`);
}

// PATCH /profile
function patchProfile(info) {
  return request(`${baseUrl}profile`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: info.name,
      avatar: info.avatar,
    }),
  });
}

export {
  getItems,
  postItems,
  patchItems,
  putItems,
  deleteItems,
  getProfile,
  patchProfile,
};
