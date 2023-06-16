import React from "react";
import Styled from "styled-components";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const ArtworkSlide = Styled(Card)`
  width: 220px;
  height: 100%;
  border: none;
`;

const ArtworkTitle = Styled(Card.Title)`
  font-size: 12px;
  color: #131721;

  & span {
    font-size: 10px;
  }
`;

const ArtowrkDetails = Styled(Card.Text)`
  font-size: 10px;
  color: #9c9c9c;
`;

const ArtworkCard = ({ artwork }) => {
  return (
    <ArtworkSlide>
      <Link to={`/artwork/${artwork._id}`}>
        <Card.Img src={artwork.imageUrl} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/artwork/${artwork._id}`}>
          <ArtworkTitle as="div">
            <strong>{artwork.title},</strong>
            <span>{artwork.year}</span>
          </ArtworkTitle>
          <ArtowrkDetails as="div">
            {artwork.materials}
            <p>
              {artwork.height} by {artwork.width} cm
            </p>
          </ArtowrkDetails>
        </Link>
      </Card.Body>
    </ArtworkSlide>
  );
};

export default ArtworkCard;
