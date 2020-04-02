import React from "react";
import styles from "./NavBar.module.scss";
import { Navbar, Button, Form } from "react-bootstrap";

const NavBar = () => {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Todo list by BN</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
        <Form inline>
          <Button variant="outline-success">Login</Button>
        </Form>
        <Form inline>
          <Button variant="outline-success">Logout</Button>
        </Form>
      </Navbar>
    </>
  );
};

export default NavBar;
