import store from "../store";

const method = "POST";
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

async function getPosts(url) {
  const rawResponse = await fetch(url);
  return await rawResponse.json();
}

async function getPost(slug) {
  const rawResponse = await fetch(`http://localhost:8080/v1/posts/${slug}`);
  if (rawResponse.status !== 200) throw Error("No matching post found.");
  return await rawResponse.json();
}

async function createPost(title, content) {
  const { auth } = store.getState();
  const { token, isAuthenticated } = auth;
  if (!isAuthenticated) {
    return { error: "Unauthorized request." };
  }
  const rawResponse = await fetch("http://localhost:8080/v1/posts", {
    method,
    headers: { ...headers, Authorization: token },
    body: JSON.stringify({ Title: title, Content: content }),
  });
  return await rawResponse.json();
}

export { getPost, getPosts, createPost };
