import { getFetchConfigWithAuth } from "./utils";

const BASE_URL = "http://localhost:8080/v1/users";

async function getProfile(username) {
  const rawResponse = await fetch(`${BASE_URL}/${username}`);
  switch (rawResponse.status) {
    case 200:
      return await rawResponse.json();
    case 404:
      throw Error("Profile not found.");
    default:
      throw Error("Server error!");
  }
}

async function updatePassword(old_password, password) {
  const config = getFetchConfigWithAuth();
  const rawResponse = await fetch(`${BASE_URL}/password`, {
    ...config,
    body: JSON.stringify({ OldPassword: old_password, Password: password }),
  });
  switch (rawResponse.status) {
    case 200:
      return await rawResponse.json();
    default:
      throw Error("Server error!");
  }
}

async function updateProfile(username, name) {
  let rawResponse;
  try {
    const config = getFetchConfigWithAuth();
    rawResponse = await fetch(`${BASE_URL}/update`, {
      ...config,
      body: JSON.stringify({ Name: name, Username: username }),
    });
  } catch (e) {
    throw e;
  }
  if (rawResponse.status !== 200)
    throw Error(await rawResponse.json().toString());
  return await rawResponse.json();
}

async function getToken(username, password) {
  const rawResponse = await fetch(`${BASE_URL}/token`, {
    method: "POST",
    body: JSON.stringify({ Username: username, Password: password }),
  });
  switch (rawResponse.status) {
    case 200:
      return await rawResponse.json();
    case 401:
      throw Error("Invalid credentials provided");
    default:
      throw Error("Server error!");
  }
}

async function registerUser(name, username, password) {
  const config = getFetchConfigWithAuth(false);

  const rawResponse = await fetch(BASE_URL, {
    ...config,
    body: JSON.stringify({
      Name: name,
      Username: username,
      Password: password,
    }),
  });
  switch (rawResponse.status) {
    case 201:
      return await rawResponse.json();
    case 400:
      throw Error(await rawResponse.json());
    default:
      throw Error("Server error!");
  }
}

export { getToken, getProfile, updatePassword, updateProfile, registerUser };
