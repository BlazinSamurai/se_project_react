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
//POST creates a resource
function postItems(card) {
  return fetch(`${baseUrl}items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: card.name,
      weather: card.weather,
      imageUrl: card.link,
    }),
  })
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    })
    .then((result) => {
      // console.log("Post result:", result, " post result id?: ", result._id);
      return result;
    });
}

// PATCH http://localhost:3001/items/:id
// PATCH updates a resource
function patchItems(card, id) {
  return fetch(`${baseUrl}items/${id}`, {
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
  })
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    })
    .then((result) => {
      console.log("Patch result:", result);
      // return result;
    });
}

// PUT http://localhost:3001/items/:id
// PUT replaces a resource
function putItems(card, id) {
  return fetch(`${baseUrl}items/${id}`, {
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
  })
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    })
    .then((result) => {
      console.log("Put result:", result);
      // return result;
    });
}

// DELETE http://localhost:3001/items/:id
// ':id' represents a variable and SHOULD NOT be included in the FINAL URL
function deleteItems(id) {
  return fetch(`${baseUrl}items/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    })
    .then((results) => console.log(results));
}

export { getItems, postItems, patchItems, putItems, deleteItems };
