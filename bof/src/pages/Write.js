import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Col,
  Row,
  Form,
  Alert,
  Input,
  Label,
  Button,
  Progress,
  Container,
  FormGroup,
} from "reactstrap";

import { createPost } from "../api/posts";

function Write() {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [alertColor, setAlertColor] = useState("danger");

  const inputReducers = {
    title: setTitle,
    content: setContent,
  };

  const onDismiss = () => setShowMessage(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    inputReducers[name](value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const responseContent = await createPost(title, content);
    console.log(responseContent);
    if (responseContent["slug"]) {
      setAlertColor("success");
      setMessage("Post uploaded successfully... redirecting.");
      setLoading(false);
      setShowMessage(true);
      setTimeout(() => history.push(`/post/${responseContent.slug}`), 1500);
    } else {
      setMessage(responseContent);
      setLoading(false);
      setShowMessage(true);
    }
  };

  return (
    <Container>
      <br />
      <h2 className="text-center">Write a Post</h2>
      <br />
      <Row>
        <Col sm={12} md={{ size: 6, offset: 3 }}>
          {loading ? (
            <Progress animated value={100} />
          ) : (
            <Form onSubmit={onSubmit}>
              <Alert color={alertColor} isOpen={showMessage} toggle={onDismiss}>
                {message}
              </Alert>
              <FormGroup>
                <Label for="username">Title</Label>
                <Input
                  id="title"
                  onChange={onChange}
                  name="title"
                  type="text"
                  value={title}
                  autoFocus
                />
              </FormGroup>
              <FormGroup>
                <Label for="content">Content</Label>
                <Input
                  id="content"
                  onChange={onChange}
                  name="content"
                  type="textarea"
                  value={content}
                  rows={6}
                />
              </FormGroup>
              <FormGroup className="text-center">
                <Button
                  type="submit"
                  color="primary"
                  onClick={onSubmit}
                  className="mt-3 px-4 py-2"
                >
                  Create Post
                </Button>
              </FormGroup>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Write;
