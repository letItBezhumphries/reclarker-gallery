import React from "react";
import { ReactComponent as IconLeft } from "../assets/icons/SVG/chevron-thin-left.svg";
import { ReactComponent as IconRight } from "../assets/icons/SVG/chevron-thin-right.svg";

const ArtworkSlide = ({ artwork, prev, next, curIdx }) => {
  const { imageUrl, subject, title, artist } = artwork;
  const CollectionTitle = subject;
  const artistName = artist.name;
  const bgImage = { backgroundImage: `url(${imageUrl})` };

  return (
    <div className="artwork-carousel-slide" style={bgImage}>
      <div className="artwork-carousel-topheader">{artistName}</div>
      <div className="iconbox--left" onClick={() => prev(curIdx)}>
        <IconLeft className="icon--left" />
      </div>
      <div className="iconbox--right" onClick={() => next(curIdx)}>
        <IconRight className="icon--right" />
      </div>

      <div className="artwork-carousel-header">
        <span className="artwork-details-collection">{CollectionTitle} / </span>
        <span className="artwork-details-title">{title}</span>
      </div>
    </div>
  );
};

export default ArtworkSlide;
