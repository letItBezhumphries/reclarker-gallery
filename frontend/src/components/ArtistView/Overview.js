import React, { useEffect, useState } from "react";
import Styled from "styled-components";
import { useParams } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ArtworkCard from "../ArtworkCard";
import Exhibition from "../Exhibition";

const SectionRow = Styled(Row)`
  width: 90%;
  display: flex;
  flex-direction: row;
  border-bottom: .35px solid #131721;
  margin-bottom: 3rem;
`;

const SectionLink = Styled(Link)`
  color: #fff;
  background-color: #131721;
  text-transform: uppercase;
  font-family: "Lato";
  font-size: 14px;
  font-weight: normal;
  text-align: center;
  letter-spacing: 1px;
  border: 1px solid #fff;
  height: 3.5rem;
  padding: 10px 10px;
  width: 25%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  &:hover {
    color: #fff;
    cursor: pointer;
  }
`;

// background-color: orange;
const ContentContainer = Styled(Container)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 3rem auto;
`;

// background-color: dodgerblue;
const SlidesContainer = Styled.div` 
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 3rem;
`;

const ButtonContainer = Styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
`;

const Overview = ({ artist, artwork, exhibits }) => {
  const [showContent, setShowContent] = useState(false);
  const [artworkList, setArtworkList] = useState([]);
  const [exhibitList, setExhibitList] = useState([]);
  const params = useParams();
  const artistId = params.id;
  let artworkSlides, exhibitionSlides;

  useEffect(() => {
    if (artwork !== undefined && exhibits !== undefined) {
      setShowContent(true);
      setArtworkList(artwork.slice(0, 3));
      setExhibitList(exhibits.slice(0, 3));
    } else {
      setShowContent(false);
    }
  }, [artist, artwork, exhibits]);

  if (artwork !== undefined) {
    artworkSlides = artworkList.map((art) => {
      return <ArtworkCard key={art.title} artwork={art} />;
    });
  }

  if (exhibits !== undefined) {
    exhibitionSlides = exhibitList.map((exhibit) => {
      return <Exhibition key={exhibit.title} exhibit={exhibit} />;
    });
  }

  return (
    <ContentContainer>
      <SectionRow>
        <SlidesContainer>
          {artwork !== undefined && showContent ? artworkSlides : null}
        </SlidesContainer>
        <ButtonContainer>
          <SectionLink to={`/artist/${artistId}`}>
            View all artworks
          </SectionLink>
        </ButtonContainer>
      </SectionRow>
      <SectionRow>
        <SlidesContainer>
          {exhibits !== undefined && showContent ? exhibitionSlides : null}
        </SlidesContainer>
        <ButtonContainer>
          <SectionLink to={`/exhibit/${artistId}`}>
            View all exhibitions
          </SectionLink>
        </ButtonContainer>
      </SectionRow>
    </ContentContainer>
  );
};

export default Overview;
