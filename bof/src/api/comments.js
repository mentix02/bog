import store from "../store";

const method = "POST";
const errMessage = "Something went wrong!";
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

async function getPostComments(post_id) {
  const rawResponse = await fetch(
    `http://localhost:8080/v1/comments/${post_id}`
  );
  if (rawResponse.status !== 200) throw Error(errMessage);
  return await rawResponse.json();
}

async function deletePostComment(comment_id) {
  const { auth } = store.getState();
  const { token, isAuthenticated } = auth;
  if (!isAuthenticated) {
    throw Error("Unauthorized request.");
  }
  const rawResponse = await fetch(
    `http://localhost:8080/v1/comments/${comment_id}`,
    {
      method: "DELETE",
      headers: { ...headers, Authorization: token },
    }
  );
  if (rawResponse.status !== 200) throw Error(errMessage);
  return await rawResponse.json();
}

async function createPostComment(post_id, content) {
  const { auth } = store.getState();
  const { token, isAuthenticated } = auth;
  if (!isAuthenticated) {
    throw Error("Unauthorized request.");
  }
  const rawResponse = await fetch(
    `http://localhost:8080/v1/comments/${post_id}`,
    {
      method,
      headers: { ...headers, Authorization: token },
      body: JSON.stringify({ Content: content }),
    }
  );
  if (rawResponse.status !== 201) throw Error(errMessage);
  return await rawResponse.json();
}

export { getPostComments, deletePostComment, createPostComment };
