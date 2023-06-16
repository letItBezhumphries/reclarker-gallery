import React, { useState, useEffect } from "react";
import Styled from "styled-components";
import { useParams } from "react-router-dom";
import { Row, Card } from "react-bootstrap";
import FollowButton from "./Buttons/FollowButton";
import ArtistBio from "./ArtistBio";
import { ReactComponent as NotificationIcon } from "../assets/icons/SVG/notifications_none.svg";

// background-color: yellow;
const ScrollerRow = Styled(Row)`
  margin: 0 3rem 3rem 3rem;
  min-height: 350px;
`;

// background-color: red;
const ArtistCard = Styled(Card)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  border: none;
`;

const ArtistImg = Styled(Card.Img)`
  border: 2px solid black;
  width: 200px;
  height: 60%;
  margin: 3rem 3rem;
`;

//  background-color: yellow;
const ArtistCardContent = Styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 0;
  padding: 0 0;
`;

//    background-color: red;
const ArtistHeader = Styled(Card.Header)`
  background-color: #fff;
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  margin-top: 3rem;
  margin-right: 3rem;
  margin-bottom: 1rem;
  padding: 0 0;
  border-bottom: none;
`;

// background-color: beige;
const ArtistDetailsBox = Styled.div`
  margin: 0 3rem 0 0;
  height: 100%;

  padding: 0 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  & h1 {
    font-size: 40px;
    font-family: "Lato", "Baskerville", "Georgia", "serif";
    text-transform: capitalize;
    margin-bottom: 0;
    padding-bottom: 2px;
    margin-top: 0;
    padding-top: 0;
  }

  & p {
    font-size: 18px;
  }

  & span {
    text-align: center;
    width: 20px;
    margin-left: 5px;
    margin-right: 5px;
  }
`;

//  background-color: dodgerblue;
const FollowArtistContainer = Styled.div`
  width: 30%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 0 0;
  padding: 0 0;
`;

// background-color: pink;
const IconBox = Styled.div`
  width: 25%;
  height: 75%;
  border-radius: 90%;
  margin-left: 1rem;
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  padding-left: .7rem;
  margin-top: .5rem;
  margin-bottom: .5rem;
  box-shadow: 0 10px 20px rgba(0,0,0,.2);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 25px rgba(0,0,0,.2);
  }

  &:active {
    transform: translateY(-1px);
    box-shadow: 0 12.5px 22.5px rgba(0,0,0,.2);
  }
`;

const Notification = Styled(NotificationIcon)`
  height: 40px;
  width: 40px;
  align-self: center;
`;

const ArtistScroller = ({ artist }) => {
  const [artistName, setArtistName] = useState("");
  const [artistAvatar, setArtistAvatar] = useState("");
  const [artistNationality, setArtistNationality] = useState("");
  const [artistBirthYear, setArtistBirthYear] = useState(0);
  const params = useParams();
  const artistId = params.id;
  // console.log("artist:", artist);
  useEffect(() => {
    if (artist.user) {
      setArtistName(artist.user.name);
      setArtistAvatar(artist.user.avatar);
      setArtistNationality(artist.nationality);
      setArtistBirthYear(artist.yearOfBirth);
    }
  }, [artist]);

  return (
    <ScrollerRow>
      <ArtistCard>
        <ArtistImg src={artistAvatar} alt={artistName} />
        <ArtistCardContent>
          <ArtistHeader>
            <ArtistDetailsBox>
              <h1>{artistName}</h1>
              <p>
                {artistNationality}
                <span>|</span>
                {artistBirthYear}
              </p>
            </ArtistDetailsBox>
            <FollowArtistContainer>
              <FollowButton text="Follow"></FollowButton>
              <IconBox>
                <Notification />
              </IconBox>
            </FollowArtistContainer>
          </ArtistHeader>
          <ArtistBio bio={artist.biography} />
        </ArtistCardContent>
      </ArtistCard>
    </ScrollerRow>
  );
};

export default ArtistScroller;
