import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import FeaturedArtistSlide from "./FeaturedArtistSlide";
import "../assets/styles/components/FeaturedArtistScroller.css";

const FeaturedArtistScroller = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const artistList = useSelector((state) => state.artistList);
  const { artists, loading, error } = artistList;

  const prevArtist = (index) => {
    if (currentIndex === 0) {
      return setCurrentIndex(artists.length - 1);
    }
    return setCurrentIndex(currentIndex - 1);
  };

  const nextArtist = (index) => {
    if (currentIndex === artists.length - 1) {
      return setCurrentIndex(0);
    }
    return setCurrentIndex(currentIndex + 1);
  };

  const selectArtistSlide = (index) => {
    return setCurrentIndex(index);
  };

  const featuredArtists = artists.map((artist, index) => {
    return (
      <FeaturedArtistSlide
        key={index}
        artist={artist}
        prev={prevArtist}
        next={nextArtist}
        select={selectArtistSlide}
        curIdx={currentIndex}
      />
    );
  });

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Container fluid className="featured-artist-section">
      {featuredArtists[currentIndex]}
    </Container>
  );
};

export default FeaturedArtistScroller;
