import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Artist from "./Artist";
import Message from "./Message";
import Loader from "./Loader";
import SectionRow from "./SectionRow";
import { getPopularArtists } from "../actions/artistActions";

const PopularArtists = () => {
  const dispatch = useDispatch();
  const artistsPopular = useSelector((state) => state.artistsPopular);
  const { artists, error, loading } = artistsPopular;

  useEffect(() => {
    dispatch(getPopularArtists());
  }, [dispatch]);

  let popularArtists = artists.map((artist) => {
    return <Artist artist={artist} key={artist._id} />;
  });

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <SectionRow text="Popular artists">{popularArtists}</SectionRow>
      )}
    </>
  );
};

export default PopularArtists;
