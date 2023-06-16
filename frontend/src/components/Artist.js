import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Styled from "styled-components";
import FollowButton from "./Buttons/FollowButton";

const FollowButtonBox = Styled.div`
  width: 100%;
  display: flex;
  justify-content: center;  
  align-items: center;
`;

const FollowBtn = Styled.button`
  background-color: #fff;
  color: #131721;
  text-transform: uppercase;
  font-family: "Lato";
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1px;
  border: 2px solid #131721;
  height: 3.5rem;
  padding: 10px 25px;
  width: 70%;

  &:hover {
    background-color: #131721;
    color: #fff;
    border: 2px solid #fff;
    cursor: pointer;
    
    transition: background-color .1s, color .1s, text-shadow .1s, box-shadow .1s;
  }
`;

const Artist = ({ artist }) => {
  const {
    user: { name, avatar },
    _id,
    yearOfBirth,
    nationality,
  } = artist;
  return (
    <Card
      style={{
        width: "20%",
        padding: "10px 10px",
        border: "none",
      }}
    >
      <Link to={`/artist/${_id}`}>
        <Card.Img src={avatar} variant="top" />
      </Link>
      <Card.Body
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "0px 0px",
          margin: "10px 0px",
        }}
      >
        <Card.Title
          as="div"
          style={{
            textAlign: "center",
            marginBottom: "0px",
          }}
        >
          <strong>{name}</strong>
        </Card.Title>
        <Card.Title
          as="div"
          style={{
            textAlign: "center",
            marginTop: "0",
            fontSize: "smaller",
            color: "#9c9c9c",
          }}
        >
          <strong>
            {nationality}, {yearOfBirth}
          </strong>
        </Card.Title>
        <FollowButtonBox>
          <FollowButton text="Follow"></FollowButton>
        </FollowButtonBox>
      </Card.Body>
    </Card>
  );
};

export default Artist;
