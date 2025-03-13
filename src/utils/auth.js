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

// POST /signup for user registration
function signUp(info) {
  return request(`${baseUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: info.name,
      avatar: info.avatar,
      email: info.email,
      password: info.password,
    }),
  });
}

// POST /signin for user authorization
function signIn(info) {
  return request(`${baseUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: info.email,
      password: info.password,
    }),
  });
}

export { signUp, signIn };
