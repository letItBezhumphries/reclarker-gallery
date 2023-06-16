import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ListGroup, Image, Row, Col, Form, Button } from "react-bootstrap";
import { addToCart, removeFromCart } from "../../actions/cartActions";

const DropdownItem = ({ item }) => {
  const dispatch = useDispatch();
  // console.log("item:", item);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <ListGroup.Item className="dropdown-cart-item" active="false">
      <Row className="dropdown-item-row">
        <Col md={2} className="dropdown-item-image">
          <Image src={item.image} alt={item.title} fluid rounded></Image>
        </Col>
        <Col className="dropdown-item-title">
          <Link to={`/artwork/${item.artwork}`}>{item.title}</Link>
        </Col>
        <Col className="dropdown-item-price">$ {item.price}</Col>
        <Col md={2} className="dropdown-item-qty">
          <span> x {item.qty}</span>
        </Col>
        <Col md={2} className="item-remove-btn">
          <Button
            type="button"
            variant="dark"
            onClick={() => removeFromCartHandler(item.artwork)}
          >
            <i className="fas fa-trash"></i>
          </Button>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default DropdownItem;
