import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Container } from "react-bootstrap";
import Artwork from "../components/Artwork";
import Paginate from "../components/Paginate";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listArtworks } from "../actions/artworkActions.js";
import ArtworkCarousel from "../components/ArtworkCarousel";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const keyword = params.keyword;
  const pageNumber = params.pageNumber || 1;

  const artworkList = useSelector((state) => state.artworkList);
  const { artworks, pages, page, error, loading } = artworkList;

  useEffect(() => {
    dispatch(listArtworks(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <Container className="screen-container">
      {!keyword ? (
        <ArtworkCarousel />
      ) : (
        <Link to={`/`} className="btn btn-light">
          Go Back
        </Link>
      )}
      <h1>Latest Artwork</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {artworks.map((artwork) => (
              <Col key={artwork._id} sm={12} md={6} lg={4}>
                <Artwork artwork={artwork} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </Container>
  );
};

export default HomeScreen;
