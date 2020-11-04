import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Row,
  Col,
  Form,
  Alert,
  Input,
  Label,
  Button,
  Progress,
  FormGroup,
  Container,
} from "reactstrap";

import { registerUser } from "../api/auth";

function SignUp() {
  const history = useHistory();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => (isAuthenticated ? history.push("/") : ""), [
    history,
    isAuthenticated,
  ]);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, showLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [alertColor, setAlertColor] = useState("danger");

  const inputReducers = {
    name: setName,
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
      !(username && password && name) ||
      name.length === 0 ||
      username.length === 0 ||
      password.length === 0
    ) {
      setShowMessage(true);
      setMessage("Cannot leave either field empty.");
    } else {
      registerUser(name, username, password)
        .then((_) => {
          setAlertColor("success");
          setMessage("Registered successfully... redirecting.");
          showLoading(false);
          setShowMessage(true);
          setTimeout(() => history.push("/sign-in"), 1500);
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
    <div>
      <Container>
        <br />
        <h2 className="text-center">Join Us Today</h2>
        <br />
        <Row>
          <Col sm={12} md={{ size: 6, offset: 3 }}>
            {loading ? (
              <Progress animated value={100} />
            ) : (
              <Form>
                <Alert
                  color={alertColor}
                  isOpen={showMessage}
                  toggle={onDismiss}
                >
                  {message}
                </Alert>
                <FormGroup>
                  <Label for="username">Name</Label>
                  <Input
                    id="name"
                    onChange={onChange}
                    name="name"
                    type="text"
                    value={name}
                    autoFocus
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="username">Username</Label>
                  <Input
                    id="username"
                    onChange={onChange}
                    name="username"
                    type="text"
                    value={username}
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
                    color="success"
                    onClick={onSubmit}
                    className="mt-3 px-5 py-2"
                  >
                    Register
                  </Button>
                </FormGroup>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SignUp;
