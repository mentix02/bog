import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, NavLink as RouterNavLink } from "react-router-dom";
import {
  Nav,
  Navbar,
  NavItem,
  NavLink,
  Collapse,
  Container,
  NavbarBrand,
  NavbarToggler,
} from "reactstrap";

import { logOut } from "../actions";

function Navigation() {
  const history = useHistory();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.username);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [isOpen, setIsOpen] = useState(false);

  const onClickLogout = () => {
    dispatch(logOut());
    history.push("/");
  };
  const toggleNavbar = () => setIsOpen(!isOpen);

  return (
    <Navbar color="inverse" light expand="sm">
      <Container>
        <NavbarToggler onClick={toggleNavbar} />
        <NavbarBrand tag={Link} to="/">
          reactstrap
        </NavbarBrand>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {isAuthenticated ? (
              <>
                <NavItem>
                  <NavLink
                    to={`/profile/${username}`}
                    tag={RouterNavLink}
                    activeClassName="active"
                  >
                    Profile
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    to="/dashboard"
                    tag={RouterNavLink}
                    activeClassName="active"
                  >
                    Dashboard
                  </NavLink>
                </NavItem>
                <NavItem style={{ cursor: "pointer" }}>
                  <NavLink onClick={onClickLogout}>Logout</NavLink>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem>
                  <NavLink
                    tag={RouterNavLink}
                    activeClassName="active"
                    to="/sign-in"
                  >
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag={RouterNavLink}
                    activeClassName="active"
                    to="/sign-up"
                  >
                    Register
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
