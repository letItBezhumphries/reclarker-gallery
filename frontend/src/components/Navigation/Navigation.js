import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DropdownCartMenu from "./DropdownCartMenu";
import { logout } from "../../actions/userActions";
import "../../assets/styles/components/Navigation.css";

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);
  const [showCartItemsCount, setShowCartItemsCount] = useState(false);
  const [itemsCount, setItemsCount] = useState(0);

  // user login state
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // cart state
  const cart = useSelector((state) => state.cart);
  const { cartItems: items } = cart;

  // need to check if the admin
  useEffect(() => {
    if (items.length > 0) {
      let count = items.reduce((acc, item) => acc + item.qty, 0);
      setItemsCount(count);
      setShowCartItemsCount(true);
    }
  }, [items, itemsCount]);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleCartClick = (e) => {
    navigate("/cart");
  };

  const handleShowCartMenu = (e) => {
    setShowCartDropdown(true);
  };

  const handleHideCartMenu = (e) => {
    setShowCartDropdown(false);
  };

  const handleShowProfileMenu = (e) => {
    setShowProfileDropdown(true);
  };

  const handleHideProfileMenu = (e) => {
    setShowProfileDropdown(false);
  };

  const handleShowAdminMenu = (e) => {
    setShowAdminDropdown(true);
  };

  const handleHideAdminMenu = (e) => {
    setShowAdminDropdown(false);
  };

  return (
    <Nav className="nav-dropdown">
      <LinkContainer to="/exhibits" className="link-wrapper">
        <Nav.Link to="/exhibits">Exhibits</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/artists" className="link-wrapper">
        <Nav.Link to="/artists">Artists</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/cart" className="link-wrapper">
        <NavDropdown
          title={
            <div className="navlink">
              <span className="navlink-text">Cart</span>
              <i className="fas fa-shopping-cart navlink-icon"></i>
              <span
                className="nav-link-badge"
                style={
                  showCartItemsCount ? { display: "flex" } : { display: "none" }
                }
              >
                {itemsCount}
              </span>
            </div>
          }
          id="nav-cart-dropdown"
          className="dropdown-menu-cart"
          show={showCartDropdown}
          onMouseEnter={handleShowCartMenu}
          onMouseLeave={handleHideCartMenu}
          onClick={handleCartClick}
        >
          <DropdownCartMenu />
        </NavDropdown>
      </LinkContainer>
      {userInfo ? (
        <LinkContainer
          to="/profile"
          className="link-wrapper profile-link-wrapper"
        >
          <NavDropdown
            title={
              <div className="navlink">
                <span className="navlink-text">{userInfo.name}</span>
                <i className="fa-solid fa-angle-down navlink-icon"></i>
              </div>
            }
            id="username"
            show={showProfileDropdown}
            onMouseEnter={handleShowProfileMenu}
            onMouseLeave={handleHideProfileMenu}
          >
            <LinkContainer to="/profile">
              <NavDropdown.Item>Profile</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
          </NavDropdown>
        </LinkContainer>
      ) : (
        <LinkContainer to="/login" className="link-wrapper login-link">
          <Nav.Link to="/login">
            <div className="navlink-login">
              <i className="fas fa-user"></i>
              <span className="navlink-text-signin">Sign In</span>
            </div>
          </Nav.Link>
        </LinkContainer>
      )}
      {userInfo && userInfo.isAdmin && (
        <LinkContainer to="/" className="link-wrapper">
          <NavDropdown
            title={
              <div className="navlink">
                <span className="navlink-text">Admin</span>
                <i className="fa-solid fa-angle-down navlink-icon"></i>
              </div>
            }
            rootCloseEvent="click"
            menuVariant="dark"
            id="adminmenu"
            show={showAdminDropdown}
            onMouseEnter={handleShowAdminMenu}
            onMouseLeave={handleHideAdminMenu}
          >
            <LinkContainer to="/admin/userlist">
              <NavDropdown.Item>Users</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/admin/artworklist">
              <NavDropdown.Item>Artwork</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/admin/exhibitlist">
              <NavDropdown.Item>Exhibitions</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/admin/orderlist">
              <NavDropdown.Item>Orders</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
        </LinkContainer>
      )}
    </Nav>
  );
};

export default Navigation;
