import React from "react";
import { Link } from "react-router-dom";
import { Button, Col, Container, Jumbotron, Row } from "reactstrap";

function WelcomeJumbotron() {
  return (
    <Jumbotron>
      <Container>
        <Row>
          <Col>
            <h1>Welcome to Bof</h1>
            <p>
              A simple <i>et</i> fast, open-source blog application written
              using Go and React. Create an account today to write posts and
              comments!
            </p>
            <p>
              <Button tag={Link} color="success" to="/sign-up">
                Register
              </Button>
              &nbsp;or&nbsp;
              <Button tag={Link} color="primary" to="/sign-in">
                Sign In
              </Button>
            </p>
          </Col>
        </Row>
      </Container>
    </Jumbotron>
  );
}

export default WelcomeJumbotron;
