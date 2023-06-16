import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ArtistView from "../components/ArtistView/ArtistView";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getArtistDetails } from "../actions/artistActions";

const ArtistScreen = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const artistId = params.id;

  useEffect(() => {
    dispatch(getArtistDetails(artistId));
  }, [dispatch, artistId]);

  const artistDetails = useSelector((state) => state.artistDetails);
  const { artist, error, loading } = artistDetails;

  // console.log("in ArtistScreen.js -> artist:", artist);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <ArtistView />
      )}
    </>
  );
};

export default ArtistScreen;
