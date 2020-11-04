import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Progress,
  CardText,
  CardBody,
  CardTitle,
  Container,
} from "reactstrap";

import { getPost } from "../api/posts";
import { setComments } from "../actions";
import { toDesiredFormat } from "../utils/tmf";
import { getPostComments } from "../api/comments";
import CommentList from "../components/CommentList";
import CreateComment from "../components/CreateComment";

function PostDetail() {
  const { slug } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments.comments);

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(true);

  useEffect(() => {
    getPost(slug)
      .then((post) => {
        setPost(post);
        setLoading(false);
        getPostComments(post.ID)
          .then((_comments) => dispatch(setComments(_comments)))
          .then(() => setCommentLoading(false));
      })
      .catch((_) => history.push("/not-found"));
  }, [slug, dispatch, setPost, history, setLoading]);

  return (
    <Container fluid>
      {loading ? (
        <Progress animated value={100} />
      ) : (
        <div>
          <br />
          <Row>
            <Col sm={12} md={{ size: 8, offset: 2 }}>
              <Card>
                <CardBody>
                  <CardTitle>
                    <h3>
                      {post.title}{" "}
                      <small className="text-secondary">
                        by <Link to="/">{post.user}</Link>
                      </small>
                    </h3>
                  </CardTitle>
                  <span className="text-secondary">
                    Published on {toDesiredFormat(post.CreatedAt)}
                  </span>
                  <hr />
                  <CardText
                    dangerouslySetInnerHTML={{
                      __html: post.content.replace(/\n/g, "<br />"),
                    }}
                  />
                  <CreateComment postID={post.ID} />
                </CardBody>
              </Card>
            </Col>
            <Col sm={12} md={{ size: 8, offset: 2 }}>
              <br />
              {commentLoading ? (
                <Progress
                  animated
                  value={100}
                  color="success"
                  className="mt-3"
                />
              ) : (
                <CommentList comments={comments} />
              )}
            </Col>
          </Row>
        </div>
      )}
      <br />
      <br />
      <br />
    </Container>
  );
}

export default PostDetail;
