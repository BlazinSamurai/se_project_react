const baseUrl = "http://localhost:3001/";

function getItems() {
  return fetch(`${baseUrl}items`).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

// Id values are not mutable. Any id value in the body of your PUT or PATCH request
// will be ignored. Only a value set in a POST request will be respected, but only if not already taken
// A POST, PUT or PATCH request should include a Content-Type: application/json
// header to use the JSON in the request body
// Not sure if I set the header correctly?:
// headers: "Content-Type: application/json",
// Content-Type: application/json,
function postItems(card) {
  return fetch(`${baseUrl}items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      imageUrl: card.link,
      name: card.name,
      weather: card.weather,
    }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

// DELETE http://localhost:3001/items/:id
// ':id' represents a variable and SHOULD NOT be included in the FINAL URL
function deleteItems(id) {
  return fetch(`${baseUrl}items/${id}`, {
    method: "DELETE",
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

export { getItems, postItems, deleteItems };
