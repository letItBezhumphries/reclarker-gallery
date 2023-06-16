import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ScrollerContainer from "../ScrollerContainer";
import ArtistScroller from "../ArtistScroller";
import Tabs from "../Tabs/Tabs";
import Loader from "../Loader";
import Message from "../Message";
import BreadCrumbs from "../BreadCrumbs";
import Overview from "./Overview";
import Artwork from "./Artwork";
import Exhibitions from "./Exhibitions";

const ArtistView = () => {
  const [activeContent, setActiveContent] = useState("Overview");
  const artistDetails = useSelector((state) => state.artistDetails);
  const { artist, error, loading } = artistDetails;

  const onTabSelect = (tab) => {
    console.log("tab:", tab);
    setActiveContent(tab);
  };

  useEffect(() => {
    console.log("in useEffect -> activeContent:", activeContent);
  }, [activeContent]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <ScrollerContainer>
            <BreadCrumbs artist={artist} />
            <ArtistScroller artist={artist} />
            <Tabs click={onTabSelect}>
              <div label="Overview"></div>
              <div label="Artwork"></div>
              <div label="Exhibitions"></div>
            </Tabs>
          </ScrollerContainer>
          {activeContent === "Artwork" ? (
            <Artwork artist={artist} artwork={artist.artwork} />
          ) : activeContent === "Exhibitions" ? (
            <Exhibitions artist={artist} exhibits={artist.exhibitions} />
          ) : (
            <Overview
              artist={artist}
              artwork={artist.artwork}
              exhibits={artist.exhibitions}
            />
          )}
        </>
      )}
    </>
  );
};

export default ArtistView;
