import React from "react";
import { Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import ScrollerTabsNav from "./ScrollerTabsNav";
import FollowButton from "./Buttons/FollowButton";
import { ReactComponent as IconLeft } from "../assets/icons/SVG/chevron-thin-left.svg";
import { ReactComponent as IconRight } from "../assets/icons/SVG/chevron-thin-right.svg";
import "../assets/styles/components/FeaturedArtistSlide.css";

const FeaturedArtistSlide = ({ artist, prev, next, curIdx, select }) => {
  const {
    user: { name, avatar, _id },
    yearOfBirth,
    nationality,
    artworkPicture,
    exhibitions,
    artwork,
  } = artist;

  const bgImage = {
    backgroundImage: `url(${artworkPicture})`,
  };

  return (
    <div className="scroller-background" style={bgImage}>
      <div className="scroller-background-filter">
        <div className="left-iconbox" onClick={() => prev(curIdx)}>
          <IconLeft className="icon-left" />
        </div>
        <Col className="left-col">
          <div className="left-box">
            <Image src={avatar} alt={name} className="artist-pic" fluid />
          </div>
        </Col>
        <Col className="right-col">
          <div className="right-box">
            <div className="text-box">
              <div className="artist-info-outline"></div>
              <h1 className="artist-heading">
                <Link className="artist-name" to={`/artists/${_id}`}>
                  {name}
                </Link>
              </h1>
              <div className="artist-info-container">
                <h5 className="artist-info-heading">
                  {nationality}, {yearOfBirth}
                </h5>
                <div className="artist-info-box">
                  <div className="artist-info">
                    <strong>{artwork.length}</strong>
                    <span>artworks in shop</span>
                  </div>
                  <div className="artist-info">
                    <strong>{exhibitions.length}</strong>
                    <span>current exhibitions</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="follow-button-box">
              <FollowButton text="Follow" transparent={true}></FollowButton>
              <ScrollerTabsNav selectTab={select} curIdx={curIdx} />
            </div>
          </div>
        </Col>
        <div className="right-iconbox" onClick={() => next(curIdx)}>
          <IconRight className="icon-right" />
        </div>
      </div>
    </div>
  );
};

export default FeaturedArtistSlide;
