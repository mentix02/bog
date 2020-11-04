import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { getPosts } from "../api/posts";
import PostList from "../components/PostList";
import WelcomeJumbotron from "../components/WelcomeJumbotron";

function Home() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts("http://localhost:8080/v1/posts").then((data) => setPosts(data));
  }, [setPosts]);

  return (
    <div>
      {!isAuthenticated ? <WelcomeJumbotron /> : ""} <br />{" "}
      <PostList posts={posts} />
    </div>
  );
}

export default Home;
