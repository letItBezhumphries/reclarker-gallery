import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Search from "../components/Search";
import FeaturedArtistScroller from "../components/FeaturedArtistScroller";
import CategorySearch from "../components/CategorySearch";
import Loader from "../components/Loader";
import Message from "../components/Message";
import MainHeading from "../components/MainHeading";
import PopularArtists from "../components/PopularArtists";
import { Container } from "react-bootstrap";
import { listArtists } from "../actions/artistActions";
import "../assets/styles/screens/ArtistListScreen.css";

const ArtistsListScreen = () => {
  const dispatch = useDispatch();

  const artistList = useSelector((state) => state.artistList);
  const { artists, loading, error } = artistList;

  useEffect(() => {
    dispatch(listArtists());
  }, [dispatch]);

  const categories = artists.map((artist) => {
    const { style, category } = artist;
    return { style, category };
  });

  return (
    <Container fluid className="artist-list-screen">
      <MainHeading text="Explore the artists you love" />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Search />
          {categories !== undefined ? (
            <CategorySearch categories={categories} />
          ) : null}
          <FeaturedArtistScroller />
          <PopularArtists />
        </>
      )}
    </Container>
  );
};

export default ArtistsListScreen;
