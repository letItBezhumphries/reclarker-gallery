import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import transformToPrice from "../../utils/transformToPrice";
import "../../assets/styles/components/DropdownCartMenu.css";
import DropdownItem from "./DropdownItem";

const DropdownCartMenu = () => {
  const [cartTotal, setCartTotal] = useState(0);

  // user login state
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // cart state
  const cart = useSelector((state) => state.cart);
  const { cartItems: items } = cart;

  // need to check if the admin
  useEffect(() => {
    if (items.length > 0) {
      setCartTotal(
        items.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)
      );
    }
  }, [items, cartTotal]);

  let cartItems = items.map((item) => (
    <DropdownItem key={item.artwork} item={item} />
  ));

  const emptyCartList = (
    <p
      className="dropdown-cart-item dropdown-cart-item--empty"
      style={{ borderBottom: "1px solid black" }}
    >
      NO PRODUCTS IN THE CART.
    </p>
  );

  return (
    <div className="cart-list-container">
      <ListGroup variant="flush" className="dropdown-cart-list">
        {items.length > 0 ? cartItems : emptyCartList}
        <ListGroup.Item
          className="dropdown-cart-item--header"
          style={{ padding: "10px 0px" }}
        >
          <Link
            to={!userInfo ? "/login" : "/cart"}
            className="button button-white dropdown-cart-btn"
          >
            CART
            <i className="fas fa-shopping-cart dropdown-cart-icon"></i>
          </Link>
          <span className="dropdown-cart-summary">
            TOTAL :{" "}
            <span className="dropdown-cart-total">
              $ {transformToPrice(cartTotal)}
            </span>
          </span>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default DropdownCartMenu;
