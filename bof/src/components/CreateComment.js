import React, { useState } from "react";

import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Button, Form, FormGroup, Input } from "reactstrap";

import { addComment } from "../actions";
import { createPostComment } from "../api/comments";

function CreateComment(props) {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");

  const onChange = (e) => {
    setContent(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setContent("");
    createPostComment(props.postID, content)
      .then((comment) => dispatch(addComment(comment)))
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Input
            id="content"
            placeholder="Add Comment"
            name="content"
            onChange={onChange}
            rows={3}
            value={content}
            type="textarea"
          />
        </FormGroup>
        <Button color="success" type="submit">
          Comment
        </Button>
      </Form>
    </div>
  );
}

CreateComment.propTypes = {
  postID: PropTypes.number.isRequired,
};

export default CreateComment;
