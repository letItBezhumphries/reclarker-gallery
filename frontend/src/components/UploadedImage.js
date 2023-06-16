import React from "react";
import { Image } from "react-bootstrap";

const UploadedImage = ({ url, thumb }) => {
  return <Image src={url} fluid thumbnail={thumb}></Image>;
};

export default UploadedImage;
