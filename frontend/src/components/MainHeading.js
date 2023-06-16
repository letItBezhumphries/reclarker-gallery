import React from "react";
import Styled from "styled-components";

const Heading = Styled.h1`
  margin-top: 2rem;
  font-size: 30px;
  width: 100%;
  text-align: center;
  font-family: "Lato";
  font-weight: normal;
  margin-bottom: 1rem;
  text-transform: lowercase;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;


  &::after {
    content: "  ";
    margin-top: 10px;
    box-sizing: border-box;
    width: 16%;
    border-bottom: .5px solid black;
  }
`;

const Text = Styled.span`
  text-transform: lowercase;
  text-align: center;
  font-family: "Lato";
  font-weight: normal;
  display: block;

  &::first-letter {
    text-transform: uppercase;
  }
`;

const MainHeading = ({ text }) => {
  return (
    <Heading>
      <Text>{text}</Text>
    </Heading>
  );
};

export default MainHeading;
