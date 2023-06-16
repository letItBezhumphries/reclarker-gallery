import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Styled from "styled-components";
import { ReactComponent as ChevronLeft } from "../assets/icons/SVG/chevron-thin-left.svg";
import { ReactComponent as ChevronRight } from "../assets/icons/SVG/chevron-thin-right.svg";

const ArtistCardBio = Styled(Card.Body)`
  min-height: 65%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  overflow: hidden;
`;

const LeftArrow = Styled(ChevronLeft)`
  height: 30px;
  width: 30px;
  fill: black;
`;

const RightArrow = Styled(ChevronRight)`
  height: 30px;
  width: 30px;
  fill: black;
`;

const ArrowBox = Styled.div`
  width: 20%;
  height: 120px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ArtistBioText = Styled(Card.Text)`
  max-height: 120px;
  color: #666;
  font-size: 18px;
  overflow: hidden;
  margin: 0 20px 20px 20px;
  text-overflow: ellipsis;
  padding: 0 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ArtistBioTextExpanded = Styled(Card.Text)`
  min-height: 400px;
  color: #666;
  font-size: 18px;
  overflow: hidden;
  margin: 0 20px 20px 20px;
  text-overflow: ellipsis;
  padding: 0 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

`;

const SeeMoreButton = Styled.button`
  font-size: 14px;
  width: 1fr;
  align-self: flex-start;
  background-color: #fff;
  letter-spacing: 1.15px;
  border: none;
  color: #a9a9a9;
  font-weight: normal;
  border-bottom: .5px solid #a9a9a9;

  &:active {
    border: none;
    border-bottom: .5px solid #a9a9a9;
  }
`;

const ArtistBio = ({ bio }) => {
  const [active, setActive] = useState(false);
  const [showingText, setShowingText] = useState("");
  const [text, setText] = useState("See more");

  const handleSeeMoreClick = (active) => {
    setActive(!active);
  };

  useEffect(() => {
    if (bio !== undefined) {
      setShowingText(bio.split(". ").slice(0, 3).join(". "));
    }
    if (active) {
      setText("See less");
    } else {
      setText("See more");
    }
  }, [bio, active]);

  return (
    <ArtistCardBio>
      {bio !== undefined ? (
        <>
          <ArrowBox>
            <LeftArrow></LeftArrow>
          </ArrowBox>

          {active ? (
            <ArtistBioTextExpanded as="div">
              <p>{bio}</p>
              <SeeMoreButton onClick={() => handleSeeMoreClick(active)}>
                {text}
              </SeeMoreButton>
            </ArtistBioTextExpanded>
          ) : (
            <ArtistBioText as="div">
              <p>{showingText}</p>
              <SeeMoreButton onClick={() => handleSeeMoreClick(active)}>
                {text}
              </SeeMoreButton>
            </ArtistBioText>
          )}
          <ArrowBox>
            <RightArrow></RightArrow>
          </ArrowBox>
        </>
      ) : null}
    </ArtistCardBio>
  );
};

export default ArtistBio;
