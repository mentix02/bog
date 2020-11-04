import React from "react";
import { Container, Nav, Navbar, NavbarText } from "reactstrap";

function Footer() {
  return (
    <div className="fixed-bottom mt-3">
      <Navbar style={{ backgroundColor: "#f5f5f5" }}>
        <Container>
          <Nav navbar>
            <NavbarText>bog &copy;</NavbarText>
          </Nav>
          <NavbarText>created by mentix02</NavbarText>
        </Container>
      </Navbar>
    </div>
  );
}

export default Footer;
