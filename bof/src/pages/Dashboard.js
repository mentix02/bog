import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Container } from "reactstrap";

import { getPosts } from "../api/posts";
import PostList from "../components/PostList";

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const username = useSelector((state) => state.auth.username);

  useEffect(() => {
    if (username === null) return;
    getPosts(`http://localhost:8080/v1/users/${username}/posts`).then((posts) =>
      setPosts(posts)
    );
  }, [username, setPosts]);

  return (
    <Container>
      <div className="text-center">
        <br />
        <h2>Dashboard</h2>
        <h3>{username}'s posts</h3>
        <Button tag={Link} to="/write" color="success">
          Write Post
        </Button>
        &nbsp;&nbsp;
        <Button color="primary">Manage Posts</Button>
        <br />
      </div>
      <br />
      {posts.length === 0 ? (
        <h4 className="text-center text-danger">no posts yet</h4>
      ) : (
        <PostList posts={posts} />
      )}
    </Container>
  );
}

export default Dashboard;
