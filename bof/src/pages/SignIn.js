import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Row,
  Col,
  Form,
  Label,
  Alert,
  Input,
  Button,
  Progress,
  Container,
  FormGroup,
} from "reactstrap";

import { getToken } from "../api/auth";
import { setToken } from "../actions";

function SignIn() {
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => (isAuthenticated ? history.push("/") : ""), [
    history,
    isAuthenticated,
  ]);

  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, showLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [alertColor, setAlertColor] = useState("danger");

  const inputReducers = {
    username: setUsername,
    password: setPassword,
  };

  const onDismiss = () => setShowMessage(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    inputReducers[name](value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    showLoading(true);
    if (
      !(username && password) ||
      username.length === 0 ||
      password.length === 0
    ) {
      setShowMessage(true);
      setMessage("Cannot leave either field empty.");
    } else {
      getToken(username, password)
        .then((data) => {
          const token = data.token;
          setAlertColor("success");
          setMessage("Logged in successfully... redirecting.");
          showLoading(false);
          setShowMessage(true);
          dispatch(setToken(token, username));
          history.push("/");
        })
        .catch((err) => {
          setAlertColor("danger");
          setMessage(err.message);
          showLoading(false);
          setShowMessage(true);
        });
    }
  };

  return (
    <Container>
      <br />
      <h2 className="text-center">
        {loading ? "Signing In..." : "Welcome Back"}
      </h2>
      <br />
      <Row>
        <Col sm={12} md={{ size: 6, offset: 3 }}>
          {loading ? (
            <Progress animated value={100} />
          ) : (
            <Form>
              <Alert color={alertColor} isOpen={showMessage} toggle={onDismiss}>
                {message}
              </Alert>
              <FormGroup>
                <Label for="username">Username</Label>
                <Input
                  id="username"
                  onChange={onChange}
                  name="username"
                  type="text"
                  value={username}
                  autoFocus
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  onChange={onChange}
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                />
              </FormGroup>
              <FormGroup className="text-center">
                <Button
                  type="submit"
                  color="primary"
                  onClick={onSubmit}
                  className="mt-3 px-5 py-2"
                >
                  Login
                </Button>
              </FormGroup>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default SignIn;
