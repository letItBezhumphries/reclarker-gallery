import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";
import { listTopRatedArtwork } from "../actions/artworkActions";
import ArtworkSlide from "./ArtworkSlide";
import "../assets/styles/components/ArtworkCarousel.css";

const ArtworkCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();

  const artworkTopRated = useSelector((state) => state.artworkTopRated);
  const { loading, error, artwork: artworkList } = artworkTopRated;

  useEffect(() => {
    dispatch(listTopRatedArtwork());
  }, [dispatch]);

  const prevSlide = (currentIndex) => {
    if (currentIndex === 0) {
      return setCurrentIndex(artworkList.length - 1);
    }
    return setCurrentIndex(currentIndex - 1);
  };

  const nextSlide = (currentIndex) => {
    if (currentIndex === artworkList.length - 1) {
      return setCurrentIndex(0);
    }
    return setCurrentIndex(currentIndex + 1);
  };

  useEffect(() => {
    const backgroundTimer = setInterval(() => {
      nextSlide(currentIndex);
    }, 20000);
    return () => {
      clearInterval(backgroundTimer);
    };
  }, [currentIndex, nextSlide]);

  const gallery = artworkList.map((artwork, index) => {
    return (
      <ArtworkSlide
        key={index}
        artwork={artwork}
        prev={prevSlide}
        next={nextSlide}
        curIdx={currentIndex}
      />
    );
  });

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div className="artwork-carousel">{gallery[currentIndex]}</div>
  );
};

export default ArtworkCarousel;
