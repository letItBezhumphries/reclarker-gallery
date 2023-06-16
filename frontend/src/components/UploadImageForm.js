import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";
import { ReactComponent as IconUpload } from "../assets/icons/SVG/upload.svg";
import { ReactComponent as IconFileType } from "../assets/icons/SVG/file-jpg.svg";
import { Form, Button, Col, Row, Card } from "react-bootstrap";
import { postImageForm } from "../actions/uploadActions";
import "../assets/styles/components/UploadImageForm.css";

const UploadImageForm = ({ click }) => {
  const params = useParams();
  const artworkId = params.id;

  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("");
  const [showImageProceed, setShowImageProceed] = useState(false);
  const dispatch = useDispatch();

  const uploadImage = useSelector((state) => state.uploadImage);
  const { loading, error, image, success } = uploadImage;

  useEffect(() => {
    if (image && success) {
      setShowImageProceed(true);
    }
  }, [image, success]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file, filename);
    dispatch(postImageForm(artworkId, formData));
  };

  const uploadFileHandler = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  return (
    <Form
      className="image-form"
      onSubmit={submitHandler}
      id="file-form"
      name="file-form"
      encType="multipart/form-data"
    >
      <Row className="image-row">
        <Col className="image-col-1">
          <Form.Group
            controlId="image"
            name="image"
            className="file-form-group m-3"
          >
            <Form.Control
              className="file-input"
              type="file"
              placeholder="Choose File"
              name="image"
              value={""}
              onChange={uploadFileHandler}
              aria-describedby="upload-help-block"
            ></Form.Control>
            <label
              className="file-label btn btn-outline-primary"
              htmlFor="image"
            >
              <IconUpload className="icon-upload" />
              <IconFileType className="icon-fileType" />
              <span className="upload-label-text">Choose File:</span>
            </label>
            {filename && (
              <p className="file-name">
                <strong>{filename}</strong>
              </p>
            )}
            {image && showImageProceed ? (
              <Form.Text id="upload-help-block">
                If this image is correct click to proceed.
              </Form.Text>
            ) : null}
          </Form.Group>
          {!image && !showImageProceed ? (
            <Button
              type="submit"
              variant="primary"
              className="upload-button"
              disabled={!filename ? true : false}
            >
              Upload
            </Button>
          ) : null}
        </Col>
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        {showImageProceed ? (
          <Col className="upload-image-display">
            <Card className="upload-image-card">
              <Card.Img
                src={image.imagePath}
                variant="top"
                fluid="true"
                thumbnail="true"
              />
            </Card>
            <Button
              variant="primary"
              onClick={click}
              style={{ borderColor: "blueviolet" }}
            >
              Proceed
            </Button>
          </Col>
        ) : null}
      </Row>
    </Form>
  );
};

export default UploadImageForm;
