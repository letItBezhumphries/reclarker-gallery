import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Styled from "styled-components";
import { updateUserFollowArtistlist } from "../../actions/userActions";

const FollowBtn = Styled.button`
  background-color: #fff;
  color: #131721;
  text-transform: uppercase;
  font-family: "Lato";
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1px;
  border: 2px solid #131721;
  height: 3.5rem;
  padding: 10px 25px;
  width: 65%;

  &:hover {
    background-color: #131721;
    color: #fff;
    border: 2px solid #fff;
    cursor: pointer;
    
    transition: background-color .1s, color .1s;
  }
`;

const FollowBtnTransparent = Styled.button` 
  background-color: transparent;
  color: #fff;
  text-transform: uppercase;
  font-family: "Lato";
  font-weight: bold;  
  letter-spacing: 1.2px;
  border: 2px solid #fff;
  height: 3.5rem;
  padding: .5rem 1rem;
  margin-left: 2rem;
  width: 35%;

  &:hover {
    background-color: #fff;
    color: #131721;
    transition: all .2s;
  }
`;

const FollowingBtn = Styled.button`
  background-color: #9c9c9c;
  color: #fff;
  text-transform: uppercase;
  font-family: "Lato";
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1px;
  border: 2px solid #9c9c9c;
  height: 3.5rem;
  padding: 10px 25px;
  width: 65%;

  &:hover {
    background-color: #131721;
    color: #fff;
    border: 2px solid #fff;
    cursor: pointer;
    
    transition: background-color .1s, color .1s;
  } 
`;

const FollowingBtnTransparent = Styled.button` 
  background-color: #9c9c9c;
  color: #fff;
  text-transform: uppercase;
  font-family: "Lato";
  font-weight: bold;  
  letter-spacing: 1px;
  border: 2px solid #9c9c9c;
  height: 3.5rem;
  padding: .5rem 1rem;
  margin-left: 2rem;
  width: 35%;

  &:hover {
    background-color: #131721;
    color: #fff;
    transition: all .2s;
  }
`;

const FollowButton = ({ text, transparent, user, artistId }) => {
  const dispatch = useDispatch();
  // const userDetails = useSelector((state) => state.userDetails);
  // const { user } = userDetails;
  let button;

  const handleFollowClick = (e) => {
    dispatch(updateUserFollowArtistlist(user, artistId));
  };

  if (text === "Follow") {
    if (transparent) {
      button = (
        <FollowBtnTransparent onClick={handleFollowClick}>
          {text}
        </FollowBtnTransparent>
      );
    } else {
      button = <FollowBtn onClick={handleFollowClick}>{text}</FollowBtn>;
    }
  }
  if (text === "Following") {
    if (transparent) {
      button = (
        <FollowingBtnTransparent onClick={handleFollowClick}>
          {text}
        </FollowingBtnTransparent>
      );
    } else {
      button = <FollowingBtn onClick={handleFollowClick}>{text}</FollowingBtn>;
    }
  }

  return button;
};

export default FollowButton;
