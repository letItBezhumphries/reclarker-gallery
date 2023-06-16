import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Form,
  Row,
  Col,
  Button,
  InputGroup,
  Image,
  Container,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import UploadImageForm from "../components/UploadImageForm";
import {
  listSelectedArtworkDetails,
  updateArtwork,
} from "../actions/artworkActions";
import { ARTWORK_UPDATE_RESET } from "../constants/artworkConstants";
import { UPLOAD_IMAGE_ARTWORK_RESET } from "../constants/uploadConstants";

const ArtworkEditScreen = () => {
  const params = useParams();
  const artworkId = params.id;

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [year, setYear] = useState(0);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [materials, setMaterials] = useState("");
  const [location, setLocation] = useState("");
  const [subject, setSubject] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // artworkDetails state
  const artworkDetails = useSelector((state) => state.artworkDetails);
  const { loading, error, artwork } = artworkDetails;

  // the artworkUpdate state
  const artworkUpdate = useSelector((state) => state.artworkUpdate);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = artworkUpdate;

  const uploadImage = useSelector((state) => state.uploadImage);
  const {
    loading: loadingImage,
    error: errorImage,
    success: uploadSuccess,
    image: uploadedImage,
  } = uploadImage;

  useEffect(() => {
    // need to check if the artwork has been updated
    if (uploadSuccess && uploadedImage) {
      console.log("in useEffect 1 uploadsuccess: -> artwork:", artwork);
      setFileName(artwork.fileName);
      setImageUrl(artwork.imageUrl);
    }
    if (successUpdate) {
      dispatch({ type: ARTWORK_UPDATE_RESET });
      dispatch({ type: UPLOAD_IMAGE_ARTWORK_RESET });
      navigate(`/admin/artworklist`);
    } else {
      if (!artwork.title || artwork._id !== artworkId) {
        dispatch(listSelectedArtworkDetails(artworkId));
      } else {
        console.log("in useEffect 1: -> artwork:", artwork);
        setFileName(artwork.fileName);
        setImageUrl(artwork.imageUrl);
        setShowForm(false);
      }
    }
  }, [
    dispatch,
    artworkId,
    artwork,
    successUpdate,
    navigate,
    uploadedImage,
    uploadSuccess,
  ]);

  // this useEffect checks whether the image file was posted to s3 with returned key set in uploadImage redux state
  useEffect(() => {
    if (uploadSuccess && uploadedImage) {
      console.log(
        "in useEffect image has uploaded:",
        uploadSuccess,
        "image:",
        uploadedImage
      );
      setShowImage(true);
    }
  }, [uploadedImage, uploadSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateArtwork({
        _id: artworkId,
        title,
        price,
        imageUrl: imageUrl,
        fileName,
        year,
        location,
        width,
        height,
        countInStock,
        description,
        category,
        materials,
        subject,
      })
    );
  };

  const handleImageProceedClick = () => {
    setShowForm(true);
    // dispatch({ type: UPLOAD_IMAGE_ARTWORK_RESET });
  };

  return (
    <Container className="screen-container">
      <Link to="/admin/artworklist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h2 className="fw-lighter mb-4">
          {!showForm ? "Add Image To Showcase Artwork" : "Add Artwork Details"}
        </h2>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {!showForm ? (
          <>
            <Row>
              <UploadImageForm click={() => handleImageProceedClick()} />
            </Row>
          </>
        ) : loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="title" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title for artwork"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price" className="mb-3">
              <Form.Label>Price</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text className="mb-3">$</InputGroup.Text>
                <Form.Control
                  type="number"
                  placeholder="Enter price for artwork"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
              </InputGroup>
            </Form.Group>
            <Row>
              <Col>
                <Form.Group controlId="imageUrl" className="mb-3">
                  <Form.Label>Image</Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Text className="mb-3">
                      File Name :
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      value={fileName}
                      disabled
                      readOnly
                    ></Form.Control>
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col>
                <Image src={imageUrl} alt={fileName} fluid />
              </Col>
            </Row>

            <Form.Group controlId="year" className="mb-3">
              <Form.Label>Year of work</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter year artwork created"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="height" className="mb-3">
              <Form.Label>Height in cm</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter height in centimeters"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="width" className="mb-3">
              <Form.Label>Width in cm</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter width in centimeters"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="subject" className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a subject for artwork"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="location" className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter artwork location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category" className="mb-3">
              <Form.Label>Category of Art</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter an art category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="materials" className="mb-3">
              <Form.Label>Materials Used</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter materials used"
                value={materials}
                onChange={(e) => setMaterials(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock" className="mb-3">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter the count in stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a description about artwork"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                as="textarea"
                rows={5}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Form>
        )}
      </FormContainer>
    </Container>
  );
};

export default ArtworkEditScreen;
