import React, { useState, useEffect } from "react";
import Styled from "styled-components";
import { Breadcrumb } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { ReactComponent as IconRight } from "../assets/icons/SVG/chevron-thin-right.svg";

const BreadCrumbContainer = Styled(Breadcrumb)`
  height: 50px;
  display: flex;
  align-items: center;
  margin: 2rem 3rem 0 6rem;
`;

const BreadCrumbActive = Styled(Link)`
  font-size: 12px;
  color: #9c9c9c;
  text-transform: capitalize;
  text-decoration: none;
  text-align: center;
`;

const BreadCrumb = Styled(Link)`
  font-size: 12px;
  color: #9c9c9c;
  font-style: italic; 
  text-transform: capitalize;
  text-decoration: underline;
  text-align: center;
  margin-right: .5rem;
  
  &:hover {
    cursor: pointer;
  }
`;

const BreadCrumbs = ({ artist }) => {
  const [artistName, setArtistName] = useState("");
  const params = useParams();
  const artistId = params.id;

  useEffect(() => {
    if (artist.user) {
      setArtistName(artist.user.name);
    }
  }, [artist]);

  return (
    <BreadCrumbContainer>
      <BreadCrumb to={`/artists`}>Artists</BreadCrumb>
      <IconRight
        style={{
          height: "10px",
          width: "10px",
          fill: "#c9c9c9",
          alignSelf: "center",
          marginRight: ".5rem",
        }}
      />
      <BreadCrumb to={`/artist/${artistId}`}>{artistName}</BreadCrumb>
      <IconRight
        style={{
          height: "10px",
          width: "10px",
          fill: "#c9c9c9",
          alignSelf: "center",
          marginRight: ".5rem",
        }}
      />
      <BreadCrumbActive to={`/artist/${artistId}`}>Overview</BreadCrumbActive>
    </BreadCrumbContainer>
  );
};

export default BreadCrumbs;
