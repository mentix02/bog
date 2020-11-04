import React from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "reactstrap";

function NotFound() {
  return (
    <Container className="text-center text-danger">
      <br />
      <h4>Nothing Found in this Corner</h4>
      <Button color="primary" tag={Link} to="/">
        Go Home
      </Button>
    </Container>
  );
}

export default NotFound;
