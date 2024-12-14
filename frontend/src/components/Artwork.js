import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Artwork = ({ artwork }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/artwork/${artwork._id}`}>
        <Card.Img src={artwork.imageUrl} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/artwork/${artwork._id}`}>
          <Card.Title as="div">
            <strong>{artwork.title}</strong>
          </Card.Title>
          <Card.Title as="div">
            <strong>By {artwork.artist.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <div className="my-3">
            {artwork.rating} from {artwork.numReviews} reviews
          </div>
        </Card.Text>

        <Card.Text as="div">
          <Rating
            value={artwork.rating}
            text={`${artwork.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as="h3">$ {artwork.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Artwork;
