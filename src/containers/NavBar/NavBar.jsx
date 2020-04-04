import React from "react";
import styles from "./NavBar.module.scss";
import { Navbar, Button, Form } from "react-bootstrap";

const NavBar = () => {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Todo list by Bogdan</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavBar;
