import { baseUrl, request } from "./api";

// POST /signup for user registration
function signUp(info) {
  return request(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: info.email,
      password: info.password,
      name: info.name,
      avatar: info.avatarUrl,
    }),
  });
}

// POST /signin for user authorization
function signIn(info) {
  return request(`${baseUrl}/signin`, {
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

// getContent accepts the token as an argument.
// Send a GET request to /users/me
function getUserInfo(token) {
  return request(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Specify an authorization header with an appropriately
      // formatted value.
      Authorization: `Bearer ${token}`,
    },
  });
}

export { signUp, signIn, getUserInfo };
