import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navbar, Container } from "react-bootstrap";
import ArtistLogoLink from "./ArtistLogoLink";
import SearchBox from "./SearchBox";
import { logout } from "../actions/userActions";
import Navigation from "./Navigation/Navigation";

const Header = () => {
  const [name, setName] = useState("Re-Clarker Gallery");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="main-header">
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        collapseOnSelect
        className="main-navbar"
      >
        <Container className="navbar-links-container" fluid>
          <div className="navbar-logo-wrapper">
            <ArtistLogoLink name={name}></ArtistLogoLink>
          </div>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="navbar-toggle"
          />
          <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>

          <div className="searchbox-wrapper">
            <SearchBox />
          </div>

          <Navigation />
        </Container>
      </Navbar>
    </header>
  );
};
export default Header;
