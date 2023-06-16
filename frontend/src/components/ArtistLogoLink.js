import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const ArtistLogoLink = ({ name }) => (
  <Link to="/" className="navbar-logo-link">
    <span className="logo-name-first">{name.split(" ")[0]}</span>
    <span className="logo-name-last">{name.split(" ")[1]}</span>
  </Link>
);

export default ArtistLogoLink;
