import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Styled from "styled-components";
import transformDate from "../utils/transformDate";
import { ReactComponent as IconLocation } from "../assets/icons/SVG/location-pin.svg";

const CardRow = Styled(Card)`
  width: 80%;
  height: 200px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: auto 0 2.5rem 0;
  border: none;
`;

const TitleLink = Styled(Link)`
  text-decoration: none;
  color: #3a3a3a;
  font-size: 15px;
  font-weight: 100;
  &:hover {
    text-decoration: none;
    color: #cf6766;
    cursor: pointer;
  }
  &:focus {
    text-decoration: none;
    color: #cf6766;
    cursor: pointer;
  }
`;

const GalleryLink = Styled(Link)`
  text-decoration: none;
  color: #3a3a3a;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: .25px;
  font-weight: 100;

  &:hover {
    text-decoration: none;
    color: #cf6766;
    cursor: pointer;
  }
  &:focus {
    text-decoration: none;
    color: #cf6766;
    cursor: pointer;
  }
`;

const Image = Styled(Card.Img)`
  width: 100%;
  height: 100%;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const TextBox = Styled(Card.Body)`
  width: 70%;
  height: 1fr;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 2rem;
`;

const TitleRow = Styled(Card.Title)`
  flex: 27%;
  height: 1fr;
  margin: 0 0;
  padding-top: 2rem;
  padding-left: 2.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const GalleryRow = Styled(Card.Subtitle)`
  flex: 10%;
  height: 1fr;
  padding: 0 2.5rem;
  font-size: 12px;
  font-weight: 100;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LocationRow = Styled(Card.Text)`
  flex: 1%;
  height: 1fr;
  font-size: 10px;
  font-weight: 100;
  margin: 0 0;
  padding: 0 2.5rem;
  text-transform: uppercase;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const DateRow = Styled(Card.Text)`
  flex: 1%;
  height: 1fr;
  font-size: 10px;
  font-weight: 100;
  padding: 0 2.5rem;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const Exhibition = ({ exhibit }) => {
  const [eventDate, setEventDate] = useState("");

  useEffect(() => {
    let formattedDate = transformDate(exhibit.startDate, exhibit.endDate);
    setEventDate(formattedDate);
  }, [eventDate, transformDate]);

  const thumbnail = {
    backgroundImage: `url(${exhibit.imageUrl})`,
  };

  return (
    <CardRow>
      <Link
        to={`/exhibit/${exhibit._id}`}
        style={{
          width: "30%",
          padding: "10px 10px",
        }}
      >
        <Image style={thumbnail}></Image>
      </Link>
      <TextBox>
        <TitleRow>
          <TitleLink to={`/exhibit/${exhibit._id}`}>
            {exhibit.title}
            {exhibit.subTitle ? `: ${exhibit.subTitle}` : null}
          </TitleLink>
        </TitleRow>
        <GalleryRow>
          <GalleryLink to={`/exhibit/${exhibit._id}`}>
            {exhibit.galleryName} GALLERY, {exhibit.location.city}
          </GalleryLink>
        </GalleryRow>
        <LocationRow>
          <IconLocation
            style={{ height: "13px", width: "13px", fill: "#cf6766" }}
          />{" "}
          {exhibit.location.city} | {exhibit.location.state} |{" "}
          {exhibit.location.country}
        </LocationRow>
        <DateRow>{eventDate}</DateRow>
      </TextBox>
    </CardRow>
  );
};

export default Exhibition;
