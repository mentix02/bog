import React from "react";

import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemText,
  ListGroupItemHeading,
} from "reactstrap";

import { deleteComment } from "../actions";
import { toDesiredFormat } from "../utils/tmf";
import { deletePostComment } from "../api/comments";

function CommentList(props) {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.username);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const onClickDeleteComment = (id, index) => {
    dispatch(deleteComment(index));
    deletePostComment(id).then((data) => {
      console.log(data);
    });
  };

  return (
    <ListGroup>
      <ListGroupItem active>
        <ListGroupItemHeading>Comments</ListGroupItemHeading>
      </ListGroupItem>
      {props.comments.length === 0 ? (
        <ListGroupItem>
          <ListGroupItemHeading className="text-danger">
            No comments found.
          </ListGroupItemHeading>
        </ListGroupItem>
      ) : (
        props.comments.map((comment, idx) => (
          <ListGroupItem className="pb-0" key={idx}>
            <ListGroupItemHeading>
              {comment.user}
              <small className="text-muted float-right">
                {toDesiredFormat(comment.CreatedAt, true)}
                {isAuthenticated && username === comment.user ? (
                  <FontAwesomeIcon
                    size="lg"
                    color="red"
                    icon={faTrash}
                    className="ml-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => onClickDeleteComment(comment.ID, idx)}
                  />
                ) : (
                  ""
                )}
              </small>
            </ListGroupItemHeading>
            <ListGroupItemText>{comment.content}</ListGroupItemText>
          </ListGroupItem>
        ))
      )}
    </ListGroup>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CommentList;
