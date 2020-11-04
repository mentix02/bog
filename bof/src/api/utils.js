import store from "../store";

const defaultHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

function getFetchConfigWithAuth(force = true, method = "POST") {
  const { auth } = store.getState();
  const { token, isAuthenticated } = auth;

  if (!isAuthenticated && force) {
    throw Error("Unauthorized request!");
  }

  const config = {
    method,
    ...defaultHeaders,
  };

  if (isAuthenticated) config["Authorization"] = token;

  return config;
}

export { getFetchConfigWithAuth };
