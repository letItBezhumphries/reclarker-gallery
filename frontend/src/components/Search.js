import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Row } from "react-bootstrap";
import { searchArtworkByTitle } from "../actions/artworkActions";
import { ReactComponent as SearchIcon } from "../assets/icons/SVG/search.svg";
import "../assets/styles/components/Search.css";

const Search = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const dispatch = useDispatch();

  // const artworkSearchList = useSelector((state) => state.artworkSearchList);
  // const { search, loading, error } = artworkSearchList;

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(searchArtworkByTitle(searchTitle));
    // or in SearchBox you used useNavigate
    setSearchTitle("");
  };

  return (
    <Row className="artist-list-searchbox">
      <form className="search" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          className="search search-input"
          placeholder="Search inventory"
          id="title"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <button className="search search-button">
          <SearchIcon className="search search-icon" />
        </button>
      </form>
    </Row>
  );
};

export default Search;
