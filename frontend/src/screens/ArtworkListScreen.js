import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col, Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import {
  listArtworks,
  deleteArtwork,
  createArtwork,
} from "../actions/artworkActions";
import { ARTWORK_CREATE_RESET } from "../constants/artworkConstants";
import { UPLOAD_IMAGE_ARTWORK_RESET } from "../constants/uploadConstants";

const ArtworkListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const pageNumber = params.pageNumber || 1;

  // artworkList state
  const artworkList = useSelector((state) => state.artworkList);
  const { artworks, pages, page, error, loading } = artworkList;

  // artwork delete state
  const artworkDelete = useSelector((state) => state.artworkDelete);
  const {
    success: successDelete,
    error: errorDelete,
    loading: loadingDelete,
  } = artworkDelete;

  // artworkCreate state
  const artworkCreate = useSelector((state) => state.artworkCreate);
  const {
    success: successCreate,
    error: errorCreate,
    loading: loadingCreate,
    artwork: createdArtwork,
  } = artworkCreate;

  // userInfo state
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: ARTWORK_CREATE_RESET });
    dispatch({ type: UPLOAD_IMAGE_ARTWORK_RESET });

    if (!userInfo.isAdmin) {
      navigate("/login");
    }

    if (successCreate) {
      navigate(`/admin/artwork/${createdArtwork._id}/edit`);
    } else {
      dispatch(listArtworks("", pageNumber));
    }
  }, [
    dispatch,
    userInfo,
    navigate,
    successDelete,
    successCreate,
    createdArtwork,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteArtwork(id));
    }
  };

  const createArtworkHandler = () => {
    dispatch(createArtwork());
  };

  return (
    <Container className="screen-container">
      <Row className="align-items-center">
        <Col>
          <h1>Artwork in Gallery</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createArtworkHandler}>
            <i className="fas fa-plus"></i> Create Artwork
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {loadingCreate && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th></th>
                <th>ID</th>
                <th>TITLE</th>
                <th>PRICE</th>
                <th>YEAR</th>
                <th>HEIGHT</th>
                <th>WIDTH</th>
                <th>CATEGORY</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {artworks.map((artwork) => (
                <tr key={artwork._id}>
                  <td>
                    <Card style={{ height: "10rem", overflowY: "hidden" }}>
                      <Card.Img
                        src={artwork.imageUrl}
                        alt={artwork.title}
                        variant="top"
                      />
                    </Card>
                  </td>
                  <td>{artwork._id}</td>
                  <td>{artwork.title}</td>
                  <td>$ {artwork.price}</td>
                  <td>{artwork.year}</td>
                  <td>{artwork.height}</td>
                  <td>{artwork.width}</td>
                  <td>{artwork.category}</td>
                  <td>
                    <LinkContainer to={`/admin/artwork/${artwork._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={(e) => deleteHandler(artwork._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </Container>
  );
};

export default ArtworkListScreen;
