import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";

import PostListItem from "./PostListItem";

function PostList(props) {
  const { posts } = props;

  return (
    <Row>
      <Col sm={12} md={{ size: 6, offset: 3 }}>
        {posts.map((post, idx) => (
          <PostListItem
            key={idx}
            slug={post.slug}
            title={post.title}
            author={post.user}
            CreatedAt={new Date(post.CreatedAt).toDateString()}
          />
        ))}
      </Col>
    </Row>
  );
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    )
  ).isRequired,
};

export default PostList;
