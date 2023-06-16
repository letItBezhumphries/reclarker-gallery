import React, { useEffect, useState } from "react";
import Styled from "styled-components";
import { useParams } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import { ReactComponent as Filter } from "../../assets/icons/SVG/filter.svg";
import { Link } from "react-router-dom";
import ArtworkCard from "../ArtworkCard";

const ContentContainer = Styled(Container)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 3rem auto;
`;

const Heading = Styled.h2`
  font-size: 24px;
  width: 100%;
  font-family: "Lato";
  font-weight: bold;
  text-transform: capitalize;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & span {
    font-size: 16px;
    font-weight: normal;
    color: #a9a9a9;
    transform: translate
  }

  &::after {
    content: "  ";
    margin-top: 10px;
    box-sizing: border-box;
    width: 10%;
    border-bottom: .5px solid black;
  }
`;

const SubHeading = Styled.h3` 
  width: 50%
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  letter-spacing: .5px;
  font-size: 14px;
  margin-right: 2rem;

  & div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    font-weight: normal;
    text-transform: capitalize;
    
    & span {
      margin-left: 2rem;
      font-weight: lighter;
      color: rgb(102,102,102);
    }
  }
`;

const FilterIcon = Styled(Filter)` 
  height: 20px;
  width: 20px;
  fill: black;
  margin-right: 10px;

  &:hover {
    cursor: pointer;
  }
`;

const SlidesRow = Styled(Row)`
  margin-top: 3rem;
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  align-self: center;
`;

const Artwork = ({ artist, artwork }) => {
  const [showContent, setShowContent] = useState(false);
  const params = useParams();
  const artistId = params.id;
  let artworkSlides;
  console.log("in Artwork.js -> artist:", artist);

  useEffect(() => {
    if (artwork !== undefined) {
      setShowContent(true);
    } else {
      setShowContent(false);
    }
  }, [artist, artwork]);

  if (artwork !== undefined) {
    artworkSlides = artwork.map((art) => {
      return <ArtworkCard key={art.title} artwork={art} />;
    });
  }

  return (
    <ContentContainer>
      <Heading>
        Artworks
        {/* <span>
          {artwork.length > 0 ? `${artwork.length} Total Artworks` : null}
        </span> */}
      </Heading>
      <SubHeading>
        <div>
          <FilterIcon /> Filters
          <span>{artwork.length > 0 ? `${artwork.length} Results` : null}</span>
        </div>
      </SubHeading>
      <SlidesRow>
        {artwork !== undefined && showContent ? artworkSlides : null}
      </SlidesRow>
    </ContentContainer>
  );
};

export default Artwork;
